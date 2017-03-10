<template>
   	   <div class="container order-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2">
                    <a class="btn btn-default back-btn pull-left" @click="toBack();">&laquo; 返回 </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right">
                    <a class="btn btn-default ok-btn pull-right"  @click="toNext();">确认  &raquo;</a>
                </div>
            </div>
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
        data(){
            return {
                title:"结账"
            }

        },
        watch: {
            '$route': 'refreshHeader'
        },
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods:{
             refreshHeader(){

                 if(this.$route.name=='Recharge'){
                        this.title="充值";
                 }
                 else{
                     this.title="结账";
                 }
            },
            toBack (){
                this.$store.commit("setMode",'order');
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

