let apply = (action, ...args)=>{
    let fn = require(`./${action}.js`)
    fn.default.apply(null,args)
}

export default apply