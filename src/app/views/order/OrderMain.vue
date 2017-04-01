<template>
    <div class="order">
        <app-center-header :title="title" :back="back" :next="next" mode="mode"></app-center-header>
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
            AppCenterHeader,
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
                //console.log(this.$store.state.currentPage.orderParams);
                if(!this.orderParams.paymentMethodId){
                    layer.msg("请选择一种付款方式", {icon: 2});
                    return false;
                }

                if(this.orderParams.paymentMethodId==10&&this.orderParams.rmb<=this.amount){
                    layer.msg("现金支付付款不能为零", {icon: 2});
                    return false;
                }


                var apiObj={
                    url:API_URLS.b2b_orders+"/create",
                    data:this.$store.state.currentPage.orderParams
                }

                this.$store.commit("show_waiting");
                request.fnPost(this,apiObj,(res)=>{
                    this.$store.commit("hide_waiting");
                    this.$store.commit("setOrderData",res.appOrderConfirmBean);
                    this.$store.commit("setPrintData",res.appOrderConfirmBean);
                    this.$store.commit("setMode","print");
                    this.$router.replace("print");
                },()=>{
                    this.$store.commit("hide_waiting");
                })
            }
        }
    }
</script>
