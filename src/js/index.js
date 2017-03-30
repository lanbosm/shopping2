
import Vue from 'vue';

import appHeader from 'components/header.vue'

import CustomModal from 'components/CustomMain.vue';
import ShopAdminModal from 'components/ShopAdminMain.vue';
import CouponModal from 'components/CouponMain.vue';
import RechargeModal from 'components/RechargeMain.vue';
import MsgModal from 'components/MsgModal.vue';

import store from './vuex/store'
import router from './router'




//定义头组件
Vue.component('app-header',appHeader);

//定义顾客组件
Vue.component('layer-custom',CustomModal);

//定义导购组件
Vue.component('layer-shopadmin',ShopAdminModal);

//定义优惠券组件
Vue.component('layer-coupon',CouponModal);

//定义充值组件
Vue.component('layer-recharge',RechargeModal);

//定义msg组件
Vue.component('layer-msg',MsgModal);



//自定义属性
Vue.islogin=true;

router.afterEach(route => {
    store.state.appLoading=true;
    setTimeout(()=>{
        store.state.appLoading=false;
    },100)
})

//vue实例
var vm =new Vue({
    created:function(){


    },
    store,
    el:'#main',
    router,
    data:{          //这里不是组件模式 不return
            showShopAdminModal:false,
            showCustomModal:false,
            showCouponModal:false,
            showRechargeModal:false,
            showMsgModal:false
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