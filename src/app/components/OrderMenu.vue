<template>
   	    <div class="order-menu">
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/scan" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span> 扫码</router-link>
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/money" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>现金</router-link>
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/card" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>刷卡</router-link>
            <router-link active-class="on" v-if="showRechargeBtn"   class="btn btn-default recharge-btn btn-block" to="/recharge" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>充值</router-link>
        </div>
</template> 

<style>
</style>
<script>
    export default{
        name: 'OrderMenu',
        props:["showRechargeBtn"],
    }
</script>

