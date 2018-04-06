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

function loadL2DWidget({ webGL, config, pfMgr }){
  const platformManager = pfMgr || new PlatformManager();
  const matrixStack = new MatrixStack();
  return {
    platformManager,
  };
}

function captureFrame(callback, { type, encoderOptions, }){
  console.log(callback, type, encoderOptions);
}

export {
  loadL2DWidget,
  captureFrame,
}
