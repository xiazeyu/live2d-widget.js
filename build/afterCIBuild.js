const fs = require('fs');
const path = require('path');
const getProjPath = require('./getProjPath');

// Copy playground.html
getProjPath((projPath) => {

  fs.copyFile(path.resolve(projPath, 'build/playgroundProduction.html'), path.resolve(projPath, 'ghpages/playground.html'), (err) => {

    if (err) {

      console.error('Failed copying playground.html');
      throw err;

    }
    console.log('succeeded copying playground.html');

  });

});

// Copy generator.html
getProjPath((projPath) => {

  fs.copyFile(path.resolve(projPath, 'build/generator.html'), path.resolve(projPath, 'ghpages/generator.html'), (err) => {

    if (err) {

      console.error('Failed copying generator.html');
      throw err;

    }
    console.log('succeeded copying generator.html');

  });

});

// Add Title for CHANGELOG.md
getProjPath((projPath) => {

  fs.readFile(path.resolve(projPath), './CHANGELOG.md', (readErr, data) => {

    if (readErr) {

      console.error('Failed reading CHANGELOG.md');
      throw readErr;

    }
    console.log('succeeded reading CHANGELOG.md');
    fs.writeFile(path.resolve(projPath, './CHANGELOG.md', `# Changelog\n${data}`), (writeErr) => {

      if (writeErr) {

        console.error('Failed writing CHANGELOG.md');
        throw writeErr;

      }
      console.log('succeeded writing CHANGELOG.md');

    });

  });

});
