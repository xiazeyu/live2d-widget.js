import './lib/live2d.core.nodoc';
import {
  MatrixStack,
  Matrix44,
  ModelMatrix,
  ViewMatrix,
} from './utils/Matrix';
import {
  PlatformManager,
} from './utils/PlatformManager';
import { TargetPoint } from './lib/TargetPoint';
import { ModelManager } from './ModelManager';

function loadL2DWidget(storage){
  const newStorage = storage;
  const PFM = new PlatformManager(newStorage);
  newStorage.setPFM(PFM);
  const matrixStack = new MatrixStack();
  const live2DMgr = new ModelManager();
  let dragMgr = new TargetPoint();
  let viewMatrix = new ViewMatrix();
  let projMatrix = new Matrix44();
  let deviceToScreen = new Matrix44();
  let captureFramePromise;
  let isDrawStart = false;
  let drag = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  const ratio = newStorage.

  initEvent();

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
  return new Promise((resolve) => {
    resolve();
  });
}

export {
  loadL2DWidget,
  captureFrame,
}
