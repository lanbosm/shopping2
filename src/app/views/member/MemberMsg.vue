<template>
    <div class="log-products container">
        <div class="row">
            <div class="col-xs-12">
                <div class="list-header">
                    <div class="list-row">
                        <span class="list-span">卡号</span>
                        <span class="list-span">姓名</span>
                        <span class="list-span">手机号</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="list-body" v-if="!listData.list">
                    加载中...
                </div>
                <div class="list-body" v-else-if="listData.list.length==0">
                    <div class="no-list"></div>
                </div>
                <div class="list-body" v-else>
                    <!--list-->
                    <div class="list-row" v-for="(item,index) in listData.list">
                        <div class="col-nl-20">{{item.card}}</div>
                        <!--会员名-->
                        <div class="col-nl-20">{{item.name}}</div>
                        <!--编号-->
                        <div class="col-nl-20">{{item.phone}}</div>
                        <div class="col-nl-20">
                            <div class="good_invent">
                                <div>
                                    <i aria-hidden="true" class="iconfont icon-kucun ico" ></i> 查看存货
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <pagination :page="listData" :go-callback="goCallback"></pagination>
            </div>
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";
    .col-nl-20{width: 25%;text-align: center;float: left;height: 60px;line-height: 60px;}
    .ico{font-size: 18px;}
    .good_invent div{text-align: center;border-radius:5px;width: 80%;height: 40px;background-color: #6fc89c;margin-left: 10%;margin-top: 10px;line-height: 40px;color: #fff;font-size: 16px;}
    .log-products{
        position: relative;
    .list-row{

        clear: both;

    span{
        display: block; width: 25%; float: left; text-align: center;
    &:first-child{width: 25%;}
    }
    .clearfix;
    }

    .list-header {
    .list-row{
        line-height: 50px;
        font-size: 18px;
    }
    }

    .list-body {
        height: @listHeight;
    .list-row{
        border: solid 1px  @border-color;
        margin-top: @gutter;
        margin-bottom: @gutter;
        border-radius: 5px;
        clear: both;
    .t{
        color: @thinColor;
        padding-left: @gutter;
        padding-right: @gutter;
        font-size: 16px;
        line-height: 40px;
    }
    .c {
        padding-left: @gutter;
        padding-right: @gutter;
        font-size: 16px;
        border-top: @borderDashedStyle;
        line-height:100px;
    span {
        display: block;
        width: 25%;
        float: left;
        text-align: center;
        color: @thinColor;
    &:first-child {
         width: 50%;
         color: @color;
         text-align: left;
    em{ margin-left: @gutter; display: inline-block; width: 75%; height: 60px;
    .norow;
    }
    }
    }
    img{width: 60px; height: 60px; display: inline-block;}
    }
    .clearfix;
    }
    }

    .list-footer{
        height: 90px;
        width: 100%;
        line-height: 90px;
        text-align: center;
        color: @themeColor;
        font-size: 16px;
        border-top: @borderDashedStyle;
        border-width: 2px;
    span{font-size: 36px; padding-left: 12px; padding-right: 12px;}
    }

    }



</style>


<script>



    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';
   var mockDate={
       pageNum:2,
       list:[
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
           {"card":12344,"name":"zhangsan","phone":189999999},
       ]
   }
    export default{
        name:'member_msg',
        data(){
            return {
                title:'会员',
                back:{"label":"返回","url":"index","show":true},
                next:{"show":false},
                listDate:{},
                pageNum:1

            }
        },
        created(){
            this.fetchList()
        },
        methods:{
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
            fetchList() {
//                this.$store.dispatch('fetchShiftList',{"pageNum":this.pageNum}).then(res=>{
//                   this.listData=res.page;
//                })
                this.listData=mockDate;
                this.pageNum=this.listData.pageNum;
//
            },
            gostock(){

            }
        }
    }
</script>