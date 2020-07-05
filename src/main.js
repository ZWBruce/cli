import consta from './utils/constants.js';
import program from 'commander'
import chalk from 'chalk'
import apply from './index'
// console.log('v!!',consta)

// console.log(chalk.green('green'))
let { VERSION } = consta;

let actionMap = {
    init:{
        description:'根据模板初始化一个新项目',
        alias:'',
        usages:[
            'eos初始化模板命令'
        ]
    },
    config:{
        alias:'cfg',
        description:'配置eos',
        usages:[
            'eos config set <k> <v>',
            'eos config get <k>',
            'eos config remove <k>'
        ]
    }
}

for(let action in actionMap){
    program.command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(()=>{
            // console.log('action??',action);
            switch(action){
                case 'config':
                    apply(action, ...process.argv.slice(3));
                    break;
                case 'init':
                    apply(action, ...process.argv.slice(3));
                    break;
                default:
                    break;
            }
        })
}

function help(){
    console.log('\r\nUsage');
    for(let action in actionMap){
        for(let usage of actionMap[action].usages){
            console.log(`  - ${usage}`);
        }
    }
    console.log('\r');
}

program.usage('<command> [options]');

// 监听-h和-help，执行help函数
program.on('-h',help)
program.on('--help',help)

// parse是启动函数
// console.log(program.version(VERSION),'??',VERSION);
program.version(VERSION,'-V --version').parse(process.argv)

// 输入eos时显示内容
if(!process.argv.slice(2).length){
    program.outputHelp(make_green)
}

function make_green(txt){
    return chalk.green(txt);
}
