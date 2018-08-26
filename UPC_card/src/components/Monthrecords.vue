<template>
<div class="month-container">
  <backhomepage></backhomepage>
  <Row id="selectdate">
        <Col span="12" style="width: 70%">
            <DatePicker type="year" placeholder="请选择年份" style="width: 100%"></DatePicker>
        </Col>
        <Button>查询</Button>
  </Row>
  <div class="monthselect">
    <div class="monthimgs" v-for="(month,index) in months" :key="month.num">
      <div @click="goto(index)">
        <img class="monthimg" :src="month.monthimg" alt="">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import backhomepage from './components/Backhomepage'

export default {
  name: 'monthrecords',
  components:{
    backhomepage,
  },
  data(){
    return{
      months:[
        {
          monthimg:require('../assets/一月.jpg'),
        },
        {
          monthimg:require('../assets/二月.jpg'),
        },
        {
          monthimg:require('../assets/三月.jpg'),
        },
        {
          monthimg:require('../assets/四月.jpg'),
        },
        {
          monthimg:require('../assets/五月.jpg'),
        },
        {
          monthimg:require('../assets/六月.jpg'),
        },
        {
          monthimg:require('../assets/七月.jpg'),
        },
        {
          monthimg:require('../assets/八月.jpg'),
        },
        {
          monthimg:require('../assets/九月.jpg'),
        },
        {
          monthimg:require('../assets/十月.jpg'),
        },
        {
          monthimg:require('../assets/十一月.jpg'),
        },
        {
          monthimg:require('../assets/十二月.jpg'),
        }
      ]
    }
  },
  methods: {
    goto(index){
      this.$router.push(`/monthrecords/2018/${index+1}`)
    }
  }
}
</script>

<style>
.monthimg{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.monthselect{
  position: relative;
  top: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  flex-wrap:wrap;
  width: 100%;
  height: 80%;
}
.monthimgs{
  width: 7rem;
  height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
}
.monthimgs div{
  border-radius: 50%;
  height: 85%;
  width: 85%;
}
.month-container{
  width: 100%;
  height: 100%;
  background: rgb(255, 215, 215);
  overflow: hidden;
}
.selectdate{
  position: relative;
  left: 5%;
  top: 4.5rem;
  width: 90%;
  height: 2.5rem;
  border-radius: 1rem;
  background:white;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#searchicon{
  position: absolute;
  left: 1rem;
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
Button{
  font-size: 0.8rem;
  margin-left: 5%;
}
</style>
