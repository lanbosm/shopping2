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

        .no-list{ width: 100%; height:500px; background: url(/images/no_list.jpg) no-repeat 50% 50%; background-size: 360px}


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
        props:[],
        methods:{

        }

    }
</script>

