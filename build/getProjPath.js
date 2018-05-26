/* global __dirname */

const fs = require('fs');
const path = require('path');

/**
 * To find the nearest path which contains package.json.
 * @param  {Function} callback  A function which receives current project path.
 * @param  {String}  lastSearch Last path of searching.
 * @return {String}             Path of current project.
 */
function getProjPath (callback, lastSearch = __dirname) {

  fs.stat(path.resolve(lastSearch, 'package.json'), (err) => {

    if (err) {

      const nextSearch = path.resolve(lastSearch, '../');
      if (nextSearch === lastSearch) {

        // Reach the root path, but still cannot find package.json
        throw new Error('Unable to locate current project path.');

      }
      getProjPath(callback, nextSearch);

    }
    callback(lastSearch);

  });

}

module.exports = getProjPath;
