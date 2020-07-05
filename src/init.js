// import download from 'download-git-repo';

// export default function init(...args){
//     console.log('this is init js', args.toString())
// }

// https://api.github.com/repos/ZWBruce/vDom/contents
// https://raw.githubusercontent.com/ZWBruce/vDom/master/.babelrc

import got from 'got';
import fs from 'fs';

const fileBaseUrl = 'https://raw.githubusercontent.com';
const listBaseUrl = 'https://api.github.com'
const user = 'ZWBruce';
const repositry = 'vDom';
const branch = 'master';

const getRootList = `${listBaseUrl}/repos/${user}/${repositry}/contents`;

let getFile = async (root, info) => {
    let target = `${root}/${info.path}`;
    console.log('target', target)
    if (fs.existsSync(target)) {
        console.log('file existsSync');
        return;
    }
    let { body } = await got(info.download_url);
    fs.writeFileSync(target, body);
}

let getList = async function (root, path) {
    console.log(root)
    let url = getRootList + path;
    let list = await got(url);
    console.log(path.startsWith('/'), path)
    let targetDir = root + (path.startsWith('/') ? '' : '/') + path;
    console.log('targetDir', targetDir)
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    for (let e of JSON.parse(list.body)) {
        // console.log(e)
        if (e.type === 'file') {
            await getFile(root, e)
        } else if (e.type === 'dir') {
            await getList(root, '/' + e.path);
        }
    }
}

export default function (...args) {
    if (!fs.existsSync(args[0])) fs.mkdirSync(args[0])
    getList(args[0], '')
}