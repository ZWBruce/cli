'use strict';

var _constants = require('./utils/constants.js');

var _constants2 = _interopRequireDefault(_constants);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log('v!!',consta)

// console.log(chalk.green('green'))
let { VERSION } = _constants2.default;

let actionMap = {
    init: {
        description: '根据模板初始化一个新项目',
        alias: '',
        usages: ['eos初始化模板命令']
    },
    config: {
        alias: 'cfg',
        description: '配置eos',
        usages: ['eos config set <k> <v>', 'eos config get <k>', 'eos config remove <k>']
    }
};

for (let action in actionMap) {
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
        // console.log('action??',action);
        switch (action) {
            case 'config':
                (0, _index2.default)(action, ...process.argv.slice(3));
                break;
            case 'init':
                (0, _index2.default)(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
}

function help() {
    console.log('\r\nUsage');
    for (let action in actionMap) {
        for (let usage of actionMap[action].usages) {
            console.log(`  - ${usage}`);
        }
    }
    console.log('\r');
}

_commander2.default.usage('<command> [options]');

// 监听-h和-help，执行help函数
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);

// parse是启动函数
// console.log(program.version(VERSION),'??',VERSION);
_commander2.default.version(VERSION, '-V --version').parse(process.argv);

// 输入eos时显示内容
if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp(make_green);
}

function make_green(txt) {
    return _chalk2.default.green(txt);
}