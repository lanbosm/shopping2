<template>
   	    <div class="msg-pop" v-if="msgList.length>0">
             <div v-for="(item,index) in msgList">
                <a class="btn msg-pop-close" @click="closeMsg">&times;</a>
                <h3>{{item.shopName}}的申请调拨</h3>
                <div class="c">
                    <p>{{item.productName}}</p>
                    <p>备注：{{item.applyMemo}}</p>
                    <span>数量 {{item.num}}</span>
                    <span>{{item.createDate}}</span>
                </div>
                <div class="r">
                    <a class="btn btn-agree" @click="checkAllocation(item.id,'agreed',index)">同意</a>
                    <a class="btn btn-refuse" @click="checkAllocation(item.id,'refused',index)">拒绝</a>
                </div>
             </div>
        </div>
</template>

<style>
</style>
<script>
    import layer from 'layer';

    export default{
        name:"MsgPop",
        data(){
          return {

          }
        },
        created(){
        },
        computed: {
            //数据来自全局
            msgList(){
                    console.log(this.$store.state.msgData.appUnconfirmList);
                    return this.$store.state.msgData.appUnconfirmList;
            },
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
            checkAllocation(allocationId,status,mindex){

                if(!allocationId){
                    layer.alert("该批准号无效",{icon:2});
                    return false;
                }
                var params={
                    'allocationId':allocationId,
                    'status':status,
                    'memo':''
                }

                this.$store.dispatch("approvalAllocation",params).then(res=>{
                    layer.alert("操作成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    this.memo='';
                    this.msgList.splice(mindex,1);

                }).catch(res=>{
                    layer.alert("操作失败",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    this.memo='';
                });
            },

            closeMsg(){

                this.$root.showMsgModal=false;
                this.$root.$refs.addMsglistener();

            }
        }
    }
</script>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";

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
            span{
                display: block;
                color: #999999;
                margin-top: 5px;
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