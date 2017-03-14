<template>
   <!--刷卡方式-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ 21.50</h1>
            <p class="pay-tips "> {{ message }}</p>
            
            <div>充值</div>
        </div>
</template> 

<style>
</style>
<script>
    export default{
        props:['message'],
        compiled() {

        },
        created() {

        },
        methods:{
            filterList:function(id){

                this.cartData.index=index;
            }
        }
    }
</script>     
