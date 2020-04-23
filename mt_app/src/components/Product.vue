<template>
  <!--1:弹性布局-->
  <div class="product_app">
    <!--2:一个商品-->
    <div class="goods-item" v-for="(item,i) of list" :key="i">
      <!--3:商品图片-->
      <img :src="require(`../assets/${item.pic}`)" />
      <!-- <img :src="'../assets/'+item.pic" /> -->
      <!-- <img src="../assets/img-product/01.png" /> -->
      <!--4:商品名称-->
      <h4>{{item.title}}</h4>
      <!--5:商品价格-->
      <h5 class="price">￥{{item.price.toFixed(2)}}</h5>
      <!--6:加入购物车按钮-->
      <mt-button type="primary" @click="addCart(item.pid)">
        加入购物车
      </mt-button>
      <!-- <mt-button type="primary" @click="addCart(item.pid)">加入购物车</mt-button> -->
    </div>
    <!--7:查看购物车按钮-->
     <mt-button size="large" type="primary" @click="cart">
       查看购物车
     </mt-button>
    <!--8:加载更多按钮-->
     <mt-button class="jz" size="large" type="primary" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name:"product",
  data(){
    return {
       list:[],//保存服务器返回数据
       pno:0, //表示当前页码
    }
  },
  methods:{
    cart(){
      this.$router.push("/cart")
    },
    loadMore(){
      //加载商品列表
      //2:创建变量obj请示服务器参数
      if(this.pno<4){
        this.pno++;
        var obj = {pno:this.pno}
        console.log(obj)
        //3:发送请求
        this.$axios.get("/product/list",{params:obj}).then(res=>{
        console.log(res)
        console.log(res.data.data)
        //4:获取服务器返回结果
        //5:在data添加属性list
        //6:将返回数据保存list
        //问题:保存多页数据
        //解决:concat 数组拼接
        //this.list = res.data.data;
        //6.1:拼接多页数据
        var rows = this.list.concat(res.data.data);
        //6.2:赋值
        this.list = rows;
        console.log(this.list)
        }) 
      }else{
        this.$toast("我是有底线的")
      }
    },
    addCart(pid,uid){
      var obj={pid,uid:sessionStorage.getItem('uid')}
      console.log(obj);
      // console.log(123)
      if(this.$global.isLogin){
        // this.$axios.post("/cart/add",this.$qs.stringify({
        //   pid:this.$route.query.pid,
        //   uid:sessionStorage.getItem('uid')
        // })
        this.$axios.get("/cart/add",{params:obj}).then(res=>{
          console.log(res);
          this.$toast("添加购物车成功")
        }).catch(err=>{
          console.error(err);
        });
      }else{
        //如果用户没有登录，则跳转登录页面
        this.$toast("请先登录");
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.loadMore();
  }
}
</script>

<style scoped>
  /*外层父元素:弹性布局*/
.product_app{
  display: flex;
  flex-wrap: wrap;/*子元素换行*/
  /*子元素两端对齐*/
  justify-content: space-between;
  padding:4px;
}
/*一个商品*/
.goods-item{
  width:48%;/*占用屏幕一半*/
  border:1px solid #ccc;
  border-radius: 5px;/*圆角*/
  margin:2px 0;/*外边距*/
  padding:2px;
  display: flex;/*子元素弹性*/
  flex-direction: column;/*列*/
  /* min-height: 257px; */
}
/*商品里图片*/ 
.goods-item img{
  width:100%;
  border-radius:20%;
  border-radius: 20%;
}
/**商品名 */
.goods-item h4{
  margin: 7px auto;
  font-size:20px;
}
.goods-item h5{
  margin:7px auto;
  font-size:18px;
  color:#f00;
}
.mint-button{
  margin-bottom:5px;
}
.jz{
  margin-bottom:20px;
}
</style>