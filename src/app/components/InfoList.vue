//信息列表
<template>
    <div class="infolist clearfix">
        <div class="col-nn-23 ">
            <a class="btn btn-default  coupon-btn btn-block" :class={cur:order.couponCodeId!=null} @click="chooseCoupon()">
                <b>优惠券</b><span v-if="!order.couponCodeId">{{order.canChooseCouponCodes.length}}张</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  point-btn btn-block" :class={cur:order.usePoint} @click="choosePoint()">
                <b>{{order.canUsePoint}}积分</b><span>{{order.canPointDiscount | dikou }}</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  balance-btn btn-block" :class={cur:order.useBalance} @click="chooseBalance()">
                <b>{{order.canUseBalance}}余额</b><span>{{order.canUseBalance | dikou }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'CustomList',
        props:["custom","order"],
        computed:{
            usePoint (){                //活动 充多少送多少
                return this.$store.state.currentPage.orderParams.usePoint;
            },
            useBalance (){                //活动 充多少送多少
                return this.$store.state.currentPage.orderParams.useBalance;
            },
            couponCodeId (){                //活动 充多少送多少
                return this.$store.state.currentPage.orderParams.couponCodeId;
            }
        },
        filters: {
            dikou:function(value){
                if(value==0){
                    return  '0.00';
                }
                return '- ' + value;
            },
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            //选择使用
            chooseCoupon(){

                var  couponCodeId=18;
                this.$store.commit("setOrderParams",{
                    couponCodeId: couponCodeId
                })
                this.refreshOrder();
            },
            choosePoint(){
                var usePoint=!this.usePoint;
                this.$store.commit("setOrderParams",{
                    usePoint:usePoint
                })
                this.refreshOrder();
            },
            chooseBalance(){
                var useBalance=!this.useBalance;
                this.$store.commit("setOrderParams",{
                    useBalance:useBalance,
                })
                this.refreshOrder();
            },
            //刷新订单
            refreshOrder(){

                var apiObj={
                    url:API_URLS.b2b_orders+"/build",
                    data:this.$store.state.currentPage.orderParams
                }

                request.fnPost(this,apiObj,(res)=>{
                    this.$store.commit("setOrderData",res.appOrderConfirmBean);
                })
            }
        },

    }
</script>

<style scoped rel="stylesheet/less"  lang="less">

    @themeColor:#e84593;

    .class-order-btn(@fontColor,@bgcolor,@borderColor,@radius:5px,@padding:25px){
        color: @fontColor;
        padding: @padding;
        border-color:@borderColor;
        border-radius: @radius;
        background: @bgcolor;
    }

    .order-custom-btn(){
        .class-order-btn(#666666,#ffffff,#cccccc,5px,10px);
        &:active{ .class-order-btn(#666666,#ffffff,@themeColor,5px,10px);}
        &.select{.class-order-btn(#666666,#ffffff,@themeColor,5px,10px);}
    }

    .rechargelist-btn{
        font-size: 18px;
        .order-custom-btn;

    }


    .col-nn-15{
         width: 15%;
         float: left;
         padding-left: 8px;
         padding-right: 7px;
     }
    .col-nn-25{
        width: 25%;
        float: left;
        padding-left: 8px;
        padding-right: 7px;

    }
    .rechargelist{
        float: left;
        width: 70%;
        .rechargelist-btn{
            span{display: block; position: relative; }
            em{display: block; color: #999999; font-size: 14px; line-height: 30px;}
            &.diy{
                input{ width: 80%; text-align: right;}

                span:after{content: ''; display: block;  width: 100%;
                    background: #999999;
                    height:1px;
                }
            }
            &.select{
                span:after{background: @themeColor; }
            }

        }
    }

</style>
