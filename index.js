const Crawler=require('./lib/crawler');
const changzhou=require('./seed/changzhou-50.json');



// URL 构成:
// - esf : 二手房
// cz : 常州
const host="http://esf.cz.fang.com";
// 新建爬虫
const crawler=new Crawler(host);


// 创建种子，种子是一个相对URL
// 目前总是以/house-开头，完整的格式为：
// /house-{区代码}-{镇代码}/{总价区间代码}-{分页代码}: 
// eg:'/house-a0341-b013685/d250/';
let path=changzhou.children.filter(k=>k.name=="新北")[0].index;
let condition="d250";
const seed=host+path+condition;
console.log(seed);

// 抓取
crawler.crawl(seed);