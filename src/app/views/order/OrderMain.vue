<template>
    <div class="order">
        <commom-header :title="title" :back="back" :next="next"></commom-header>
        <app-center-custom :mode="mode" :message="message" :amount="amount" :order="order"></app-center-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                    <app-center-menu :mode="mode"></app-center-menu>
                </div>
                <div class="col-nn-70 right-con">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view :message="message" :amount="amount"  :order="order" :show-shop-admin-btn="true"></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppCenterHeader from 'views/AppCenterHeader.vue';
    import AppCenterCustom from 'views/AppCenterCustom.vue';
    import AppCenterMenu from 'views/AppCenterMenu.vue';

    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';


    export default{
        data() {
            return {
                title:"结账",
                back:{"label":"返回","url":"index","show":true},
                next:{"label":"打印","url":"print","show":true,"cb":this.createOrder},
                message: '请选择一个付款方式',
            }
        },
        components:{
            AppCenterMenu,
            AppCenterCustom
        },
        watch: {

        },
        computed: {
            //数据来自全局cartData:[],
            customData(){
                return this.$store.state.currentPage.customData;  //购物车数据
            },
            cartData(){
                return this.$store.state.currentPage.cartData;  //购物车数据
            },
            mode(){
                return this.$store.state.currentPage.mode;
            },
            order (){
                return this.$store.state.currentPage.orderData;
            },
            amount(){
                return this.order.totalAmountPayable;
            },
            orderParams(){

                return this.$store.state.currentPage.orderParams;
            }
        },
        methods: {
            createOrder(){


                if(!this.orderParams.paymentMethodId){
                    layer.msg("请选择一种付款方式", {icon: 2});
                    return false;
                }
                //数据过滤

                if(this.orderParams.paymentMethodId==11){//刷卡
                    this.$store.state.currentPage.orderParams.rmb=0;
                    this.$store.state.currentPage.orderParams.cash=0;

                    this.$store.dispatch("createOrder").then(res=>{

                        this.$store.commit("setMode","print");
                        this.$router.replace("print");

                    }).catch(res=>{
                        layer.alert("创建支付失败",{icon:2})
                    })

                } if(this.orderParams.paymentMethodId==12){//扫码
                    this.$store.state.currentPage.orderParams.rmb=0;
                    this.$store.state.currentPage.orderParams.cash=0;

                    this.$store.dispatch("createOrder").then(res=>{

                        this.$store.commit("setMode","print");
                        this.$router.replace("print");

                    }).catch(res=>{
                        layer.alert("创建支付失败",{icon:2})
                    })

                } else if(this.orderParams.paymentMethodId==10 ){  //现金

                    if( this.orderParams.rmb<0) {
                        layer.msg("现金支付付款不能为零", {icon: 2});
                        return false;
                    }
                    if( this.orderParams.rmb<this.amount) {
                        layer.msg("现金支付付款不能小于付款数", {icon: 2});
                        return false;
                    }

                    this.$store.dispatch("createOrder").then(res=>{

                        this.$store.commit("setMode","print");
                        this.$router.replace("print");

                    }).catch(res=>{
                        layer.alert("创建支付失败",{icon:2})
                    })
                } else if(this.orderParams.paymentMethodId==14 ){  //余额
                    var vm=this;
                    layer.confirm('将要扣除余额吗？', function(index){
                        layer.closeAll();
                        vm.$store.dispatch("createOrder").then(res=>{
                            vm.$store.commit("setMode","print");
                            vm.$router.replace("print");

                        }).catch(res=>{
                            layer.alert("创建支付失败",{icon:2})
                        })
                    });

                }

            }
        }
    }
</script>
