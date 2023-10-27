import potpack from 'potpack';
import { OpenCascadeHelper, VectorHelperService, ShapesHelperService } from './utils';
import { getOC } from './index';

/**
 * 获取包围体对角线长度
 */
function getBoxSize(bBox) {
  if (!bBox) {
    return 0;
  }

  let minCorner = bBox.CornerMin();
  let maxCorner = bBox.CornerMax();
  let xSize = maxCorner.X() - minCorner.X();
  let ySize = maxCorner.Y() - minCorner.Y();
  let zSize = maxCorner.Z() - minCorner.Z();
  let boxSize = Math.sqrt(xSize * xSize + ySize * ySize + zSize * zSize);

  return boxSize;
}

/** This function synchronously reads the text contents of a file. */
const loadFileAsync = async (fileArrayBuffer) => {
  return new Promise((resolve, reject) => {
    var enc = new TextDecoder('utf-8');
    var arr = new Uint8Array(fileArrayBuffer);
    resolve(enc.decode(arr));

    // let reader = new FileReader();
    // reader.onload = () => {
    //   resolve(enc.decode(arr));
    // }
    // reader.onerror = reject;
    // reader.readAsText(fileArrayBuffer);
  });
};

const fileType = (name) => {
  switch (name.toLowerCase().split('.').pop()) {
    case 'step':
    case 'stp':
      return 'step';
    case 'iges':
    case 'igs':
      return 'iges';
    case 'stl':
      return 'stl';
    default:
      return undefined;
  }
};

export const loadFileAndGetInfo = async (inputFile, fileName) => {
  const openCascade = getOC();
  return await loadFileAsync(inputFile)
    .then(async (fileText) => {
      // const fileName = inputFile.name;
      if (fileType(fileName) === 'stl') {
        return importSTL(fileName, fileText);
      } else {
        return importSTEPorIGES(fileName, fileText);
      }
    })
    .then(async (shape) => {
      // 提高剖分精细度
      const options = { tolerance: 0.01 };
      // 建立包围盒边框
      let bBox = new openCascade.Bnd_Box_1();
      openCascade.BRepBndLib.prototype.constructor.Add(shape, bBox, true);
      let boxSize = getBoxSize(bBox);
      // 容差度
      options.tolerance = boxSize / 1000;
      // if (globalFileName &&
      //   (globalFileName.endsWith(".igs") || globalFileName.endsWith(".iges"))
      // ) {
      //   linearDeflection = boxSize / 100;
      // }
      if (options.tolerance < 0.5) {
        options.tolerance = 0.01;
      }
      // console.time('shapeToMesh');
      const info = await shapeToMesh(shape, options);
      // console.timeEnd('shapeToMesh');
      return info;
    })
    .catch((error) => {
      console.log('error', error);
    });
};

function importSTEPorIGES(fileName, fileText) {
  const openCascade = getOC();
  // console.time("Writes the uploaded file to Emscripten's Virtual Filesystem");
  // Writes the uploaded file to Emscripten's Virtual Filesystem
  openCascade.FS.writeFile(`/${fileName}`, fileText);
  // console.timeEnd("Writes the uploaded file to Emscripten's Virtual Filesystem");

  // Choose the correct OpenCascade file parsers to read the CAD file
  var reader = null;
  if (fileType(fileName) === 'step') {
    reader = new openCascade.STEPControl_Reader_1();
  } else if (fileType(fileName) === 'iges') {
    reader = new openCascade.IGESControl_Reader_1();
  } else {
    console.error("opencascade.js can't parse this extension! (yet)");
  }
  // console.time('reader readFile');
  const readResult = reader.ReadFile(`/${fileName}`); // Read the file
  // console.timeEnd('reader readFile');
  if (readResult === openCascade.IFSelect_ReturnStatus.IFSelect_RetDone) {
    // console.time('Translate all transferable roots to OpenCascade');
    const messageProgress = new openCascade.Message_ProgressRange_1();
    // eslint-disable-next-line no-unused-vars
    const numRootsTransferred = reader.TransferRoots(messageProgress); // Translate all transferable roots to OpenCascade
    const stepShape = reader.OneShape(); // Obtain the results of translation in one OCCT shape
    // Remove the file when we're done (otherwise we run into errors on reupload)
    openCascade.FS.unlink(`/${fileName}`);
    // console.timeEnd('Translate all transferable roots to OpenCascade');
    return stepShape;
  } else {
    console.error('Something in OCCT went wrong trying to read ' + fileName);
  }
}

/** This function parses the contents of an ASCII .STL File as a Shape
 * into the `externalShapes` dictionary. */
function importSTL(fileName, fileText) {
  const openCascade = getOC();
  // Writes the uploaded file to Emscripten's Virtual Filesystem
  openCascade.FS.writeFile(`/${fileName}`, fileText);

  // Choose the correct OpenCascade file parsers to read the STL file
  const reader = new openCascade.StlAPI_Reader();
  const readShape = new openCascade.TopoDS_Shape();

  if (reader.Read(readShape, fileName)) {
    openCascade.FS.unlink(`/${fileName}`);
    return readShape;
  } else {
    return null;
  }
}

async function shapeToMesh(shape, options) {
  const openCascade = getOC();
  const { tolerance = 0.1 } = options;

  const vecHelper = new VectorHelperService();
  const shapesHelper = new ShapesHelperService();
  const openCascadeHelper = new OpenCascadeHelper(vecHelper, shapesHelper);
  const faceList = [];
  const edgeList = [];
  // 用于记录不重复的模型顶点
  let allFaceVertex = [];
  // 用于记录面与体的对应关系
  const solidOfFace = [];
  let maxArea = 0;
  let minArea = 999999;

  let shapeToUse = shape;

  openCascade.BRepTools.Clean(shapeToUse, true);

  let incrementalMeshBuilder;
  try {
    incrementalMeshBuilder = new openCascade.BRepMesh_IncrementalMesh_2(
      shapeToUse,
      0.0007,
      true,
      0.5,
      true
    );
  } catch (error) {
    console.error('face visualizing failed');
  }

  // Construct the edge hashes to assign proper indices to the edges
  const fullShapeEdgeHashes = {};
  // Iterate through the faces and tropenCascadeHelperiangulate each one
  const triangulations = [];

  const uv_boxes = [];
  // forEachFace
  openCascadeHelper.forEachFace(shapeToUse, (faceIndex, myFace) => {
    const gprops = new openCascade.GProp_GProps_1();
    openCascade.BRepGProp.SurfaceProperties_1(myFace, gprops, false, false);
    const area = gprops.Mass();
    if (area > maxArea) {
      maxArea = area;
    }
    if (area < minArea) {
      minArea = area;
    }

    const aLocation = new openCascade.TopLoc_Location_1();
    const myT = openCascade.BRep_Tool.Triangulation(myFace, aLocation, 0);

    if (myT.IsNull()) {
      console.error('Encountered Null Face!');

      const errorData = {
        face_index: faceIndex,
        normal_coord: [],
        number_of_triangles: 0,
        tri_indexes: [],
        uv_coord: [],
        vertex_coord: []
      };
      faceList.push(errorData);

      return;
    }

    const thisFace = {
      face_index: faceIndex,
      normal_coord: [],
      number_of_triangles: 0,
      tri_indexes: [],
      uv_coord: [],
      vertex_coord: [],
      // vertex_coord_vec: [],
      orient: 0
    };

    const pc = new openCascade.Poly_Connect_2(myT);
    // Class Poly_Triangulation
    const triangulation = myT.get();

    // write vertex buffer
    thisFace.vertex_coord = new Array(triangulation.NbNodes() * 3);
    // thisFace.vertex_coord_vec = [];
    for (let i = 0; i < triangulation.NbNodes(); i++) {
      const p = triangulation.Node(i + 1).Transformed(aLocation.Transformation());
      thisFace.vertex_coord[i * 3 + 0] = p.X();
      thisFace.vertex_coord[i * 3 + 1] = p.Y();
      thisFace.vertex_coord[i * 3 + 2] = p.Z();
      // thisFace.vertex_coord_vec.push([p.X(), p.Y(), p.Z()]);
      // add(szf):用于统计面的所有顶点
      allFaceVertex.push([p.X(), p.Y(), p.Z()]);
    }

    // write uv buffer
    const orient = myFace.Orientation_1();
    thisFace.orient = orient.value;
    if (triangulation.HasUVNodes()) {
      // Get UV Bounds
      let UMin = 0;
      let UMax = 0;
      let VMin = 0;
      let VMax = 0;

      thisFace.uv_coord = new Array(triangulation.NbNodes() * 2);

      for (let i = 0; i < triangulation.NbNodes(); i++) {
        const p = triangulation.UVNode(i + 1);
        const x = p.X();
        const y = p.Y();
        thisFace.uv_coord[i * 2 + 0] = x;
        thisFace.uv_coord[i * 2 + 1] = y;

        // Compute UV Bounds
        if (i === 0) {
          UMin = x;
          UMax = x;
          VMin = y;
          VMax = y;
        }
        if (x < UMin) {
          UMin = x;
        } else if (x > UMax) {
          UMax = x;
        }
        if (y < VMin) {
          VMin = y;
        } else if (y > VMax) {
          VMax = y;
        }
      }

      // Compute the Arclengths of the Isoparametric Curves of the face
      // surface is Class Geom_Surface
      const surface = openCascade.BRep_Tool.Surface_2(myFace).get();
      const UIso_Handle = surface.UIso(UMin + (UMax - UMin) * 0.5);
      const VIso_Handle = surface.VIso(VMin + (VMax - VMin) * 0.5);
      const UAdaptor = new openCascade.GeomAdaptor_Curve_2(VIso_Handle);
      const VAdaptor = new openCascade.GeomAdaptor_Curve_2(UIso_Handle);
      uv_boxes.push({
        w: openCascadeHelper.lengthOfCurve(UAdaptor, UMin, UMax),
        h: openCascadeHelper.lengthOfCurve(VAdaptor, VMin, VMax),
        index: faceIndex
      });

      // Normalize each face's UVs to 0-1
      for (let i = 0; i < triangulation.NbNodes(); i++) {
        let x = thisFace.uv_coord[i * 2 + 0],
          y = thisFace.uv_coord[i * 2 + 1];

        x = (x - UMin) / (UMax - UMin);
        y = (y - VMin) / (VMax - VMin);
        if (orient !== openCascade.TopAbs_Orientation.TopAbs_FORWARD) {
          x = 1.0 - x;
        }

        thisFace.uv_coord[i * 2 + 0] = x;
        thisFace.uv_coord[i * 2 + 1] = y;
      }
    }

    // write normal buffer
    const myNormal = new openCascade.TColgp_Array1OfDir_2(1, triangulation.NbNodes());
    openCascade.StdPrs_ToolTriangulatedShape.Normal(myFace, pc, myNormal);
    thisFace.normal_coord = new Array(myNormal.Length() * 3);
    for (let i = 0; i < myNormal.Length(); i++) {
      const d = myNormal.Value(i + 1).Transformed(aLocation.Transformation());
      thisFace.normal_coord[i * 3 + 0] = d.X();
      thisFace.normal_coord[i * 3 + 1] = d.Y();
      thisFace.normal_coord[i * 3 + 2] = d.Z();
    }

    // write triangle buffer
    // const orient = myFace.Orientation_1();
    const triangles = myT.get().Triangles();
    thisFace.tri_indexes = new Array(triangles.Length() * 3);
    let validFaceTriCount = 0;
    for (let nt = 1; nt <= myT.get().NbTriangles(); nt++) {
      const t = triangles.Value(nt);
      let n1 = t.Value(1);
      let n2 = t.Value(2);
      const n3 = t.Value(3);
      if (orient !== openCascade.TopAbs_Orientation.TopAbs_FORWARD) {
        const tmp = n1;
        n1 = n2;
        n2 = tmp;
      }
      // if(TriangleIsValid(Nodes.Value(1), Nodes.Value(n2), Nodes.Value(n3))) {
      thisFace.tri_indexes[validFaceTriCount * 3 + 0] = n1 - 1;
      thisFace.tri_indexes[validFaceTriCount * 3 + 1] = n2 - 1;
      thisFace.tri_indexes[validFaceTriCount * 3 + 2] = n3 - 1;
      validFaceTriCount++;
      // }
    }

    thisFace.number_of_triangles = validFaceTriCount;
    faceList.push(thisFace);

    openCascadeHelper.forEachEdge(myFace, (edgeIndex, myEdge) => {
      const edgeHash = myEdge.HashCode(100000000);
      if (fullShapeEdgeHashes.hasOwnProperty(edgeHash)) {
        const thisEdge = {
          vertex_coord: [],
          edge_index: -1
        };

        const myP = openCascade.BRep_Tool.PolygonOnTriangulation_1(myEdge, myT, aLocation);

        const poly_PolygonOnTriangulation = myP.get();

        const nbNodes = poly_PolygonOnTriangulation.NbNodes();
        thisEdge.vertex_coord = new Array(nbNodes * 3);

        for (let i = 0; i < nbNodes; i++) {
          const vertexIndex = poly_PolygonOnTriangulation.Node(i + 1);
          thisEdge.vertex_coord[i * 3 + 0] = thisFace.vertex_coord[(vertexIndex - 1) * 3 + 0];
          thisEdge.vertex_coord[i * 3 + 1] = thisFace.vertex_coord[(vertexIndex - 1) * 3 + 1];
          thisEdge.vertex_coord[i * 3 + 2] = thisFace.vertex_coord[(vertexIndex - 1) * 3 + 2];
        }

        thisEdge.edge_index = edgeIndex;

        edgeList.push(thisEdge);
      } else {
        fullShapeEdgeHashes[edgeHash] = edgeHash;
      }
    });

    triangulations.push(myT);
    aLocation.delete();
    pc.delete();
  });

  // add(szf):进行三角剖分后顶点去重工作
  const vertexOfFace = {};
  allFaceVertex.forEach((item) => (vertexOfFace[item] = item));
  allFaceVertex = Object.values(vertexOfFace);

  // Scale each face's UVs to Worldspace and pack them into a 0-1 Atlas with potpack
  const padding = 2;
  for (let f = 0; f < uv_boxes.length; f++) {
    uv_boxes[f].w += padding;
    uv_boxes[f].h += padding;
  }
  const packing_stats = potpack(uv_boxes);
  for (let f = 0; f < uv_boxes.length; f++) {
    let box = uv_boxes[f];
    let this_face = faceList[box.index];
    for (let q = 0; q < this_face.uv_coord.length / 2; q++) {
      let x = this_face.uv_coord[q * 2 + 0],
        y = this_face.uv_coord[q * 2 + 1];

      x =
        (x * (box.w - padding) + (box.x + padding * 0.5)) /
        Math.max(packing_stats.w, packing_stats.h);
      y =
        (y * (box.h - padding) + (box.y + padding * 0.5)) /
        Math.max(packing_stats.w, packing_stats.h);

      this_face.uv_coord[q * 2 + 0] = x;
      this_face.uv_coord[q * 2 + 1] = y;
    }
  }

  // Nullify Triangulations between runs so they're not stored in the cache
  for (let i = 0; i < triangulations.length; i++) {
    triangulations[i].Nullify();
    triangulations[i].delete();
  }

  // Get the free edges that aren't on any triangulated face/surface
  openCascadeHelper.forEachEdge(shapeToUse, (edgeIndex, myEdge) => {
    const edgeHash = myEdge.HashCode(100000000);
    if (!fullShapeEdgeHashes.hasOwnProperty(edgeHash)) {
      const thisEdge = {
        vertex_coord: [],
        edge_index: -1
      };

      const aLocation = new openCascade.TopLoc_Location_1();
      const adaptorCurve = new openCascade.BRepAdaptor_Curve_2(myEdge);
      const tangDef = new openCascade.GCPnts_TangentialDeflection_2(
        adaptorCurve,
        tolerance,
        0.1,
        2,
        1.0e-9,
        1.0e-7
      );

      // write vertex buffer
      thisEdge.vertex_coord = new Array(tangDef.NbPoints() * 3);
      for (let j = 0; j < tangDef.NbPoints(); j++) {
        const vertex = tangDef.Value(j + 1).Transformed(aLocation.Transformation());
        thisEdge.vertex_coord[j * 3 + 0] = vertex.X();
        thisEdge.vertex_coord[j * 3 + 1] = vertex.Y();
        thisEdge.vertex_coord[j * 3 + 2] = vertex.Z();
      }

      thisEdge.edge_index = edgeIndex;
      fullShapeEdgeHashes[edgeHash] = edgeHash;
      edgeList.push(thisEdge);
      aLocation.delete();
      adaptorCurve.delete();
      tangDef.delete();
    }
  });

  let shellCount = 0;
  openCascadeHelper.forEachShell(shapeToUse, (shellIndex, myShell) => {
    shellCount++;
  });

  // const solidList = [];
  let eachFaceIndex = 0;
  openCascadeHelper.forEachSolid(shapeToUse, (solidIndex, mySolid) => {
    const solidUnit = {
      solid_index: solidIndex + 1,
      face_start_index: eachFaceIndex,
      face_end_index: 0
    };
    // 当实体不存在的时候，添加一个实体--个人理解shape包含一个实体
    if (!mySolid) {
      solidUnit.face_end_index = faceList.length;
      // solidList.push(solidUnit);
      solidOfFace.push(solidUnit.face_start_index);
      solidOfFace.push(solidUnit.face_end_index - 1);
      return;
    }

    solidOfFace.push(solidUnit.face_start_index);

    openCascadeHelper.forEachFace(mySolid, (solidFaceIndex, mySolidFace) => {
      eachFaceIndex++;
    });
    // 避免面的叠加重复
    solidUnit.face_end_index = eachFaceIndex - 1;
    solidOfFace.push(solidUnit.face_end_index);
    // solidList.push(solidUnit);
  });

  let vertexCount = 0;
  openCascadeHelper.forEachVertex(shapeToUse, (vertexIndex, myVertex) => {
    vertexCount++;
  });

  incrementalMeshBuilder?.delete();

  const results = {
    faceList,
    edgeList,
    // solidList,
    shellCount,
    vertexCount,
    minArea,
    maxArea,
    allFaceVertex,
    solidOfFace
  };
  return results;
}
