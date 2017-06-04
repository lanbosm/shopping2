<template>
    <div class="content">
        <commom-header  :title="title" :back="back"  ></commom-header>
        <commom-list>
            <div class="list-header" slot="list-header">
                <div class="list-row">
                    <span class="col">订单信息</span>
                    <span class="col">单价/数量</span>
                    <span class="col">买家</span>
                    <span class="col">实付金额</span>
                </div>
            </div>
            <div class="list-body" v-if="!listData.list">
                加载中...
            </div>
            <div class="list-body" v-else-if="listData.list.length==0">
                <div class="no-list"></div>
            </div>
            <div class="list-body" v-else>
                <!--list-->
                <div class="list-row" v-for="(item,index) in listData.list">
                    <div class="t">
                        <span class="list-checkbox" v-show="refundShow"><input type="checkbox" v-model="item.isRefund"  /> <i></i> </span>
                        <span>订单号： {{item.sn}} x  {{item.paymentMethod}}</span><span>{{item.createDate}}</span>
                    </div>
                    <div class="c">
                        <dl class="col">
                            <dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">{{item2.name}}</dd>
                        </dl>
                        <dl class="col">
                            <dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">
                                {{item2.price | currency}} x {{item2.quantity}}
										</dd>
                        </dl>
                        <span class="col">{{item.username}}</span>
                        <span class="col">{{item.amountPaid | currency}}</span>
                    </div>
                </div>
            </div>
            <div class="list-footer" slot="list-footer">
                    <div class="footer-left">
                        <Pagination :page="listData" :go-callback="handleCurrentChange" ></Pagination>
                    </div>
                    <div class="footer-center">
                        总现在收入<span>{{totalCash | currency }}</span>元
                    </div>
                     <div class="footer-right">
                         <a class="check-btn" v-show="!refundShow" @click="handleCheck()">退款</a>
                         <a class="refund-btn" v-show="refundShow"@click="handleRefund()">确定</a>
                         <a class="cancel-btn" v-show="refundShow" @click="refundShow=false">取消</a>
                     </div>
            </div>
        </commom-list>
    </div>
</template>

<style lang="less" scoped>

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";


    .list-row{
        clear: both;
        .col{
            display: block; width: 20%; float: left; text-align: center;
            &:nth-child(1){
                width: 40%;
                text-align: left;
            }
        }
        .clearfix;
    }

    .list-checkbox {
        margin-top:@gutter;
        margin-right:@gutter;
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 50%;
        border: solid 1px #cccccc;
        overflow: hidden;
        position: relative;
        i{
            width: 100%;
            height:100%;

            position: absolute;
            pointer-events: none;
            top:0;
            left:0;

        }
        i:after{
            box-sizing: content-box;
            content: "";
            border: 2px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 8px;
            left: 7px;
            position: absolute;
            top: 3px;
            transform: rotate(45deg) scaleY(0);
            width: 4px;
            transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            transform-origin: center;
        }
        input[type=checkbox]{
            position: absolute;
            width: 100%;
            height:100%;
            opacity:0;
            margin: 0;
            outline:none;
            display: inline-block;
        }

        input[type=checkbox]:checked +i{
            background: @themeColor;
        }
        input[type=checkbox]:checked +i:after {
            transform: rotate(45deg) scaleY(1);
        }

    }
    .list-header{
        line-height: 50px;
        font-size: 12px;
        text-align: center;
        .list-row .col{text-align: center;}
    }

    .list-body{

            height: @listHeight;
            overflow: hidden;


            .list-row{
                border: solid 1px  @border-color;
                margin-top: @gutter;
                margin-bottom: @gutter;
                border-radius: 5px;
                clear: both;
                .t{
                    background: #f7f7f7;
                    color: @thinColor;
                    padding-left: @gutter;
                    padding-right: @gutter;
                    font-size: 14px;
                    line-height: 40px;
                    span{
                        &:first-child { float: left; text-align: left;}
                        &:last-child { float: right; text-align: right;}
                    }
                    .clearfix;
                }
                .c {
                    padding-left: @gutter;
                    padding-right: @gutter;
                    font-size: 12px;
                    border-top: @borderDashedStyle;
                    line-height:60px;
                    .col {
                        color: @color;
                        dd{line-height: 20px;
                            .norow;
                            &.single{ line-height: 60px;}
                        }
                        &:last-child {
                            color: @themeColor;
                            font-size: 24px;
                        }
                    }
                    img{width: 60px; height: 60px; display: inline-block;}
                    .clearfix;
                }
                .clearfix;

                }
    }
    .list-footer{
        .footer-center {
            height: 100px;
            width: 100%;
            line-height: 100px;
            text-align: center;
            color: @themeColor;
            font-size: 16px;
            span {
                font-size: 36px;
                padding-left: 12px;
                padding-right: 12px;
            }
            position: relative;
        }
        .footer-left{
            position: absolute;
            top:@gutter;
            left:@gutter;
        }
        .footer-right{
            position: absolute;
            top:@gutter;
            right:@gutter;
            .refund-btn,.check-btn{
                .diy-btn(#ffffff,@themeColor,@padding: 12px 30px);
            }
            .cancel-btn {
                 margin-left: 30px;
                .diy-btn(@themeColor,#ffffff,@themeColor,@padding: 12px 30px);
             }


        }
    }




</style>
<script>
    import Pagination from 'components/pagination/Pagination.vue';

    export default{
    	name: 'CustomList',
        data(){
            return {
                title:"会员",
                back:{"label":"返回","url":"index","show":true},
                listData:{},
                pageNum:1,                 //一页显示多少
                refundShow:false,

            }
        },
        created(){
            this.fetchList();
        },
        components: {
            Pagination,                 //分页器
        },
        computed: {
            totalCash (){
                return  0;
            }
        },
        methods:{
            handleCurrentChange(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            handleCheck(){

                this.refundShow=true;
            },
            handleRefund(){
                this.$alert('操作成功',{
                    type: 'success',
                }).then(_=>{
                    this.refundShow=false;
                    this.fetchList();
                })

            },
            //请求列表
            fetchList() {

                  this.listData= {
                          "pageNum":1,"pageSize":5,"size":5,"orderBy":null,"startRow":1,"endRow":5,"total":16,"pages":3,
                          'list': [
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':false,
                              },
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':true,
                              },
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':false,
                              },
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':false,
                              },
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':false,
                              },
                              {
                                  'sn': 10102020102020200,
                                  'paymentMethod':'现金方式',
                                  'createDate':'2016-07-12',
                                  'items': [
                                      {'name':'XXXXX商品1','price':'100.00','quantity':1},
                                      {'name':'XXXXX商品2','price':'105.00','quantity':2}

                                  ],
                                  'username':"naslo",
                                  'amountPaid':'2000.00',
                                  'isRefund':false,
                              }
                          ],
                  }

//                  setTimeout(_=>{
//
//                      this.$simpleScroll('.list-body', 'vertical');
//                  },1000)

                    var vm=this;
                  this.$nextTick(_=> {
                      vm.$simpleScroll('.list-body', 'vertical');

                  });
//                this.$store.dispatch('fetchShiftList',{"pageNum":this.pageNum}).then(res=>{
//                    this.listData=res.page;
//                })
            }
        }

    }
</script>

