<template id="app">
  <div class="app-login">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/Reg">Reg</router-link>
    </div>
    <div class="lo">
      <img class="log" src="../assets/images/login.jpg" />
    </div>
    <!--h1>Login.vue</h1-->
    <!--1：用户名输入框-->
    <mt-field placeholder="请输入用户名" v-model="form.uname" class="fie"></mt-field>
    <!--2: 密码输入框-->
    <mt-field placeholder="请输入用户密码" v-model="form.upwd" type="password" class="fie"></mt-field>
    <!--3: 登陆按钮-->
    <mt-button size="large" type="primary" @click="login">登录</mt-button>
    
  </div>

</template>
<script>
import qs from "qs";
export default {
  name: "login",
  data(){
    return {
      form: {
        uname: "",
        upwd: ""
      }
    }
  },
  methods: {
    login(){
      this.$axios.post("/user/login", qs.stringify(
        this.form
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 将登陆用户的uid和uname赋值到session中
          sessionStorage.uid = res.data.data.uid;
          sessionStorage.uname = res.data.data.uname;
          this.$toast("登陆成功");
          // 跳转到首页
          this.$router.push("/");
          location.reload();
          // location.href = https://www.baidu.com
        }else{
          this.$toast("用户名或密码错误")
        }
      }).catch(err => {
        console.error(err);
      });
    }
  },
}
</script>

<style>
 .lo{
    margin-top:120px;
    margin-bottom:55px;
  }
  .log{
    width:100px;
    height:100px;
    border-radius: 50%;
  }
  .fie{
    margin-bottom:15px;
    text-align: center !important;
    border:1px solid #ccc;
    border-radius:5px;
  }
  .mint-button{
    margin-top:30px;
  }
</style>