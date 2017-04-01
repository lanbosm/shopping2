<template>
   	  <div class="message">

        <app-center-header  :title="title" :back="back" :next="next" mode="mode"></app-center-header>

        <div class="container message-body" >
            <div class="row page-con">
                <div class="col-xs-6">
                    <div class="m-box">
                        <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                        <h3>某某商铺申请调拨</h3>
                        <div class="c">
                            <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                        </div>
                        <em>数量 55</em>
                        <div class="r">
                            <a class="btn btn-agree">同意</a>
                            <a class="btn btn-refuse">拒绝</a>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="m-box">
                        <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                        <h3>某某商铺申请调拨</h3>
                        <div class="c">
                            <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                        </div>
                        <em>数量 55</em>
                        <div class="r">
                            <a class="btn btn-agree">同意</a>
                            <a class="btn btn-refuse">拒绝</a>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="m-box">
                        <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                        <h3>某某商铺申请调拨</h3>
                        <div class="c">
                            <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                        </div>
                        <em>数量 55</em>
                        <div class="r">
                            <a class="btn btn-agree">同意</a>
                            <a class="btn btn-refuse">拒绝</a>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="m-box">
                        <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                        <h3>某某商铺申请调拨</h3>
                        <div class="c">
                            <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                        </div>
                        <em>数量 55</em>
                        <div class="r">
                            <a class="btn btn-agree">同意</a>
                            <a class="btn btn-refuse">拒绝</a>
                        </div>
                    </div>
                </div>
                    <div class="col-xs-6">
                        <div class="m-box">
                            <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                            <h3>某某商铺申请调拨</h3>
                            <div class="c">
                                <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                            </div>
                            <em>数量 55</em>
                            <div class="r">
                                <a class="btn btn-agree">同意</a>
                                <a class="btn btn-refuse">拒绝</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="m-box">
                            <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                            <h3>某某商铺申请调拨</h3>
                            <div class="c">
                                <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                            </div>
                            <em>数量 55</em>
                            <div class="r">
                                <a class="btn btn-agree">同意</a>
                                <a class="btn btn-refuse">拒绝</a>
                        </div>
                    </div>
                </div>
            </div>


            <div class="page-bar">
                    <ul class="pagination">
                        <li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>
                        <li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>
                        <li v-for=" index in page.pages" :class="{active:index==page.pageNum}"  @click="pageTo(index)"><a>{{ index }}</a></li>
                        <li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>
                    </ul>
            </div>

        </div>




</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .message{
        background: #efefef;
        .order-header{
            padding: 15px;
            position: relative;
            .order-row;
            h3{
                font-size: 18px; line-height: 30px; margin: 0;
            }
            .ok-btn,.back-btn{
                .order-header-btn;
            }
        }

        .page-con{height: 588px;}
        .page-bar{}

        .container{
            background-color:#ffffff;
            border-left: @borderDashedStyle;
            border-right: @borderDashedStyle;
        }
        .btn{
            position:relative;
        }
        .m-box{
            height: auto;
            background: #fff;
            z-index: 9999;
            border: solid 1px #ddd;
            margin-top: 12px;
            margin-bottom: 12px;
            border-radius: 3px;
            padding: 12px;
            color: #333333;

            .msg-pop-close{
                right: 12px;
                top:12px;
                position: absolute;
            }
            h3{
                color: @themeColor;
                margin: 0;
                font-size: 18px;
                line-height: 30px;
                width: 85%;
            }
            em{
                position: absolute;
                right: 24px;
                top:45px;
            }
            p{
                width: 85%;
                color: #333333;
            }
            .c{ height: 80px; line-height: 20px; overflow: hidden;  }
            .r{text-align: right; }
            .btn-agree{
                border: solid 1px @green;
                color: @green;
                position: relative;
                display: inline;
                margin-right: 12px;
                margin-left: 12px;
            }

            .btn-refuse{
                border: solid 1px @themeColor;
                color: @themeColor;
                position: relative;
                display: inline;
                margin-right: 12px;
                margin-left: 12px;

            }

        }
    }


</style>
<script>
    import AppCenterHeader from 'views/AppCenterHeader.vue';

    import {request, API_URLS} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';

    export default{
        name:"searchbar",
        data() {
            return {
                title:"消息",
                back:{"label":"返回","url":"index","show":true},
                next:{"label":"打印","url":"print","show":false},
                message: '请选择一个付款方式',
                page:{

                    hasPreviousPage:true,
                    hasNextPage:true,
                    pages:3,
                    pageNum:1,

                }
            }
        },
        components:{
            AppCenterHeader,
        },
        watch: {

        },
        computed: {

        },
        methods:{
            //
            pageTo(n){
                alert(n);
            },
            //请求列表
            fetchList() {
                if(!this.searchItem.keyword){
                    return;
                }
                let vm=this;

                let apiObj={
                    url: API_URLS.products,
                    data:{
                        'categoryId': vm.productParams.categoryId,
                        'brandId': vm.productParams.brandId,
                        'pageNum': 1,
                        'keyword': vm.searchItem.keyword
                    }
                };

                request.fnGet(vm,apiObj,(res)=>{
                    vm.$store.commit("setProductParams",{"searchStr":vm.searchItem.keyword,"pageNum":1});
                    vm.$store.commit("setPageData", res.page);
                })
            }
        }
    }
</script>

