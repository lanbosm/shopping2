<template>
    <div class="log-products container">
        <div class="row">
            <div class="col-xs-12">
                <div class="list-header">
                    <div class="list-row">
                        <span style="width: 40%">商品</span>
                        <span style="width: 25%">数量</span>
                        <span style="width: 10%">已提数量</span>
                        <span style="width: 25%">提货数量</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="list-body" v-if="!listData" >
                    加载中...
                </div>
                <div class="list-body" v-else-if="listData.list.length==0">
                    <div class="no-list"></div>
                </div>
                <div class="list-body" id="memberCargoList" v-else>
                    <ul>
                    <!--list-->
                    <div class="list-row" v-for="(item,index) in listData.list" v-show="item.quantity>0">
                        <div class="t">
                            编号: {{item.productSn}}
                        </div>
                        <div class="c">
									<span style="width: 40%">
                                        <!--商品图片-->
										<img :src="item.productImage">
                                        <!--商品描述-->
										<em>{{item.productName}}</em>
									</span>
                            <!--数量-->
                            <span style="width: 25%">{{item.quantity}}件</span>
                            <span style="width: 10%">{{item.takenNum}}件</span>
                            <span style="width: 25%">
                                <div class="span_all">
                                    <input class="span1" type="button" value="-" @click="edd(1,item.operationNum,index)">
                                    <input class="span2" type="tel" @blur="out(item.operationNum,index)" v-model="item.operationNum">
                                    <input class="span3" type="button" value="+" @click="add(1,item.operationNum,index)">
                                </div>
                            </span>
                        </div>
                    </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                 <pagination :page="listData" :go-callback="handleCurrentChange" ></pagination>
            </div>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";
    .span_all{width: 150px;height: 40px;margin: 0 auto;margin-top: 10px;
        margin: 0 auto;
        margin-top: 32px;
        border-radius: 5px;
        border: 1px solid #999
    }
    .span_all .span1{width: 40px;height: 38px;background: #5bc0de;line-height: 38px;text-align: center;font-size: 18px;color: #fff;float: left;border-bottom-left-radius: 5px;border-top-left-radius: 5px;}
    .span_all .span2{width: 68px;height: 38px;line-height: 38px;text-align: center;float: left}
    .span_all .span3{width: 40px;height: 38px;background: #5bc0de;line-height: 38px;text-align: center;font-size: 18px;color: #fff;float: left;border-bottom-right-radius: 5px;border-top-right-radius: 5px;}
    .log-products{
        position: relative;
    .list-row{

        clear: both;

    span{
        display: block; width: 25%; float: left; text-align: center;
    &:first-child{width: 50%;}
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


    export default{
        name:'Member_cargo',
        data(){
            return{
                pageNum:1,
                num:"",
                mid:"",
                listData:{
                    list:[]
                }
            }

        },
        components:{

        },
        computed:{



        },
        created(){
            this.mid=this.$route.query.mid;
            this.pageNum=this.$route.query.p;
            this.fetchList();

        },

        methods:{
            out(operationNum,index){
                var cantakeNum=this.listData.list[index].quantity-this.listData.list[index].takenNum;
                var nowNum=operationNum;
                if(nowNum>cantakeNum){
                    this.$message.error('超过可提数量');
                    return false;
                }
                if(nowNum<0){
                    return false;
                }
                this.listData.list[index].operationNum=nowNum;

            },
            add(number,operationNum,index){
                var cantakeNum=this.listData.list[index].quantity-this.listData.list[index].takenNum;
                var nowNum=operationNum+number;
                if(nowNum>cantakeNum){
                    this.$message.error('超过可提数量');
                    return false;
                }
                if(nowNum<0){
                    return false;
                }
                this.listData.list[index].operationNum=nowNum;

            },
            edd(number,operationNum,index){
                var cantakeNum=this.listData.list[index].quantity-this.listData.list[index].takenNum;
                var nowNum=operationNum-number;
                if(nowNum>cantakeNum){
                    this.$message.error('超过可提数量');
                    return false;
                }
                if(nowNum<0){
                    return false;
                }
                this.listData.list[index].operationNum=nowNum;
            },
            handleCurrentChange(pageIndex){
                this.pageNum=pageIndex;
                this.$router.replace({path:'/membercargo',query:{mid:this.mid,p:this.pageNum}});
                this.fetchList();
                window.scrollTo(0,0);
            },
            fetchList(){
                this.$store.dispatch("fetchPickList",{"memberId":this.mid,"pageNum":this.pageNum}).then(res=>{
                    this.listData=res.page;
                    if(res.page.list.length>0){
                        this.$nextTick(_=> {
                            this.$simpleScroll("#memberCargoList");
                        });
                    }
                });
            }


        }

    }
</script>