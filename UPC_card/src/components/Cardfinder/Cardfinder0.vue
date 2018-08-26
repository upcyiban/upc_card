<template>
  <div class="cardfinder-container">
    <backhomepage></backhomepage>
    <div class="select-container">
      <div style="background:rgb(255, 255, 154)" @click="gopickedcard">找主人</div>
      <div style="margin-left:1pxbackground:white" @click="golostcard">找卡</div>
    </div>
    <div class="cardinfos">
      <div class="cardinfo" v-for="info in infos" :key="info.num">
        <div class="studentinfo">
          <div style="color:grey;width:20%">姓名</div>{{info.name}}
          <div style="color:grey;width:20%">学号</div>{{info.studentid}}
        </div>
        <div class="contactinfo">
          <div style="color:grey;width:40%">请联系失主</div>{{info.contact}}
        </div>
        <div class="remark">
          <div style="color:grey;width:20%">备注</div>{{info.comment}}
        </div>
      </div>
    </div>
    <div class="porl-container">
      <div style="border-right:solid 1px grey" @click="gopicked">我捡到卡了</div>
      <div @click="golost">我的卡丢了</div>
    </div>
  </div>
</template>
<script>
import backhomepage from '../components/Backhomepage'
import axios from 'axios';

export default {
  name:'cardfinder0',
  components:{
    backhomepage,
  },
  data(){
    return{
      infos:[]
    }
  },
  methods:{
    gopicked(){
      this.$router.push({path:'/picked'})
    },
    golost(){
      this.$router.push({path:'/lost'})
    },
    gopickedcard(){
      this.$router.push({path:'/pickedcard'})
    },
    golostcard(){
      this.$router.push({path:'/lostcard'})
    },
    fetch () {
      let type = 1
      axios.post('/api/lostfound', {
        type: type
      }).then(rsp => {
        this.$set(this,'infos',rsp.data)
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style scoped>
a{
  outline-style: none;
  color: black;
}
.findp{
  background:white!important;
}
.findc{
  background:rgb(255, 255, 154)!important;
}
.porl-container{
  width: 100%;
  height: 8%;
  position: fixed;
  bottom: 0px;
  background: rgb(255, 255, 154);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.porl-container a{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.porl-container div{
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: black;
}
.studentinfo{
  color: black;
}
.contactinfo{
  color: black;
}
.cardinfo div{
  height: 8rem;
  position: relative;
  left: 5%;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: dashed 2px darkgray;
}
.remark{
  border-bottom:none !important;
  color: black;
}
.remark div{
  border-bottom:none !important;
}
.studentinfo div{
  border-bottom:none;
}
.contactinfo div{
  border-bottom:none;
}
.cardinfo{
  margin-bottom: 1rem;
  height: 8rem;
  position: relative;
  left: 8%;
  width: 84%;
  background: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cardinfos{
  width: 100%;
  height: 84%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.select-container{
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.select-container div{
  width: 4.5rem;
  height: 2rem;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem
}
.cardfinder-container{
  width: 100%;
  height: 100%;
  background: rgb(255, 215, 215);
  font-size: 16px;
}
</style>
