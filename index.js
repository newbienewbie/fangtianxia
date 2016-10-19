const Crawler=require('./lib/crawler');



// URL 构成:
// - esf : 二手房
// cz : 常州
const host="http://esf.cz.fang.com";
// 新建爬虫
const crawler=new Crawler(host);

// 创建种子
// house-{区代码}-{镇代码}/{总价区间代码}: 
const seed=host+'/house-a0342/c280-d2100/';

// 抓取
crawler.crawl(seed);