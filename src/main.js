import './lib/live2d.core.nodoc';
import {
  MatrixStack,
  Matrix44,
  ModelMatrix,
  ViewMatrix,
} from './utils/Matrix';
// import {
//   PlatformManager,
// } from './PlatformManager';
// import { L2DTargetPoint } from './lib/TargetPoint';
// import { ModelManager } from './ModelManager';

function loadL2DWidget(storage){
  const newStorage = storage;
  const matrixStack = new MatrixStack();
  return {
    newStorage,
  };
}

function unloadL2DWidget(storage){
  const newStorage = storage;
  const matrixStack = new MatrixStack();
  return {
    newStorage,
  };
}

function captureFrame({ type, encoderOptions, }){
  console.log(callback, type, encoderOptions);
  return new Promise((resolve) => {
    resolve();
  });
}

export {
  loadL2DWidget,
  captureFrame,
}
