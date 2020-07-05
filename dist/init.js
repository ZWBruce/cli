'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (...args) {
    if (!_fs2.default.existsSync(args[0])) _fs2.default.mkdirSync(args[0]);
    getList(args[0], '');
};

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import download from 'download-git-repo';

// export default function init(...args){
//     console.log('this is init js', args.toString())
// }

// https://api.github.com/repos/ZWBruce/vDom/contents
// https://raw.githubusercontent.com/ZWBruce/vDom/master/.babelrc

const fileBaseUrl = 'https://raw.githubusercontent.com';
const listBaseUrl = 'https://api.github.com';
const user = 'ZWBruce';
const repositry = 'vDom';
const branch = 'master';

const getRootList = `${listBaseUrl}/repos/${user}/${repositry}/contents`;

let getFile = (() => {
    var _ref = _asyncToGenerator(function* (root, info) {
        let target = `${root}/${info.path}`;
        console.log('target', target);
        if (_fs2.default.existsSync(target)) {
            console.log('file existsSync');
            return;
        }
        let { body } = yield (0, _got2.default)(info.download_url);
        _fs2.default.writeFileSync(target, body);
    });

    return function getFile(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getList = (() => {
    var _ref2 = _asyncToGenerator(function* (root, path) {
        console.log(root);
        let url = getRootList + path;
        let list = yield (0, _got2.default)(url);
        console.log(path.startsWith('/'), path);
        let targetDir = root + (path.startsWith('/') ? '' : '/') + path;
        console.log('targetDir', targetDir);
        if (!_fs2.default.existsSync(targetDir)) {
            _fs2.default.mkdirSync(targetDir);
        }

        for (let e of JSON.parse(list.body)) {
            // console.log(e)
            if (e.type === 'file') {
                yield getFile(root, e);
            } else if (e.type === 'dir') {
                yield getList(root, '/' + e.path);
            }
        }
    });

    return function getList(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();