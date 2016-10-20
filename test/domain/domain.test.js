const domain=require('../../lib/domain/domain.js');

describe('测试Sequelize',function(){
    describe('测试认证',function(){
        this.timeout(1000);
        it('测试认证',function(done){
            domain.sequelize.authenticate()
                .then(
                    ()=>{ console.log('authentication passed'); },
                    ()=>{ return 'authentication failed'; }
                ).then(done)
                .catch(done);
        });
    });

    describe('测试domain操作数据库',function(){
        this.timeout(1000);
        it('测试创建记录后再删除',function(done){
            domain.esf.create({
                title:'title',
                href:'href',
                house:'house',
                villageName:'village-name',
                villageHref:'village-href',
                address:'address',
                area:'area',
                amount:'amount',
                price:'price',
                agentName:'agent-name',
                agentHref:'agent-href',
                maintainedAt:'maintained-at',
            })
            .then(
                esf=>{
                    console.log(`创建成功：${esf}`);
                    return domain.esf.destroy({
                        where:{ id:esf.id }
                    }).then(
                        ()=>{},
                        err=>{return err;}
                    );
                },
                err=>{console.log(err);done(err);}
            )
            .then(done)
            .catch(done);
        });
    });
});

