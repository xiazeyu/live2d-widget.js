function loadL2DWidget({ WebGL, config, }){
  console.log(WebGL, config);
}

function captureFrame(callback, { type, encoderOptions, }){
  console.log(callback, type, encoderOptions);
}

export {
  loadL2DWidget,
  captureFrame,
}
