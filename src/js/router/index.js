import Vue from 'vue';
import VueRouter from 'vue-router'

import Login from 'views/login/login.vue'

import App from 'views/App.vue'
import AppCenter from 'views/AppCenter.vue'


import OrderDefault from 'views/order/OrderDefault.vue';
import PayScan from 'views/pay/PayScan.vue'
import PayCard from 'views/pay/PayCard.vue'
import PayMoney from 'views/pay/PayMoney.vue'
import RechargeDefault from 'components/recharge/RechargeDefault.vue'




import member from 'components/member/MemberStockMain.vue';

import membercargomain from 'components/member/MemberCargoMain.vue';

import activeProductsMain from 'views/products/activeProductsMain.vue';



import AdMain from 'views/Ad/AdMain.vue';
import OrderListMain from 'views/order/OrderListMain.vue';
import CustomListMain from 'views/custom/CustomListMain.vue';
import LogMain from 'views/log/LogMain.vue';
import NoticeMain from 'views/notice/NoticeMain.vue';

import NoPage from 'views/NoPage.vue'





//路由配置
Vue.use(VueRouter)



//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    mode: 'history',
    routes: [
        {

            path: '/',
            component:  App,
        },
        {
            path:'/member',
            name:'member',
            component:member
        },
        {
            path:'/active',
            name:'activeproductsmain',
            component:activeProductsMain
        },
        {
            path:'/membercargo',
            name:'membercargomain',
            component:membercargomain
        },
        {
            path: '/login',
            name: 'Login',
            meta: {auth:false},
            component: Login
        },
        { path: '/index', redirect: '/' },
        { path: '/notice',                                    //消息中心
            name: 'NoticeMain',
            component: NoticeMain,
        },
        {
            path: '/log',
            name: 'logMain',
            component:LogMain
        },
        {
            path: '/log/:type',
            name: 'logMainList',
            component:LogMain
        },
        {
            path: '/appCenter',
            alias:['/order','/recharge','/print'],            //中心有 订单 充值 打印
            name: 'AppCenter',
            component: AppCenter,
            children: [
                {
                    path: '/order/',                          //默认支付
                    name: 'OrderDefault',
                    component: OrderDefault,
                },
                {
                    path: '/recharge/',                      //默认充值
                    name: 'RechargeDefault',
                    component: RechargeDefault,
                },
                {
                    path: '/scan',
                    name: 'PayScan',
                    component: PayScan,
                },
                {
                    path: '/card',
                    name: 'PayCard',
                    component: PayCard,
                },
                {
                    path: '/money',
                    name: 'PayMoney',
                    component: PayMoney,
                }
            ]
        },
        {                                      //广告
            path: '/ad',
            name: 'ad',
            component:AdMain
        },
        {
            path: '/customList',
            name:'customlist',
            component: CustomListMain
        },

        {
            path: '/orderList',
            name:'orderList',
            component:   OrderListMain
        },


        // 404 page
        {   path: '*',
            name: '404',
            component: NoPage
        }

    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})





export default router;