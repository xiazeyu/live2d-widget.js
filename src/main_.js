/* global process, Live2D */

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

class _L2Dwidget{
  /**
   * Core class to load L2DWidget.
   * @param   {Storage}  storage  Storage.
   * @return  {Function}          The instance function itself.
   */
  constructor(storage){
    this.storage = storage;
    this.config = storage.config;
    this.PFM = new PlatformManager(storage);
    storage.setPFM(this.PFM);
    this.matrixStack = new MatrixStack();
    this.live2DMgr = new ModelManager();
    this.dragMgr = new TargetPoint();
    this.viewMatrix = new ViewMatrix();
    this.projMatrix = new Matrix44();
    this.deviceToScreen = new Matrix44();
    this.isDrawStart = false;
    this.frameCallback = null;
    this.framePermanentCallback = null;
    this.requretID = null;
    return this;
  }

  /**
   * Load.
   * @return  {Function}  The instance function itself.
   */
  load(){

    const ratio = this.config.displayHeight / this.config.displayWidth;
    const left = -1;
    const right = 1;
    const bottom = -ratio;
    const top = ratio;

    this.viewMatrix.setScreenRect(left, right, bottom, top);
    this.viewMatrix.setMaxScreenRect(-2, 2, -2, 2);

    this.projMatrix.multScale(1, (this.config.displayWidth / this.config.displayHeight));

    this.deviceToScreen.multTranslate(-this.config.displayWidth / 2.0, -this.config.displayHeight / 2.0);
    this.deviceToScreen.multScale(2.0 / this.config.displayWidth, -2.0 / this.config.displayHeight);

    Live2D.setGL(this.storage.getWebGL());
    this.storage.webGL.clearColor(0.0, 0.0, 0.0, 0.0);

    this.live2DMgr.create(this.storage.getWebGL(), this.config.modelJsonPath);
    this.initEvent().
    this.startDraw();

    return this.
  }

  unload(){
    this.removeEvent();
    window.cancelAnimationFrame(this.requretID);
    return this;
  }

  /**
   * Init event.
   * @return  {Function}  The instance function itself.
   */
  initEvent(){
    if(window.addEventListener){
      window.addEventListener('click', this.mouseEvent);
      // window.addEventListener('mouseup', this.mouseEvent);
      window.addEventListener('mousedown', this.mouseEvent);
      window.addEventListener('mousemove', this.mouseEvent);
      document.addEventListener('mouseleave', this.mouseEvent);
      window.addEventListener('touchstart', this.touchEvent);
      window.addEventListener('touchend', this.touchEvent);
      window.addEventListener('touchmove', this.touchEvent);
    }
    return this;
  }

  removeEvent(){
    if(window.removeEventListener){
      window.removeEventListener('click', this.mouseEvent);
      // window.removeEventListener('mouseup', this.mouseEvent);
      window.removeEventListener('mousedown', this.mouseEvent);
      window.removeEventListener('mousemove', this.mouseEvent);
      document.removeEventListener('mouseleave', this.mouseEvent);
      window.removeEventListener('touchstart', this.touchEvent);
      window.removeEventListener('touchend', this.touchEvent);
      window.removeEventListener('touchmove', this.touchEvent);
    }
    return this;
  }

  mouseEvent(event){
    // event.preventDefault();
    if(event.type === 'mousedown' || event.type === 'click'){
      this.modelTapEvent(event);
    }else if(event.type === 'mousemove'){
      this.followPointer(event);
    }else if(event.type === 'mouseleave'){
      this.lookFront();
    }
    return;
  }

  touchEvent(event){
    const touch = event.touches[0];
    if(event.type === 'touchstart'){
      if (event.touches.length === 1) this.modelTapEvent(touch);
    }else if(event.type === 'touchmove'){
      this.followPointer(touch);
    }else if(event.type === 'touchend'){
      this.lookFront();
    }
    return;
  }

  startDraw(){
    if(!this.isDrawStart){
      this.isDrawStart = true;
      this.requretID = window.requestAnimationFrame(function L2DWidgetTick(){
        this.draw();
        if(this.frameCallback){
          this.frameCallback();
          this.frameCallback = null;
        }
        if(this.framePermanentCallback){
          this.framePermanentCallback();
        }
        this.requretID = window.requestAnimationFrame(L2DWidgetTick, this.storage.canvas);
      }, this.storage.canvas);
    }
    return this;
  }

  draw(){
    this.dragMgr.update();
    this.live2DMgr.setDrag(this.dragMgr.getX(), this.dragMgr.getY());
    this.storage.canvas.clear(this.storage.canvas.COLOR_BUFFER_BIT);
    this.matrixStack.reset().
    loadIdentity().
    multMatrix(this.projMatrix.getArray()).
    multMatrix(this.viewMatrix.getArray()).
    push();
    const model = live2DMgr.get();
    if(!!!model) return;
    if(model.initialized && !model.updating){
      model.update().
      draw(this.storage.webGL);
    }
    this.matrixStack.pop();
  }

  addFrameCallback(callbackToAdd, permanent = false){
    if(permanent === false){
      if(this.frameCallback){
        const oldCallback = this.frameCallback;
        this.frameCallback = () => {
          oldCallback();
          callbackToAdd();
        }
      }else{
        this.frameCallback = callbackToAdd;
      }
    }else{
      if(this.framePermanentCallback){
        const oldCallback = this.framePermanentCallback;
        this.framePermanentCallback = () => {
          oldCallback();
          callbackToAdd();
        }
      }else{
        this.framePermanentCallback = callbackToAdd;
      }
    }
    return this;
  }

  modelScaling(scale){
    this.viewMatrix.adjustScale(0, 0, scale);
    return this;
  }

  dot(A, B){
    return A.x * B.x + A.y * B.y;
  }

  angle(lenX, lenY){
    return Math.acos(this.dot({
      'x': 0,
      'y': 1,
    }, normalize(lenX, lenY))) * 180 / Math.PI;
  }

  normalize(x, y){
    const length = Math.sqrt(x * x + y * y);
    return {
      'x': x / length,
      'y': y / length,
    };
  }

  transformRange(center, transform, range){
    const a = {
      'x': transform.x - center.x,
      'y': transform.y - center.y,
    };
    const r = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    if(r > range){
      return {
        'x': a.x / r * range + center.x,
        'y': a.y / r * range + center.y,
      };
    }else{
      return transform;
    }
  }

  transformRect(center, transform, rect){
    if(transform.x < rect.left + rect.width &&
      transform.y < rect.top + rect.height &&
      transform.x > rect.left &&
      transform.y > rect.top) return transform;

    const lenX = center.x - transform.x;
    const lenY = center.y - transform.y;

    let angleTarget = angle(lenX, lenY);
    if(transform.x < center.x) angleTarget = 360 - angleTarget;
    const angleLeftTop = 360 - angle(rect.left - center.x, (rect.top - center.y) * -1);
    const angleLeftBottom = 360 - angle(rect.left - center.x, (rect.top + rect.height - center.y) * -1);
    const angleRightTop = angle(rect.left + rect.width - center.x, (rect.top - center.y) * -1);
    const angleRightBottom = angle(rect.left + rect.width - center.x, (rect.top + rect.height - center.y) * -1);
    const scale = lenY / lenX;
    if(angleTarget < angleRightTop){
      const y3 = rect.top - center.y;
      const x3 = y3 / scale;
      return {
        'x': center.x + x3,
        'y': center.y + y3,
      }
    }else if(angleTarget < angleRightBottom){
      const x3 = rect.left + rect.width - center.x;
      const y3 = x3 * scale;
      return {
        'x': center.x + x3,
        'y': center.y + y3,
      }
    }else if(angleTarget < angleLeftBottom){
      const y3 = rect.top + rect.height - center.y;
      const x3 = y3 / scale;
      return {
        'x': center.x + x3,
        'y': center.y + y3,
      }
    }else if(angleTarget < angleLeftTop){
      const x3 = center.x - rect.left;
      const y3 = x3 * scale;
      return {
        'x': center.x - x3,
        'y': center.y - y3,
      }
    }else{
      const y3 = rect.top - center.y;
      const x3 = y3 / scale;
      return {
        'x': center.x + x3,
        'y': center.y + y3,
      }
    }
  }

  transformViewX(deviceX){
    const screenX = this.deviceToScreen.transformX(deviceX);
    return this.viewMatrix.invertTransformX(screenX);
  }

  transformViewY(deviceY){
    const screenY = this.deviceToScreen.transformY(deviceY);
    return this.viewMatrix.invertTransformX(screenY);
  }

  transformScreenX(deviceX){
    return this.deviceToScreen.transformX(deviceX);
  }

  transformScreenY(deviceY){
    return this.deviceToScreen.transformY(deviceY);
  }

  lookFront(){
    dragMgr.setPoint(0, 0);
    return this;
  }

  modelTapEvent(event){
    this.followPointer(event);
    this.live2DMgr.tapEvent(vx, vy);
    return this;
  }

  followPointer(event){

    const rect = this.storage.getBoundingClientRect();
    const sx = this.transformScreenX(event.clientX - rect.left);
    const sy = this.transformScreenY(event.clientY - rect.top);
    const target = transformRect({
      'x': rect.left + rect.width / 2,
      'y': rect.top + rect.height, // * headPos
    }, {
      'x': event.clientX,
      'y': event.clientY,
    }, rect);
    const vx = this.transformViewX(target.x - rect.left);
    const vy = this.transformViewY(target.y - rect.top);
    if(this.storage.config.devMouseLog){
      console.log(`live2d-widget: followPointer(${event}), device(${event.clientX}, ${event.clientY}), view(${vx}, ${vy});`);
    }
    this.dragMgr.setPoint(vx, vy);
    return this;
  }

}

if (process.env.NODE_ENV === 'development') {

  window._L2Dwidget = _L2Dwidget;

}

export {
  _L2Dwidget,
};
