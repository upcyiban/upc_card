<template>
  <div class="homepage-container" align="center">
    <div class="header">
      <img :src="imgbear" width="90px" height="90px" @click="goToYearStatistics">
    </div>
    <div class="totalmoney" align="center">
      <img :src="imgamount" width="70px" height="70px">
      <div>{{amount}}</div>
    </div>
    <div class="user">
      <div>{{name}}</div>
      <div>学工号：{{studentid}}</div>
    </div>
    <div class="optionrow1">
      <router-link to="/records">
      <div class="part1">
        <img :src="img1" width="25px" height="25px">
        <div>流水查询</div>
      </div>
      </router-link>
      <router-link to="/monthrecords">
      <div class="part2">
        <img :src="img2" width="25px" height="25px">
        <div>月度账单</div>
      </div>
      </router-link>
    </div>
    <div class="optionrow2">
      <router-link to="/recharge">
      <div class="part3">
        <img :src="img3" width="25px" height="25px">
        <div>充值圈存</div>
      </div>
      </router-link>
      <router-link to="/pickedcard">
      <div class="part4">
        <img :src="img4" width="25px" height="25px">
        <div>找卡神器</div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Homepage',
  data () {
    return {
      amount:"",
      imgamount:require("../assets/余额.png"),
      imgbear:require("../assets/bear.png"),
      img1:require("../assets/查询.png"),
      img2:require("../assets/账单.png"),
      img3:require("../assets/充值.png"),
      img4:require("../assets/失物招领.png"),
      name:"",
      studentid:window.localStorage.studentid,
    }
  },
  created () {
    if(window.localStorage.name) {
      this.name = window.localStorage.name
      this.amount = window.localStorage.remain
    }
    axios.post('/api/home', {
      studentid: window.localStorage.studentid
    }).then(rsp => {
      this.amount = rsp.data.remain
      this.name = rsp.data.name
      window.localStorage.remain = this.amount
      window.localStorage.name = this.name
    })
  },
  methods: {
    goToYearStatistics(){
      window.location.href = 'http://192.168.43.218:8081/'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homepage-container{
  background-color:rgb(255, 215, 215);
  height:100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.header{
  height: 90px;
}
.header img{
  position: absolute;
  right: 0;
  transform: translateX(20%);
}
.totalmoney{
  height:170px;
  width: 170px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  color: rgb(228, 79, 103);
  font-size: 30px;
  border: 1px solid white;
  border-radius: 50%;
}
.user{
  height:100px;
  margin-top:17px;
  line-height: 200%;
  font-size: 20px;
  color: rgb(128, 120, 120);
}
.optionrow1{
  margin-top: 0px;
  display: flex;
  flex-wrap:wrap;
  justify-content:center;
  color: white;
}
.optionrow2{
  display: flex;
  flex-wrap:wrap;
  justify-content:center;
}
.part1 {
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:nowrap;
    border-radius: 15px;
    background: rgb(245, 144, 76);
    color: white;
    font-size: 17px;
    width: 145px;
    height: 80px;
    margin: 10px;
}
.part1 div{
  margin-left: 1rem;
}
.part2 {
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:nowrap;
    border-radius: 15px;
    background: rgb(252, 111, 60);
    color:white;
    font-size: 17px;
    margin: 40px;
    width: 145px;
    height: 80px;
    margin: 10px;
}
.part2 div{
  margin-left: 1rem;
}
.part3 {
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:nowrap;
    border-radius: 15px;
    background: rgb(241, 209, 64);
    color: white;
    font-size: 17px;
    margin: 40px;
    width: 145px;
    height: 80px;
    margin: 10px;
}
.part3 div{
  margin-left: 1rem;
}
.part4 {
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    flex-wrap:nowrap;
    border-radius: 15px;
    background:rgb(116, 116, 241);
    color: white;
    font-size: 17px;
    margin: 40px;
    width: 145px;
    height: 80px;
    margin: 10px;
}
.part4 div{
  margin-left: 1rem;
}
</style>
