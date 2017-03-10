<template>
    <div class="order">
        <order-header></order-header>
        <order-custom></order-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                     <order-menu></order-menu>
                     <router-link active-class="on" v-if="isRecharge"   class="btn btn-default recharge-btn btn-block" to="/recharge" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>充值</router-link>
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
        compiled() {

        },
        data() {
            return {
                message: '请选择一个付款方式',
                index: 0
            }
        },
        components:{
            OrderHeader,
            OrderMenu,
            OrderCustom
        },
        watch: {
           // '$route': 'fetchData'
        },
        computed: {
            //数据来自全局
            isRecharge(){
                return this.$store.state.mode!="recharge"
            },
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
                }

        },
        mounted(){

        }
    }
</script>
