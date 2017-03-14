<template>
        <!--刷卡方式-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-tips ">刷卡方式</p>
        </div>
</template> 

<style>
</style>
<script>
    export default{
        props:['message','amount'],
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
