<!-- info -->
<template>
    <div class="info" >
            <div class="custom-member">
                <div class="row">
                <div class="col-xs-12 col-sm-12 clearfix">
                    <!--{{customData.curCustom.sex | sex}}-->
                    <em class="sex-photo"><img v-show="member.headPortrait" :src="member.headPortrait"/></em>
                    <span class="nickname">{{member.nickname}}</span>
                </div>
                </div>
                <div class="row">
                <div class="col-xs-12 col-sm-6">手机号<span>{{member.username}}</span></div>
                <div class="col-xs-12 col-sm-6">积分<span>{{member.point}}</span></div>
                </div>
                <div class="row">
                <div class="col-xs-12 col-sm-6">余额 <span>{{member.balance}}</span></div>
                </div>
            </div>
            <div class="line"><span class="primary glyphicon glyphicon-tag"></span></div>
            <div class="custom-ticket">
                <div class="custom-ticket-header">优惠券</div>
                <div class="custom-ticket-body">
                <div class="text-center" v-if="!member.appCoupons || !member.appCoupons.length">暂无优惠券</div>
                    <ul>
                        <li v-for="coupon in member.appCoupons">
                            <div class="left">
                            <span class="m">{{coupon.amount}}</span>
                            <span class="u">满{{coupon.conditionLine}}可用</span>
                            </div>
                            <div class="right">
                            <span class="yxq" >有效期
                            <em class="primary">{{coupon.endDate}}</em>
                            </span>
                            <span class="l2">{{coupon.toSbName}}</span>
                            <span class="l3 primary">{{coupon.type | couponType}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .yxq{color: @border-color;}
</style>

<script>

    export default{
        name:"CustomInfo",
        props:['member'],
        data(){
            return {
                msg:''
            }
        },
        computed: {
//            customData () {
//                return this.$store.state.customData;
//            }
        },
        filters:{
            couponType(val){
                if(val === 'fullReduce'){
                    return '满减劵';
                }else if(val === 'fullBack'){
                    return '满返劵';
                }else{
                    return '';
                }
            }
        }
    }
</script>


