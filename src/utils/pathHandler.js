/* global process */

/**
 * Get path from provided url.
 * @param   {String}  url  Url to prase.
 * @return  {String}       Path to the url.
 */
function getPathFromUrl (url) {

  return url.replace(/[^/\\\\]+$/, '');

}

/**
 * Resolve full path from provided url.
 * To convert relative and absolute path into absolute path.
 * @param   {String}  path     Path to resolve.
 * @param   {String}  homeDir  Home dir.
 * @return  {String}           Resolved path.
 */
function resolvePath(path, homeDir){
  if(!(/^http/.test(path) || /^file/.test(path) || path[0] === '/')){
    return homeDir + path;
  }
  return path;
}

if (process.env.NODE_ENV === 'development') {

  window.getPathFromUrl = getPathFromUrl;
  window.resolvePath = resolvePath;

}

export {
  getPathFromUrl,
  resolvePath,
};
