import {request} from "./request";

export function getDetail(iid) {
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:"/recommend"
  })
}

export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price //当前价格
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc //折扣活动
    this.columns=columns
    this.services=services
    this.realPrice=itemInfo.lowNowPrice
    this.discountBgColor=itemInfo.discountBgColor //背景颜色
  }
}

export class Shop{
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo; //Logo
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells; //销量
    this.score=shopInfo.score; //商品评分
    this.goodsCount=shopInfo.cGoods; //商品个数
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

