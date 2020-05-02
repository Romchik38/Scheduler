'use strict';

const { Scheduler } = require('./scheduler.js');
const fs = require('fs');

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

scheduler.task('name1', '2020-04-30T19:03:00Z', rf1);
scheduler.task('name2', 2000, rf2);
