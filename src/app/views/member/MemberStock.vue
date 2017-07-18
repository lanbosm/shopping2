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
                <div class="list-body" v-if="!listData" >
                    加载中...
                </div>
                <div class="list-body" v-else-if="listData.length==0">
                    <div class="no-list"></div>
                </div>
                <div class="list-body" v-else>
                    <!--list-->
                    <div class="list-row" v-for="(item,index) in listData">
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
                            <span>{{item.quantity-item.takenNum}}件</span>

                            <span>
                                <div class="span_all">
                                    <input class="span1" type="button" value="-" @click="edd(1,item.num,index)">
                                    <input class="span2" type="tel" v-model="item.num">
                                    <input class="span3" type="button" value="+" @click="add(1,item.num,item.cantake,index)">
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .span_all{width: 80%;height: 40px;margin: 0 auto;margin-top: 10px;
        margin: 0 auto;
        margin-top: 32px;
        border-radius: 5px;
        border: 1px solid #999
    }
    .span_all .span1{width:30%;height: 38px;background: @green;line-height: 38px;text-align: center;font-size: 18px;color: #fff;float: left;border-bottom-left-radius: 5px;border-top-left-radius: 5px;}
    .span_all .span2{width: 40%;height: 38px;line-height: 38px;text-align: center;float: left}
    .span_all .span3{width: 30%;height: 38px;background: @green;line-height: 38px;text-align: center;font-size: 18px;color: #fff;float: left;border-bottom-right-radius: 5px;border-top-right-radius: 5px;}
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
        props:["listData"],
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
                var length=this.listData.length;
                for (var i=0;i<length;i++){
                    this.$set(num_act,i,0)
                }
                return num_act;
            },

        },
        created(){
                console.log(this.listData);

//            this.fetchList();
//            console.log(this.order)
        },
        methods:{
            add(count,num,max,index){


                    if(num<max){
                        num+=count;

                    }else {
                        num=max;

                    }
                 this.$parent.listData[index].num=num;
            },
            edd(count,num,index){


                if(num<=0){
                    num=0;

                }else {

                     num-=Number(count);


                }
                this.$parent.listData[index].num=num;
            },
            goCallback(pageIndex){

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