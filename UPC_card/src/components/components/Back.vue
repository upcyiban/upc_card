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
      this.$router.go(-1)
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
