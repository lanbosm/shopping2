
import Vue from 'vue';
import AppHeader from 'components/header.vue'
import AppOrder from 'components/AppOrder.vue'


import store from './vuex/store'
import VueRouter from 'vue-router'

import Order from 'components/Order.vue'
import nav2 from 'components/nav2.vue'

//路由配置
Vue.use(VueRouter)

//定义根组件
Vue.component('app',AppOrder);

//定义头组件
Vue.component('app-header',AppHeader);


// //路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Order',
            component:Order
        },
        {
            path: '/nav2',
            component:nav2
        }
    ]
})

var vm=new Vue({
        created:function(){


        },
        store,
        router,
        el:'#main',
        mounted() {
            //起始路由
            //this.$router.push('/');
        }
    })