const { fork } = require("child_process");
const os = require('os');

const prosInfo = async (_req , res) =>{
    try{
        const processInfo = {
            platform: process.platform,
            version: process.version,
            title: process.title,
            execPath: process.execPath,
            processId: process.pid,
            rss: process.memoryUsage().rss,
            numberOfProcessors: os.cpus().length
        }
        res.status(200).json(processInfo);
    }catch(e){
        res.status(404).json({e:`Error en el precessInfo ${e}`});
    }
};


module.exports ={
    prosInfo,
}