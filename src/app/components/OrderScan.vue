<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
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
        ready(){
            //数据传递
			
        },
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods:{
            filterList:function(id){

                this.cartData.index=index;
            }
        }
    }
</script>

