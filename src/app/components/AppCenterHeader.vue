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

    import layer from 'layer';
    import $ from 'jquery';

    export default{
        name: 'OrderHeader',
        props:["title","back","next","mode"],
        methods:{
            toBack (){
                var msg="确定"+this.back.label+"吗?";

                var vm=this;
                //询问框
                layer.confirm(msg, {
                    btn: ['确定'] //按钮
                }, function(index){
                    if(vm.back.cb){
                        vm.back.cb();
                    }else {
                        vm.$store.commit("setMode", vm.back.url);
                        vm.$router.replace(vm.back.url);
                    }
                    layer.close(index);
                });
            },
            toNext (){
                var msg="确定"+this.next.label+"吗?";
                var vm=this;
                //询问框
                layer.confirm(msg, {
                    btn: ['确定'] //按钮
                }, function(index){
                    if(vm.next.cb){
                        vm.next.cb();
                    }else {
                        vm.$store.commit("setMode",vm.next.url);
                        vm.$router.replace(vm.next.url);
                    }
                    layer.close(index);
                });


            }
        }
    }
</script>

