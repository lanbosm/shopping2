<template>
    <div class="log-products container">
        <div class="row">
            <div class="col-xs-12">
                <div class="list-header">
                    <div class="list-row">
                        <span>商品</span>
                        <span>数量</span>
                        <span>存货数量</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="list-body" v-if="!listdata" >
                    加载中...
                </div>
                <div class="list-body" v-else-if="listdata.length==0">
                    <div class="no-list"></div>
                </div>
                <div class="list-body" style="overflow: hidden;overflow-y: auto;-webkit-overflow-scrolling: touch;" v-else>
                    <!--list-->
                    <div class="list-row" v-for="(item,index) in listdata">
                        <div class="t">
                            编号: {{item.productSn}}
                        </div>
                        <div class="c">
									<span>
                                        <!--商品图片-->
										<img :src="item.productImage">
                                        <!--商品描述-->
										<em>{{item.productName}}</em>
									</span>
                            <!--数量-->
                            <span>{{item.productCount}}件</span>

                            <span>
                                <div class="span_all">
                                    <input class="span1" type="button" value="-" @click="edd(1,item.quantity,index)">
                                    <input class="span2" type="tel" v-model="item.quantity">
                                    <input class="span3" type="button" value="+" @click="add(1,item.quantity,item.productCount,index)">
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="row">-->
            <!--<div class="col-xs-12">-->
                <!--<pagination :page="listData" :go-callback="goCallback"></pagination>-->
            <!--</div>-->
        <!--</div>-->
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
    .no-list{ width: 100%; height:600px; background: url(/images/no_list.jpg) no-repeat 50% 0%;}
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
//    import Pagination from 'components/pagination/Pagination.vue';

    export default{
        name:'Member_stock',
        props:["listdata"],
        data(){
            return{
                pageNum:1,
                num:"",
                aa:""
            }

        },
        components:{
//            Pagination
        },
        computed:{
            Num(){
                var num_act={};
                var length=this.listdata.length;
                for (var i=0;i<length;i++){
                    this.$set(num_act,i,0)
                }
                return num_act;
            },
            order(){
                return this.$store.state.currentPage.stockData
            },
        },
        created(){


//            this.fetchList();
//            console.log(this.order)
        },
        methods:{
            add(number,index,max,ss){
                var vm=this;
                index=this.listdata[ss].quantity;
                    if(index<max){
                        index+=number;
//                        this.listdata[ss].quantity=index;
                        console.log(this.listdata[ss])
                        this.$set(this.listdata[ss],'quantity',index);
//                        alert(this.listdata[ss].quantity)
                    }else {
                        index=max;
                    }




////                console.log(typeof (this.Num[index]));
//                if(this.Num[index]>=max){
//                    this.Num[index]=max
//                }else {
//                    this.Num[index]+=Number(number);
//                }
//                console.log(this.Num);
//                var set=this.listdata[index].quantity;
//                 if(set<max){
//                     set+=Number(number);
//                 }else{
//                     set=max
//                 }
            },
            edd(number,index,ss){
//                this.Num[index]-=Number(number);
//                if(this.Num[index]<0){ this.Num[index]=0;}
//                console.log(this.Num)
                if(index<=0){
                    index=0;
                }else {
                    index-=Number(number);
                    this.$set(this.listdata[ss],'quantity',index);
                }
            },
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
//            fetchList() {
//                this.$store.dispatch('fetchShiftList',{"pageNum":this.pageNum}).then(res=>{
//                    this.listData=res.page;
//                })
//            }

            //提交存货
            SubmitStock(){

            }
        }

    }
</script>