const fs = require('fs');
const path = require('path');
const getProjPath = require('./getProjPath');

// Copy defaultConfig.js
getProjPath((projPath) => {

  fs.copyFile(path.resolve(projPath, 'src/config/defaultConfig.js'), path.resolve(projPath, 'dist/defaultConfig.js'), (err) => {

    if (err) {

      console.error('Failed copying defaultConfig.js');
      throw err;

    }
    console.log('succeeded copying defaultConfig.js');

  });

});
