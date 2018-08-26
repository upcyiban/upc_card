import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Records from '@/components/Records'
import Monthrecords from '@/components/monthrecords'
import Recharge from '@/components/Recharge'
import Login from '@/components/Login'
import Cardfinder0 from '@/components/Cardfinder/Cardfinder0'
import Cardfinder1 from '@/components/Cardfinder/Cardfinder1'
import Picked from '@/components/Cardfinder/Picked'
import Lost from '@/components/Cardfinder/Lost'
import MonthHistory from '@/components/MonthHistory'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/records',
            name: 'Records',
            component: Records
        },
        {
            path: '/pickedcard',
            name: 'pickedcard',
            component: Cardfinder0
        },
        {
            path: '/picked',
            name: 'picked',
            component: Picked
        },
        {
            path: '/lostcard',
            name: 'lostcard',
            component: Cardfinder1
        },
        {
            path: '/lost',
            name: 'lost',
            component: Lost
        },
        {
            path: '/monthrecords',
            name: 'monthrecords',
            component: Monthrecords
        },
        {
            path: '/recharge',
            name: 'Recharge',
            component: Recharge
        },
        {
            path: '/monthrecords/:year/:month',
            name: 'MonthHistory',
            component: MonthHistory
        }
    ]
})