<template>
  <div>
    <mt-header title="支付列表" fixed>
      <router-link to="/orderconfirm" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <h3>Sorry,this function is still in optimization,please try again later!</h3>
    <h3>(对不起，此功能还在优化中，请稍后再试!)</h3>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  h3{
    color:#f60;
  }
</style>