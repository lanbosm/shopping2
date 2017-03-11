//信息列表
<template>
    <div class="infolist clearfix">
        <div class="col-nn-23 ">
            <a class="btn btn-default  coupon-btn btn-block" :class={cur:usecoupon} @click="chooseThis('coupon')">
                <b>优惠券</b><span>- {{infodata.couponvalue | currency}}</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  point-btn btn-block" :class={cur:usepoint} @click="chooseThis('point')">
                <b>{{infodata.point}}积分</b><span>- {{infodata.pointvalue | currency}}</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  balance-btn btn-block" :class={cur:usebalance} @click="chooseThis('balance')">
                <b>{{infodata.balancevalue | currency}}余额</b><span>- {{infodata.balancevalue | currency}}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'ProductList',
        props:["pageSize"],
        computed:{
            activity (){                //活动 充多少送多少
                return true;
            }
        },
        created(){
            this.getInfoData();
        },
        data (){
            return {
                usecoupon:false,
                usepoint:false,
                usebalance:false,
                infodata:{}

            }

        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            getInfoData:function(){
                   this.infodata={
                       couponvalue:"200.00",
                       point:100,
                       pointvalue:"10.00",
                       balancevalue:"1000.00",
                       balance:1000
                   }
            },
            //选择充值
            chooseThis: function(c){
               switch (c){
                   case 'coupon':
                       this.usecoupon=!this.usecoupon
                       break;
                   case 'point':
                       this.usepoint=!this.usepoint
                       break;
                   case 'balance':
                       this.usebalance=!this.usebalance
                       break;
               }

               console.log(this.$root);
                //vmb.$emit('change','hehe'); //Hub触发事件

            }
        }
    }
</script>

<style scoped rel=”stylesheet/less”  lang="less">

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
