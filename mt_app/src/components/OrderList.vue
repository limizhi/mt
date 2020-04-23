<template>
  <div>
    <mt-header title="会员中心" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <h3> 您好~欢迎来到会员中心</h3>
    <h4 class="page-header">我的商品</h4>
    <div class="desc" v-for="(item,index) of orderList" :key="index">
      <div class="desc_img"><img :src="require(`../assets/${item.pic}`)" /></div>
      <span>商品名：{{item.title}}</span>
      <span>数量：{{item.count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"orderlist",
  data(){
    return {
      // uname:sessionStorage.getItem('uname'),
      orderList:[]
    }
  },
  methods :{
     // 获取用户的订单列表
    getOrderList(){
      this.$axios.post("/order/list", this.$qs.stringify(
        {
          userId: sessionStorage.getItem('uid')
        }
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.orderList = res.data.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
  },
  mounted() {
    this.getOrderList();
  },
}
</script>

<style scoped>
  h3{
    color:#f50;
    margin-top:50px;
  }
  .desc{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .desc_img{
    margin:5px;
  }
  .desc img{
    width:55px;
    height:40px;
    border-radius: 20%;
  }
  .desc span{
    color:#bbb;
  }
</style>