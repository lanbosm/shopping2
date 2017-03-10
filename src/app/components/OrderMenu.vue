<template>
   	    <div class="order-menu">
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/scan" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span> 扫码</router-link>
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/money" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>现金</router-link>
            <router-link active-class="on" class="btn btn-default scan-btn btn-block" to="/card" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span>刷卡</router-link>
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

