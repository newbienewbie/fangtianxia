const Sequelize=require('sequelize');
const config=require('../config/config');


let dbconfig=config.database;
// connect
const sequelize=new Sequelize(
    dbconfig.dbname,
    dbconfig.username,
    dbconfig.password,
    {
        host:dbconfig.host,
        port:dbconfig.port,
        dialect:dbconfig.dialect,
    }
);

sequelize.authenticate()
.then(()=>{
    console.log('db authentication passed');
}).catch((e)=>{
    console.log(e);
});


//import model

var esf=sequelize.import('./entity/esf.js');

module.exports=domain={
    sequelize,
    esf,
};
