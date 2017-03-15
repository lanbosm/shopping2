<template>
    <div class="order">
        <app-center-header :title="title" :back="back" :next="next" mode="mode"></app-center-header>
        <app-center-custom :mode="mode" :message="message" :amount="amount"></app-center-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                    <app-center-menu :mode="mode"></app-center-menu>
                </div>
                <div class="col-nn-70 right-con">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view :message="message" :amount="amount" :show-shop-admin-btn="true"></router-view>
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

    export default{
        data() {
            return {
                title:"结账",
                back:{"label":"返回","url":"index","show":true},
                next:{"label":"打印","url":"print","show":true},
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
            isPay(){
                return this.$store.state.currentPage.isPay;
            },
            amount(){
                var total=0;
                this.cartData.forEach(function(e,i){
                    total+=e.price*e.amount;
                })

                total=Math.round(total*100);
                var tmp = total*0.01;
                return tmp;
            }
        },
        methods: {

        },
        created(){

        },
        mounted(){

        }
    }
</script>
