<template>
        <!--刷卡方式-->
        <div class="tab-con tab-con-2 text-center tabShow">
            <h1 class="pay-amount ">{{amount | currency}}</h1>
            <p class="pay-gift-amount" v-if="giftAmount" >{{giftAmount | currency}}</p>
            <p class="txt">请对准POS机进行刷卡验证,成功后打印收据</p>
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
