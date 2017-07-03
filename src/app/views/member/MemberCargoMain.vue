<template>
    <div class="member_main">
        <commom-header  :title="title" :back="back" :next="next"></commom-header>
        <!--提货-->
        <member-cargo :list-data="listData"></member-cargo>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .member_main{
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
    import MemberCargo from './MemberCargo.vue'

    import layer from 'layer';
    import $ from 'jquery';
    export default{
        name:'member',
        data(){
            return{
                title:'提货',
                back:{"label":"返回","url":"customlist","show":true,},
                next:{"label":"提货","url":"","show":true,cb:this.takeStock},//提货是2
                message: '',
                listType:null,
                takeMap:null,
                mid:null,
                pageNum:1,
                listData:{}
            }
        },
        components:{
            MemberCargo
        },
        computed:{
            takeList(){
                return this.$store.state.currentPage.takeData;
            }
        },
        created(){
              this.back.url=this.back.url+"?p="+this.$route.query.p;
              this.mid=this.$route.query.mid;
              this.pageNum=this.$route.query.p;
              this.fetchList();

        },
        methods:{
            fetchList(){
                this.$store.dispatch("fetchPickList",{"memberId":this.mid,"pageNum":this.pageNum}).then(res=>{
                       this.listData=res.page;
                });
            },
            takeStock(){
                var checkTake=false;
                var takeMap=[];
                this.takeList.list.forEach((ele,index)=>{
                    if(ele.operationNum>0){
                        takeMap.push({consignId: ele.consign,takeNum: ele.operationNum});
                        checkTake=true;
                    }
                })

               if(!checkTake){
                   this.$message.error('请选择物品');
                   return false;
               }

                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator:function(){

                       return true

                    } ,
                    inputErrorMessage: ''
                }).then(({ value }) => {

                        var postData={consignParamJson:JSON.stringify(takeMap),password:value,memberId:this.mid};
                        this.$store.dispatch('postPickList',postData).then(res=>{
                            this.$alert({
                                type: 'success',
                                message:'操作成功'
                            });
                        }).catch(res=>{

                            this.$alert('这是一段内容', '标题名称', {
                                type: 'error',
                                message: res.msg
                            });

                        })

                })
               console.log(takeMap);

            }
        }

    }

</script>
