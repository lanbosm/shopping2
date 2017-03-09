<template>
    <div class="bill">
        <div class="container bill-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2">
                    <a class="btn btn-default back-btn pull-left" @click="toBack();"><<  返回 </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>结账</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right">
                    <a class="btn btn-default ok-btn pull-right"  @click="toPrint();">确认  >></a>
                </div>
            </div>
        </div>

        <div class="container bill-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block">
                        <span class="glyphicon glyphicon-user"></span> 顾客
                    </a>
                </div>
                <div class="col-nn-23 ">
                    <a class="btn btn-default  coupon-btn btn-block" :class={cur:true} @click="choiceDis('fir')">
                        <b>优惠券</b><span>- ¥  20.00</span>
                    </a>
                </div>
                <div class="col-nn-23">
                    <a class="btn btn-default  point-btn btn-block" :class={cur:true} @click="choiceDis('sec')">
                        <b>100积分</b><span>- ¥  10.00</span>
                    </a>
                </div>
                <div class="col-nn-23">
                    <a class="btn btn-default  balance-btn btn-block" :class={cur:true} @click="choiceDis('thr')">
                        <b>¥  20余额</b><span>- ¥  20.00</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="container bill-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                    <a class="btn btn-default scan-btn btn-block" @click="switchPay(0)" :class="{on:index==0}">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span> 扫码
                    </a>
                    <a class="btn btn-default  money-btn btn-block"  @click="switchPay(1)" :class="{on:index==1}">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span> 现金
                    </a>
                    <div class="btn btn-default  card-btn btn-block"  @click="switchPay(2)" :class="{on:index==2}">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span> 刷卡
                    </div>
                </div>
                <div class="col-nn-70 right-con">
                    <!--默认无选择-->
                    <div class="tab-con tab-con-0 text-center " :class="{tabShow:index==0}">
                        <h1 class="pay-amount ">￥ 21.50</h1>
                        <p class="pay-tips "> {{ message }}</p>
                        <!--<child msg="hello!"></child>-->
                    </div>

                    <!--默认无选择-->
                    <div class="tab-con tab-con-1 text-center" :class="{tabShow:index==2}">
                        刷卡方式
                    </div>

                    <!--现金方式-->
                    <div class="tab-con tab-con-2 text-center" :class="{tabShow:index==1}">
                        <div class="list-box ">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>价格</th>
                                    <th>付款</th>
                                    <th>找零</th>
                                    <th>支付方式</th>
                                </tr>
                                </thead>
                                <tbody class="text-left">
                                <tr>

                                    <td>70</td>
                                    <td><span>1000</span></td>
                                    <td>30</td>
                                    <td>现金</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="calc-box ">
                            <ul class="clearfix">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>+10</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>+20</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>+50</li>
                                <li>C</li>
                                <li>0</li>
                                <li>.</li>
                                <li>X</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
<script>
    "use strict";

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
