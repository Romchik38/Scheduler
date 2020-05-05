'use strict';

const http = require('http');

const client = url => new Promise((resolve, reject) => {
  http.get(url, res => {
    res.setEncoding('utf8');
    let buffer = '';
    res.on('data', chunk => buffer += chunk);
    res.on('end', () => {
      try {
        resolve(buffer);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', e => {
    reject(e);
  });
});

module.exports = client;
