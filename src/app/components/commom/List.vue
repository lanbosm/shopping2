<template>
   	   <div class="container common-list">
           <div class="row common-list-header">
               <div class="col-xs-12">
                     <slot name="list-header"></slot>
               </div>
           </div>
           <div class="row common-list-con">
               <div class="col-xs-12">
                    <slot></slot>
               </div>
           </div>
            <div class="row common-list-footer">
                <div class="col-xs-12">
                    <slot name="list-footer"></slot>
                </div>
            </div>
        </div>
</template>


<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";



    .common-list{
        background-color:#ffffff;
        border-left: @borderDashedStyle;
        border-right: @borderDashedStyle;
        height:650px;
        overflow: hidden;

        .no-list{ width: 100%; height:500px; background: url(/images/no_list.jpg) no-repeat 50% 0%;}


        .common-list-header{

            //border-bottom: @borderDashedStyle;
        }

        .common-list-footer{
            border-top: @borderDashedStyle;
        }

    }
</style>
<script>


    export default{
        name: 'commomList',
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

