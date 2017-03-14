
import Vue from 'vue';

import appHeader from 'components/header.vue'
import App from 'components/App.vue'
import CustomModal from 'components/CustomMain.vue';
import OrderMain from 'components/OrderMain.vue'
import OrderDefault from 'components/OrderDefault.vue';
import OrderPrint from 'components/OrderPrint.vue'
import PayScan from 'components/PayScan.vue'
import PayCard from 'components/PayCard.vue'
import PayMoney from 'components/PayMoney.vue'
import RechargeMain from 'components/RechargeMain.vue'
import RechargeDefault from 'components/RechargeDefault.vue'


import NoPage from 'components/NoPage.vue'


import store from './vuex/store'
import VueRouter from 'vue-router'


//定义组件


//定义头组件
Vue.component('app-header',appHeader);

//定义根组件


//定义顾客组件
Vue.component('layer-custom',CustomModal);


//路由配置
Vue.use(VueRouter)



//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
   // mode: 'history',
    routes: [
            {
                path: '/',
                component:  App,
            },
            {
                path: '/order',
                name: 'OrderMain',
                component:OrderMain,
                children: [
                    {
                        path:'/',
                        name: 'OrderDefault',
                        component:OrderDefault,
                    },
                    {
                        path:'/scan',
                        name: 'PayScan',
                        component: PayScan,
                    },
                    {
                        path:'/card',
                        name: 'PayCard',
                        component: PayCard,
                    },
                    {
                        path:'/money',
                        name: 'PayMoney',
                        component: PayMoney,
                    }
                ],

            },
            //充值
            {
                path:'/recharge',
                name: 'Recharge',
                component:RechargeMain,
                children: [
                    {
                        path:'/',
                        name: 'RechargeDefault',
                        component:RechargeDefault,
                    },
                    {
                        path:'/scan',
                        name: 'PayScan',
                        component: PayScan,
                    },
                    {
                        path:'/card',
                        name: 'PayCard',
                        component: PayCard,
                    },
                    {
                        path:'/money',
                        name: 'PayMoney',
                        component: PayMoney,
                    }
                ]

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


//vue实例
var vm =new Vue({
    created:function(){


    },
    store,
    el:'#main',
    router,
    computed: {

    },
    watch: {

    },
    methods: {

    },
    mounted() {
        // 关闭窗口时弹出确认提示
        // $(window).bind('beforeunload', function(){
        //     return '您可能有数据没有保存';
        // });
        //起始路由
        this.$router.push('/');
    }
})


//.$mount('#main');