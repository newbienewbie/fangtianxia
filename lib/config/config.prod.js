const defConfig=require('./config.default.json');



// 克隆一个默认配置
const config=Object.assign({},defConfig);

config.env='prod';

let _db={
    dialect:'mysql',
    host:process.env.OPENSHIFT_MYSQL_DB_HOST,
    port:process.env.OPENSHIFT_MYSQL_DB_PORT,
    username:process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password:process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    dbname:process.env.OPENSHIFT_APP_NAME,
    charset:'utf-8',
};     

if (process.env.OPENSHIFT_POSTGRESQL_DB_HOST != undefined) {
    _db.dialect='pg',
    _db.host= process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
    _db.port= process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
    _db.username= process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
    _db.dbname= process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
    _db.database= process.env.OPENSHIFT_APP_NAME;
}

config.database=_db;


// config.email.username=
// config.email.password=



module.exports = config;