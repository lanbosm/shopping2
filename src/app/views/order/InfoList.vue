//信息列表
<template>
    <div class="infolist clearfix">
        <div class="col-nn-23 ">
            <a class="btn btn-default  coupon-btn btn-block" :class={cur:order.couponCodeId} @click="chooseCoupon()">
                <b>优惠券</b>
                <span v-if="order.canChooseCouponCodes && !order.couponCodeId">{{order.canChooseCouponCodes.length}}张</span>
                <span v-else-if="order.couponCodeId">已选：{{order.couponName}}</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  point-btn btn-block" :class={cur:order.usePoint} @click="choosePoint()">
                <b>{{custom.point}}积分</b><span>{{order.canPointDiscount | dikou }}</span>
            </a>
        </div>
        <div class="col-nn-23">
            <a class="btn btn-default  balance-btn btn-block" :class={cur:order.useBalance} @click="chooseBalance()">
                <b>{{custom.balance}}余额</b><span>{{order.canUseBalance | dikou }}</span>
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
            },
        },
        created(){

        },
        filters: {
            dikou:function(value){
                if(value==0){
                    return  '0.00';
                }
                return '可抵扣 ' + value +"元";
            },
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{

            //选择使用
            chooseCoupon(){
                if(this.order.canChooseCouponCodes.length==0){
                    return false;
                }
                let vm = this;
                vm.$root.showCouponModal=true;
                function centerModals() {
                    $(this).each(function(i) {
                        var $clone = $(this).clone().css('display','block').appendTo('body');
                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                        top = top > 0 ? top : 0;
                        $clone.remove();
                        $(this).find('.modal-content').css("margin-top", top);
                    });
                };
                vm.$nextTick(()=>{
                    var modal='#layer-coupon';
                    $(modal).on('show.bs.modal', centerModals);
                    $(modal).on('hidden.bs.modal',function(){
                        vm.$root.showCouponModal=false;
                    });
                    //禁用空白处点击关闭
                    $(modal).modal({
                        backdrop: 'static',
                        keyboard: false,//禁止键盘
                        show:false
                    });
                    //页面大小变化是仍然保证模态框水平垂直居中
                    $(window).on('resize',(modal)=>centerModals);
                    //shop_admins
                    $(modal).modal('toggle');
                })
                this.refreshOrder();
            },
            choosePoint(){
                if(this.custom.point==0){
                    return false;
                }
                var usePoint=!this.usePoint;
                this.$store.commit("setOrderParams",{
                    usePoint:usePoint
                })
                this.refreshOrder();
            },
            chooseBalance(){
                if(this.custom.balance==0){
                    return false;
                }
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

                this.$store.commit("show_waiting");
                request.fnPost(this,apiObj,(res)=>{
                    this.$store.commit("setOrderData",res.appOrderConfirmBean);
                    this.$store.commit("hide_waiting");
                })
            }
        },

    }
</script>

<style scoped rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .class-order-btn(@fontColor,@bgcolor,@borderColor,@radius:5px,@padding:25px){
        color: @fontColor;
        padding: @padding;
        border-color:@borderColor;
        border-radius: @radius;
        background: @bgcolor;
    }

    .order-custom-btn(){
        .class-order-btn(#666666,#ffffff,@border-color,5px,10px);
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
