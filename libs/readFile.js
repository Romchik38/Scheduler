'use strict';

const fs = require('fs');

const readFile = (fileName, done) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      done(err);
      return;
    }
    done(null, data);
  });
};

module.exports = { readFile };
