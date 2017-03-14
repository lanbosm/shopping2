<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-tips ">扫码方式</p>
        </div>
</template>

<style>
</style>
<script>
    export default{
        props:['message','amount'],
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

