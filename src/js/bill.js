
import Vue from 'vue';
import AppHeader from 'components/header.vue'



import store from './vuex/store'
import VueRouter from 'vue-router'

import OrderMain from 'components/OrderMain.vue'
import OrderPrint from 'components/OrderPrint.vue'
import OrderScan from 'components/OrderScan.vue'
import OrderCard from 'components/OrderCard.vue'
import OrderMoney from 'components/OrderMoney.vue'


import RechargeMain from 'components/RechargeMain.vue'



import NoPage from 'components/NoPage.vue'

//路由配置
Vue.use(VueRouter)


// //路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'OrderMain',
            component:OrderMain,
            children: [
                {
                    path:'/scan',
                    name: 'OrderScan',
                    alias:'/',
                    component: OrderScan,
                },
                {
                    path:'/card',
                    name: 'OrderCard',
                    component: OrderCard,
                },
                {
                    path:'/money',
                    name: 'OrderMoney',
                    component: OrderMoney,
                }
            ],

        },
        //充值
        {
            path:'/recharge',
            name: 'Recharge',
            component:RechargeMain,
        },
        //订单打印
        {
            path: '/print',
            name: 'OrderPrint',
            component:OrderPrint
        },
        // 404 page
        {   path: '*',
            name: '404',
            component: NoPage
        }

    ]
})

var vm=new Vue({
        created:function(){

        },
        store,
        router,
        el:'#main',
        components:{
            'app-header':AppHeader
        },
        mounted() {
            //起始路由
            //this.$router.push('/');
        }
    })