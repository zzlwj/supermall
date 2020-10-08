<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- <scroll class="content" ref="contentscroll" > -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <!-- <detail-goods-info :detail-info="detailInfo"/> -->
      <detail-param-info :param-info="paramInfo" ref="parmas"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>


  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,bacTopMixin} from "common/mixin"
  import {debounce} from "common/utils"

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins:[itemListenerMixin,bacTopMixin],
    data(){
      return{
        iid:'',
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    created(){
      //1.保存传入的iid
      this.iid=this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        const data=res.result
        // 2.1获取顶部的图片轮播图
        this.topImages=data.itemInfo.topImages
        // 2.2获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 2.3.创建店铺信息对象
        this.shop=new Shop(data.shopInfo)
        // 2.4.获取商品详细信息
        this.detailInfo=data.detailInfo
        // console.log(data.rate)
        // 2.5.获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 2.6.获取评论信息
        if (data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }
        // 1.第一次获取,值不对.
        // 2.值不对的原因:this.$refs.parmas.$el没有渲染
        // this.themeTopYs=[]
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.parmas.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

        // this.$nextTick(()=>{
          // 2.第二次获取:值不对.
          // 值不对的原因:图片没有计算在内
          // 根据最新的数据,对应的DOM是已经被渲染出来
          //但图片依然没有加载完(目前获取到的offsetTop不包含图片)
          //凡offsetTop值不对时,都是因为图片的问题
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.parmas.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends=res.data.list
      })
      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.parmas.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs)
      },100)
    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      detailImageLoad(){
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        // 1.获取y值
        const positionY=-position.y
        // 2.positionY和主题中值进行对比
        //[0,7983,9120,9452,非常大的值]
        // Number.MAX_VALUE

        // positionY在0和7983之间,index=0
        // positionY在7983和9120之间,index=1
        // positionY在9120和9452之间,index=2
        // positionY在9120和非常大的值之间,index=3

        let length=this.themeTopYs.length

        for(let i=0;i<length-1;i++){
          if (this.currentIndex!==i && (positionY>=this.themeTopYs[i] &&
               positionY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
          }
        }

        // for(let i=0;i<length;i++){
        //   if (this.currentIndex!==i && ((i<length-1 &&
        //        positionY>=this.themeTopYs[i] &&
        //        positionY<this.themeTopYs[i+1])||
        //        (i===length-1 && positionY>=this.themeTopYs[i]))){
        //     this.currentIndex=i;
        //     this.$refs.nav.currentIndex=this.currentIndex;
        //   }
        // }

        // 3.是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid

        // 2.将商品添加到购物车里
      }
    }
  }
</script>

<style scoped>
  .detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  /* .detail-nav{
    background-color: #fff;
    position: relative;
    z-index: 9;
  } */
  .content{
    height: calc(100% - 44px - 49px);
    background-color: #fff;
  }
</style>
