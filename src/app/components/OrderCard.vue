<template>
        <!--刷卡方式-->
        <div class="tab-con tab-con-1 text-center tabShow">
            <h1 class="pay-amount ">￥ 21.50</h1>
            <p class="pay-tips "> {{ message }}</p>
            <!--<child msg="hello!"></child>-->
        </div>
</template> 

<style>
</style>
<script>
    "use strict";

    export default{
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
