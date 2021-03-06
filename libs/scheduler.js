'use strict';

const { EventEmitter } = require('events');

class Task extends EventEmitter {
  constructor(name, time, exec) {
    super();
    this.name = name;
    if (typeof time === 'number') {
      this.time = Date.now() + time;
      this.set = setInterval;
      this.clear = clearInterval;
    } else {
      this.time = new Date(time).getTime();
      this.set = setTimeout;
      this.clear = clearTimeout;
    }
    this.exec = exec;
    this.running = false;
    this.count = 0;
    this.timer = null;
  }
  get active() {
    return !!this.timer;
  }
  start() {
    this.stop();
    if (this.running) return false;
    const time = this.time - Date.now();
    if (time < 0 || !time) return false;
    this.timer = this.set(() => {
      this.run();
    }, time);
    return true;
  }
  stop() {
    if (!this.active || this.running) return false;
    this.clear(this.timer);
    this.timer = null;
    return true;
  }
  run() {
    if (!this.active || this.running) return false;
    this.running = true;
    this.exec((err, data)  => {
      if (err) this.emit('error', err, this);
      if (data) this.emit('data', data, this);
      this.count++;
      this.running = false;
    });
    return true;
  }
}

class Scheduler extends EventEmitter {
  constructor() {
    super();
    this.tasks = new Map();
  }
  task(name, time, exec) {
    this.stop(name);
    const task = new Task(name, time, exec);
    this.tasks.set(name, task);
    task.on('error', err => {
      this.emit('error', err, task);
    });
    task.on('data', data => {
      this.emit('data', data, task);
    });
    task.start();
    return task;
  }
  stop(name) {
    const task = this.tasks.get(name);
    if (task) {
      task.stop();
      this.tasks.delete(name);
      return true;
    }
    return false;
  }
  stopAll() {
    let count = 0;
    let names = '';
    for (const name of this.tasks.keys()) {
      this.stop(name);
      ++count;
      names.length === 0 ? names += `\n${name}` : names += name;
    }
    return `stopped ${count} task(s):${names}`;
  }
}

module.exports = { Scheduler };
