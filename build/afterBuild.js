/* global __dirname */

const fs = require('fs');
const path = require('path');

/**
 * TO find the nearest path which contains package.json
 * @param  {Function} callback  A function which receives current project path.
 * @param  {String}  lastSearch Last path of searching.
 * @return {String}             Path of current project.
 */
function getProjPath (callback, lastSearch = __dirname) {

  fs.stat(path.resolve(lastSearch, 'package.json'), (err) => {

    if (err) {

      getProjPath(path.resolve(lastSearch, '../'), callback);

    }
    callback(lastSearch);

  });

}

// Copy defaultConfig.json
getProjPath((projPath) => {

  fs.copyFile(path.resolve(projPath, 'src/config/defaultConfig.json'), path.resolve(projPath, 'dist/defaultConfig.json'), (err) => {

    if (err) {

      console.error('Failed copying defaultConfig.json');
      throw err;

    }
    console.log('succeeded copying defaultConfig.json');

  });

});
