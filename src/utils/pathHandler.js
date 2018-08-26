/* global process */

/**
 * Separate folder path from mixed ones(contains both filename and folder path).
 * @param   {String}  url  Url to prase.
 * @return  {String}       Folder path.
 */
function getPathFromUrl (url) {

  return url.replace(/[^/\\\\]+$/, '');

}

/**
 * Resolve absolute path.
 * To convert relative and absolute path into absolute path.
 * @param   {String}  path     Path to resolve.
 * @param   {String}  homeDir  Home dir.
 * @return  {String}           Resolved path.
 */
function resolvePath (path, homeDir) {

  if (!(/^http/.test(path) || (/^file/).test(path) || path[0] === '/') || (/^\/\//).test(path)) { // eslint-disable-line no-magic-numbers

    return homeDir + path;

  }
  return path;

}

if (process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env

  window.pathHandler = {
    getPathFromUrl,
    resolvePath,
  };

}

export {
  getPathFromUrl,
  resolvePath,
};
