const log4js = require('log4js');

log4js.configure({
    appenders:{
        terminal:{type: 'console'},
        warnFile:{type:'file', filename:'warn.log'},
        errorFile:{type:'file', filename:'error.log'},
    },
    categories:{
        default:{appenders:['terminal'], level:'Debug'},
        warnArchive:{appenders:['warnFile'], level:'warn'},
        errorArchive:{appenders:['errorFile'], level:'error'},
    }
})
module.exports = log4js;