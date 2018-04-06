/* global process, Live2DModelWebGL */
/* eslint-disable no-magic-numbers */

class PlatformManager {

  /**
   * Get arrayBuffer of provided path.
   * @param   {String}  path    Path to load.
   * @param   {String}  homeDir Root if path is relative.
   * @return  {Promise}         Promise to operate whose resolve is a ArrayBuffer.
   */
  loadBytes (path, homeDir = '') {

    let loadPath = path;

    if(!(/^http/.test(path) || /^file/.test(path))){
      loadPath = homeDir + path;
    }

    return new Promise((resolve) => {

      fetch(loadPath).then((response) => {

        if(response.ok) {

          resolve(response.arrayBuffer());

        }else{

          console.log(`live2d-widget: Failed to load (network error, ${response}): ${path}`);

        }

      }).catch((error) => {

        console.log(`live2d-widget: Failed to load (fetch error, ${error}): ${path}`);

      });

    });

  }

  /**
   * Load Live2D model.
   * @param   {String}  path  File path.
   * @return  {Promise}       Promise to operate.
   */
  loadLive2DModel (path) {

    return new Promise((resolve) => {

      this.loadBytes(path).then((buffer) => {

        resolve(Live2DModelWebGL.loadModel(buffer));

      });

    });

  }

  /**
   * Load texture.
   * @param   {live2DModel}      model  live2DModel
   * @param   {Number}           no     Texture index.
   * @param   {String}           path   File path.
   * @param   {RenderingContext} gl     WebGL to operate.
   * @return  {Promise}                 A Promise.
   */
  loadTexture (model, no, path, homeDir, gl) {

    let loadPath = path;

    if(!(/^http/.test(path) || /^file/.test(path))){
      loadPath = homeDir + path;
    }

    return new Promise((resolve) => {

      const loadedImage = new Image();
      loadedImage.crossOrigin = 'Anonymous';
      // Thanks to @mashirozx & @fghrsh
      // Issues:
      // @https://github.com/journey-ad/live2d_src/issues/1
      // @https://github.com/journey-ad/live2d_src/issues/3
      loadedImage.onload = () => {

        const texture = gl.createTexture();
        if(!texture) {

          console.log(`live2d-widget: Failed to create gl texture: ${model}, ${no}`);

        }
        if(!model.isPremultipliedAlpha()) {

          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loadedImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        model.setTexture(no, texture);

      };
      loadedImage.onerror = () => {

        console.log(`live2d-widget: Failed to load image: ${loadPath}`);

      };
      loadedImage.src = loadPath;
      resolve();

    });

  }

  loadSound(path, homeDir){

    let loadPath = path;

    if(!(/^http/.test(path) || /^file/.test(path))){
      loadPath = homeDir + path;
    }

    return new Promise((resolve) => {

      const sndElem = document.createElement('audio');
      sndElem.src = loadPath;
      resolve();

    });

  }

  /**
   * Get Object parsed from ArrayBuffer.
   * @param   {ArrayBuffer}  buffer  ArrayBuffer to parse.
   * @return  {Object}               Parsed object.
   */
  jsonParseFromBytes (buffer) {

    let jsonStr;
    const bomCode = new Uint8Array(buffer, 0, 3);
    if(bomCode[0] === 239 && bomCode[1] === 187 && bomCode[2] === 191) {

      jsonStr = String.fromCharCode.apply(null, new Uint8Array(buffer, 3));

    }else{

      jsonStr = String.fromCharCode.apply(null, new Uint8Array(buffer));

    }
    return JSON.parse(jsonStr);

  }

}

if (process.env.NODE_ENV === 'development') {

  window.PlatformManager = PlatformManager;

}

export {
  PlatformManager,
};
