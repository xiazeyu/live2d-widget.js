const fs = require('fs');
const path = require('path');
const getProjPath = require('./getProjPath');

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
