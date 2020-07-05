'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const got = require('got');

const fetch = url => {
  return got(url);
};

exports.fetch = fetch;