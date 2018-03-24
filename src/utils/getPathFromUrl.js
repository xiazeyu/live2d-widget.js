/**
 * Get path from provided url
 * @param   {String}  url  Url to prase
 * @return  {String}       Path to the url
 */
function getPathFromUrl(url){
  return url.replace(/[^/\\\\]+$/, '');
}

export {
  getPathFromUrl,
}
