<template>
  <div>
    <svg preserveAspectRatio="xMinYMin meet" viewBox="0,0,200,200">
      <path d="M100,0C61.3,0,30,31.3,30,70c0,52.5,70,130,70,130s70-77.5,70-130C170,31.3,138.7,0,100,0z"/>
    </svg>
    <p class="source-hans">{{ccount}}次</p>
  </div>
</template>

<script>
export default {
  name: 'location',
  props: ['count'],
  data () {
    return {
      ccount: this.count
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  transform-origin center bottom
  svg
    fill #35DFFF
    stroke #404040
    stroke-width 1px
  p
    color #ffffff
    font-size 24px
    font-weight bold
    position absolute
    top 35%
    left 50%
    transform translate(-50%, -50%)
    user-select none
</style>
