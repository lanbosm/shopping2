<template>
   	    <div class="order-menu">
            <a active-class="on" replace class="btn btn-default scan-btn btn-block" @click="payScan"><span class="iconfont icon-qr2" aria-hidden="true"></span> 扫码</a>
            <a active-class="on" replace class="btn btn-default scan-btn btn-block"  @click="payMoney"><span class="iconfont icon-icon" aria-hidden="true"></span>现金</a>
            <a active-class="on" replace class="btn btn-default scan-btn btn-block"  @click="payCard" ><span class="iconfont icon-xinyongqiahuankuan" aria-hidden="true"></span>刷卡</a>
            <a active-class="on" v-if="mode!='recharge'" class="btn btn-default recharge-btn btn-block" @click="goRecharge" ><span class="iconfont icon-jizhang" aria-hidden="true"></span>充值</a>
        </div>
</template>

<style>
</style>
<script>
    export default{
        name: 'OrderMenu',
        props:["mode"],
        methods:{

            //扫码支付
            payScan() {
                this.$store.commit("setOrderParams",{
                    paymentMethodId:12,
                })
                this.$router.push('/scan');
            },
            payMoney() {
                this.$store.commit("setOrderParams",{
                    paymentMethodId:10,
                })
                this.$router.push('/money');
            },
            payCard() {
                this.$store.commit("setOrderParams",{
                    paymentMethodId:11,
                })
                this.$router.push('/card');
            },
            //去充钱
            goRecharge() {
                this.$store.commit("setMode","recharge");
                this.$router.push('/recharge');
            },

            //去充钱
            goRecharge() {
                    this.$store.commit("setMode","recharge");
                    this.$router.push('/recharge');
            },

        }
    }
</script>

