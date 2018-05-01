/* global __webpack_public_path__: true, process */

import {getPathFromUrl, } from '../utils/pathHandler';

/*
 * Expose the path to the global,
 * And wp will finish the following work
 */
__webpack_public_path__ = getPathFromUrl(document.currentScript.src); // eslint-disable-line camelcase

if (process.env.NODE_ENV === 'development') {

  console.log(`Live2Dwidget: publicPath: ${__webpack_public_path__}`); // eslint-disable-line camelcase

}
