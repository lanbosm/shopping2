<template>
    <div class="order">
        <commom-header :title="title" :back="back" :next="next"></commom-header>
        <app-center-custom  :message="message" :amount="amount" :order="order"></app-center-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30 menu-con">
                    <app-center-menu ></app-center-menu>
                </div>
                <div class="col-nn-70">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view :message="message" :amount="amount"   :show-shop-admin-btn="true"></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppCenterCustom from 'views/AppCenterCustom.vue';
    import AppCenterMenu from 'views/AppCenterMenu.vue';

    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';


    export default{
        data() {
            return {
                title:"结账",
                back:{"label":"返回","url":"/","show":true},
                next:{"label":"生成订单","url":"/print","show":true,"cb":this.createOrder},
                message: '请选择一个付款方式'
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
            order (){
                return this.$store.state.currentPage.orderData;
            },
            amount(){
                return this.order.totalAmountPayable;
            },
            orderParams(){
                return this.$store.state.currentPage.orderParams;
            },
            //数据来自全局
            shopData(){
                return this.$store.state.shopData;
            }
        },
        methods: {
            createOrder(){

                if(!this.orderParams.paymentMethodId){
                    this.$message({
                        message: '请选择一种付款方式',
                        type: 'error'
                    });
                    return false;
                }
                //数据过滤

                if(this.orderParams.paymentMethodId==11){//刷卡
                    this.$store.state.currentPage.orderParams.rmb=0;
                    this.$store.state.currentPage.orderParams.cash=0;

                    this.$store.dispatch("createOrder").then(res=>{


                        this.$router.replace("/print");
//                        setTimeout(_=> {
//                            this.$parent.$refs.print.printPage();
//                        },300);

                    }).catch(res=>{
                        this.$alert('创建支付失败',{
                            type: 'error'
                        });

                    })

                } if(this.orderParams.paymentMethodId==17 || this.orderParams.paymentMethodId==18){//扫码
                    this.$store.state.currentPage.orderParams.rmb=0;
                    this.$store.state.currentPage.orderParams.cash=0;

                    this.$store.dispatch("createOrder").then(res=>{

                        this.$router.replace("/print");

                    }).catch(res=>{
                        this.$alert('创建支付失败',{
                            type: 'error'
                        });

                    })

                } else if(this.orderParams.paymentMethodId==10 ){  //现金

                    if( this.orderParams.rmb<0) {

                        this.$message({
                            message: '现金支付付款不能为零',
                            type: 'error'
                        });

                        return false;
                    }
                    if( this.orderParams.rmb<this.amount) {

                        this.$message({
                            message: '现金支付付款不能小于付款数',
                            type: 'error'
                        });
                        return false;
                    }

                    if( this.orderParams.cash>this.shopData.spareCash) {

                        this.$message({
                            message: '备用金不足 ',
                            type: 'error'
                        });
                        return false;
                    }
                    this.$store.dispatch("createOrder").then(res=>{


                        this.$router.replace("/print");
//                        setTimeout(_=> {
//                            this.$parent.$refs.print.printPage();
//                        },300);
                    }).catch(res=>{
                        this.$alert('创建支付失败',{
                            type: 'error'
                        });

                    })
                } else if(this.orderParams.paymentMethodId==14 ){  //余额


                    this.$confirm('将要扣除余额吗？', {
                        type: 'warning'
                    }).then(() => {
                        this.$store.dispatch("createOrder").then(res=>{

                            this.$router.replace("/print");
//                            setTimeout(_=> {
//                                this.$parent.$refs.print.printPage();
//                            },300);
                        }).catch(res=>{
                            this.$alert('创建支付失败',{
                                type: 'error'
                            });
                        })
                    })


                }

            }
        }
    }
</script>
