'use strict';

const { Scheduler } = require('./scheduler.js');
const fs = require('fs');
const assert = require('assert').strict;

const NOW = new Date().getTime();

const scheduler = new Scheduler();

scheduler.on('error', (err, task) => {
  console.log(err.message, task.name);
});

scheduler.on('data', (data, task) => {
  const taskName = task.name;
  console.log({ taskName }, { data });
});

const readFile = (fileName, done) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      done(err);
      return;
    }
    done(null, data);
  });
};

const rf1 = readFile.bind(null, './1.txt');
const rf2 = readFile.bind(null, './2.txt');


//scheduler.task('name2', 2000, rf2);

const createTask = () => {
  let task = null;
  try {
    task = scheduler.task('name1', new Date(NOW + 1000), rf1);
  } catch (e) {
    assert.fail(e, 'Creation task error');
  } finally {
    if (task) {
      const count = task.active;
      assert.strictEqual(count, true, 'Task doesn\'t active');
    } else {
      assert.fail('scheduler.task() should return instance of task');
    }
  }
  try {
    scheduler.stopAll();
  } catch(e) {
    asser.fail(e, 'stopAll dosn\'t wotk');
  } finally {
    console.log('4 tests have been passed');
  }
};

createTask();
