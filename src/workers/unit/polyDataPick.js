import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData';
import { vec3 } from 'gl-matrix';
import vtkMouseCameraTrackballMultiRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballMultiRotateManipulator';
import vtkMouseCameraTrackballPanManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballPanManipulator';
import vtkMouseCameraTrackballRollManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRollManipulator';
import vtkMouseCameraTrackballRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator';
import vtkMouseCameraTrackballZoomManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomManipulator';
import vtkMouseCameraTrackballZoomToMouseManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomToMouseManipulator';
import vtkGestureCameraManipulator from '@kitware/vtk.js/Interaction/Manipulators/GestureCameraManipulator';
// ui组件控制部分 uiComponents: 分配器的名称及作用
const uiComponents = {
  leftButton: { manipName: 'Rotate' },
  middleButton: { manipName: 'Pan' },
  rightButton: { manipName: 'Zoom' },
  shiftLeftButton: { manipName: 'Roll' },
  shiftMiddleButton: { manipName: 'Rotate' },
  shiftRightButton: { manipName: 'Pan' },
  controlLeftButton: { manipName: 'Zoom' },
  controlMiddleButton: { manipName: 'Rotate' },
  controlRightButton: { manipName: 'ZoomToMouse' },
  altLeftButton: { manipName: 'Zoom' },
  altMiddleButton: { manipName: 'Rotate' },
  altRightButton: { manipName: 'ZoomToMouse' },
  scrollMiddleButton: { manipName: 'Zoom' },
  shiftScrollMiddleButton: { manipName: 'None' },
  controlScrollMiddleButton: { manipName: 'None' },
  altScrollMiddleButton: { manipName: 'None' }
};
// 建伟索引
const selectMap = {
  leftButton: { button: 1 },
  middleButton: { button: 2 },
  rightButton: { button: 3 },
  shiftLeftButton: { button: 1, shift: true },
  shiftMiddleButton: { button: 2, shift: true },
  shiftRightButton: { button: 3, shift: true },
  controlLeftButton: { button: 1, control: true },
  controlMiddleButton: { button: 2, control: true },
  controlRightButton: { button: 3, control: true },
  altLeftButton: { button: 1, alt: true },
  altMiddleButton: { button: 2, alt: true },
  altRightButton: { button: 3, alt: true },
  scrollMiddleButton: { scrollEnabled: true, dragEnabled: false },
  shiftScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    shift: true
  },
  controlScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    control: true
  },
  altScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    alt: true
  }
};

const manipulatorFactory = {
  None: null,
  Pan: vtkMouseCameraTrackballPanManipulator,
  Zoom: vtkMouseCameraTrackballZoomManipulator,
  Roll: vtkMouseCameraTrackballRollManipulator,
  Rotate: vtkMouseCameraTrackballRotateManipulator,
  MultiRotate: vtkMouseCameraTrackballMultiRotateManipulator,
  ZoomToMouse: vtkMouseCameraTrackballZoomToMouseManipulator
};

// 面和体的渲染代码
const renderFandS = (
  pickCellArr,
  cellValues,
  pointValues,
  mapper,
  actor,
  renderer,
  renderWindow
) => {
  const pickerCellLen = pickCellArr.length;
  const renderPoly = new Uint32Array(pickerCellLen * 4);
  // 几何结构固定，改变拓扑结构
  pickCellArr.forEach((item, index) => {
    renderPoly[index * 4] = 3;
    renderPoly[index * 4 + 1] = cellValues[item * 4 + 1];
    renderPoly[index * 4 + 2] = cellValues[item * 4 + 2];
    renderPoly[index * 4 + 3] = cellValues[item * 4 + 3];
  });
  // 将Cell输入导入到Polys中作为拓扑结构
  const polydata = vtkPolyData.newInstance();
  polydata.getPoints().setData(pointValues, 3);
  polydata.getPolys().setData(renderPoly);
  // 写入着色面片数据
  mapper.setInputData(polydata);
  actor.setMapper(mapper);
  // 渲染
  renderer.addActor(actor);
  renderWindow.render();
};

/**
 * 判断覆盖的面数组
 */
function getCoverFaceArray(
  startPoint,
  endPoint,
  faceList,
  curCanvasClientWidth,
  curCanvasClientHeight,
  view,
  renderer
) {
  const dims = view.getViewportSize(renderer);
  const aspect = dims[0] / dims[1]; // 宽高比
  // console.log('renderer', renderer);
  // console.log('view', view);

  // 遍历每个面
  const faceIndexArray = [];
  faceList.forEach((faceUnit) => {
    const vertexArray = getVertexArray(faceUnit.vertex_coord, view, aspect, renderer);
    // 面中所有的三维顶点坐标
    if (
      vertexArrayWithinArea(
        vertexArray,
        startPoint,
        endPoint,
        curCanvasClientWidth,
        curCanvasClientHeight,
        view
      )
    ) {
      faceIndexArray.push(faceUnit.face_index);
    }
  });

  return faceIndexArray;
}

/**
 * 判断数组元素，唯一元素添加到数组里
 */
function pushUniqArray(arrAll, arrAdded) {
  if (!arrAll || !arrAdded) {
    return;
  }
  const len = arrAdded.length;
  for (let i = 0; i < len; i++) {
    const element = arrAdded[i];
    if (arrAll.indexOf(element) < 0) {
      arrAll.push(element);
    }
  }
}

/**
 * 一维坐标数组转化为三维坐标点数组
 */
function getVertexArray(oneVertArray, view, aspect, renderer) {
  const pointArray = [];
  let point;
  const len = oneVertArray.length / 3;

  // console.log('oneVertArray', oneVertArray);
  for (let m = 0; m < len; m++) {
    point = vec3.create();
    pointArray.push(point);
    // Convert the Modelcoordinates into Projection coordinates.
    const viewCoords = renderer.worldToView(
      oneVertArray[m * 3 + 0],
      oneVertArray[m * 3 + 1],
      oneVertArray[m * 3 + 2]
    );

    const projectionCoords = renderer.viewToProjection(
      viewCoords[0],
      viewCoords[1],
      viewCoords[2],
      aspect
    );
    const [point1, point2, point3] = projectionCoords;
    point[0] = point1;
    point[1] = point2;
    point[2] = point3;
  }
  // console.log('pointArray', pointArray);

  return pointArray;
}

/**
 * 判断顶点是否都在区域里
 */
function vertexArrayWithinArea(
  vertexArray,
  startPoint,
  endPoint,
  curCanvasClientWidth,
  curCanvasClientHeight,
  view
) {
  if (!vertexArray || !startPoint || !endPoint) {
    return false;
  }
  // curCanvasClientWidth 左下角坐标系
  // 获取画布中心
  const centerX = curCanvasClientWidth / 2;
  const centerY = curCanvasClientHeight / 2;
  const len = vertexArray.length;
  // 判断每个顶点是否在选择框区域范围内
  for (let m = 0; m < len; m++) {
    // 通过vertexArray[m].project(currEnv.camera) 改变原有的vector3,
    /**
         * vertexArray[m].project(currEnv.camera);
         * return 
         * this.applyMatrix4( camera.matrixWorldInverse )用于将某一世界坐标系下的坐标转换至视点（camera）坐标系下的坐标
         * .applyMatrix4( camera.projectionMatrix );用于将某一视点（camera）坐标系下的坐标转换至规范化观察体中的坐标

         * 
         * 返回的结果是世界坐标worldVector在camera相机对象矩阵变化下对应的标准设备坐标
         */
    const standardVector = vertexArray[m];
    // console.log('standardVector', standardVector);
    // 转换到屏幕坐标系中
    const screenX = Math.round(centerX * standardVector[0] + centerX);
    const screenY = Math.round(-centerY * standardVector[1] + centerY);
    // console.log('screenX', screenX);

    if (!vertexInBox2D(screenX, screenY, startPoint, endPoint)) {
      return false;
    }
  }

  return true;
}

/**
 * 3d-->2D判断顶点vertex是否在startPos和endPos约束的立方体内
 */
function vertexInBox2D(screenX, screenY, startPos, endPos) {
  if (!inRange(screenX, startPos[0], endPos[0])) {
    return false;
  }

  if (!inRange(screenY, startPos[1], endPos[1])) {
    return false;
  }

  return true;
}

/**
 * 判断x值是否在start和end之间
 */
function inRange(x, start, end) {
  const min = start < end ? start : end;
  const max = start < end ? end : start;

  return x >= min && x <= max;
}

/**
 * 重新分配器操纵器
 */
function reAssignManipulators(interactorStyle) {
  // 移除所有操纵器
  interactorStyle.removeAllMouseManipulators();
  // 遍历uiComponents key值从manipulatorFactory中进行对于操作设置
  Object.keys(uiComponents).forEach((keyName) => {
    // 获取到操纵器动作名称
    const klass = manipulatorFactory[uiComponents[keyName].manipName];
    if (klass) {
      // 建立对应操纵器动作名称的实例
      const manipulator = klass.newInstance();
      // 绑定对应操作事件
      manipulator.setButton(selectMap[keyName].button);
      manipulator.setShift(!!selectMap[keyName].shift);
      manipulator.setControl(!!selectMap[keyName].control);
      manipulator.setAlt(!!selectMap[keyName].alt);
      if (selectMap[keyName].scrollEnabled !== undefined) {
        manipulator.setScrollEnabled(selectMap[keyName].scrollEnabled);
      }
      if (selectMap[keyName].dragEnabled !== undefined) {
        manipulator.setDragEnabled(selectMap[keyName].dragEnabled);
      }
      interactorStyle.addMouseManipulator(manipulator);
    }
  });

  // Always add gesture
  interactorStyle.addGestureManipulator(vtkGestureCameraManipulator.newInstance());
}

/**
 * 绘制矩形
 */
function drawRect(ctx, startPoint, endPoint) {
  if (!ctx) {
    return;
  }

  // 配置属性
  ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;

  // 绘制透明矩形
  ctx.beginPath();

  ctx.fillRect(
    startPoint[0],
    startPoint[1],
    endPoint[0] - startPoint[0],
    endPoint[1] - startPoint[1]
  );
  ctx.strokeRect(
    startPoint[0],
    startPoint[1],
    endPoint[0] - startPoint[0],
    endPoint[1] - startPoint[1]
  );

  ctx.closePath();
}

/**
 * 获得2D位置
 */
function get2DPos(event) {
  // 获取设备坐标
  const mousePos = {
    x: 0,
    y: 0
  };
  mousePos.x = event.offsetX;
  mousePos.y = event.offsetY;

  return mousePos;
}

/**
 * 获取到信息
 */
function getData(data) {
  console.log('我获取到信息', data);
}
export {
  get2DPos,
  renderFandS,
  drawRect,
  getCoverFaceArray,
  pushUniqArray,
  getVertexArray,
  vertexArrayWithinArea,
  vertexInBox2D,
  inRange,
  reAssignManipulators,
  getData
};
