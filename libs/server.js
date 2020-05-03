'use strict';

const http = require('http');

const { Scheduler } = require('./scheduler.js')
global.scheduler = new Scheduler();

global.scheduler.on('error', (err, task) => {
  console.log(err.message, task.name);
});

global.scheduler.on('data', (data, task) => {
  const taskName = task.name;
  console.log({ taskName }, { data });
});

const { api } = require('./api');

const parseApi = url => {
  const [ first, second ] = url.slice(1).split('/');
  return first === 'api' ? second : undefined;
};

const parseParam = param => {
  if (!param) return undefined;
  const res = param.split('&')
    .map(e => e.split('='))
    .reduce((hash, arr) => (hash[arr[0]] = arr[1], hash), {});
  const { name, timeout } = res;
  return [name, timeout];
};

const parseUrl = url => {
  if (url.includes('?')) {
    const [ apiPath, param ] = url.split('?');
    return [parseApi(apiPath), parseParam(param)];
  }
  return [parseApi(url)];
};

const server = http.createServer(async (req, res) => {
  const [name, args] = parseUrl(req.url);
  const method = api[name];
  if (method) {
    const par = args || [];
    const result = await method(...par);
    res.statusCode = 200;
    res.end(result);
    return;
  }
  res.statusCode = 404;
  res.end('not found');
}).listen(8001);
