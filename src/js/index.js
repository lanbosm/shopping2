
import Vue from 'vue';

import appHeader from 'views/header.vue'

import CustomModal from 'views/custom/CustomMain.vue';
import ShopAdminModal from 'components/shopAdmin/ShopAdminMain.vue';
import CouponModal from 'components/coupon/CouponMain.vue';
import RechargeModal from 'components/recharge/RechargeMain.vue';
import MsgModal from 'components/message/MsgModal.vue';
import LogModal from 'components/log/LogModal.vue';
import CashModal from 'components/cash/CashModal.vue';


import SettingDialog from 'views/dialog/settingDialog.vue';


import ChooseGifts from 'views/products/ChooseGifts.vue'

import StockItem from 'views/products/StockItem.vue';
import ListItem from 'views/products/ListItem.vue';

import AppCenterLoading from 'views/AppCenterloading.vue'

import AgainPass from 'components/custom/AgainPass.vue'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import simpScroller from 'lib/simpScroller'



import store from './vuex/store'
import router from './router'

Vue.use(ElementUI);

//定义头组件
Vue.component('app-header',appHeader);

//定义顾客组件
Vue.component('dialog-custom',CustomModal);

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

//定义设置弹窗
Vue.component('dialog-setting',SettingDialog);

//定义商品弹窗
Vue.component('list-item',ListItem);

//定义库存弹窗
Vue.component('stock-item',StockItem);

//定义赠品弹框
Vue.component('choose-gifts',ChooseGifts);

//定义重置密码弹框
Vue.component('again-pass',AgainPass);




//扩展vue方法
//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
Vue.prototype.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
//scroll
Vue.prototype.$simpleScroll = (ele,direction,hideScrollBar) => {
    var opt={
        ele:ele,
        verticalScroll:   direction=='vertical'?true:false,
        horizontalScroll: direction=='horizontal'?true:false,
        hideScrollBar:hideScrollBar
    };

    if(!direction){
        opt.verticalScroll=true;
    }
    if(!hideScrollBar){
        opt.hideScrollBar=false;
    }
    simpScroller(document.querySelector(opt.ele), {
        verticalScroll: opt.verticalScroll,
        horizontalScroll: opt.horizontalScroll,
        hideScrollBar: opt.hideScrollBar,
        onScroll: function(event) {
            // console.log("type: " + event.type);
        }
    });
}






//自定义属性


router.beforeEach(({meta, path}, from, next)=> {


    const {auth = true} =  meta      // meta代表的是to中的meta对象，path代表的是to中的path对象  

    var isLogin = Boolean(store.state.login)    // true用户已登录， false用户未登录　
    if (auth  &&  !isLogin  &&  path !== '/login') {   // auth 代表需要通过用户身份验证，默认为true，代表需要被验证， false为不用检验

         next({ path: '/login' })   //  跳转到login页面  
    }else {

        next()   // 进行下一个钩子函数  
    }




})



router.afterEach(route => {
    store.state.appLoading=true;
   // alert(Vue.islogin);
    setTimeout(()=>{
        store.state.appLoading=false;
    },100)
});

//简单滚动
Vue.prototype.$simpScroll = (dom,direction) => {
    simpScroller(document.querySelector(dom));
}
//vue实例
var vm =new Vue({
    store,
    router,
    el:'#app',
    data:{          //这里不是组件模式 不return
            showShopAdminModal:false,

            showCouponModal:false,
            showRechargeModal:false,
            showMsgModal:false,
            showLogModal:false,
            showCashModal:false,
            showListItem:false,
            showStockItem:false,
            showChooseGifts:false,
            showAgainPass:false,

            showSettingDialog:false,
            showCustomDialog:false,

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
        if(accessToken) {
            this.$store.state.login = accessToken;
        }
        // 关闭窗口时弹出确认提示
        // $(window).bind('beforeunload', function(){
        //     return '您可能有数据没有保存';
        // });
        //起始路由
        //this.$router.push('/log/products');
        // this.$router.push('/log/sales');

        //this.$router.push('/');
        // this.$router.push('/print');
        //this.$router.push('/');
        this.$router.push('/');
    }
})


