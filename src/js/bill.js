
import Vue from 'vue';
import AppHeader from 'components/header.vue'



import store from './vuex/store'
import VueRouter from 'vue-router'



//路由配置
Vue.use(VueRouter)


// //路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    routes: [


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