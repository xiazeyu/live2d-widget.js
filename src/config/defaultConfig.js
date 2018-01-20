/**
 * @description The storage of configs. Intend to unify serverJs and clientJs's config
 */

/**
 * Default settings for defaulter
 * @type {Object}
 */

const defaultConfig = {
  model: {
    jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json',
    scale: 1,
    hHeadPos: 0.5,
    vHeadPos: 0.618,
    myDefine: [],
  },
  display: {
    superSample: 2,
    width: 150,
    height: 300,
    position: 'right',
    hOffset: 0,
    vOffset: -20,
  },
  mobile: {
    show: true,
    scale: 0.5,
    motion: true,
  },
  name: {
    canvas: 'live2dcanvas',
    div: 'live2d-widget',
  },
  react: {
    opacityDefault: 0.7,
    opacityOnHover: 0.2,
    myFunc: (e) => {console.log('(undefined) ┑(￣Д ￣)┍');},
  },
  dev: {
    log: false,
    border: (process.env.NODE_ENV === 'development' ? true : false),
    mouseLog: false,
    mouseFunc: (x, y, ix, iy) => {console.log(`MouseFunc: ${x},${y}; ${ix}, ${iy}`);},
  },
}

module.exports = defaultConfig;
