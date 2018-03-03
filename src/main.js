function loadL2DWidget({ webGL, config, }){
  console.log(webGL, config);
  let data1 = 'Test data1';
  return {
    data1,
  };
}

function captureFrame(callback, { type, encoderOptions, }){
  console.log(callback, type, encoderOptions);
}

export {
  loadL2DWidget,
  captureFrame,
}
