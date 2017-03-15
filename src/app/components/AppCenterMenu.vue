<template>
   	    <div class="order-menu">
            <router-link active-class="on" replace class="btn btn-default scan-btn btn-block" to="/scan" ><span class="iconfont icon-qr2" aria-hidden="true"></span> 扫码</router-link>
            <router-link active-class="on" replace class="btn btn-default scan-btn btn-block" to="/money" ><span class="iconfont icon-icon" aria-hidden="true"></span>现金</router-link>
            <router-link active-class="on" replace class="btn btn-default scan-btn btn-block" to="/card" ><span class="iconfont icon-xinyongqiahuankuan" aria-hidden="true"></span>刷卡</router-link>
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
            //去充钱
            goRecharge() {
                    this.$store.commit("setMode","recharge");
                    this.$router.push('/recharge');
            },

        }
    }
</script>

