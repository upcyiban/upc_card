<template>
  <div class="homepage-container" align="center">
    <div class="header"></div>
    <div class="logo" align="center">
      <img :src="imglogo" width="70px" height="70px">
    </div>
    <div class="user">
      <input type="text" name="name" placeholder="数字石大账号">
      <input type="password" name="password"  placeholder="数字石大密码">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
      imglogo:require("../assets/logo.jpg"),
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homepage-container{
  background-color:pink;
  height:100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.header{
  height: 40px;
}
.logo{
  height:70px;
  width: 70px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  border-radius: 50%;
}
.user{
  height:100px;
  margin-top:20px;
  line-height: 200%;
  font-size: 20px;
}

</style>
