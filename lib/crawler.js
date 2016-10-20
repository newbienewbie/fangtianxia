const fetch=require('node-fetch');
const cheerio=require('cheerio');
const Parser=require('./parser');
const persistenceService=require('./persistence-service');




class Crawler{


    constructor(host='http://esf.cz.fang.com'){
        this.host=host;
        this.parser=new Parser(host);
    }


    /**
    * 根据某个URL对应的分页的中的房价信息
    */
    crawlPage(url) {
        console.log(`当前正直抓取: ${url}`);
        return fetch(url)
            .then(resp => resp.text())
            .then(text => {
                let $ = cheerio.load(text);
                const that=this;
                // 依次解析每个house item
                $('div[name="div_houselist"] >dl').each((i, e) => {
                    let info = that.parser.parseHouseListItem(e);
                    // todo: 队列化
                    persistenceService.persist(info);
                });

                // 获取下一页的地址
                const nextPageElement = $('div[name="div_PageList"] a:contains("下一页")');
                let nextUrl = null;
                if (nextPageElement) {
                    nextUrl = nextPageElement.attr("href");
                }
                return Promise.resolve(nextUrl);
            })
    }


    /**
     * 抓取各页的所有房价信息，直至完成最后一页为止。
     */
    crawl(seed) {
        return this.crawlPage(seed)
            .then(nextpath => {
                if (nextpath) {
                    if (!this.host) {
                        throw 'HOST 不满足要求！';
                    }
                    const next = this.host + nextpath;
                    console.log(`捕获到下一页: ${next}`);
                    return this.crawl(next);
                } else {
                    console.log('未捕获到下一页，抓取结束');
                }
            });
    }


}


module.exports=Crawler;