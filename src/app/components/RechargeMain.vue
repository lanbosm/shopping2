<template>
    <div class="order">
        <order-header :title="title" :back="back" :next="next"></order-header>
        <order-custom :show-info="false" :show-recharge="true"></order-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                     <order-menu :show-recharge-btn="false"></order-menu>
                </div>
                <div class="col-nn-70 right-con">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    /* transition animate */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }


    .slide-enter-active {
        transition: all .3s ease;
    }
    .slide-leave-active {
        /* transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
    }
    .slide-enter, .slide-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }

</style>
<script>
    "use strict";
    import OrderHeader from 'components/OrderHeader.vue';
    import OrderCustom from 'components/OrderCustom.vue';
    import OrderMenu from 'components/OrderMenu.vue';
    export default{
        data() {
            return {
                title:"充值",
                back:{"label":"返回","url":"order","show":true},
                next:{"label":"打印","url":"print","show":true},
                message: '请选择一个充值方式',
                index: 0
            }
        },
        created(){
            this.$store.commit("setMode",'recharge');
        },
        components:{
            OrderHeader,
            OrderMenu,
            OrderCustom
        },
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods: {
                toBack:function(){
                    location.href="./index.html";
                },
                toPrint:function(){
                    location.href="./print.html";
                },
                switchPay:function (index) {
                    this.index = index;
                },
                choiceDis:function(param){
                    this.choice[param] = !this.choice[param];
                },


        },
        mounted(){

        }
    }
</script>

