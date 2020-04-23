<template>
  <div>
    <div>
      <mt-header fixed title="川湘小厨"></mt-header>
    </div>
    <div class="wipe">
      <mt-swipe :auto="3000" :show-indicators="false" >
        <mt-swipe-item>
          <img src="../assets/img-carousel/07.jpg">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img-carousel/03.jpg">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img-carousel/04.jpg">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img-carousel/05.jpg">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img-carousel/06.jpg">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    
    <div style="margin-top:20px;"></div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="foods">
        <product></product>
      </mt-tab-container-item>
      <mt-tab-container-item id="cart">
        <cart></cart>
      </mt-tab-container-item>
      <mt-tab-container-item id="my">
        <mine></mine>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="active" fixed>
      <mt-tab-item id="foods">美食</mt-tab-item>
      <mt-tab-item id="cart">购物车</mt-tab-item>
      <mt-tab-item id="my">我的</mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
//引入product组件
import Product from "../components/Product.vue"
import Cart from "../components/Cart.vue"
import Mine from "../views/Mine.vue"
export default {
  data(){
    return {
      active:"foods"
    }
  },
  methods: {
    
  },
  components:{
    "product":Product,
    "cart":Cart,
    "mine":Mine
  }
}
</script>

<style scoped>

.mint-swipe{
  height:200px;
  width:100%;
  margin:0 auto;
  margin-top:55px;
  
}
.mint-swipe-item{
 
 margin:0 auto;
}
img{
  width:100%;
  height:200px;
  overflow: hidden;
}
</style>