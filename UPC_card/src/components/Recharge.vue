<template>
  <div class="homepage-container" align="center">
    <div class="header">
      <backhomepage></backhomepage>
    </div>
    <div class="totalmoney">
      <img :src="imgamount" width="70px" height="70px">
      <div>{{amount}}</div>
    </div>
    <div class="user">
      <div>{{name}}</div>
      <div>学工号：{{studentid}}</div>
    </div><br><br>
    <div class="part">
      <p class="font">请输入圈存金额（整数，单位：元）</p>
      <br>
      <div class="input2">
        <img src="../assets/钱袋.png" class="img">
        <input type="number" class="input" v-model="charge">
      </div>
    </div>
    <br><br>
    <div>
      <button class="button" @click="pay">充值圈存</button>
    </div><br><br>
  </div>
</template>

<script>
  import backhomepage from './components/Backhomepage'
  import axios from 'axios'
  export default {
    name: "Recharge",
    data() {
      return {
        charge: '',
        amount: window.localStorage.remain,
        name: window.localStorage.name,
        studentid: window.localStorage.studentid,
        imgamount: require("../assets/余额.png"),
      }
    },
    components:{
      backhomepage,
    },
    methods: {
      pay () {
        axios.post('/api/pay', {
          studentid: this.studentid,
          amount: parseInt(this.charge)
        }).then(rsp => {
          if(rsp.data.result === true){
            window.localStorage.remain = new Number(window.localStorage.remain) + new Number(this.charge)
            this.amount = window.localStorage.remain
            alert(`成功充值${parseInt(this.charge)}元！`)
            this.charge = ''
          }
        })
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
  }
  .header{
    height: 40px;
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
    margin-top:20px;
    line-height: 200%;
    font-size: 20px;
    color:	#808080;
  }
  .font{
    color:white;
    font-size:16px ;
  }
  .part {
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius: 10px;
    background:	#FFD700;
    width: 85%;
    height: 140px;
    margin: 10px;
  }
  .input{
    border: none;
    width:140px;
    height:36px;
    outline: none;
    font-size: 24px;
  }
  .input2{
    background-color: white;
    border-radius: 5px;

  }
  .button{
    background-color: #ef4136;
    color: white;
    width: 140px;
    height:40px;
    border: none;
    border-radius: 5px;
  }
  .img{
    width: 30px;
    height: 30px;
    padding-left: 5px;
    padding-top: 5px;
  }
</style>
