let config;

if(process.env.NODE_PORT){
    config=require('./config.prod.js');
}else{
    config=require('./config.dev.js');
}



module.exports=config;