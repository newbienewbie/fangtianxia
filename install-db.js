const domain=require('./lib/domain/domain');

domain.sequelize.sync({
    force:true
}).then(()=>{
    console.log('数据库安装完毕');
}).catch((e)=>{
    console.log(e);
});