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
    scale: 0.8,
    motion: true,
  },
  name: {
    canvas: 'live2dcanvas',
    div: 'live2d-widget',
  },
  react: {
    opacity: 1,
  },
  dev: {
    border: (process.env.NODE_ENV === 'development' ? true : false)
  },
}

module.exports = defaultConfig;
