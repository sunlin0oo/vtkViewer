import * as THREE from 'three';
import { getOC } from '../index';

export var typeSpecificityEnum;
(function (typeSpecificityEnum) {
  typeSpecificityEnum[(typeSpecificityEnum.curve = 0)] = 'curve';
  typeSpecificityEnum[(typeSpecificityEnum.edge = 1)] = 'edge';
  typeSpecificityEnum[(typeSpecificityEnum.wire = 2)] = 'wire';
  typeSpecificityEnum[(typeSpecificityEnum.face = 3)] = 'face';
})(typeSpecificityEnum || (typeSpecificityEnum = {}));
export var shapeTypeEnum;
(function (shapeTypeEnum) {
  shapeTypeEnum[(shapeTypeEnum.unknown = 0)] = 'unknown';
  shapeTypeEnum[(shapeTypeEnum.vertex = 1)] = 'vertex';
  shapeTypeEnum[(shapeTypeEnum.edge = 2)] = 'edge';
  shapeTypeEnum[(shapeTypeEnum.wire = 3)] = 'wire';
  shapeTypeEnum[(shapeTypeEnum.face = 4)] = 'face';
  shapeTypeEnum[(shapeTypeEnum.shell = 5)] = 'shell';
  shapeTypeEnum[(shapeTypeEnum.solid = 6)] = 'solid';
  shapeTypeEnum[(shapeTypeEnum.compSolid = 7)] = 'compSolid';
  shapeTypeEnum[(shapeTypeEnum.compound = 8)] = 'compound';
  shapeTypeEnum[(shapeTypeEnum.shape = 9)] = 'shape';
})(shapeTypeEnum || (shapeTypeEnum = {}));

export class OpenCascadeHelper {
  constructor(vecHelper, shapesHelperServide) {
    this.vecHelper = vecHelper;
    this.shapesHelperServide = shapesHelperServide;
    this.occ = getOC();
  }

  getCornerPointsOfEdgesForShape(inputs) {
    const edges = this.getEdges(inputs);
    let points = [];
    edges.forEach((edge) => {
      const param1 = { current: 0 };
      const param2 = { current: 0 };
      const crvHandle = this.occ.BRep_Tool.Curve_2(edge, param1, param2);
      try {
        const crv = crvHandle.get();
        const pt1 = crv.Value(param1.current);
        const pt2 = crv.Value(param2.current);
        const pt1g = [pt1.X(), pt1.Y(), pt1.Z()];
        const pt2g = [pt2.X(), pt2.Y(), pt2.Z()];
        pt1.delete();
        pt2.delete();
        crv.delete();
        points.push(pt1g);
        points.push(pt2g);
      } catch (_a) {}
    });
    if (points.length > 0) {
      points = this.vecHelper.removeAllDuplicateVectors(points);
    }
    return points;
  }

  splitShapeWithShapes(inputs) {
    const listOfShapes = new this.occ.TopTools_ListOfShape_1();
    inputs.shapes.forEach((shape) => {
      listOfShapes.Append_1(shape);
    });
    const shape = this.occ.BitByBitDev.BitSplit(inputs.shape, listOfShapes);
    return shape;
  }

  makeCompound(inputs) {
    const resCompound = new this.occ.TopoDS_Compound();
    const builder = new this.occ.BRep_Builder();
    builder.MakeCompound(resCompound);
    inputs.shapes.forEach((shape) => {
      builder.Add(resCompound, shape);
    });
    builder.delete();
    return resCompound;
  }

  gpAx3(point, direction) {
    return new this.occ.gp_Ax3_4(this.gpPnt(point), this.gpDir(direction));
  }

  gpAx2(point, direction) {
    return new this.occ.gp_Ax2_3(this.gpPnt(point), this.gpDir(direction));
  }

  gpAx2FromTwoVectors(point, directionFirst, directionSecond) {
    return new this.occ.gp_Ax2_2(
      this.gpPnt(point),
      this.gpDir(directionFirst),
      this.gpDir(directionSecond)
    );
  }

  gpAx1(point, direction) {
    return new this.occ.gp_Ax1_2(this.gpPnt(point), this.gpDir(direction));
  }

  gpAx2d(point, direction) {
    const pt = this.gpPnt2d(point);
    const dir = this.gpDir2d(direction);
    return new this.occ.gp_Ax2d_2(pt, dir);
  }

  gpAx22d(point, direction1, direction2) {
    const pt = this.gpPnt2d(point);
    const dir1 = this.gpDir2d(direction1);
    const dir2 = this.gpDir2d(direction2);
    const ax = new this.occ.gp_Ax22d_2(pt, dir1, dir2);
    dir1.delete();
    dir2.delete();
    pt.delete();
    return ax;
  }

  gpPln(point, direction) {
    const gpPnt = this.gpPnt(point);
    const gpDir = this.gpDir(direction);
    const pln = new this.occ.gp_Pln_3(gpPnt, gpDir);
    gpPnt.delete();
    gpDir.delete();
    return pln;
  }

  gpPnt2d(point) {
    return new this.occ.gp_Pnt2d_3(point[0], point[1]);
  }

  gpPnt(point) {
    return new this.occ.gp_Pnt_3(point[0], point[1], point[2]);
  }

  gpVec(vec) {
    return new this.occ.gp_Vec_4(vec[0], vec[1], vec[2]);
  }

  gpXYZ(point) {
    return new this.occ.gp_XYZ_2(point[0], point[1], point[2]);
  }

  gpVec2d(vec) {
    return new this.occ.gp_Vec2d_4(vec[0], vec[1]);
  }

  gpDir(direction) {
    return new this.occ.gp_Dir_4(direction[0], direction[1], direction[2]);
  }

  gpDir2d(direction) {
    return new this.occ.gp_Dir2d_4(direction[0], direction[1]);
  }

  gcMakeCircle(center, direction, radius) {
    const circle = new this.occ.GC_MakeCircle_2(this.gpAx2(center, direction), radius);
    const cirVal = circle.Value();
    const cir = cirVal.get();
    circle.delete();
    return cir;
  }

  gcMakeEllipse(center, direction, minorRadius, majorRadius) {
    const ax = this.gpAx2(center, direction);
    const ellipse = new this.occ.GC_MakeEllipse_2(ax, majorRadius, minorRadius);
    if (ellipse.IsDone()) {
      const ellipseVal = ellipse.Value();
      const ell = ellipseVal.get();
      ellipse.delete();
      ax.delete();
      return ell;
    }
    throw new Error('Ellipse could not be created.');
  }

  bRepBuilderAPIMakeEdge(curve) {
    const crv = this.castToHandleGeomCurve(curve);
    const edge = new this.occ.BRepBuilderAPI_MakeEdge_24(crv);
    const ed = edge.Edge();
    edge.delete();
    crv.delete();
    return ed;
  }

  bRepBuilderAPIMakeWire(edge) {
    const wire = new this.occ.BRepBuilderAPI_MakeWire_2(edge);
    const w = wire.Wire();
    wire.delete();
    return w;
  }

  makeVertex(pt) {
    const gpPnt = this.gpPnt(pt);
    const vert = new this.occ.BRepBuilderAPI_MakeVertex(gpPnt);
    const vrt = vert.Vertex();
    gpPnt.delete();
    vert.delete();
    return vrt;
  }

  bRepBuilderAPIMakeShell(face) {
    const srf = this.occ.BRep_Tool.Surface_2(face);
    const makeShell = new this.occ.BRepBuilderAPI_MakeShell_2(srf, false);
    const shell = makeShell.Shell();
    makeShell.delete();
    srf.delete();
    return shell;
  }

  bRepBuilderAPIMakeFaceFromWire(wire, planar) {
    const faceMaker = new this.occ.BRepBuilderAPI_MakeFace_15(wire, planar);
    const face = faceMaker.Face();
    faceMaker.delete();
    return face;
  }

  bRepBuilderAPIMakeFaceFromSurface(surface, tolDegen) {
    const hs = new this.occ.Handle_Geom_Surface_2(surface);
    const faceMaker = new this.occ.BRepBuilderAPI_MakeFace_8(hs, tolDegen);
    const face = faceMaker.Face();
    faceMaker.delete();
    hs.delete();
    return face;
  }

  bRepBuilderAPIMakeFaceFromSurfaceAndWire(surface, wire, inside) {
    const hs = new this.occ.Handle_Geom_Surface_2(surface);
    const faceMaker = new this.occ.BRepBuilderAPI_MakeFace_21(hs, wire, inside);
    const face = faceMaker.Face();
    faceMaker.delete();
    hs.delete();
    return face;
  }

  bRepPrimAPIMakeSphere(center, direction, radius) {
    const ax = this.gpAx2(center, direction);
    const sphereMaker = new this.occ.BRepPrimAPI_MakeSphere_9(ax, radius);
    const sphere = sphereMaker.Shape();
    sphereMaker.delete();
    ax.delete();
    return sphere;
  }

  closestPointsBetweenTwoShapes(shape1, shape2) {
    const messageProgress = new this.occ.Message_ProgressRange_1();
    const extrema = new this.occ.BRepExtrema_DistShapeShape_2(
      shape1,
      shape2,
      this.occ.Extrema_ExtFlag.Extrema_ExtFlag_MIN,
      this.occ.Extrema_ExtAlgo.Extrema_ExtAlgo_Grad,
      messageProgress
    );
    const messageProgress1 = new this.occ.Message_ProgressRange_1();
    extrema.Perform(messageProgress1);
    if (extrema.IsDone() && extrema.NbSolution() > 0) {
      const closestPoint1 = extrema.PointOnShape1(1);
      const closestPoint2 = extrema.PointOnShape2(1);
      return [
        [closestPoint1.X(), closestPoint1.Y(), closestPoint1.Z()],
        [closestPoint2.X(), closestPoint2.Y(), closestPoint2.Z()]
      ];
    }
    throw new Error('Closest points could not be found.');
  }

  bRepPrimAPIMakeCylinder(center, direction, radius, height) {
    const ax = this.gpAx2(center, direction);
    const cylinderMaker = new this.occ.BRepPrimAPI_MakeCylinder_3(ax, radius, height);
    const cylinder = cylinderMaker.Shape();
    cylinderMaker.delete();
    ax.delete();
    return cylinder;
  }

  bRepPrimAPIMakeCylinderBetweenPoints(start, end, radius) {
    const center = this.gpPnt(start);
    const pt = this.gpPnt(end);
    const vec = new this.occ.gp_Vec_5(center, pt);
    const distance = vec.Magnitude();
    const ax = this.gpAx2(start, [vec.X(), vec.Y(), vec.Z()]);
    const cylinderMaker = new this.occ.BRepPrimAPI_MakeCylinder_3(ax, radius, distance);
    const cylinder = cylinderMaker.Shape();
    cylinderMaker.delete();
    ax.delete();
    center.delete();
    pt.delete();
    vec.delete();
    return cylinder;
  }

  bRepPrimAPIMakeBox(width, length, height, center) {
    const pt = this.gpPnt([
      -width / 2 + center[0],
      -height / 2 + center[1],
      -length / 2 + center[2]
    ]);
    const boxMaker = new this.occ.BRepPrimAPI_MakeBox_3(pt, width, height, length);
    const box = boxMaker.Shape();
    boxMaker.delete();
    pt.delete();
    return box;
  }

  getEdges(inputs) {
    if (
      !inputs.shape ||
      this.getShapeTypeEnum(inputs.shape) < shapeTypeEnum.wire ||
      inputs.shape.IsNull()
    ) {
      throw new Error('Shape is not provided or is of incorrect type');
    }
    const edges = [];
    this.forEachEdge(inputs.shape, (i, edge) => {
      edges.push(edge);
    });
    return edges;
  }

  lineEdge(inputs) {
    const gpPnt1 = this.gpPnt(inputs.start);
    const gpPnt2 = this.gpPnt(inputs.end);
    const segment = new this.occ.GC_MakeSegment_1(gpPnt1, gpPnt2);
    const segVal = segment.Value();
    const seg = segVal.get();
    const hcurve = new this.occ.Handle_Geom_Curve_2(seg);
    const edgeMaker = new this.occ.BRepBuilderAPI_MakeEdge_24(hcurve);
    const edge = edgeMaker.Edge();
    edgeMaker.delete();
    hcurve.delete();
    gpPnt1.delete();
    gpPnt2.delete();
    segVal.delete();
    seg.delete();
    return edge;
  }

  getEdgeLength(inputs) {
    const edge = inputs.shape;
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.LinearProperties(edge, gprops, false, false);
    const mass = gprops.Mass();
    gprops.delete();
    return mass;
  }

  getEdgesLengths(inputs) {
    return inputs.shapes.map((edge) => this.getEdgeLength({ shape: edge }));
  }

  getEdgeCenterOfMass(inputs) {
    const edge = inputs.shape;
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.LinearProperties(edge, gprops, false, false);
    const gppnt = gprops.CentreOfMass();
    const pt = [gppnt.X(), gppnt.Y(), gppnt.Z()];
    gprops.delete();
    return pt;
  }

  getEdgesCentersOfMass(inputs) {
    return inputs.shapes.map((edge) => this.getEdgeCenterOfMass({ shape: edge }));
  }

  getWireLength(inputs) {
    const edges = this.getEdges(inputs);
    const lengths = edges.map((edge) => this.getEdgeLength({ shape: edge }));
    return lengths.reduce((p, c) => p + c, 0);
  }

  getWiresLengths(inputs) {
    return inputs.shapes.map((wire) => this.getWireLength({ shape: wire }));
  }

  getFaces(inputs) {
    const faces = [];
    this.forEachFace(inputs.shape, (faceIndex, myFace) => {
      faces.push(myFace);
    });
    return faces;
  }

  getFaceArea(inputs) {
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.SurfaceProperties_1(inputs.shape, gprops, false, false);
    const area = gprops.Mass();
    gprops.delete();
    return area;
  }

  getFacesAreas(inputs) {
    return inputs.shapes.map((face) => this.getFaceArea({ shape: face }));
  }

  getFaceCenterOfMass(inputs) {
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.SurfaceProperties_1(inputs.shape, gprops, false, false);
    const gppnt = gprops.CentreOfMass();
    const pt = [gppnt.X(), gppnt.Y(), gppnt.Z()];
    gprops.delete();
    gppnt.delete();
    return pt;
  }

  getFacesCentersOfMass(inputs) {
    return inputs.shapes.map((face) => this.getFaceCenterOfMass({ shape: face }));
  }

  getSolidVolume(inputs) {
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.VolumeProperties_1(inputs.shape, gprops, true, false, false);
    const vol = gprops.Mass();
    gprops.delete();
    return vol;
  }

  getShellSurfaceArea(inputs) {
    const faces = this.getFaces(inputs);
    const faceAreas = this.getFacesAreas({ shapes: faces });
    return faceAreas.reduce((p, c) => p + c, 0);
  }

  getSolidSurfaceArea(inputs) {
    const faces = this.getFaces(inputs);
    const faceAreas = this.getFacesAreas({ shapes: faces });
    return faceAreas.reduce((p, c) => p + c, 0);
  }

  getSolidsVolumes(inputs) {
    return inputs.shapes.map((s) => this.getSolidVolume({ shape: s }));
  }

  getSolidCenterOfMass(inputs) {
    const gprops = new this.occ.GProp_GProps_1();
    this.occ.BRepGProp.VolumeProperties_1(inputs.shape, gprops, true, false, false);
    const gppnt = gprops.CentreOfMass();
    const pt = [gppnt.X(), gppnt.Y(), gppnt.Z()];
    gprops.delete();
    gppnt.delete();
    return pt;
  }

  getSolidsCentersOfMass(inputs) {
    return inputs.shapes.map((s) => this.getSolidCenterOfMass({ shape: s }));
  }

  castToHandleGeomCurve(curve) {
    return new this.occ.Handle_Geom_Curve_2(curve);
  }

  getActualTypeOfShape(shape) {
    let result = shape;
    if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_EDGE) {
      result = this.occ.TopoDS.Edge_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_WIRE) {
      result = this.occ.TopoDS.Wire_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_VERTEX) {
      result = this.occ.TopoDS.Vertex_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_SOLID) {
      result = this.occ.TopoDS.Solid_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_SHELL) {
      result = this.occ.TopoDS.Shell_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_FACE) {
      result = this.occ.TopoDS.Face_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_COMPSOLID) {
      result = this.occ.TopoDS.CompSolid_1(shape);
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_COMPOUND) {
      result = this.occ.TopoDS.Compound_1(shape);
    } else {
      result = shape;
    }
    return result;
  }

  getShapeTypeEnum(shape) {
    let result = shapeTypeEnum.unknown;
    if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_EDGE) {
      result = shapeTypeEnum.edge;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_WIRE) {
      result = shapeTypeEnum.wire;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_VERTEX) {
      result = shapeTypeEnum.vertex;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_SOLID) {
      result = shapeTypeEnum.solid;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_SHELL) {
      result = shapeTypeEnum.shell;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_FACE) {
      result = shapeTypeEnum.face;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_COMPSOLID) {
      result = shapeTypeEnum.compSolid;
    } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_COMPOUND) {
      result = shapeTypeEnum.compound;
    } else {
      result = shapeTypeEnum.shape;
    }
    return result;
  }

  createCircle(radius, center, direction, type) {
    const circle = this.gcMakeCircle(center, direction, radius);
    if (type === typeSpecificityEnum.curve) {
      return circle;
    }
    const edge = this.bRepBuilderAPIMakeEdge(circle);
    if (type === typeSpecificityEnum.edge) {
      return edge;
    }
    const circleWire = this.bRepBuilderAPIMakeWire(edge);
    if (type === typeSpecificityEnum.wire) {
      edge.delete();
      return circleWire;
    }
    if (type === typeSpecificityEnum.face) {
      const face = this.bRepBuilderAPIMakeFaceFromWire(circleWire, true);
      return face;
    }

    return circle;
  }

  createEllipse(minorRadius, majorRadius, center, direction, type) {
    const ellipse = this.gcMakeEllipse(center, direction, minorRadius, majorRadius);
    if (type === typeSpecificityEnum.curve) {
      return ellipse;
    }
    const edge = this.bRepBuilderAPIMakeEdge(ellipse);
    if (type === typeSpecificityEnum.edge) {
      return edge;
    }
    const ellipseWire = this.bRepBuilderAPIMakeWire(edge);
    if (type === typeSpecificityEnum.wire) {
      edge.delete();
      return ellipseWire;
    }
    if (type === typeSpecificityEnum.face) {
      const face = this.bRepBuilderAPIMakeFaceFromWire(ellipseWire, true);
      return face;
    }

    return ellipse;
  }

  createSquareFace(inputs) {
    const squareWire = this.createSquareWire(inputs);
    const faceMakerFromWire = this.bRepBuilderAPIMakeFaceFromWire(squareWire, true);
    squareWire.delete();
    return faceMakerFromWire;
  }

  createRectangleFace(inputs) {
    const rectangleWire = this.createRectangleWire(inputs);
    const faceMakerFromWire = this.bRepBuilderAPIMakeFaceFromWire(rectangleWire, true);
    rectangleWire.delete();
    return faceMakerFromWire;
  }

  createRectangleWire(inputs) {
    const cw = inputs.width / 2;
    const cl = inputs.length / 2;
    const pt1 = [cw, 0, cl];
    const pt2 = [-cw, 0, cl];
    const pt3 = [-cw, 0, -cl];
    const pt4 = [cw, 0, -cl];
    const points = [pt1, pt2, pt3, pt4];
    const wire = this.createPolygonWire({ points });
    const alignedWire = this.alignAndTranslateShape({
      shape: wire,
      direction: inputs.direction,
      center: inputs.center
    });
    wire.delete();
    return alignedWire;
  }

  alignAndTranslateShape(inputs) {
    const alignedWire = this.align({
      shape: inputs.shape,
      fromOrigin: [0, 0, 0],
      fromDirection: [0, 1, 0],
      toOrigin: [0, 0, 0],
      toDirection: inputs.direction
    });
    const translatedWire = this.translate({
      shape: alignedWire,
      translation: inputs.center
    });
    alignedWire.delete();
    return translatedWire;
  }

  createSquareWire(inputs) {
    return this.createRectangleWire({
      width: inputs.size,
      length: inputs.size,
      center: inputs.center,
      direction: inputs.direction
    });
  }

  createStarWire(inputs) {
    const lines = this.shapesHelperServide.starLines(
      inputs.innerRadius,
      inputs.outerRadius,
      inputs.numRays,
      inputs.half
    );
    const edges = [];
    lines.forEach((line) => {
      edges.push(this.lineEdge(line));
    });
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: edges });
    const alignedWire = this.alignAndTranslateShape({
      shape: wire,
      direction: inputs.direction,
      center: inputs.center
    });
    wire.delete();
    return alignedWire;
  }

  createParallelogramWire(inputs) {
    const lines = this.shapesHelperServide.parallelogram(
      inputs.width,
      inputs.height,
      inputs.angle,
      inputs.aroundCenter
    );
    const edges = [];
    lines.forEach((line) => {
      edges.push(this.lineEdge(line));
    });
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: edges });
    const aligned = this.alignAndTranslateShape({
      shape: wire,
      direction: inputs.direction,
      center: inputs.center
    });
    wire.delete();
    return aligned;
  }

  createPolygonWire(inputs) {
    const gpPoints = [];
    for (let ind = 0; ind < inputs.points.length; ind++) {
      gpPoints.push(this.gpPnt(inputs.points[ind]));
    }
    const wireMaker = new this.occ.BRepBuilderAPI_MakeWire_1();
    for (let ind = 0; ind < inputs.points.length - 1; ind++) {
      const pt1 = gpPoints[ind];
      const pt2 = gpPoints[ind + 1];
      const innerWire = this.makeWireBetweenTwoPoints(pt1, pt2);
      wireMaker.Add_2(innerWire);
    }
    const pt1 = gpPoints[inputs.points.length - 1];
    const pt2 = gpPoints[0];
    const innerWire2 = this.makeWireBetweenTwoPoints(pt1, pt2);
    wireMaker.Add_2(innerWire2);
    const wire = wireMaker.Wire();
    wireMaker.delete();
    return wire;
  }

  makeWireBetweenTwoPoints(pt1, pt2) {
    const seg = new this.occ.GC_MakeSegment_1(pt1, pt2);
    const segVal = seg.Value();
    const segment = segVal.get();
    const edgeMaker = new this.occ.BRepBuilderAPI_MakeEdge_24(
      new this.occ.Handle_Geom_Curve_2(segment)
    );
    const edge = edgeMaker.Edge();
    const wireMaker = new this.occ.BRepBuilderAPI_MakeWire_2(edge);
    const innerWire = wireMaker.Wire();
    edgeMaker.delete();
    seg.delete();
    segVal.delete();
    segment.delete();
    edge.delete();
    wireMaker.delete();
    return innerWire;
  }

  divideEdgeByParamsToPoints(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    return this.divideWireByParamsToPoints({ ...inputs, shape: wire });
  }

  divideEdgeByEqualDistanceToPoints(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    return this.divideWireByEqualDistanceToPoints({ ...inputs, shape: wire });
  }

  pointOnEdgeAtParam(inputs) {
    const edge = inputs.shape;
    const { uMin, uMax } = this.getEdgeBounds(edge);
    const curve = this.getGeomCurveFromEdge(edge, uMin, uMax);
    const gpPnt = this.gpPnt([0, 0, 0]);
    const param = this.remap(inputs.param, 0, 1, uMin, uMax);
    curve.D0(param, gpPnt);
    const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
    gpPnt.delete();
    return pt;
  }

  tangentOnEdgeAtParam(inputs) {
    const edge = inputs.shape;
    const { uMin, uMax } = this.getEdgeBounds(edge);
    const curve = this.getGeomCurveFromEdge(edge, uMin, uMax);
    const param = this.remap(inputs.param, 0, 1, uMin, uMax);
    const vec = curve.DN(param, 1);
    const vector = [vec.X(), vec.Y(), vec.Z()];
    vec.delete();
    return vector;
  }

  pointOnEdgeAtLength(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    const pt = this.pointOnWireAtLength({ ...inputs, shape: wire });
    wire.delete();
    return pt;
  }

  tangentOnEdgeAtLength(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    const tangent = this.tangentOnWireAtLength({ ...inputs, shape: wire });
    wire.delete();
    return tangent;
  }

  divideWireByParamsToPoints(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const points = this.divideCurveToNrSegments(
      { ...inputs, shape: curve },
      curve.FirstParameter(),
      curve.LastParameter()
    );
    curve.delete();
    return points;
  }

  divideWireByEqualDistanceToPoints(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const points = this.divideCurveByEqualLengthDistance({ ...inputs, shape: curve });
    curve.delete();
    return points;
  }

  pointOnWireAtParam(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const pt = this.pointOnCurveAtParam({ ...inputs, shape: curve });
    curve.delete();
    return pt;
  }

  tangentOnWireAtParam(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const tangent = this.tangentOnCurveAtParam({ ...inputs, shape: curve });
    curve.delete();
    return tangent;
  }

  pointOnWireAtLength(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const absc = new this.occ.GCPnts_AbscissaPoint_2(curve, inputs.length, curve.FirstParameter());
    const param = absc.Parameter();
    const gpPnt = this.gpPnt([0, 0, 0]);
    curve.D0(param, gpPnt);
    const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
    curve.delete();
    absc.delete();
    gpPnt.delete();
    return pt;
  }

  tangentOnWireAtLength(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const absc = new this.occ.GCPnts_AbscissaPoint_2(curve, inputs.length, curve.FirstParameter());
    const param = absc.Parameter();
    const tanVec = curve.DN(param, 1);
    const pt = [tanVec.X(), tanVec.Y(), tanVec.Z()];
    curve.delete();
    absc.delete();
    tanVec.delete();
    return pt;
  }

  pointOnCurveAtParam(inputs) {
    const curve = inputs.shape;
    const gpPnt = this.gpPnt([0, 0, 0]);
    const param = this.remap(inputs.param, 0, 1, curve.FirstParameter(), curve.LastParameter());
    curve.D0(param, gpPnt);
    const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
    gpPnt.delete();
    return pt;
  }

  tangentOnCurveAtParam(inputs) {
    const curve = inputs.shape;
    const param = this.remap(inputs.param, 0, 1, curve.FirstParameter(), curve.LastParameter());
    const vec = curve.DN(param, 1);
    const pt = [vec.X(), vec.Y(), vec.Z()];
    vec.delete();
    return pt;
  }

  divideCurveByEqualLengthDistance(inputs) {
    const curve = inputs.shape;
    const curveLength = this.occ.GCPnts_AbscissaPoint.Length_5(
      curve,
      curve.FirstParameter(),
      curve.LastParameter()
    );
    const step = curveLength / inputs.nrOfDivisions;
    const lengths = [];
    for (let i = 0; i <= curveLength + 0.000000001; i += step) {
      lengths.push(i);
    }
    if (inputs.removeStartPoint) {
      lengths.shift();
    }
    if (inputs.removeEndPoint) {
      lengths.pop();
    }
    const paramsLength = lengths.map((l) => {
      const absc = new this.occ.GCPnts_AbscissaPoint_2(curve, l, curve.FirstParameter());
      const param = absc.Parameter();
      absc.delete();
      return param;
    });
    const points = paramsLength.map((r) => {
      const gpPnt = this.gpPnt([0, 0, 0]);
      curve.D0(r, gpPnt);
      const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
      gpPnt.delete();
      return pt;
    });
    return points;
  }

  divideCurveToNrSegments(inputs, uMin, uMax) {
    const curve = inputs.shape;
    const ranges = [];
    for (let i = 0; i <= inputs.nrOfDivisions; i++) {
      const param = i / inputs.nrOfDivisions;
      const paramMapped = this.remap(param, 0, 1, uMin, uMax);
      ranges.push(paramMapped);
    }
    if (inputs.removeStartPoint) {
      ranges.shift();
    }
    if (inputs.removeEndPoint) {
      ranges.pop();
    }
    const points = ranges.map((r) => {
      const gpPnt = this.gpPnt([0, 0, 0]);
      curve.D0(r, gpPnt);
      const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
      gpPnt.delete();
      return pt;
    });
    return points;
  }

  interpolatePoints(inputs) {
    const ptList = new this.occ.TColgp_Array1OfPnt_2(1, inputs.points.length);
    const gpPnts = [];
    for (let pIndex = 1; pIndex <= inputs.points.length; pIndex++) {
      const gpPnt = this.gpPnt(inputs.points[pIndex - 1]);
      gpPnts.push(gpPnt);
      ptList.SetValue(pIndex, gpPnt);
    }
    const geomBSplineHandle = this.occ.BitByBitDev.BitInterpolate(
      ptList,
      inputs.periodic,
      inputs.tolerance
    );
    const geomBSpline = geomBSplineHandle.get();
    const geomCrvHandle = new this.occ.Handle_Geom_Curve_2(geomBSpline);
    const edgeMaker = new this.occ.BRepBuilderAPI_MakeEdge_24(geomCrvHandle);
    const edge = edgeMaker.Edge();
    const wireMaker = new this.occ.BRepBuilderAPI_MakeWire_2(edge);
    const wire = wireMaker.Wire();
    geomBSplineHandle.delete();
    geomCrvHandle.delete();
    edgeMaker.delete();
    edge.delete();
    wireMaker.delete();
    ptList.delete();
    gpPnts.forEach((p) => p.delete());
    return wire;
  }

  getNumSolidsInCompound(shape) {
    if (
      !shape ||
      shape.ShapeType() > this.occ.TopAbs_ShapeEnum.TopAbs_COMPSOLID ||
      shape.IsNull()
    ) {
      console.error('Not a compound shape!');
      return shape;
    }
    let solidsFound = 0;
    this.forEachSolid(shape, (i, s) => {
      solidsFound++;
    });
    return solidsFound;
  }

  getSolidFromCompound(shape, index) {
    if (
      !shape ||
      shape.ShapeType() > this.occ.TopAbs_ShapeEnum.TopAbs_COMPSOLID ||
      shape.IsNull()
    ) {
      console.error('Not a compound shape!');
      return shape;
    }
    if (!index) {
      index = 0;
    }
    let innerSolid = {};
    let solidsFound = 0;
    this.forEachSolid(shape, (i, s) => {
      if (i === index) {
        innerSolid = this.occ.TopoDS.Solid_1(s);
      }
      solidsFound++;
    });
    if (solidsFound === 0) {
      console.error('NO SOLIDS FOUND IN SHAPE!');
      innerSolid = shape;
    }
    innerSolid.hash = shape.hash + 1;
    return innerSolid;
  }

  forEachSolid(shape, callback) {
    let solidIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_SOLID,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    anExplorer.Init(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_SOLID,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    /**
     * 根据anExplorer.More()的条件去进行判断模型是否可以进行实体的遍历
     * 因为模型能够读取证明至少是包含一个实体，故让其单独执行
     */
    if (anExplorer.More()) {
      for (; anExplorer.More(); anExplorer.Next()) {
        callback(solidIndex++, this.occ.TopoDS.Solid_2(anExplorer.Current()));
      }
    } else {
      callback(solidIndex++);
    }

    anExplorer.delete();
  }

  getWires(inputs) {
    const wires = [];
    this.forEachWire(inputs.shape, (wireIndex, myWire) => {
      wires.push(myWire);
    });
    return wires;
  }

  forEachWire(shape, callback) {
    let wireIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_WIRE,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    for (
      anExplorer.Init(
        shape,
        this.occ.TopAbs_ShapeEnum.TopAbs_WIRE,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
      );
      anExplorer.More();
      anExplorer.Next()
    ) {
      callback(wireIndex++, this.occ.TopoDS.Wire_2(anExplorer.Current()));
    }
    anExplorer.delete();
  }

  forEachEdge(shape, callback) {
    const edgeHashes = {};
    let edgeIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_EDGE,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    for (
      anExplorer.Init(
        shape,
        this.occ.TopAbs_ShapeEnum.TopAbs_EDGE,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
      );
      anExplorer.More();
      anExplorer.Next()
    ) {
      const edge = this.occ.TopoDS.Edge_1(anExplorer.Current());
      const edgeHash = edge.HashCode(100000000);
      if (!edgeHashes.hasOwnProperty(edgeHash)) {
        edgeHashes[edgeHash] = edgeIndex;
        callback(edgeIndex++, edge);
      }
    }
    anExplorer.delete();
    return edgeHashes;
  }

  forEachFace(shape, callback) {
    let faceIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_FACE,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    for (
      anExplorer.Init(
        shape,
        this.occ.TopAbs_ShapeEnum.TopAbs_FACE,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
      );
      anExplorer.More();
      anExplorer.Next()
    ) {
      callback(faceIndex++, this.occ.TopoDS.Face_1(anExplorer.Current()));
    }
    anExplorer.delete();
  }

  forEachShell(shape, callback) {
    let faceIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHELL,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    for (
      anExplorer.Init(
        shape,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHELL,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
      );
      anExplorer.More();
      anExplorer.Next()
    ) {
      callback(faceIndex++, this.occ.TopoDS.Shell_1(anExplorer.Current()));
    }
    anExplorer.delete();
  }

  forEachVertex(shape, callback) {
    let faceIndex = 0;
    const anExplorer = new this.occ.TopExp_Explorer_2(
      shape,
      this.occ.TopAbs_ShapeEnum.TopAbs_VERTEX,
      this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
    );
    for (
      anExplorer.Init(
        shape,
        this.occ.TopAbs_ShapeEnum.TopAbs_VERTEX,
        this.occ.TopAbs_ShapeEnum.TopAbs_SHAPE
      );
      anExplorer.More();
      anExplorer.Next()
    ) {
      callback(faceIndex++, this.occ.TopoDS.Vertex_1(anExplorer.Current()));
    }
    anExplorer.delete();
  }

  isArrayLike(item) {
    return (
      Array.isArray(item) ||
      (!!item &&
        typeof item === 'object' &&
        item.hasOwnProperty('length') &&
        typeof item.length === 'number' &&
        item.length > 0 &&
        item.length - 1 in item)
    );
  }

  intersection(inputs) {
    if (inputs.shapes.length < 2) {
      throw new Error('Less than 2 shapes provided for intersection');
    }
    const intersectShape = inputs.shapes[0];
    let intersectionResults = [];
    // TODO Try to make a compound so that this loop would not be needed
    for (let i = 1; i < inputs.shapes.length; i++) {
      let intersectionResult;
      const messageProgress = new this.occ.Message_ProgressRange_1();
      const intersectedCommon = new this.occ.BRepAlgoAPI_Common_3(
        intersectShape,
        inputs.shapes[i],
        messageProgress
      );
      const messageProgress2 = new this.occ.Message_ProgressRange_1();
      if (intersectedCommon.HasGenerated()) {
        intersectedCommon.Build(messageProgress2);
        intersectionResult = intersectedCommon.Shape();
        intersectionResults.push(intersectionResult);
      }
      messageProgress.delete();
      intersectedCommon.delete();
      messageProgress2.delete();
    }
    if (!inputs.keepEdges && intersectionResults.length > 0) {
      intersectionResults = intersectionResults.map((i) => {
        const fusor = new this.occ.ShapeUpgrade_UnifySameDomain_2(i, true, true, false);
        fusor.Build();
        const fusedShape = fusor.Shape();
        fusor.delete();
        return fusedShape;
      });
    }
    return intersectionResults;
  }

  combineEdgesAndWiresIntoAWire(inputs) {
    const makeWire = new this.occ.BRepBuilderAPI_MakeWire_1();
    inputs.shapes.forEach((shape) => {
      if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_EDGE) {
        makeWire.Add_1(shape);
      } else if (shape.ShapeType() === this.occ.TopAbs_ShapeEnum.TopAbs_WIRE) {
        makeWire.Add_2(shape);
      }
    });
    if (makeWire.IsDone()) {
      this.occ.BRepLib.BuildCurves3d_2(makeWire.Wire());
      const wire = makeWire.Wire();
      makeWire.delete();
      return wire;
    }
    makeWire.delete();
    let errorMessage;
    const error = makeWire.Error();
    if (error === this.occ.BRepBuilderAPI_WireError.BRepBuilderAPI_DisconnectedWire) {
      errorMessage = 'Wire is disconnected and can not be constructed';
    } else if (error === this.occ.BRepBuilderAPI_WireError.BRepBuilderAPI_EmptyWire) {
      errorMessage = 'Wire is empty and can not be constructed';
    } else if (error === this.occ.BRepBuilderAPI_WireError.BRepBuilderAPI_NonManifoldWire) {
      errorMessage = 'Wire is non manifold and can not be constructed';
    } else if (error === this.occ.BRepBuilderAPI_WireError.BRepBuilderAPI_WireDone) {
      errorMessage = 'Wire is done';
    }
    throw new Error(errorMessage);
  }

  createBSpline(inputs) {
    const ptList = new this.occ.TColgp_Array1OfPnt_2(
      1,
      inputs.points.length + (inputs.closed ? 1 : 0)
    );
    const gpPnts = [];
    for (let pIndex = 1; pIndex <= inputs.points.length; pIndex++) {
      const gpPnt = this.gpPnt(inputs.points[pIndex - 1]);
      gpPnts.push(gpPnt);
      ptList.SetValue(pIndex, gpPnt);
    }
    if (inputs.closed) {
      ptList.SetValue(inputs.points.length + 1, ptList.Value(1));
    }
    const ptsToBspline = new this.occ.GeomAPI_PointsToBSpline_2(
      ptList,
      3,
      8,
      this.occ.GeomAbs_Shape.GeomAbs_C2,
      1.0e-3
    );
    const bsplineHandle = ptsToBspline.Curve();
    const bspline = bsplineHandle.get();
    const bsplineCrv = new this.occ.Handle_Geom_Curve_2(bspline);
    const edgeMaker = new this.occ.BRepBuilderAPI_MakeEdge_24(bsplineCrv);
    const edge = edgeMaker.Edge();
    const wireMaker = new this.occ.BRepBuilderAPI_MakeWire_2(edge);
    const wire = wireMaker.Wire();
    gpPnts.forEach((p) => p.delete());
    ptList.delete();
    ptsToBspline.delete();
    bsplineHandle.delete();
    bsplineCrv.delete();
    edgeMaker.delete();
    edge.delete();
    wireMaker.delete();
    return wire;
  }

  align(inputs) {
    const transformation = new this.occ.gp_Trsf_1();
    const ax1 = this.gpAx3(inputs.fromOrigin, inputs.fromDirection);
    const ax2 = this.gpAx3(inputs.toOrigin, inputs.toDirection);
    transformation.SetDisplacement(ax1, ax2);
    const translation = new this.occ.TopLoc_Location_2(transformation);
    const moved = inputs.shape.Moved(translation, false);
    transformation.delete();
    ax1.delete();
    ax2.delete();
    const shp = this.getActualTypeOfShape(moved);
    moved.delete();
    return shp;
  }

  translate(inputs) {
    const transformation = new this.occ.gp_Trsf_1();
    const gpVec = new this.occ.gp_Vec_4(
      inputs.translation[0],
      inputs.translation[1],
      inputs.translation[2]
    );
    transformation.SetTranslation_1(gpVec);
    const translation = new this.occ.TopLoc_Location_2(transformation);
    const moved = inputs.shape.Moved(translation, false);
    const shp = this.getActualTypeOfShape(moved);
    moved.delete();
    transformation.delete();
    gpVec.delete();
    return shp;
  }

  mirror(inputs) {
    const transformation = new this.occ.gp_Trsf_1();
    const ax1 = this.gpAx1(inputs.origin, inputs.direction);
    transformation.SetMirror_2(ax1);
    const transformed = new this.occ.BRepBuilderAPI_Transform_2(inputs.shape, transformation, true);
    const transformedShape = transformed.Shape();
    const shp = this.getActualTypeOfShape(transformedShape);
    transformedShape.delete();
    transformed.delete();
    transformation.delete();
    ax1.delete();
    return shp;
  }

  mirrorAlongNormal(inputs) {
    const transformation = new this.occ.gp_Trsf_1();
    const ax = this.gpAx2(inputs.origin, inputs.normal);
    transformation.SetMirror_3(ax);
    const transformed = new this.occ.BRepBuilderAPI_Transform_2(inputs.shape, transformation, true);
    const transformedShape = transformed.Shape();
    const shp = this.getActualTypeOfShape(transformedShape);
    ax.delete();
    transformedShape.delete();
    transformed.delete();
    transformation.delete();
    return shp;
  }

  rotate(inputs) {
    let rotated;
    if (inputs.angle === 0) {
      rotated = inputs.shape;
    } else {
      const transformation = new this.occ.gp_Trsf_1();
      const pt1 = new this.occ.gp_Pnt_3(0, 0, 0);
      const gpVec = new this.occ.gp_Vec_4(inputs.axis[0], inputs.axis[1], inputs.axis[2]);
      const dir = new this.occ.gp_Dir_2(gpVec);
      const ax = new this.occ.gp_Ax1_2(pt1, dir);
      transformation.SetRotation_1(ax, inputs.angle * 0.0174533);
      const rotation = new this.occ.TopLoc_Location_2(transformation);
      rotated = inputs.shape.Moved(rotation, false);
      transformation.delete();
      pt1.delete();
      gpVec.delete();
      dir.delete();
      ax.delete();
      rotation.delete();
    }
    const actualShape = this.getActualTypeOfShape(rotated);
    if (inputs.angle !== 0) {
      rotated.delete();
    }
    return actualShape;
  }

  surfaceFromFace(inputs) {
    const face = inputs.shape;
    const surface = this.occ.BRep_Tool.Surface_2(face);
    const srf = surface.get();
    return srf;
  }

  makeEdgeFromGeom2dCurveAndSurfaceBounded(inputs, umin, umax) {
    const curve2d = new this.occ.Handle_Geom2d_Curve_2(inputs.shapes[0]);
    const surface = new this.occ.Handle_Geom_Surface_2(inputs.shapes[1]);
    const res = new this.occ.BRepBuilderAPI_MakeEdge_31(curve2d, surface, umin, umax);
    const resShape = res.Shape();
    const r = this.getActualTypeOfShape(resShape);
    resShape.delete();
    res.delete();
    return r;
  }

  makeEdgeFromGeom2dCurveAndSurface(inputs, umin, umax) {
    const curve2d = new this.occ.Handle_Geom2d_Curve_2(inputs.shapes[0]);
    const surface = new this.occ.Handle_Geom_Surface_2(inputs.shapes[1]);
    const res = new this.occ.BRepBuilderAPI_MakeEdge_30(curve2d, surface);
    const resShape = res.Shape();
    const r = this.getActualTypeOfShape(resShape);
    resShape.delete();
    res.delete();
    return r;
  }

  startPointOnEdge(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    const res = this.pointOnWireAtParam({ shape: wire, param: 0 });
    return res;
  }

  endPointOnEdge(inputs) {
    const edge = inputs.shape;
    const wire = this.combineEdgesAndWiresIntoAWire({ shapes: [edge] });
    const res = this.pointOnWireAtParam({ shape: wire, param: 1 });
    return res;
  }

  startPointOnWire(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const res = this.startPointOnCurve({ ...inputs, shape: curve });
    return res;
  }

  endPointOnWire(inputs) {
    const wire = inputs.shape;
    const curve = new this.occ.BRepAdaptor_CompCurve_2(wire, false);
    const res = this.endPointOnCurve({ ...inputs, shape: curve });
    return res;
  }

  startPointOnCurve(inputs) {
    const curve = inputs.shape;
    const gpPnt = this.gpPnt([0, 0, 0]);
    curve.D0(curve.FirstParameter(), gpPnt);
    const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
    gpPnt.delete();
    return pt;
  }

  endPointOnCurve(inputs) {
    const curve = inputs.shape;
    const gpPnt = this.gpPnt([0, 0, 0]);
    curve.D0(curve.LastParameter(), gpPnt);
    const pt = [gpPnt.X(), gpPnt.Y(), gpPnt.Z()];
    gpPnt.delete();
    return pt;
  }

  getGeomCurveFromEdge(edge, uMin, uMax) {
    const loc = edge.Location_1();
    const crvHandle = this.occ.BRep_Tool.Curve_1(edge, loc, uMin, uMax);
    const curve = crvHandle.get();
    return curve;
  }

  getEdgeBounds(edge) {
    const p1 = { current: 0 };
    const p2 = { current: 0 };
    this.occ.BRep_Tool.Range_1(edge, p1, p2);
    return { uMin: p1.current, uMax: p2.current };
  }

  getUVBounds(face) {
    const uMin = { current: 0 };
    const uMax = { current: 0 };
    const vMin = { current: 0 };
    const vMax = { current: 0 };
    this.occ.BRepTools.UVBounds_1(face, uMin, uMax, vMin, vMax);
    return {
      uMin: uMin.current,
      uMax: uMax.current,
      vMin: vMin.current,
      vMax: vMax.current
    };
  }

  remap(value, from1, to1, from2, to2) {
    return ((value - from1) / (to1 - from1)) * (to2 - from2) + from2;
  }

  lengthOfCurve(geomAdaptor, UMin, UMax, segments = 5) {
    const point1 = new THREE.Vector3();
    const point2 = new THREE.Vector3();
    let arcLength = 0;
    const gpPnt = new this.occ.gp_Pnt_1();
    for (let s = UMin; s <= UMax; s += (UMax - UMin) / segments) {
      geomAdaptor.D0(s, gpPnt);
      point1.set(gpPnt.X(), gpPnt.Y(), gpPnt.Z());
      if (s === UMin) {
        point2.copy(point1);
      } else {
        arcLength += point1.distanceTo(point2);
      }
      point2.copy(point1);
    }
    return arcLength;
  }
}
