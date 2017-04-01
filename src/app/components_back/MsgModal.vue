<template>
   	    <div class="msg-pop">
                <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                <h3>某某商铺申请调拨</h3>
                <div class="c">
                    <p>xxxx商品xxxx商品 3段 900gxxxx商品 3段 900g</p>
                </div>
                <span>数量 55</span>
                <div class="r">
                    <a class="btn btn-agree">同意</a>
                    <a class="btn btn-refuse">拒绝</a>
                </div>
        </div>
</template>

<style>
</style>
<script>
    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        name:"MsgPop",
        data(){
          return {

          }
        },
       watch:{
        },
        methods:{
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
            },
            closeMsg(){

                this.$root.showMsgModal=false;
                //alert("关闭");
            }
        }
    }
</script>

<style  rel="stylesheet/less"  lang="less">
    @import "../../css/util/skin.less";

    .msg-pop{
            position: absolute;
            top:40px; right:4%;
            width: 424px;
            height: auto;
            background: #fff;
            z-index: 9999;
            border: solid 1px #ddd;
            border-radius: 3px;
            padding: 12px;
            color: #333333;

            .msg-pop-close{
                right: 0px;
                top:0;
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
                right: 20px;
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



</style>