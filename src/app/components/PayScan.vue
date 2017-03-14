<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-tips ">扫码方式</p>
            <shop-admin-btn v-show="showShopAdminBtn"></shop-admin-btn>
        </div>
</template>

<style>
</style>
<script>
    import shopAdminBtn from 'components/ShopAdminBtn.vue';
    export default{
        props:['message','amount','showShopAdminBtn'],
        components:{
            shopAdminBtn
        }
    }
</script>

