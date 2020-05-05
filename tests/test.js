'use strict';

const client = require('./client.js');
const runner = require('./runner.js');
const assert = require('assert').strict;

const startTask = async next => {
  const url = 'http://localhost:8001/api/read2txt?name=read2&interval=1000';
  try {
    const res = await client(url);
    try {
      assert.strictEqual(res, 'ok');
      next();
    } catch (e) {
      next(e);
    }
  } catch (e) {
    assert.fail(e, 'Error with get request on startTask');
  }

};

const tests = [startTask];

require('../index.js');
runner.start(tests);
