<template>
       <div class="tab-con tab-con-1 text-center tabShow">
                刷卡方式
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
