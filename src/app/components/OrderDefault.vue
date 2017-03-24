<template>
   <!--刷卡方式-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">{{amount | currency}}</h1>
            <p class="pay-tips "> {{ message }}</p>
            <shop-admin-btn v-show="showShopAdminBtn"></shop-admin-btn>
        </div>
</template> 



<script>
    import shopAdminBtn from 'components/ShopAdminBtn.vue';

    export default{
        name:"OrderDefault",
        props:['message','amount','showShopAdminBtn'],
        components:{
            shopAdminBtn
        },
        filters: {
            currency: function (value) {
                return '¥ ' + value;
            }
        }

    }
</script>     
