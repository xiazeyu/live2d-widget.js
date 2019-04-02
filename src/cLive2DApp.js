/**
 * @description The main part of live2d-widget
 */


import { config } from './config/configMgr';
import { createElement, currWebGL, currCanvas } from './elementMgr';
import { UtSystem,
         UtDebug,
         LDTransform,
         LDGL,
         Live2D,
         Live2DModelWebGL,
         Live2DModelJS,
         Live2DMotion,
         MotionQueueManager,
         PhysicsHair,
         AMotion,
         PartsDataID,
         DrawDataID,
         BaseDataID,
         ParamID } from './lib/live2d.core';
import { L2DTargetPoint, L2DViewMatrix, L2DMatrix44 } from "./lib/Live2DFramework";
import { cManager } from "./cManager";
import { MatrixStack } from "./utils/MatrixStack";
import { cDefine } from "./cDefine";
import device from 'current-device';
import { L2Dwidget } from './index';

let live2DMgr = null;
let captureFrameCB = undefined;
let isDrawStart = false;
let dragMgr = null;
let viewMatrix = null;
let projMatrix = null;
let deviceToScreen = null;
let drag = false;
let lastMouseX = 0;
let lastMouseY = 0;
let headPos = 0.5;
let opacityDefault = 0.7;
let opacityHover = 1;

/**
 * Main function of live2d-widget
 * @return {null}
 */

function theRealInit (){

  createElement();
  initEvent();

  live2DMgr = new cManager(L2Dwidget)
  dragMgr = new L2DTargetPoint();
  let rect = currCanvas.getBoundingClientRect();
  let ratio = rect.height / rect.width;
  let left = cDefine.VIEW_LOGICAL_LEFT;
  let right = cDefine.VIEW_LOGICAL_RIGHT;
  let bottom = -ratio;
  let top = ratio;

  viewMatrix = new L2DViewMatrix();

  viewMatrix.setScreenRect(left, right, bottom, top);

  viewMatrix.setMaxScreenRect(cDefine.VIEW_LOGICAL_MAX_LEFT,
    cDefine.VIEW_LOGICAL_MAX_RIGHT,
    cDefine.VIEW_LOGICAL_MAX_BOTTOM,
    cDefine.VIEW_LOGICAL_MAX_TOP);

  modelScaling(device.mobile() && config.mobile.scale || config.model.scale)

  projMatrix = new L2DMatrix44();
  projMatrix.multScale(1, (rect.width / rect.height));

  deviceToScreen = new L2DMatrix44();
  deviceToScreen.multTranslate(-rect.width / 2.0, -rect.height / 2.0);  // #32
  deviceToScreen.multScale(2 / rect.width, -2 / rect.height);  // #32


  Live2D.setGL(currWebGL);
  currWebGL.clearColor(0.0, 0.0, 0.0, 0.0);
  changeModel(config.model.jsonPath);
  startDraw();


}

/**
 * Capture current frame to png file
 * @param  {Function} callback The callback function which will receive the current frame
 * @return {null}
 * @example
 * You can use codes below to let the user download the current frame
 *
 * L2Dwidget.captureFrame(
 *   function(e){
 *     let link = document.createElement('a');
 *     document.body.appendChild(link);
 *     link.setAttribute('type', 'hidden');
 *     link.href = e;
 *     link.download = 'live2d.png';
 *     link.click();
 *   }
 * );
 *
 * @description Thanks to @journey-ad https://github.com/journey-ad/live2d_src/commit/97356a19f93d2abd83966f032a53b5ca1109fbc3
 */

function captureFrame(callback){
  captureFrameCB = callback;
}

function initEvent(){
  if (currCanvas.addEventListener) {
    window.addEventListener("click", mouseEvent);
    window.addEventListener("mousedown", mouseEvent);
    window.addEventListener("mousemove", mouseEvent);
    window.addEventListener("mouseup", mouseEvent);
    document.addEventListener("mouseleave", mouseEvent);
    window.addEventListener("touchstart", touchEvent);
    window.addEventListener("touchend", touchEvent);
    window.addEventListener("touchmove", touchEvent);
  }
}

function startDraw() {
  if (!isDrawStart) {
    isDrawStart = true;
    (function tick() {
      draw();
      let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

      requestAnimationFrame(tick, currCanvas);
      if(captureFrameCB !== undefined){
        captureFrameCB(currCanvas.toDataURL());
        captureFrameCB = undefined;
      }
    })();
  }
}

function draw()
{
    MatrixStack.reset();
    MatrixStack.loadIdentity();
    dragMgr.update();
    live2DMgr.setDrag(dragMgr.getX(), dragMgr.getY());

    currWebGL.clear(currWebGL.COLOR_BUFFER_BIT);

    MatrixStack.multMatrix(projMatrix.getArray());
    MatrixStack.multMatrix(viewMatrix.getArray());
    MatrixStack.push();

    for (let i = 0; i < live2DMgr.numModels(); i++)
    {
        let model = live2DMgr.getModel(i);

        if(model == null) return;

        if (model.initialized && !model.updating)
        {
            model.update();
            model.draw(currWebGL);
        }
    }
    MatrixStack.pop();
}

function changeModel(modelurl) // 更换模型
{
    live2DMgr.reloadFlg = true;
    live2DMgr.count++; // 现在仍有多模型支持，稍后可以精简
    live2DMgr.changeModel(currWebGL, modelurl);
}

function modelScaling(scale) {
  viewMatrix.adjustScale(0, 0, scale);
}
/*
function transformRange(center, transform, range)
{
    let a = {
        x: transform.x - center.x,
        y: transform.y - center.y
    }
    let r = Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y,2));
    if (r > range) {
        a = {
            x: a.x / r * range + center.x,
            y: a.y / r * range + center.y
        };
        return a;
    } else {
        return transform;
    }
}
*/
function dot(A,B)
{
    return A.x * B.x + A.y * B.y;
}

function normalize(x,y)
{
    let length = Math.sqrt(x * x + y * y)
    return {
        x: x / length,
        y: y / length
    }
}

function transformRect(center, transform, rect)
{
    if (transform.x < rect.left + rect.width && transform.y < rect.top + rect.height &&
        transform.x > rect.left && transform.y > rect.top) return transform;
    let Len_X = center.x - transform.x;
    let Len_Y = center.y - transform.y;

    function angle(Len_X, Len_Y)
    {
        return Math.acos(dot({
            x: 0,
            y: 1
        }, normalize(Len_X, Len_Y))) * 180 / Math.PI
    }

    let angleTarget = angle(Len_X, Len_Y);
    if (transform.x < center.x) angleTarget = 360 - angleTarget;
    let angleLeftTop = 360 - angle(rect.left - center.x, (rect.top - center.y) * -1);
    let angleLeftBottom = 360 - angle(rect.left - center.x, (rect.top + rect.height - center.y) * -1);
    let angleRightTop = angle(rect.left + rect.width - center.x, (rect.top - center.y) * -1);
    let angleRightBottom = angle(rect.left + rect.width - center.x, (rect.top + rect.height - center.y) * -1);
    let scale = Len_Y / Len_X;
    let res = {};

    if (angleTarget < angleRightTop) {
        let y3 = rect.top - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if(angleTarget < angleRightBottom) {
        let x3 = rect.left + rect.width - center.x;
        let y3 = x3 * scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if (angleTarget < angleLeftBottom) {
        let y3 = rect.top + rect.height - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if (angleTarget < angleLeftTop) {
        let x3 = center.x - rect.left;
        let y3 = x3 * scale;
        res = {
            y: center.y - y3,
            x: center.x - x3
        }
    } else {
        let y3 = rect.top - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    }

    return res;
}

function modelTurnHead(event)
{
    drag = true;

    let rect = currCanvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let target = transformRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("modelTurnHead onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    lastMouseX = sx;
    lastMouseY = sy;

    dragMgr.setPoint(vx, vy);
}

function modelTapEvent(event)
{
    drag = true;

    let rect = currCanvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let target = transformRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("modelTapEvent onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    lastMouseX = sx;
    lastMouseY = sy;

    L2Dwidget.emit('tap', event);

    live2DMgr.tapEvent(vx, vy);
}

function followPointer(event)
{
    let rect = currCanvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);

    // log but seems ok
    // console.log("ecx=" + event.clientX + " ecy=" + event.clientY + " sx=" + sx + " sy=" + sy);

    let target = transformRect({// seems ok here
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("followPointer onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    if (drag)
    {
        lastMouseX = sx;
        lastMouseY = sy;
        dragMgr.setPoint(vx, vy);
    }
}

function lookFront()
{
    if (drag) {
        drag = false;
    }
    dragMgr.setPoint(0, 0);
}

function mouseEvent(e)
{
    //e.preventDefault();
    if (e.type == "mousedown") {
        modelTapEvent(e);
    } else if (e.type == "mousemove") {
        modelTurnHead(e);
    } else if (e.type == "mouseup") {
        if("button" in e && e.button != 0) return;
        // lookFront();
    } else if (e.type == "mouseleave") {
        lookFront();
    }
}

function touchEvent(e)
{
    var touch = e.touches[0];
    if (e.type == "touchstart") {
        if (e.touches.length == 1) modelTapEvent(touch);
        // onClick(touch);
    } else if (e.type == "touchmove") {
        followPointer(touch);
    } else if (e.type == "touchend") {
        lookFront();
    }
}

function transformViewX(deviceX)
{
    var screenX = deviceToScreen.transformX(deviceX);
    return viewMatrix.invertTransformX(screenX);
}


function transformViewY(deviceY)
{
    var screenY = deviceToScreen.transformY(deviceY);
    return viewMatrix.invertTransformY(screenY);
}


function transformScreenX(deviceX)
{
    return deviceToScreen.transformX(deviceX);
}


function transformScreenY(deviceY)
{
    return deviceToScreen.transformY(deviceY);
}

export{
  theRealInit,
  captureFrame,
}
