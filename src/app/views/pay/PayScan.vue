<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-gift-amount" v-if="giftAmount" >{{giftAmount}}</p>
            <p class="txt">请打印收据后 扫描收据上的二维码</p>
            <shop-admin-btn v-show="showShopAdminBtn"></shop-admin-btn>
        </div>
</template>

<style>
</style>
<script>
    import shopAdminBtn from 'views/shopAdmin/ShopAdminBtn.vue';
    export default{
        props:['message','amount','giftAmount','showShopAdminBtn'],
        components:{
            shopAdminBtn
        }
    }
</script>

