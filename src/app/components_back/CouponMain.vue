<template>
    <div role="dialog" class="modal fade coupon-layer" id="layer-coupon">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">优惠券</h4>
                    <a class="close" data-dismiss="modal">&times;</a>
                </div>
                <div class="modal-body" @click="chooseThis()">
                	选择优惠券
                   <!--  <custom-search :custom="custom" :info-show="infoShow"></custom-search>
                    <custom-register v-show="registerShow"></custom-register> -->
                </div>
                <div class="custom-ticket-body">
                    <div class="text-center" v-if="!couponList || !couponList.length">暂无优惠券</div>
                    <ul>
                        <template v-for="coupon in couponList">
                        <li :class="currentId == coupon.id ? 'on' : ''" @click="chooseThis(coupon.id)">
                            <div class="left">
                                <span class="m">{{coupon.amount}}</span>
                                <span class="u">满{{coupon.conditionLine}}可用</span>
                            </div>
                            <div class="right">
                            <span style="color: @border-color">有效期
                            <em class="primary">{{coupon.endDate}}</em>
                            </span>
                                <span class="l2">{{coupon.toSbName}}</span>
                                <span class="l3 primary">{{coupon.type | couponType}}</span>
                            </div>
                        </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">
    @import "../../css/util/skin.less";

    @imgPath:"/images";

    /*!Coupon modale*/
    .coupon-layer {
        border-bottom:solid 3px #93d6b3;padding:10px 30px;
        .modal-header{
            border-bottom: solid 3px @green;
            .close{margin-top:-20px}
         }
        .modal-body {
            padding: 30px 30px;
        }

        .custom-ticket-body{height:300px;overflow-x:hidden;}
        .custom-ticket-body ul{list-style:none;padding:0}
        .custom-ticket-body li{width:80%;height:90px;display:block;border:2px solid #e8e9f1;border-radius:5px;margin:10px auto 0;font-size:.8rem}
        .custom-ticket-body li:first-child{margin-top:0}
        .custom-ticket-body li .left{width:33%;height:100%;background:#e8e9f1;position:relative;float:left}
        .custom-ticket-body li .right{width:66%;height:100%;position:relative;float:left;background:#fff;padding:10px 20px}
        .custom-ticket-body li .left .m{position:absolute;font-size:2rem;left:20px;top:10px}
        .custom-ticket-body li .left .u{position:absolute;left:30px;top:60px}
        .custom-ticket-body li .left .m:before{content:"¥";font-size:1rem}
        .custom-ticket-body li .right span{margin-top:5px;display:block}
        .custom-ticket-body li .right em{font-style:normal}
        .custom-ticket-body li.on {
            border: 1px solid red;
        }
    }
</style>

<script>

    import layer from 'layer';

    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        mounted(){
        },
        data(){
            return {
                list:[]
            }
        },
        computed:{
          couponList(){
              return this.$store.state.currentPage.orderData.canChooseCouponCodes;
          },
            currentId(){
              return this.$store.state.currentPage.orderData.couponCodeId;
            }
        },
        methods:{
            chooseThis(id){
                this.$store.commit("setOrderParams",{
                    couponCodeId:id
                });
                //关闭弹窗
                $('#layer-coupon').modal('toggle');
            }
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


