function loadL2DWidget({ webGL, config, }){
  console.log(webGL, config);
}

function captureFrame(callback, { type, encoderOptions, }){
  console.log(callback, type, encoderOptions);
}

export {
  loadL2DWidget,
  captureFrame,
}
