<template>
   	<ol class="breadcrumb">                 
        <li class="active'"><span  class="glyphicon glyphicon-home"></span><a href="#">首页</a></li>
        <li class="active'"><span  class="glyphicon"></span><a href="#">分类</a></li>
        <li class="active'"><span  class="glyphicon"></span><a href="#">品牌</a></li>
    </ol>
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

