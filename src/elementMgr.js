import htmlTemplate from './tmplate/innerHTML';

function createCanvasElement(config) {

}

function createElement(tagName){
  let element = document.createElement(tagName);
}

function initElement(elem, config){
  return {
    element,
    WebGL,
    canvas,
  }
}

export {
  createElement,
  initElement,
}
