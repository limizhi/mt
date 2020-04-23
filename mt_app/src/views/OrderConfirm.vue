<template>
  <div class="order">
    <mt-header title="订单列表" fixed>
      <router-link to="/cart" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <h2 class="order_title title">选择收货地址<a href="">管理收货地址</a></h2>
    <div class="user_address">
      <ul class="list">
            <li class="active"><span></span>今麦郎	14765231859	北京 北京市 西城区 大方胡同2号 西单上国阙</li>
            <li><span></span>鄢倩文	17763258668	上海 上海市 浦东新区 陆家嘴大道 汤臣一品</li>
            <li><span></span>黄艳蓉	18865327963	深圳 深圳市 盐田区 盐梅路 天琴湾</li>
        </ul>
    </div>
    <h2 class="order_desc">确认订单信息</h2>
    <div class="order_list">
      <h3 class="clearfloat">
          <span>商品信息</span>
          <span>单价</span>
          <span>数量</span>
          <span>小计</span>
      </h3>
      <ul class="list-unstyled">
          <li v-for="(item, index) in list" :key="index">
              <img :src="require(`../assets/${item.pic}`)"/>
              <h4>{{item.title}}</h4>
              <span>¥{{item.price}}</span>
              <em>{{item.count}}</em>
              <strong>合计:¥{{item.price * item.count}}</strong>
          </li>
      </ul>
    </div>
    <h2 class="order_title">备注信息: <input type="text" /></h2>
    <div class="order_sum">
        <ul class="list-unstyled">
            <li><span>商品总金额：</span><span id="priceSum">¥{{orderAmount}}</span></li>
            <li><span>应付金额：</span><strong id="paySum">¥{{orderAmount}}</strong></li>
            <li><mt-button type="primary"  @click="orderCommit">提交订单</mt-button></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"orderConfirm",
  data(){
    return {
      list:[],
      orderAmount:sessionStorage.getItem('orderAmount')
    }
  },
  methods:{
    getSelected(){
      var selected=sessionStorage.getItem("selected");
      //将json字符串解析成js中的变量(数组，对象,...)
      this.list=JSON.parse(selected);
    },
    //提交订单接口的调用
    orderCommit(){
      this.$axios.post("/order/add",this.$qs.stringify({
        uid:sessionStorage.getItem('uid'),
        orderAmount:sessionStorage.getItem('orderAmount'),
        selected:sessionStorage.getItem('selected')  //数组
      })).then(res=>{
        console.log(res);
        if(res.data.code==200){
          this.$toast("添加成功");
          this.$router.push("/pay");
        }
      }).catch(err=>{
        console.error(err);
      });
    }
  },
  mounted(){
    console.log(sessionStorage);
    this.getSelected()
  }
}
</script>

<style scoped>
  
  .order_title{
    margin-top:30px;
    font-size:14px;
    color:#333;
    margin-bottom:15px;
    margin-left:-50%
  }
  .title{
    margin-top:50px; 
    }
  .order_desc{
    margin-top:30px;
    font-size:14px;
    color:#333;
    margin-bottom:15px;
    margin-left:-74%
  }
  .order_title>a{
    float:right;
    font-weight:lighter;
    text-decoration:underline;
    color:#26a2ff;
  }
  .order_title>input{
    width:20%;
    height:32px;
    border:1px solid #ccc;
  }
  .list{
    padding:5px;
  }
  ul>li{
    list-style-type: none;
    font-size:12px;
    margin-top:10px;
  }
  .user_address>ul>li.active {
    background: #fffce4;
    border:1px solid #ff6600;
  }
  .order_list>h3>span {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  }
  .order_list>h3>span:nth-child(1){
    width: 45%;
  }
  .order_list>h3>span:nth-child(2){
    width: 18%;
  }
  .order_list>h3>span:nth-child(3){
    width: 17%;
  }
  .order_list>h3>span:nth-child(4){
    width: 20%;
  }
  .order_list>ul>li>img,
  .order_list>ul>li>h4,
  .order_list>ul>li>span,
  .order_list>ul>li>em,
  .order_list>ul>li>strong {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  }
  .order_list>ul>li>img {
    width: 20%;
    max-height: 100px;
    border-radius: 25%;
  }
  .order_list>ul>li>h4 {
    padding-left: 20px;
    text-align: left;
    width: 35%;
    font-weight: lighter;
  }
  .order_list>ul>li>span {
    width: 15%;
  }
  .order_list>ul>li>em {
    width: 15%;
    font-style: normal;
  }
  .order_list>ul>li>strong {
    width: 30%;
    font-weight: bold;
    color:#f60;
  }
  .order_sum {
    margin-top: 15px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }
  .order_sum>ul>li {
    line-height: 30px;
    text-align: right;
    font-size: 14px;
  }
  .order_sum>ul>li>span,
  .order_sum>ul>li>strong{
    display: inline-block;
    text-align: right;
    font-style: normal;
  }
  .order_sum>ul>li>strong {
    color: #f60;
  }
  /* .order_sum>ul>li>button {
    width: 120px;
    height: 36px;
    background: #f63;
    font-size: 18px;
    color: #fff;
    border: none;
    margin-top:10px;
  }
  .order_sum>ul>li>button:hover{
    background: #fc5a25;
  } */
</style>