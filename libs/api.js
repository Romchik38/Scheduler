'use strict';

const { readFile } = require('./readFile');

const rf2 = readFile.bind(null, './files/2.txt');

const api = {
  read2txt: async (name, timeout) => {
    if (name && timeout) {
      const task = scheduler.task(name, timeout, rf2);
      if (task.active) return 'ok';
      else return 'task not active';
    }
    return 'bad parameters';
  },
  stopAll: async (name) => {
    return scheduler.stopAll();
  },
  stop: async name => {
    const res = scheduler.stop(name);
    if (res) return `Task ${name} is stopped`;
    else return `Task ${name} is not found`;
  },
};

module.exports = { api }
