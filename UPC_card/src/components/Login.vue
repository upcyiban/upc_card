<template>
  <div class="homepage-container" align="center">
    <div class="header"></div>
    <div class="logo" align="center">
      <img :src="imglogo" width="150px" height="150px">
    </div>
    <div class="user1">
      <div class="user1">
        <input type="text" class="name" placeholder="数字石大账号" v-model="username">
      </div>
      <div class="user2">
        <input type="password" class="password" placeholder="数字石大密码" v-model="password">
      </div>
    </div>

    <div class="butt" @click="check">登录</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'log',
  data () {
    return {
      imglogo:require("../assets/logo.jpg"),
      username: '',
      password: ''
    }
  },
  methods: {
    check () {
      axios.post('/api/login', {
        studentid: this.username,
        password: this.password
      }).then(rsp => {
        console.log(rsp.data)
        if(rsp.data === true){
          window.localStorage.studentid = this.username
          this.$router.push('/homepage')
        } else {
          alert('用户名或密码错误')
        }
      })
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
  height: 80px;
}
.logo{
  height:150px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
.logo img{
  border-radius: 50%;
}
.user1{
  height:60px;
  margin-top:40px;
  line-height: 200%;
  font-size: 1rem;
}
.user2{
  height:60px;
  margin-top:20px;
  line-height: 200%;
  font-size: 1rem;
}
.name,.password {
  border: none 0;
  height: 40px;
  width: 300px;
  outline: medium;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: transparent;
  border-bottom: 1px solid rgb(131, 127, 127);
  font-size:1rem;
}
.name{
  height: 30px;
}
.butt{
  width:290px;
  height:50px;
  margin-top: 140px;
  background:rgb(241, 83, 96);
  color: white;
  border:none;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
}
</style>
