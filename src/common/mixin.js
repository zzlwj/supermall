import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop";
import {BACK_POSITION} from "common/const"

export const itemListenerMixin={
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    // 1.图片加载完成的事件监听
    this.newRefresh=debounce(this.$refs.scroll.refresh,100)
    // 对监听的事件进行保存
    this.itemImgListener=()=>{
      this.newRefresh()
    }
    // 3.监听item中图片加载完成
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

export const bacTopMixin={
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop:true
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      this.isShowBackTop=-position.y>BACK_POSITION
    }
  }
}
