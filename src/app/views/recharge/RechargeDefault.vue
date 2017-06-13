<template>
   <!--刷卡方式-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">{{amount | currency}}</h1>
            <p class="pay-gift-amount" v-if="giftAmount">{{giftAmount}}</p>
            <p class="pay-tips "> {{ message }}</p>
        </div>
</template> 

<style>
</style>
<script>
    export default{
        props:['message','amount','giftAmount'],
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        }
    }
</script>     
