<template>
  <div class="back" @click="goback">
      <img :src="back" alt="" width="40px" height="auto">
  </div>
</template>
<script>
export default {
  data(){
    return{
      back: require("../../assets/返回.png"),
    }
  },
  methods: {
    goback () {
      this.$router.push({path:'homepage'})
    }
  }
}
</script>
<style scoped>
.back{
  position: absolute;
  left: 1rem;
  top: 1rem;
}
</style>
