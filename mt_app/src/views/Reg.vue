<template id="app">
  <div class="app-reg">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/Reg">Reg</router-link>
    </div>
    <div class="re"><img class="reg" src="../assets/images/login.jpg" alt="" /></div>
    
      <div>
        <mt-field placeholder="请输入用户名" type="text" v-model="form.uname" class="fie"></mt-field>
        <mt-field placeholder="请输入手机号" type="text" v-model="form.phone" class="fie"></mt-field>
        <mt-field placeholder="请输入密码" class="fie" v-model="form.upwd" type="password"></mt-field>
      </div>
      <mt-button size="large" type="primary" @click="reg">注册</mt-button>
    
    
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Reg",
  data() {
    return {
      form: {
        uname: "",
        upwd: "",
        // upwd2: "",
        phone: ""
      }
    }
  },
  methods: {
    // 注册表单提交方法
    reg() {
      // 检测用户名
      // 检测手机号
      var u=this.form.uname;
      //获取手机号
      var phone=this.form.phone;
      //获取密码
      var p=this.form.upwd
      console.log(this.form);
      //非空验证
      //1.检测用户名是否为空
      //创建正则验证用户名 密码 手机号
      var up = /^[a-z0-9]{3,12}$/i;
      //5.检测用户名的合法性
      var un=/^[a-zA-Z]{3,12}$/;
      if(!un.test(u)){
          this.$toast("用户名格式错误")
          return;
      }

      var pt=/^1[3-9]\d{9}$/;
      if(!pt.test(phone)){
         this.$toast("手机号不合法")
          return;
      }

      if(!up.test(p)){
       this.$toast("密码格式不正确");
       return;
      }
      this.$axios.post("/user/reg", qs.stringify(
        this.form
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 将注册用户的uid和uname赋值到session中
          sessionStorage.uid = res.data.data.uid;
          sessionStorage.uname = res.data.data.uname;
          this.$toast("恭喜你,注册成功");
          // 跳转到登录页面
          this.$router.push("/login")
          //location.reload();
         // history.back(); // historoy.go(-1)
        }
      }).catch(err => {
        console.error(err);
      });
    },
   },
}
</script>

<style scoped>
  .re{
    margin-top:50px;
    margin-bottom:55px;
  }
  .reg{
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
