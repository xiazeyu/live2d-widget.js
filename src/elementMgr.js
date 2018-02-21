import htmlTemplate from './tmplate/innerHTML';

function initWebGL(canvas) {
  return 'webGL';
}

function createCanvasElement(config) {
  return 'canvas';
}

function createElement(tagName, id){
  let newElem = document.createElement(tagName);
  newElem.className = 'live2d-widget';
  if(id !== null){
    newElem.id = id;
  }
  document.body.appendChild(newElem);
  return newElem;
}

function initElement(elem, config){
  let element = elem;
  let canvas = createCanvasElement(config);
  let webGL = initWebGL(canvas);
  element.innerHTML = htmlTemplate;
  return {
    element,
    webGL,
    canvas,
  }
}

export {
  createElement,
  initElement,
}
