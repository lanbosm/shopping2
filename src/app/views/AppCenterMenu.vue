<template>
   	    <div class="order-menu">
            <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==17||payMethod==18}" @click="payScan"><span class="iconfont icon-qr2" aria-hidden="true"></span> 扫码</a>
            <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==10}" @click="payMoney"><span class="iconfont icon-icon" aria-hidden="true"></span>现金</a>
            <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==11}" @click="payCard" ><span class="iconfont icon-xinyongqiahuankuan" aria-hidden="true"></span>刷卡</a>
            <a  :class="{on:recharge}" class="btn btn-primary recharge-btn btn-block" @click="goRecharge" ><span class="iconfont icon-jizhang" aria-hidden="true"></span>充值</a>
        </div>
</template>

<style>
</style>
<script>
    export default{
        name: 'OrderMenu',
        data(){
            return {
                menuIndex:1,
                recharge:false
            }
        },
        computed:{
            custom(){
                return this.$store.state.currentPage.customData;
            },
            payMethod(){
                return this.$store.state.currentPage.orderParams.paymentMethodId
            }
        },
        created(){
            var mids={
                'PayCard':17,
                'PayCash':10,
                'PayCard':11
            }

            this.$store.commit("setOrderParams",{ paymentMethodId:mids[this.$route.name]})

        },
        methods:{
            //扫码支付
            payScan() {
                this.recharge=false;
                this.$store.commit("setOrderParams",{
                    paymentMethodId:17,
                })
                this.$router.replace('/order/payScan');
            },
            payMoney() {
                this.recharge=false;
                this.$store.commit("setOrderParams",{
                    paymentMethodId:10,
                })
                this.$router.replace('/order/payCash');
            },
            payCard() {
                this.recharge=false;
                this.$store.commit("setOrderParams",{
                    paymentMethodId:11,
                })
                this.$router.replace('/order/payCard');
            },
            //去充钱
            goRecharge() {
                //去顾客
                if(!this.custom.id){
                    this.$root.showCustomDialog=true;
                    return false;
                }

                //去充值
                this.recharge=true;
                this.$root.showRechargeModal=true;

                function centerModals() {
                    $(this).each(function(i) {
                        var $clone = $(this).clone().css('display','block').appendTo('body');
                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                        top = top > 0 ? top : 0;
                        $clone.remove();
                        $(this).find('.modal-content').css("margin-top", top);
                    });
                };
                this.$nextTick(()=>{

                    var vm=this;
                    var modal='#layer-recharge';
                    $(modal).on('show.bs.modal', centerModals);
                    $(modal).on('hidden.bs.modal',function(){
                        vm.$root.showRechargeModal=false;
                        vm.recharge=false;
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

            }

        }
    }
</script>

