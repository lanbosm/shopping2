<template>
        <!--刷卡方式-->
        <div class="tab-con tab-con-2 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-tips ">刷卡方式</p>
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
