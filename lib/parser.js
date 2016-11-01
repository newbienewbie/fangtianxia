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
    _parseHouseListItem(dlElement) {
        
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
            href:villageElement?this.host+villageElement.attr('href'):"",
        };

        const address=dd.find('p.mt10').find('span.iconAdress').text();

        const area = parseFloat(dd.find('div.area').text());

        const amount = parseFloat(dd.find('div.moreInfo p.mt5 span.price').text());

        const price = parseFloat(dd.find('div.moreInfo p.danjia').text());

        const agentElement = dd.find('p.gray6 >a[title*="个人网上店铺"]');
        const agent = {
            name: '',
            href: ''
        };
        if (agentElement) {
            agent.name = agentElement.text();
            agent.href = agentElement.attr('href')?this.host+agentElement.attr('href'):'';
        }


        const maintainedAt = dd.find('p.gray6 >span.gray9').text();

        return { title,href, house, village,address, area, amount, price, agent, maintainedAt };
    }

    /**
     * 解析每个分页中的 House-List
     */
    parseHouseList($){
        let list=[];
        $('div[name="div_houselist"] >dl').each((index, e) => {
            const info = this._parseHouseListItem(e);
            list.push(info);
        });
        return list;
    }

    /**
     * 解析下一页URL
     */
    parseNextPageUrl($){
        const nextPageElement = $('div[name="div_PageList"] a:contains("下一页")');
        let nextUrl = null;
        if (nextPageElement) {
            nextUrl = nextPageElement.attr("href");
        }
        return nextUrl;
    }
}


module.exports = Parser;