
import Vue from 'vue';

import appHeader from 'views/header.vue'

import CustomModal from 'components/custom/CustomMain.vue';
import ShopAdminModal from 'components/shopAdmin/ShopAdminMain.vue';
import CouponModal from 'components/coupon/CouponMain.vue';
import RechargeModal from 'components/recharge/RechargeMain.vue';
import MsgModal from 'components/message/MsgModal.vue';
import LogModal from 'components/log/LogModal.vue';
import CashModal from 'components/cash/CashModal.vue';

import ChooseGifts from 'views/products/ChooseGifts.vue'

import StockItem from 'views/products/StockItem.vue';
import ListItem from 'views/products/ListItem.vue';

import AppCenterLoading from 'views/AppCenterloading.vue'

import AgainPass from 'components/custom/AgainPass.vue'



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

//定义日记组件
Vue.component('layer-log',LogModal);

//定义备用金组件
Vue.component('layer-cash',CashModal);

//定义商品弹窗
Vue.component('list-item',ListItem);

//定义库存弹窗
Vue.component('stock-item',StockItem);

//定义赠品弹框
Vue.component('choose-gifts',ChooseGifts);

//定义重置密码弹框
Vue.component('again-pass',AgainPass);


//自定义属性
Vue.islogin=false;

router.beforeEach(({path}, from, next) => {

    // const {auth = true} = meta      // meta代表的是to中的meta对象，path代表的是to中的path对象

    var auth=true;

    var isLogin = Boolean(store.state.login)    // true用户已登录， false用户未登录　


    if ( auth && !isLogin  &&  path !== '/login') {   // auth 代表需要通过用户身份验证，默认为true，代表需要被验证， false为不用检验
        return next({ path: '/login' })   //  跳转到login页面
    }

    return next()   // 进行下一个钩子函数

})


router.afterEach(route => {
    store.state.appLoading=true;
   // alert(Vue.islogin);
    setTimeout(()=>{
        store.state.appLoading=false;
    },100)
});

//vue实例
var vm =new Vue({
    store,
    router,
    el:'#app',
    data:{          //这里不是组件模式 不return
            showShopAdminModal:false,
            showCustomModal:false,
            showCouponModal:false,
            showRechargeModal:false,
            showMsgModal:false,
            showLogModal:false,
            showCashModal:false,
            showListItem:false,
            showStockItem:false,
            showChooseGifts:false,
            showAgainPass:false,

    },
    components:{
        AppCenterLoading,
    },
    computed: {
        login: function() {
            return this.$store.state.login;
        },
        waiting: function() {
            return this.$store.state.waiting;
        }
    },
    created() {
        var accessToken = window.localStorage.getItem("accessToken");
        this.$store.state.login=accessToken;
        // 关闭窗口时弹出确认提示
        // $(window).bind('beforeunload', function(){
        //     return '您可能有数据没有保存';
        // });
        //起始路由
        //this.$router.push('/log/products');
        // this.$router.push('/log/sales');

        this.$router.push('/');
        // this.$router.push('/print');
        // this.$router.push('/');
    }
})


