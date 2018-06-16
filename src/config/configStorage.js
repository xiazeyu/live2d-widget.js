/* global process, device */

/**
 * An example of Config.displayFunc, to manually get display config on the basis of current client browsers.
 * <br>[current-device](https://github.com/matthewhudson/current-device) can be used to detect current device.
 * <br>Whatever key returns `null` means nothing to do with this key, and it will keep it's original value.
 * @return {Config}  A Config that specifies the display config.
 */
function sampleDisplayFunc () {

  /**
   * To specifies the proper sample level on the basis of current device.
   * @return {Number}  Sample level.
   */
  function autoSampleLevel () { // eslint-disable-line no-unused-vars

    if (!device.mobile()) {

      return 2; // eslint-disable-line no-magic-numbers

    }
    return 1; // eslint-disable-line no-magic-numbers

  }

  return {
    'displayDeviceMotion': null,
    'displayHeight': null,
    'displayOffsetH': null,
    'displayOffsetV': null,
    'displayOpacityDefault': null,
    'displayOpacityOnHover': null,
    'displaySampleLevel': null/* autoSampleLevel() */, // eslint-disable-line capitalized-comments
    'displayScale': null,
    'displayShow': null/* !device.mobile() */, // eslint-disable-line capitalized-comments
    'displaySide': null,
    'displayWidth': null,
    'displayzindex': null,
  };

}

/**
 * Structure for config, {@link defaultConfig} as the default, {@link configType} as the type.
 * @typedef {Object}  Config
 * @property {string}  modelJsonPath="https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku/assets/shizuku.model.json"    Specifies the `.model.json` file path of model.<br>指定模型的文件`.model.json`位置。<br>eg. `"/live2d/miku.model.json"`,<br>`"https://test.com/live2d/miku.model.json"`,<br>`"http://test.com/live2d/miku.model.json"`,<br>`"file:///d:/live2d/miku.model.json"`.
 * @property {number}  modelAspectRatio=0.75    [BETA]Specifies the aspect ratio of the model in order to prevent being deformed.<br>指定模型的宽高比以防止被拉伸失真。<br>**Only works when provided size type is "dynamic"**<br>****仅在大小类型为动态时被启用。****
 * @property {number}  modelHeadPosH=0.5    Specifies the head's horizontal position of the model.<br>指定模型的水平头部位置。
 * @property {number}  modelHeadPosV=0.618    Specifies the head's vertical position of the model.<br>指定模型的竖直头部位置。
 * @property {boolean}  displayShow=true    Specifies whether to show live2d-widget element.<br>指定是否显示live2d-widget元素。
 * @property {string}  displaySide="right"    Specifies which side to show live2d-widget element.<br>指定何侧显示live2d-widget元素。<br>eg. `right`, `left`.
 * @property {string}  displayHeight="45%"    [BETA]Specifies the height of live2d-widget element.<br>指定live2d-widget元素的高度。<br>There's two **size types**:<br>有2种大小类型。<br>a. "fixed" ones,<br>固定的。<br>eg.`300px` or `300`(will be processed as `300px`, just for compatible).<br>b. "dynamic" ones*[BETA]*<br>动态的。<br>eg. `45%`**This only works when target window is LANDSCAPE**.<br>**仅在您的目标窗口为横屏时被使用**。
 * @property {string}  displayWidth="35%"    [BETA]Specifies the width of live2d-widget element.<br>指定live2d-widget元素的宽度。<br>There's two **size types**:<br>有2种大小类型。<br>a. "fixed" ones,<br>固定的。<br>eg.`150px` or `150`(will be processed as `150px`, just for compatible).<br>b. "dynamic" ones*[BETA]*<br>动态的。<br>eg. `35%`**This only works when target window is PORTRAIT**.<br>**仅在您的目标窗口为竖屏时被使用**。
 * @property {string}  displayOffsetH="0px"    Specifies the horizontal offset of live2d-widget element.<br>指定live2d-widget元素自侧部的水平偏移。
 * @property {string}  displayOffsetV="-20px"    Specifies the vertical offset of live2d-widget element.<br>指定live2d-widget元素自底部的垂直偏移。
 * @property {number}  displaySampleLevel=2    [INFO]Specifies the sample level of the canvas.<br>指定画布的超采样级别。<br>lower is faster, but blur,<br>数值越小越快速，也越模糊。<br>higher is distinct, but slower.<br>数值越大越清晰，也越缓慢。
 * @property {function}  displayFunc=sampleDisplayFunc    [BETA]Specifies which function will be used to override display configs at startup.<br>指定用于在启动时用于覆写display设置项的函数。<br>Sees {@link sampleDisplayFunc} as an example.<br>参照样例{@link sampleDisplayFunc}。
 * @property {number}  displayOpacityDefault=0.7    Specifies the opacity of live2d-widget element.<br>指定live2d-widget元素的透明度。
 * @property {number}  displayOpacityOnHover=0.2    Specifies the opacity when mouse is on hover the element.<br>指定live2d-widget元素鼠标上移后的透明度。
 * @property {boolean}  displayDeviceMotion=true    [WIP]Specifies whether to use device motion.<br>指定是否使用设备动作感应。
 * @property {number}  displayzindex=2333    Specifies the z-order of live2d-widget element.<br>指定模型的z-index数值。
 * @property {boolean}  devBorder=false    [DEV]Specifies whether to enable border around the canvas for debugging.<br>指定是否启用调试用描边。
 * @property {boolean}  devLog=false    [DEV]Specifies whether to enable log in console for debugging.<br>指定是否启用调试用日志。
 * @property {boolean}  devMouseLog=false    [DEV][WARN]Specifies whether to enable mouse log in console for debugging.<br>指定是否启用调试用鼠标日志。<br>NOTICE: may cause lag.<br>可能造成卡顿。
 * */

/**
 * Default to live2d-widget.js's config.
 * @type {Config}
 */
const defaultConfig = {
  'devBorder': false,
  'devLog': false,
  'devMouseLog': false,
  'displayDeviceMotion': true,
  'displayFunc': sampleDisplayFunc,
  'displayHeight': '45%',
  'displayOffsetH': '0px',
  'displayOffsetV': '-20px',
  'displayOpacityDefault': 0.7,
  'displayOpacityOnHover': 0.2,
  'displaySampleLevel': 2,
  'displayShow': true,
  'displaySide': 'right',
  'displayWidth': '35%',
  'displayzindex': 2333,
  'modelAspectRatio': 0.75,
  'modelHeadPosH': 0.5,
  'modelHeadPosV': 0.618,
  'modelJsonPath': 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku/assets/shizuku.model.json',
};

/**
 * Type of {@link Config}, only compatible with the latest Config.
 * <br>Use {@link configUpdater} if you are using previous version of Config.
 */
const configType = {
  'devBorder': 'boolean',
  'devLog': 'boolean',
  'devMouseLog': 'boolean',
  'displayDeviceMotion': 'boolean',
  'displayFunc': 'function',
  'displayHeight': 'string',
  'displayOffsetH': 'string',
  'displayOffsetV': 'string',
  'displayOpacityDefault': 'number',
  'displayOpacityOnHover': 'number',
  'displaySampleLevel': 'number',
  'displayShow': 'boolean',
  'displaySide': 'string',
  'displayWidth': 'string',
  'displayzindex': 'number',
  'modelAspectRatio': 'number',
  'modelHeadPosH': 'number',
  'modelHeadPosV': 'number',
  'modelJsonPath': 'string',
};

if (process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env

  window.configStorage = {
    configType,
    defaultConfig,
    sampleDisplayFunc,
  };

}

export {
  configType,
  defaultConfig,
  sampleDisplayFunc,
};
