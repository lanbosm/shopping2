<template>
   	  <div class="message">

            <app-center-header  :title="title" :back="back" :next="next" mode="mode"></app-center-header>

            <div class="container message-body" >
                <div class="row page-con">
                    <div class="col-xs-6" v-for="(item,index) in listData.list">
                        <div class="m-box" >
                            <a class="btn msg-pop-close" @click="closeMsg" style="display: none;">&times;</a>
                            <h3>{{item.shopName}}</h3>
                            <div class="c">
                                <p>{{item.productName}}</p>
                                <p class="memo">申请者备注：{{item.applyMemo}}</p>
                                <p class="memo">接收者备注：{{item.approvalMemo}}</p>
                            </div>
                            <em>数量 {{item.num}}</em>
                            <span class="date">{{item.createDate}}</span>
                            <div class="r">
                                <a class="btn btn-agree"  v-if="item.agreeBtn" @click="showComfirmBox(item.id,'agree')">同意</a>
                                <a class="btn btn-refuse"  v-if="item.refuseBtn" @click="showComfirmBox(item.id,'refuse')">拒绝</a>
                                <a class="btn" :class="{'btn-success':true,'btn-danger':item.status=='refused'}" v-if="!item.agreeBtn && !item.refuseBtn" >{{item.statusStr}}</a>
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


          <div id="layer-comfirm-box" class="layer-comfirm-box">
              <div class="t">
                   {{comfirmTitle}}
              </div>
              <div class="c form-horizontal">
                  <textarea class="form-control" rows="4" v-model="memo" placeholder="请填写备注"></textarea>
              </div>
              <div class="f text-center">
                  <a class="btn comfirm-ok" @click="checkAllocation()">确认</a>
              </div>
          </div>

        </div>




</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .message{

        .btn-normal{background: @themeColor; color: #ffffff;}
        .layer-comfirm-box{
            width: 400px;
            padding: @gutter;
            z-index: 99;
            display: none;
            .t{
                padding: @gutter;
                text-align: center;
                font-size: 16px;
            }
            .c{
                padding-left: @gutter;
                padding-right: @gutter;
            }
            .f{
                padding: @gutter;
                text-align: center;
                .comfirm-ok{
                    .green-btn;
                    padding-left: 60px;
                    padding-right: 60px;
                    &:hover,&:active{
                        padding-left: 60px;
                        padding-right: 60px;
                    }
                }
            }

        }


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
            display: inline-block;
        }
        .m-box{
            height: auto;
            background: #fff;
            position: relative;
            border: solid 1px #ddd;
            margin-top: 12px;
            margin-bottom: 12px;
            border-radius: 3px;
            padding: 12px;
            color: #333333;
            .memo{
                margin-top: 5px;
                margin-bottom: 5px;
                color: @thinColor;
            }
            .date{
                color: @thinColor;
                position: absolute;
                z-index:10;
            }
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
                display: inline-block;
                margin-right: 12px;
                margin-left: 12px;


            }

            .btn-refuse{
                border: solid 1px @themeColor;
                color: @themeColor;
                position: relative;
                display: inline-block;
                margin-left: 12px;
                position: relative;
                margin-right: 12px;

            }

        }
    }


</style>
<script>



    import AppCenterHeader from 'views/AppCenterHeader.vue';
    import Pagination from 'components/pagination/Pagination.vue';


    import layer from 'layer';


    export default{
        name:"searchbar",
        data() {
            return {
                title:"消息",
                back:{"label":"返回","url":"index","show":true},
                next:{"label":"打印","url":"print","show":false},
                listData:{},
                pageNum:1,
                comfirmTitle:"无标题",
                memo:'',
                allocationId:''

            }
        },
        components:{
            Pagination,
            AppCenterHeader
        },
        watch: {

        },
        created(){
            this.fetchList();
        },
        computed: {

        },
        methods:{

            showComfirmBox(id,type){

                   this.allocationId=id;
                    if(type=="agree"){
                        this.comfirmTitle="同意调货";
                        this.allocationStatus="agreed";
                    }else{
                        this.comfirmTitle="拒绝调货";
                        this.allocationStatus="refused";
                    }
                    layer.open({
                        id: 'layui-layer-comfirm',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-comfirm-box'),
                        success: function () {

                        },
                        end: function () {

                        }
                    });


            },
            closeMsg(){


            },
            checkAllocation(){

                if(!this.allocationId){
                    layer.alert("该批准号无效",{icon:2});
                    return false;
                }
                var params={
                    'allocationId':this.allocationId,
                    'status':this.allocationStatus,
                    'memo':this.memo
                }

                this.$store.dispatch("approvalAllocation",params).then(res=>{
                    layer.alert("操作成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    this.memo='';
                    this.allocationId='';
                    this.fetchList();
                }).catch(res=>{
                    layer.alert("操作失败",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    this.memo='';
                    this.allocationId='';
                    this.fetchList();
                });
            },
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
            fetchList() {

                this.$store.dispatch("fetchMsgList",{"pageNum":this.pageNum}).then(res=>{
                        console.log(res);
                        this.listData=res.page;

                }).catch(res=>{


                })
            }
        }
    }
</script>

