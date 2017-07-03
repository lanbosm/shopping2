<template>
   	  <div class="message">

            <commom-header  :title="title" :back="back" :next="next" ></commom-header>
            <commom-list>
            <div class="message-body" v-if="!listData.list">
                    加载中...
            </div>
            <div class="message-body" v-else-if="listData.list.length==0">
                    <div class="no-list"></div>
            </div>
            <div class="message-body" id="message-body" v-else >
                <div class="row">
                    <div class="col-xs-12 col-sm-6" v-for="(item,index) in listData.list">
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
            </div>
            <div class="message-footer" >
                        <pagination :page="listData" :go-callback="goCallback"></pagination>

            </div>
           </commom-list>





        </div>




</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .message{



        .message-body{
            height: @listHeight;

        }


        .message-footer{
            margin-top: @gutter;
            padding: @gutter;
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

                this.$prompt('请输入备注',this.comfirmTitle,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder:'备注',
                }).then(({value}) => {
                       this.memo=value;
                       this.checkAllocation();
                })

//                    layer.open({
//                        id: 'layui-layer-comfirm',
//                        type: 1,            //1 普通层
//                        shade: 0.01,  //遮罩
//                        anim: 0,
//                        zIndex: 1000,
//                        closeBtn: 2,
//                        title: false,
//                        area: ['auto', 'auto'], //宽高
//                        content: $('#layer-comfirm-box'),
//                        success: function () {
//
//                        },
//                        end: function () {
//
//                        }
//                    });


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
                    this.$alert('操作成功',{
                        type: 'success',
                    }).then(_=>{
                        this.memo='';
                        this.allocationId='';
                        this.fetchList();
                        layer.closeAll();
                    });

                }).catch(res=>{
                        this.$alert(msg,'操作失败',{
                            type: 'error',
                        }).then(_=>{
                            this.memo='';
                            this.allocationId='';
                            this.fetchList();
                            layer.closeAll();
                        })


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

                        this.listData=res.page;
                        if(this.listData.list.length>0) {
                            this.$nextTick(_ => {
                                this.$simpleScroll('#message-body');
                            })
                        }

                }).catch(res=>{


                })
            }
        }
    }
</script>

