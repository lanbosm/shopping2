<template>
   	   <div class="container common-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2" v-if="back">
                    <a class="btn btn-primary back-btn pull-left" @click="toBack();"  v-if="back.show" >&laquo;{{back.label}} </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right" v-if="next" >
                    <a class="btn btn-primary ok-btn pull-right"  @click="toNext();" v-if="next.show"> {{next.label}}  &raquo;</a>
                </div>
            </div>
        </div>
</template>


<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .common-header{
        padding: @gutter;
        background-color:#ffffff;
        border-left: @borderDashedStyle;
        border-right: @borderDashedStyle;
        position: relative;
        .btn{
            position:relative;
            font-size: 12px;
        }
        .common-header-row();

        h3{
            font-size: 16px; line-height: 40px; margin: 0; font-weight: bold;
        }
        .ok-btn,.back-btn{
            .common-header-btn();
        }
    }

</style>
<script>


    export default{
        name: 'commomHeader',
        props:["title","back","next"],
        methods:{
            toBack (){

                if(this.back.cb){
                    this.back.cb();
                }else {
                    this.$router.replace(this.back.url);
                }
            },
            toNext (){
                var msg="确定"+this.next.label+"吗?";
                var vm=this;
                   //询问框
                    this.$confirm(msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(vm.next.cb){
                            vm.next.cb();
                        }else {
                            vm.$router.replace(vm.next.url);
                        }
                    }).catch(() => {


                    })
            }
        }

    }
</script>

