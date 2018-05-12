/**
 * @description Copy files for building
 */
/* global __dirname */

const fs = require('fs');
const path = require('path');
let projPath = __dirname;
while (!fs.existsSync(path.resolve(projPath, 'package.json'))) {

  projPath = path.resolve(projPath, '../');

}

// Copy defaultConfig.json
fs.copyFile(path.resolve(projPath, 'src/config/defaultConfig.json'), path.resolve(projPath, 'lib/defaultConfig.json'), (err) => {

  if (err) {

    console.error('Failed copying defaultConfig.json');
    throw err;

  }
  console.error('succeeded copying defaultConfig.json');

});

// Add Title for CHANGELOG.md
fs.readFile(path.resolve(projPath, './CHANGELOG.md'), (readErr, data) => {

  if (readErr) {

    console.error('Failed reading CHANGELOG.md');
    throw readErr;

  }
  fs.writeFile(path.resolve(projPath, './CHANGELOG.md'), `# Changelog\n${data}`, (writeErr) => {

    console.error('Failed writing CHANGELOG.md');
    throw writeErr;

  });

});
