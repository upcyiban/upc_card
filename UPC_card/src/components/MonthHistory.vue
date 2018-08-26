<template>
    <div class="container">
        <back></back>
        <div class="card">
            <div class="consume-container">
                <span class="consume">消费</span><span style="margin-left: 16px;">{{total}}元</span>
            </div>
            <div id="chart" v-if="haveData">
                <ve-ring :data="chartData" :settings="chartSettings" :legend-visible="false" height="320px"></ve-ring>
            </div>
            <div class="chart-placeholder" v-else><p class="center" ref="hint">加载中...</p></div>
            <div class="most-container" v-if="haveData">
                <span class="most">单笔最贵</span>
            </div>
            <div class="m1" v-if="haveData">
                <img class="i1" :src="require('@/assets/冠军.png')">
                <span>{{getAddr(0)}}</span>
                <span class="right">￥{{getAmount(0)}}</span>
            </div>
            <div class="m2" v-if="haveData">
                <img class="i2" :src="require('@/assets/亚军.png')">
                <span>{{getAddr(1)}}</span>
                <span class="right">￥{{getAmount(1)}}</span>
            </div>
            <div class="m3" v-if="haveData">
                <img class="i3" :src="require('@/assets/季军.png')">
                <span>{{getAddr(2)}}</span>
                <span class="right">￥{{getAmount(2)}}</span>
            </div>
            <div class="most-placeholder" v-else></div>
        </div>
    </div>
</template>

<script>
import back from './components/Back'
import axios from 'axios'
export default {
    name: 'MonthHistory',
    components: {
        back
    },
    data () {
        return {
            haveData: false,
            total: 0,
            chartData: {
                columns: ['address', 'amount'],
                rows: [
                    { 'address': '荟萃', 'amount': 0 },
                    { 'address': '玉兰', 'amount': 0 }
                ]
            },
            chartSettings: {
                labelMap: {
                    amout: '金额',
                    address: '地点'
                },
                radius: [25, 75],
                offsetY: 160
            },
            most3: [
                {
                    "address": "商务网关2（荟萃苑）",
                    "amount": 40,
                    "remain": 20.16,
                    "timestr": "2018/6/23 11:29:25"
                },
                {
                    "address": "商务网关（荟萃苑2）",
                    "amount": 11.9,
                    "remain": 19.84,
                    "timestr": "2018/6/15 11:48:40"
                },
                {
                    "address": "商务网关1(玉兰苑1楼)",
                    "amount": 10,
                    "remain": 42.94,
                    "timestr": "2018/6/26 17:19:31"
                }
            ]
        }
    },
    methods: {
        getAddr (index) {
            return this.most3.length > 0 ? (this.most3[index].address ? this.most3[index].address : '') : ''
        },
        getAmount (index) {
            return this.most3.length > 0 ? (this.most3[index].amount ? this.most3[index].amount : '') : ''
        }
    },
    created () {
        axios.post('/api/month',{
            studentid: window.localStorage.studentid,
            year: '2018',
            month: this.$route.params.month
        }).then(resp => {
            let data = resp.data
            if(data.most3.length > 0) {
                console.log(data.most3)
                this.$set(this,'most3',data.most3)
                let chart = data.positions
                let rows = []
                let tmp = {}
                let total = 0
                let dict = {
                    '商务网关1(玉兰苑1楼)': '玉兰苑餐厅',
                    '商务网关2（荟萃苑）': '荟萃苑餐厅',
                    '商务网关（荟萃苑2）': '荟萃苑餐厅',
                    '玉兰网关2.3楼': '玉兰苑餐厅',
                    '青岛三餐厅': '唐岛湾餐厅',
                    '校医院接入代理': '校医院',
                    '水控子系统': '供水系统',
                    '慧心': '慧心文印',
                    '15号海燕文印': '海燕文印',
                    '2号楼思创杂志': '思创杂志',
                    '15号楼超市': '超市',
                    '17号楼超市': '超市',
                    '软网关系统': '其他',
                    '研究生综合超市2': '超市'
                }
                for(let [k,v] of Object.entries(chart)){
                    tmp[dict[k] ? dict[k] : '其他'] = tmp[dict[k] ? dict[k] : '其他'] ? tmp[dict[k] ? dict[k] : '其他'] : 0 + v
                }
                for(let [k,v] of Object.entries(tmp)){
                    rows.push({
                        address: k,
                        amount: v
                    })
                    total += v
                }
                console.log(tmp,rows)
                this.$set(this, 'total', new Number(total).toFixed(2))
                this.$set(this.chartData,'rows',rows)
                this.haveData = true
            }else{
                this.$refs.hint.innerHTML = '本月没有消费'
            }
        })
    }
}

</script>

<style scoped>
.container {
    background-color: #f5e6f1;
    font-size: 24px;
    padding-top: calc(1rem + 48px);
    min-height: 100%;
}
.card {
    /* background-color: #fafafa; */
    border-radius: 5px;
    margin: 0 1rem;
    padding: 0.5rem 0;
    background-image: url('~@/assets/格子bg.jpg');
    min-height: 100%;
}
.consume-container, .most-container {
    margin-left: 20px;
    border-left: 10px solid pink;
    padding-left: 5px;
    color: rgb(219, 174, 182);
}
.chart-placeholder {
    height: 320px;
}
.most-placeholder {
    height: 160px;
}
.center {
    text-align: center;
    width: 8em;
    color: rgb(219, 174, 182);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
#chart {
    z-index: 999;
}
.i1,.i2,.i3 {
    height: 32px;
    width: 32px;
}
.m1,.m2,.m3 {
    font-size: 16px;
    display: flex;
    align-content: center;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}
.m1 {
    margin-top: 1rem;
}
.right {
    position: absolute;
    right: 1.25rem;
}
</style>
