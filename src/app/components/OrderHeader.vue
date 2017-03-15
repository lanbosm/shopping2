<template>
   	   <div class="container order-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2">
                    <a class="btn btn-default back-btn pull-left" @click="toBack();"  v-if="back.show" >&laquo;{{back.label}} </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right" >
                    <a class="btn btn-default ok-btn pull-right"  @click="toNext();" v-if="next.show"> {{next.label}}  &raquo;</a>
                </div>
            </div>
        </div>
</template> 

<style>
</style>
<script>
    export default{
        name: 'OrderHeader',
        props:["title","back","next","mode"],
        methods:{
            toBack (){
                var msg="确定"+this.back.label+"吗?";
                var a= confirm(msg);
                if(a){
                    this.$store.commit("setMode",this.back.url);
                }
            },
            toNext (){
                var msg="确定"+this.next.label+"吗?";
                var a= confirm(msg);
                if(a){
                    this.$store.commit("setMode",this.next.url);
                }
            }
        }
    }
</script>

