const cheerio = require('cheerio');


/**
 * 解析器
 */
class Parser {


    constructor(host = "http://esf.cz.fang.com") {
        this.host = host;
    }

    /**
     * 解析各个分页中的 House-List-Item
     */
    parseHouseListItem(dlElement) {
        
        const e = cheerio(dlElement);
        const dt = cheerio(e).find("dt");
        const dd = cheerio(e).find("dd");

        const title = dd.find('p.title').text().trim();

        let titleHrefElementAttr=dd.find('p.title a[href]').attr('href');
        const href=titleHrefElementAttr?this.host+titleHrefElementAttr:"";
        const house = dd.find('p.mt12').text().split(/\|/).map(e => e.trim());


        const villageElement=dd.find('p.mt10 a[href*="house"]');
        const village={
            name:villageElement.text(),
            href:villageElement.attr('href'),
        };

        const address=dd.find('p.mt10').find('span.iconAdress').text();

        const area = dd.find('div.area').text();

        const amount = dd.find('div.moreInfo p.mt5 span.price').text();

        const price = dd.find('div.moreInfo p.danjia').text();

        const agentElement = dd.find('p.gray6 >a[title*="个人网上店铺"]');
        const agent = {
            name: '',
            link: ''
        };
        if (agentElement) {
            agent.name = agentElement.text();
            agent.link = agentElement.attr('href')?this.host+agentElement.attr('href'):'';
        }


        const updatedAt = dd.find('p.gray6 >span.gray9').text();

        return { title,href, house, village,address, area, amount, price, agent, updatedAt };
    }

    
}


module.exports = Parser;