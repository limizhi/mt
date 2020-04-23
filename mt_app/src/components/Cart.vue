<template>
  <div class="cart">
    <mt-header title="购物车" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="cart_header">
      <mt-button type="primary" @click="cartEmpty">清空购物车</mt-button>
      <span>已选商品:<em>{{checkCount}}</em></span>
      <span>总金额:<strong>¥{{orderAmount}}</strong></span>
      <mt-button type="primary" @click="orderConfirm">结算</mt-button>
    </div>
    <div class="cart_con">
      <div class="cartcon_title clearfloat">
        <span><input type="checkbox" class="checkbox_all" :checked="checkAllState" @click="checkAll" />全选</span>
        <span>商品信息</span>
        <span>单价</span>
        <span>数量</span>
        <span>金额</span>
        <span>操作</span>
      </div>
      <ul class="list">
        <li class="clearfloat" v-for="(item,index) of list" :key="index">
          <span><input type="checkbox" class="cart_checkbox" :checked="item.isChecked" @change="checkItem(index)" /></span>
          <div class="desc">
            <img :src="require(`../assets/${item.pic}`)" />
            <span class="cart_title">{{item.title}}</span>
          </div>
          <span class="price">¥{{item.price}}</span>
          <div class="cart_count">
            <span @click="minus(index)">-</span><input type="text" :value="item.count" disabled /><span @click="addNum(index)">+</span>
          </div>
          <strong>¥{{item.price * item.count}}</strong>
          <em @click="cartDel(index)">x</em>
        </li>
      </ul>
    </div>
    <div class="cart_header">
      <mt-button type="primary" @click="cartEmpty">清空购物车</mt-button>
      <span>已选商品:<em>{{checkCount}}</em></span>
      <span>总金额:<strong>{{orderAmount}}</strong></span>
      <mt-button type="primary" @click="orderConfirm">结算</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name:"cart",
  data(){
    return {
      list:[],
      orderAmount:0,
      checkAllState:false, //全选状态
      checkCount: 0 //选中商品的数量
    }
  },
  // created(){
  //   this.getCart();
  // },
  methods: {
    //查询购物车的内容
    getCart(){
      if(this.$global.isLogin){
        this.$axios.post("/cart/list",this.$qs.stringify({
          uid:sessionStorage.getItem('uid')
        })).then(res=>{
          console.log(res);
          if (res.data.code==200){
            this.list=res.data.data;
            //给每个商品添加选中状态
            for(var i=0;i<this.list.length;i++){
              this.list[i].isChecked=false;
            }
            // 计算订单金额
            // this.getOrderAmount();
          }
        }).catch(err=>{
          console.error(err);
        })
      }
    },
    //计算订单金额（当前购物车中的总金额）
    getOrderAmount(){
      this.orderAmount=0;
      for(var i=0;i<this.list.length;i++){
        if(this.list[i].isChecked){
          //单个商品的价格=单价x购买数量
          this.orderAmount+=this.list[i].price*this.list[i].count;
        }
      }
    },
    //删除购物车中商品
    cartDel(index){
      if (this.$global.isLogin){
        this.$axios.post("/cart/delete",this.$qs.stringify({
          ctid:this.list[index].ctid
        })).then(res=>{
          console.log(res)
          if(res.data.code==200) {
            //删除当前商品
            this.list.splice(index,1);
            if(this.checkCount>0){
              this.checkCount--;
              this.getOrderAmount();
            } 
          }
        }).catch(err=>{
          console.error(err);
        });
      }
    },
    cartEmpty(){
      if (this.$global.isLogin){
        this.$axios.post("/cart/empty",this.$qs.stringify({
          uid:sessionStorage.getItem('uid')
        })).then(res=>{
          console.log(res);
          if(res.data.code==200){
            // 刷新当前页面
            this.list=[];
            this.checkCount=0;
            this.getOrderAmount();
          }
        }).catch(err=>{
          console.error(err)
        });
      } else{
        this.$toast("请先登录");
        this.$router.push("/login");
      }
    },
    //全选
    checkAll(){
      //选中状态切换
      this.checkAllState=!this.checkAllState;
      for(let i=0; i<this.list.length; i++){
        //每个商品选中状态，与 "全选"一致
        this.list[i].isChecked=this.checkAllState;
      }
      //计算选中的课程数
      if(this.checkAllState){
        this.checkCount=this.list.length;
      }else{
        this.checkCount=0;
      }
      //计算订单金额
      this.getOrderAmount();
    },
    //单选
    checkItem(index){
      //当前商品 的选中状态切换
      this.list[index].isChecked=!this.list[index].isChecked;
      if(this.list[index].isChecked){
        //选中逻辑
        this.checkCount +=1;
      } else{
        //取消逻辑
        this.checkCount -=1;
      }
      //如果选中的商品数等于总的商品数 则全选
      this.checkAllState=this.checkCount==this.list.length;
      //计算订单金额
      this.getOrderAmount();
    },
    //商品数量递增
    addNum(index){
      //当前商品数量+1
      this.list[index].count++
      //计算订单金额
      this.getOrderAmount();
    },
    //商品数量减
    minus(index){
      //当前商品数量-1
      if(this.list[index].count>0){
        this.list[index].count--;
      }
      //计算订单金额
      this.getOrderAmount();
    },
    //结算
    orderConfirm(){
      if (this.orderAmount>0){
        //获取选中的商品
        var selected=[];
        for(let i=0;i<this.list.length;i++){
          if(this.list[i].isChecked){
            selected.push(this.list[i])
          }
        }
        //将选中的商品保存到session中
        sessionStorage.setItem("selected",JSON.stringify(selected));
        sessionStorage.setItem("orderAmount",this.orderAmount);
        //跳转到订单确认页
        this.$router.push("/orderconfirm");
      }else{
        this.$toast("请选择商品");
      }
    }
  },
  mounted(){
    this.getCart();
  }
}
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .cart_header {
    margin-top:45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart_header>span{
    /* font-style:normal; */
    font-size:14px;
    color:#f63;
  }
  .cart_header>span>strong{
    font-size:14px;
    color:#f63;
  }
  .mint-button{
    font-size:14px;
  }
  .cart_con{
    margin:10px 0;
    font-size:14px;
  }
  .cartcon_title{
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: #eee;
    border:1px solid #ddd;
  }
  .cartcon_title>span:nth-child(1){
    width: 15%;
  }
  .cartcon_title>span:nth-child(2){
      width: 20%;
  }
  .cartcon_title>span:nth-child(3){
      width: 16%;
  }
  .cartcon_title>span:nth-child(4){
      width: 18%;
  }
  .cartcon_title>span:nth-child(5){
      width: 17%;
  }
  .cartcon_title>span:nth-child(6){
      width: 14%;
  }
  .list{
    list-style: none;
    padding:0px;
  }
  .clearfloat{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .clearfloat>span{
    width:10%;
  }
  .desc{
    width:25%;
    display:flex;
    flex-direction: column;
  }
  .desc img{
    margin-top:8px;
    width:60%;
    margin-left:30%;
    border-radius: 25%;
  }
  .price{
    width:10%;
  }
  .cart_count{
    width:20%;
    margin-left:5%;
  }
  .clearfloat strong{
    width:15%;
  }
  .clearfloat em{
    width:15%;
  }
  .cart_count>span{
    display:inline-block;
    width:28%;
    border-radius:50%;
    background-color: #26a2ff;
  }
  .cart_count>input{
    width:30%;
    margin:0 0;
    border:none;
    text-align: center;
  }
</style>