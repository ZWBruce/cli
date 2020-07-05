"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let apply = (action, ...args) => {
    let fn = require(`./${action}.js`);
    fn.default.apply(null, args);
};

exports.default = apply;