<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block">
                        <span class="glyphicon glyphicon-user"></span> 顾客
                    </a>
                </div>

                <recharge-list></recharge-list>

                <coupon-list></recharge-list>
                <!--<div class="col-nn-23 ">-->
                    <!--<a class="btn btn-default  coupon-btn btn-block" :class={cur:true} @click="choiceDis('fir')">-->
                        <!--<b>优惠券</b><span>- ¥  20.00</span>-->
                    <!--</a>-->
                <!--</div>-->
                <!--<div class="col-nn-23">-->
                    <!--<a class="btn btn-default  point-btn btn-block" :class={cur:true} @click="choiceDis('sec')">-->
                        <!--<b>100积分</b><span>- ¥  10.00</span>-->
                    <!--</a>-->
                <!--</div>-->
                <!--<div class="col-nn-23">-->
                    <!--<a class="btn btn-default  balance-btn btn-block" :class={cur:true} @click="choiceDis('thr')">-->
                        <!--<b>¥  20余额</b><span>- ¥  20.00</span>-->
                    <!--</a>-->
                <!--</div>-->
            </div>
        </div>
</template>

<style>
</style>
<script>
    "use strict";
    import RechargeList from 'components/RechargeList.vue';

    export default{
        compiled() {

        },
        data() {
            return {
                message: '请选择一个付款方式',
                index: 0,
                choice: {
                    'fir': true,
                    'sec': false,
                    'thr': false
                }
            }
        },
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        components: {
            RechargeList,
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

        }
    }
</script>
