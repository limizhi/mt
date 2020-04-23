<template>
  <div>
    <mt-header title="个人中心" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div>
      <mt-cell class="lo"  title="登录" to="/login"></mt-cell>
      <mt-cell title="注册" to="/reg"></mt-cell>
      <mt-button @click="logout">退出</mt-button>
    </div>
  </div> 
</template>

<script>
export default {
  methods: {
    logout(){
     // 删除登陆时赋值给session的信息
     var uid=sessionStorage.getItem('uid')
     if(!uid){
       this.$toast("您还未登录")
     }else{
       sessionStorage.removeItem('uid');
       this.$toast("您已退出登录")
       // 刷新当前页面
      // this.$router.push("/login")
      location.reload();
     } 
    }
  },
  
}
</script>

<style scoped>
  .lo {
    margin-top:35px !important;
 }
</style>