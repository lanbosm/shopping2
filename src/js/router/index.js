import Vue from 'vue';
import VueRouter from 'vue-router'


import App from 'components/App.vue'
import AppCenter from 'components/AppCenter.vue'
import MsgCenter from 'components/MsgMain.vue';

import OrderDefault from 'components/OrderDefault.vue';
import PayScan from 'components/PayScan.vue'
import PayCard from 'components/PayCard.vue'
import PayMoney from 'components/PayMoney.vue'
import RechargeDefault from 'components/RechargeDefault.vue'

import NoPage from 'components/NoPage.vue'



//路由配置
Vue.use(VueRouter)



//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    //mode: 'history',
    routes: [
        {
            path: '/',
            component:  App,
        },
        { path: '/index', redirect: '/' },
        { path: '/message',                                    //消息中心
            name: 'MsgCenter',
            component: MsgCenter,
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