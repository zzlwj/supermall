<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  export default {
    name: "Detail",
    components:{
      DetailNavBar
    },
    data(){
      return{
        iid:null
      }
    },
    created(){
      // console.log(this.$route.parmas.iid)
      // this.iid=this.$route.parmas.iid
      this.iid=this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
