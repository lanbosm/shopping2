<template>
   	   <div class="container order-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2">
                    <a class="btn btn-default back-btn pull-left" @click="toBack();">&laquo;{{back.label}} </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right">
                    <a class="btn btn-default ok-btn pull-right"  @click="toNext();"> {{next.label}}  &raquo;</a>
                </div>
            </div>
        </div>
</template> 

<style>
</style>
<script>
    "use strict";

    export default{
        name: 'OrderHeader',
        props:["title","back","next"],
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods:{
            toBack (){

                this.$store.commit("setMode",this.back.url);
                this.$router.go(-1);
            },
            toNext (){
                if(this.$route.name=='Recharge'){
                    alert("去充钱");
                }
                else{
                    alert("去打印");
                }

            }
        }
    }
</script>

