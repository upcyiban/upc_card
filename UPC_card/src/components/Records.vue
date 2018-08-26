<template>
  <div class="record-container">
    <backhomepage></backhomepage>
    <Row id="selectdate">
        <Col span="12" style="width: 70%">
            <DatePicker type="date" placeholder="请选择日期" style="width: 100%" v-model="date"></DatePicker>
        </Col>
        <Button @click="refresh">查询</Button>
    </Row>
    <div class="record-date">
      <i class="fa fa-calendar fa-1x" id="date"></i>
      <div>{{getDate}}</div>
    </div>
    <div class="dayrecord-container">
      <div class="records">
        <div class="record" v-for="record in records" :key="record.num">
          <div class="recordinfo">
            <span style="color:#ececec">时间</span>
            <span style="margin-left:1rem;color:white">{{record.timestr}}</span>
          </div>
          <div class="recordinfo">
            <span style="color:#ececec">地点</span>
            <span style="margin-left:1rem;color:white">{{record.address}}</span>
          </div>
          <div class="recordinfo">
            <span style="color:#ececec;font-size:1rem">金额</span>
            <span style="margin-left:1rem;color:white">￥{{record.amount}}</span>
            <div class="recordinfo" style="position:absolute;right:0">
              <div style="color:#ececec;font-size:1.2rem">余额</div>
              <div style="margin-left:1rem;color:white;font-size:1.2rem">{{record.remain}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backhomepage from './components/Backhomepage'
import axios from 'axios'
import dateUtil from 'iview/src/utils/date'
export default {
  name: 'records',
  components:{
    backhomepage,
  },
  data () {
    return {
      back: require("../assets/返回.png"),
      currentDate: undefined,
      date: undefined,
      records:[
      ]
    }
  },
  computed: {
    getDate(){
      if (this.currentDate !== undefined)
      return dateUtil.format(this.currentDate, 'yyyy-MM-dd')
      else return '2018-1-1'
    }
  },
  methods:{
    getHistory(date){
      let date2=dateUtil.format(date, 'yyyy-MM-dd')
      let datef = date2.replace(/-/g,'/').split('/')
      datef[1]=parseInt(datef[1]).toString()
      datef[2]=parseInt(datef[2]).toString()
      datef = datef.join('/')
      console.log(datef)
      axios.post('/api/history', {
        studentid: window.localStorage.studentid,
        date: datef
      }).then(rsp => {
        console.log(rsp.data)
        this.$set(this,'records',rsp.data)
        this.$set(this,'currentDate',date)
      })
    },
    refresh () {
      this.getHistory(this.date)
    }
  },
  created () {
    let date = new Date()
    this.date = date
    this.currentDate
    this.getHistory(date)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
Button{
  font-size: 0.8rem;
  margin-left: 5%;
}
button{
  text-align: center;
}
.recordinfo{
  display: flex;
  flex-direction: row;
  margin-bottom: 0.4rem;
  align-items: center;
}
.recordinfo span{
  font-size: 1rem;
}
.records{
  margin-left: 1rem;
}
.record{
  width: 90%;
  height: 6rem;
  background: rgb(255, 155, 105);
  margin: 0 auto;
  -webkit-border-radius: 1rem;
     -moz-border-radius: 1rem;
          border-radius: 1rem;
  position: relative;
  border: 10px solid rgb(255, 155, 105);
  margin-bottom: 1rem;
}
.record::before{
  content: '';
  position: absolute;
  top: 1.8rem;
  right: 100%;
  border-bottom: 1.5rem solid transparent;
  border-right: 1.5rem solid rgb(255, 155, 105);
  border-top: 1.5rem solid transparent;
}
.record-container{
  height: 100%;
  width: 100%;
  background: rgb(255, 215, 215);
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.dayrecord-container{
  position: relative;
  left: 5%;
  top: 7.5rem;
  height: 75%;
  width: 90%;
  border-left: dashed 1px grey;
  overflow-x: hidden;
  overflow-y: scroll;

}
.record-date{
  position: relative;
  left: 5%;
  top: 7rem;
  width: 80%;
  height: 2rem;
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;

}
.record-date div{
  margin-left: 0.6rem;
  font-size: 1rem;

}
#back{
  position: absolute;
  left: 1rem;
  top: 1rem;
}
#dateicon{
  position: absolute;
  right: 1.5rem;

}
#selectdate{
  position: absolute;
  left: 5%;
  top: 4rem;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content:center;
}
</style>
