const fs = require('fs');
const path = require('path');
const getProjPath = require('./getProjPath');

// Copy configStorage.js
getProjPath((projPath) => {

  fs.copyFile(path.resolve(projPath, 'src/config/configStorage.js'), path.resolve(projPath, 'dist/configStorage.js'), (err) => {

    if (err) {

      console.error('Failed copying configStorage.js');
      throw err;

    }
    console.log('succeeded copying configStorage.js');

  });

});
