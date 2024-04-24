let log4js = require('log4js');

log4js.configure('./log4js.json');
log4js.level = 'DEBUG';


module.exports = async (ctx, next) => {
    let accessLog = log4js.getLogger('access');
    accessLog.trace(`${ctx.method} ${ctx.url}`);
    ctx.logger = log4js.getLogger('app');
    const start = Date.now();
    try{
        await next();
    }catch(err){
        if(err.code){
            
            ctx.logger.debug(err);
        }else{
            ctx.logger.error(err);
            ctx.status = 500;
            
        }
    }
    const ms = Date.now() - start;

    accessLog.trace(`----------------- ${ctx.status} - ${ms}ms\n`);
};
