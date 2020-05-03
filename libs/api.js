'use strict';

const { readFile } = require('./readFile');

const rf2 = readFile.bind(null, './files/2.txt');

const api = {
  read2txt: async (name, timeout) => {
    if (name && timeout) {
      const time = parseInt(timeout)
      const task = scheduler.task(name, time, rf2);
      if (task.active) return 'ok';
      else return 'task not active';
    }
    return 'bad parameters';
  }
};

module.exports = { api }
