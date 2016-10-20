

module.exports=function (sequelize,Sequelize) {

     return sequelize.define(
        'esf',
        {
            id:{
                type:Sequelize.BIGINT,
                primaryKey:true,
                autoIncrement:true
            },
            title:{
                type:Sequelize.STRING,
            },
            href:{
                type:Sequelize.STRING,
                allowNull:false,
            },

            house:Sequelize.STRING,

            villageName:Sequelize.STRING,
            villageHref:Sequelize.STRING,

            address:Sequelize.STRING,
            area:Sequelize.FLOAT,
            amount:Sequelize.FLOAT,
            price:Sequelize.FLOAT,
            
            agentName:Sequelize.STRING,
            agentHref:Sequelize.STRING,

            maintainedAt:Sequelize.STRING,
        },{
            tableName:'esf',
            indexes:[
                {unique:true,fields:['href','area','amount']}
            ]
        }
    );
}