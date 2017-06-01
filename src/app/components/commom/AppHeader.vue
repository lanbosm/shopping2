<template>
   	   <div class="container common-header">
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


<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .common-header{

        background-color:#ffffff;
        border-left: @borderDashedStyle;
        border-right: @borderDashedStyle;
    }
    .common-header{
        padding: @gutter;
        position: relative;
        .btn{
            position:relative;
            font-size: 12px;
        }
        .common-header-row();

        h3{
            font-size: 16px; line-height: 30px; margin: 0;
        }
        .ok-btn,.back-btn{
            .common-header-btn();
        }
    }

</style>
<script>

    import layer from 'layer';
    import $ from 'jquery';
    import {request, API_URLS, HOST} from 'util/request.js';

    export default{
        name: 'AppHeader',
        props:["title","back","next"],
        methods:{
            toBack (){
                var vm=this;
                if(vm.back.cb){
                    vm.back.cb();
                }else {
                    vm.$store.commit("setMode", vm.back.url);
                    vm.$router.replace(vm.back.url);
                }
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
        },
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
    }
</script>

