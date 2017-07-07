import Vue from 'vue';
import VueRouter from 'vue-router'

import Login from 'views/login/login.vue'

import App from 'views/App.vue'
import AppCenter from 'views/AppCenter.vue'


import OrderDefault from 'views/order/OrderDefault.vue';
import PayScan from 'views/pay/PayScan.vue'
import PayCard from 'views/pay/PayCard.vue'
import PayCash from 'views/pay/PayMoney.vue'


import member from 'views/member/MemberStockMain.vue';
import membercargomain from 'views/member/MemberCargoMain.vue';


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
    // mode: 'history',
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
        { path: '/index', alias:['index.html','/index.htm'] ,redirect: '/' },
        { path: '/index.html', redirect: '/' },
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
            alias:['/print'],            //中心有 订单 充值 打印
            name: 'AppCenter',
            component: AppCenter
        },


        {
            path: '/order',
            name: 'AppCenter',
            component: AppCenter,
                    children: [
                        {
                            path: '/',                          //默认支付
                            name: 'OrderDefault',
                            component: OrderDefault,
                        },
                        {
                            path: 'payScan',
                            name: 'PayScan',
                            component: PayScan,
                        },
                        {
                            path: 'payCard',
                            name: 'PayCard',
                            component: PayCard,
                        },
                        {
                            path: 'payCash',
                            name: 'PayCash',
                            component:PayCash,
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
        {   path: ' *',
            name: '404',
            component: NoPage
        }

    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})





export default router;