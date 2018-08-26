<template>
<div class="picked-container">
  <back></back>
  <div class="form">
    <div class="studentname">
      姓名 <input type="text" name="" id="" v-model="name">
    </div>
    <div class="studentID">
      学号 <input type="text" name="" id="" v-model="studentid">
    </div>
    <div class="contectinfo">
      请失主联系 <input type="text" name="" id="" v-model="contact">
    </div>
    <div class="remark" v-model="comment">
      备注
    </div>
    <textarea name="" id="" cols="30" rows="10"></textarea>
  </div>
  <div class="submit" @click="submit">
    提交
  </div>
</div>
</template>
<script>
import back from '../components/Back'
import axios from 'axios'
export default {
  name:'picked',
  components:{
    back,
  },
  data(){
    return {
      studentid: '',
      name: '',
      contact: '',
      comment: ''
    }
  },
  methods: {
    submit () {
      axios.post('/api/submit', {
        type: 1,
        name: this.name,
        studentid: this.studentid,
        contact: this.contact,
        comment: this.comment
      }).then(rsp => {
        if(rsp.data.result === true){
          alert('提交成功！')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style scoped>
.picked-container{
  width: 100%;
  height: 100%;
  background: rgb(255, 215, 215);
  overflow: hidden;
}
.form{
  position: relative;
  top: 15%;
  left:8%;
  width: 84%;
  height: 50%;
  background: white;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
}
.submit{
  position: relative;
  top: 25%;
  left:20%;
  width: 60%;
  height: 3rem;
  border-radius: 5%;
  background: rgb(255, 255, 155);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  font-size: 1rem;
}
.form div{
  height: 2rem;
  position: relative;
  left: 8%;
  width: 84%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 1.2rem;
}
.form input{
  height: 2rem;
  position: relative;
  left: 5%;
  width: 60%;
  font-size: 1.2rem;
  border: none;
  border-bottom: solid 1px black;
  outline:none;
}
.form textarea{
  position: relative;
  left: 8%;
  width: 84%;
  height: 40%;
  font-size: 1rem;
  outline:none;
  border-radius: 5px;
  margin-bottom: 2rem;
}
</style>
