
import Vue from 'vue';

import appHeader from 'components/header.vue'
import App from 'components/App.vue'
import CustomModal from 'components/CustomMain.vue';
// import util from 'ui/model.js';

import store from './vuex/store'
import VueRouter from 'vue-router'

//定义组件


//定义头组件
Vue.component('app-header',appHeader);

//定义根组件
Vue.component('App',App);

//定义顾客组件
Vue.component('layer-custom',CustomModal);


//路由配置
Vue.use(VueRouter)



//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    //mode: 'history',
    routes: [
            {
                path: '/',
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
    data:{
        show:false,
        dialogClass:"info",
        productParams:{
            'pageNum':1,
            'categoryId':null,
            'keyword':null,
            'brandId':null
        },
        searchItem:{
            text:"",          //文本
            input:"",		  //控件
            searching:false   //是否搜索中
        },
        searchCustom:{
            text:"",          //文本
            input:"",		  //控件
            searching:false   //是否搜索中
        },
        //导航数据
        navData:{
            apiUrl: '../data/navData.json',
            index:0,
            show:false,
            path:[],
            list:[]
        },
        //页对象
        page:{

        },
        //商品数据
        itemData:[],
        itemDetail:{},
        //购物车
        cartData:{
            index:0,
            list:[],
        },
        //会员数据
        customData:{
            apiUrl: '../data/customData.json',
            index:0,
            list:[],
            newCustom:{},
            curCustom:{}
        },
        //会员弹层
        customModal:{
            status:'normal',
            history:'',
            code:0
        }
    },
    computed: {

    },
    watch: {

    },
    methods: {


    },
    mounted() {

        //起始路由
        //this.$router.push('/');
    }
})


//.$mount('#main');