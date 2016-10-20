

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
                unique:true,
                allowNull:false,
            },

            house:Sequelize.STRING,

            villageName:Sequelize.STRING,
            villageHref:Sequelize.STRING,

            address:Sequelize.STRING,
            area:Sequelize.STRING,
            amount:Sequelize.STRING,
            price:Sequelize.STRING,
            
            agentName:Sequelize.STRING,
            agentHref:Sequelize.STRING,

            maintainedAt:Sequelize.STRING,
        },{
            tableName:'esf',
        }
    );
}