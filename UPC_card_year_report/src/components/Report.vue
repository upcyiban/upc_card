<template lang="pug">
  div.container(ref="container" @touchstart="touchstart" @touchend="touchend")
    canvas.background-canvas
    Music.music(v-if="currentPage !== 0")
    //- svg
    div#page0(ref="page0" v-if="pages[0]")
      Loading.loading
      p {{page0.loading}}
      //- UPCYiban.upcyiban-text
    div#page1(ref="page1" v-if="pages[1]")
      img.background1(:src="require('@/assets/upc-gate.jpg')")
      p#p1p1.p1.source-hans(ref="p1p1") 在过去的一年里
      div#p1d1
        p(ref="p1p2")#p1p2.p1.source-hans 你一共在校园里留下了
        span(ref="p1p3")#p1p3.p1 {{page1.consumeCount}}
        span(ref="p1p4")#p1p4.p1.source-hans 条足迹
    div#page2(ref="page2" v-if="pages[2]")
      img.background2(:src="require('@/assets/map.jpg')"
                      ref="p2map")
      //- div(style="height: 1339px;width: 825px;" ref="p2map")
      Location.location(v-for="(location,key,index) in page2.locations" :count="location.count" :key="`location${location.name}`")
      span
    div#page3(ref="page3" v-if="pages[3]")
      div#canting
        span.source-hans 你最爱在
        span.color.source-hans 荟萃苑餐厅
        span.source-hans 吃饭
        br
        span.source-hans 平均每个月都要去
        span.color.source-hans 57
        span.source-hans 次
        br
        p.source-hans 你不怎么爱吃早饭
        p.source-hans 但晚上常常用一顿美味的夜宵来犒劳自己
      div#xiaofei
        span.source-hans 同时你也是一个
        span.color.source-hans 勤俭节约
        span.source-hans 的人
        br
        span.source-hans 每个月只有
        span.color.source-hans 3.73%
        span.source-hans 的校园卡消费
        br
        span.source-hans 花在非生活必须的地方
      div#yiyuan
        span.source-hans 还记得
        span.color.source-hans 9月17日那天上午
        span.source-hans 吗
        br
        span.source-hans 你匆匆来到医院，心里急得像热锅上的蚂蚁
        br
        span.source-hans 索性并无什么大碍
        br
        span.source-hans 虽然只是
        span.color.source-hans 10元
        span.source-hans 的药品
        span.source-hans 却也让人放下了心
      img.background2(:src="require('@/assets/sun.jpg')")
      //- 像上面那样写页面，css用syulus写在style标签里面，不要使用内联style
      //- 动画写在methods里面，名称叫做page{页数}Animation,animejs挂载在this.$anime下面。用animejs的timeline来制作动画，参照我写的
      //- 当页的数据放在data的page{下标}里
</template>

<script>
import Loading from './Loading'
import UPCYiban from './upcyiban'
import Location from './location'
import Music from './Music'
export default {
  name: 'report',
  components: {
    Loading,
    UPCYiban,
    Location,
    Music
  },
  data () {
    let showingPages = Array(8).fill(false)
    showingPages[0] = true
    let pageAnimationCallbacks = Array(8).fill(() => null)
    for (let i = 0; i < 8; ++i) {
      pageAnimationCallbacks[i] = this[`page${i}Animation`] ? this[`page${i}Animation`] : () => null
    }
    return {
      currentPage: 0,
      lastPage: 3,
      pages: showingPages,
      pageAnimationCallbacks: pageAnimationCallbacks,
      touches: {
        startX: 0,
        startY: 0
      },
      page0: {
        loading: '正在生成您的报告',
        dots: '.'
      },
      page1: {
        chargeCount: 52,
        chargeAmount: 4582,
        consumeCount: 1126,
        consumeAmount: 4550
      },
      page2: {
        scale: window.innerHeight / 825,
        locations: [
          {
            name: 'huicui',
            x: 377,
            y: 303,
            count: 480
          },
          {
            name: 'tangdao',
            x: 950,
            y: 503,
            count: 32
          },
          {
            name: 'yulan',
            x: 530,
            y: 150,
            count: 201
          },
          {
            name: 'yiwushi',
            x: 280,
            y: 145,
            count: 2
          },
          {
            name: 'tushuguan',
            x: 700,
            y: 210,
            count: 2
          },
          {
            name: 'zaotang',
            x: 580,
            y: 150,
            count: 182
          },
          {
            name: '15',
            x: 275,
            y: 335,
            count: 15
          },
          {
            name: '13',
            x: 330,
            y: 260,
            count: 7
          },
          {
            name: '17',
            x: 230,
            y: 390,
            count: 1
          },
          {
            name: 'yanjiusheng',
            x: 1120,
            y: 570,
            count: 2
          }
        ]
      }
    }
  },
  methods: {
    touchstart (e) {
      this.touches.startX = e.touches[0].clientX
      this.touches.startY = e.touches[0].clientY
    },
    touchend (e) {
      // console.log(e.changedTouches[0], this.startY)
      // let endX = e.touches[0].clientX
      let endY = e.changedTouches[0].clientY
      let r = 30
      if (this.currentPage === 2) r = 80
      if (endY - this.touches.startY < -r) {
        if (this.currentPage === 0 || this.currentPage === this.lastPage) return
        this.switchPage(this.currentPage, this.currentPage + 1)
      } else if (endY - this.touches.startY > r) {
        if (this.currentPage === 1) return
        this.switchPage(this.currentPage, this.currentPage - 1)
      }
    },
    switchPage (from, to) {
      this.currentPage = to
      this.$set(this.pages, to, true)
      this.$nextTick(() => {
        let timeline = this.$anime.timeline()
        timeline.add({
          targets: this.$refs[`page${from}`],
          translateY: to > from ? ['0', '-100%'] : ['0', '100%'],
          duration: 1000,
          easing: 'easeOutCubic',
          offset: 0,
          complete: () => {
            this.$set(this.pages, from, false)
          }
        }).add({
          targets: this.$refs[`page${to}`],
          translateY: to > from ? ['100%', '0'] : ['-100%', '0'],
          duration: 1000,
          easing: 'easeOutCubic',
          offset: 0,
          complete: this.pageAnimationCallbacks[to]
        })
      })
    },
    page1Animation () {
      let timeline = this.$anime.timeline({
        // opacity: 1,
        // translateY: ['15%', '0'],
        duration: 600,
        easing: 'easeOutCubic'
      })
      // timeline
      timeline.add({
        targets: this.$refs.p1p1,
        opacity: 1,
        translateY: ['35%', '0'],
        offset: 0
      }).add({
        targets: this.$refs.p1p2,
        opacity: 1,
        translateY: ['35%', '0'],
        offset: '+=200'
      }).add({
        targets: this.$refs.p1p3,
        opacity: 1,
        rotateX: '360deg',
        duration: 400,
        // translateY: ['35%', '0'],
        // translateX: '-50%',
        // rotate3D: '1, 0, 0, 60deg',
        offset: '+=200'
      }).add({
        targets: this.$refs.p1p4,
        opacity: 1,
        // translateX: '-50%',
        translateY: ['35%', '0'],
        offset: '+=200'
      })
      return false
    },
    page2Animation () {
      let timeline = this.$anime.timeline()
      timeline.add({
        targets: '#page2',
        scrollLeft: this.$refs.p2map.offsetWidth - window.innerWidth,
        delay: 500,
        duration: 10000,
        easing: 'linear',
        complete: (t) => {
        }
      }).add({
        targets: '.location',
        translateX: ['-50%', '-50%'],
        translateY: ['-100%', '-100%'],
        top: (el, idx) => {
          return Array(2).fill(this.page2.locations[idx].y * this.page2.scale + 'px')
        },
        left: (el, idx) => {
          return Array(2).fill(this.page2.locations[idx].x * this.page2.scale + 'px')
        },
        scale: (el, idx) => {
          // console.log(this.page2.locations[idx].count / 750 < 0.5 ? 0.5 : this.page2.locations[idx].count / 500)
          return [0, this.page2.locations[idx].count / 750 < 0.4 ? 0.4 : this.page2.locations[idx].count / 750]
        },
        offset: 0,
        delay: (el, idx) => {
          // console.log(this.page2.locations[idx].x, this.page2.locations[idx].x * this.page2.scale)
          let screenWidth = window.innerWidth
          let halfScreenWidth = screenWidth / 2
          return (this.page2.locations[idx].x - halfScreenWidth) * this.page2.scale / (1339 - screenWidth) * 10000 + 500
        }
      })
    },
    page3Animation () {
      let timeline = this.$anime.timeline({
        duration: 1200,
        easing: 'easeOutCubic'
      })
      timeline.add({
        targets: '#canting',
        opacity: 1,
        translateY: ['35%', 0]
      }).add({
        targets: '#xiaofei',
        opacity: 1,
        translateY: ['35%', 0],
        offset: '+=5000'
      }).add({
        targets: '#yiyuan',
        opacity: 1,
        translateY: ['35%', 0],
        offset: '+=5000'
      })
    }
  },
  mounted () {
    // page3333333333333333333333333333333333333333333333
    this.$refs.container.style.height = `${window.innerHeight}px`
    this.page0.interval = setInterval(() => {
      if (this.currentPage === 0) {
        let dots = this.page0.dots
        this.page0.loading = '正在生成您的报告' + dots
        this.page0.dots = (dots === '...' ? '.' : dots + '.')
      } else {
        clearInterval(this.page0.interval)
      }
    }, 2000)
    setTimeout(() => {
      this.currentPage = 1
      this.$set(this.pages, 1, true)
      this.$nextTick(() => {
        let timeline = this.$anime.timeline()
        timeline.add({
          targets: this.$refs.page0,
          // translateY: '-100%',
          scaleX: 1.2,
          opacity: 0,
          duration: 2000,
          offset: 0,
          complete: () => {
            // console.log(this.pages)
            this.$set(this.pages, 0, false)
          }
        }).add({
          targets: this.$refs.page1,
          translateY: ['100%', '0'],
          easing: 'easeOutCubic',
          duration: 2000,
          offset: 500,
          complete: () => {
            // console.log(this.pageAnimationCallbacks)
            this.pageAnimationCallbacks[1]()
          }
        })
      })
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
  overflow hidden
  &::-webkit-scrollbar
    display none
    width 0
  .background-canvas
    width 100%
    height 100%
    position absolute
    top 0
    left 0
  .music
    transition all 1s
  #page0,#page1,#page2,#page3
    position absolute
    height 100%
    width 100%
    overflow hidden
    &::-webkit-scrollbar
      display none
      width 0
  #page0
    // height 100%
    // background #444
    .loading
      width 128px
      height 128px
      position absolute
      left 50%
      top 30%
      transform translate(-50%,0) rotate(165deg)
    p
      font-size 16px
      position absolute
      top 50%
      left 50%
      transform translate(-50%,0)
  #page1
    font-weight light
    font-size 32px
    text-align left
    // font-family SimHei
    .background1
      width 100%
      position absolute
      left 0
      bottom 0
      z-index -1
    p,span
      opacity 0
    p
     position relative
    .p1
      position relative
      z-index 999
    #p1p1
      margin-top 10%
      left 10%
    #p1d1
      position relative
      #p1p2
        position relative
        left 5%
      #p1p3
        text-align center
        color #66ccff
      #p1p3,#p1p4
        display inline-block
        left 50%
        transform translateX(-50%)
  #page2
    // background #aaa
    overflow-x scroll
    .background2
      // margin-top 10%
      // width 80%
      height 100%
      z-index -1
    .location
      z-index 999
      position absolute
      top 100%
      left 100%
      width 128px
      height 128px
  #page3
    font-size 16px
    .color
      color #66ccff
    .background2
      width 100%
      position absolute
      left 0
      bottom 0
      z-index -1
    #canting,#xiaofei,#yiyuan
      margin-top 32px
      opacity: 0
</style>
