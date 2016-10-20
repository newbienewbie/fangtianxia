const domain=require('./domain/domain');



const TIME_INTERVAL=200;




function persist(info){
    return domain.esf.insertOrUpdate(
        {
            title:info.title,
            href:info.href,
            house:JSON.stringify(info.house),
            villageName:info.village.name,
            villageHref:info.village.href,
            address:info.address,
            area:info.area,
            amount:info.amount,
            price:info.price,
            agentName:info.agent.name,
            agentHref:info.agent.href,
            maintainedAt:info.maintainedAt,
        }
    ).then(
        (insert)=>{ if(insert) console.log(`新增`);},
        e=>{console.log(e);}
    );
}



module.exports={persist};