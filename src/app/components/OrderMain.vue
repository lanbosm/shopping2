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
    import AppCenterHeader from 'components/AppCenterHeader.vue';
    import AppCenterCustom from 'components/AppCenterCustom.vue';
    import AppCenterMenu from 'components/AppCenterMenu.vue';
    import {request, API_URLS, HOST} from 'util/request.js';

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
           // '$route': 'fetchData'
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
                return this.order.totalOrderAmount;
            }
        },
        methods: {
            createOrder(){
                var apiObj={
                    url:API_URLS.b2b_orders+"/create",
                    data:this.$store.state.currentPage.orderParams
                }
                request.fnPost(this,apiObj,(res)=>{
                    this.$store.commit("setOrderData",res.appOrderConfirmBean);
                })
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>
