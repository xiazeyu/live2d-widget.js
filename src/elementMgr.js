import htmlTemplate from './tmplate/innerHTML';

function createCanvas(config) {

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
