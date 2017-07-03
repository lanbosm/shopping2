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
            <div class="list-body" id="order-list-main-list" v-else>
                <!--list-->
                <div class="list-row" v-for="(item,index) in listData.list">
                    <div class="t">
                        <span class="list-checkbox" v-show="item.refundShow"><input type="checkbox" v-model="item.isRefund" @change="handlecheck(item)" /> <i></i> </span>
                        <span>订单号： {{item.sn}} x  {{item.paymentMethod}}</span><span>{{item.createDate}}</span>
                    </div>
                    <div class="c">
                        <dl class="col">
                            <dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">
                                <span class="list-checkbox inner-checkbox" v-show="item.showRefunds && item2.quantity>item2.returnQuantity"><input type="checkbox" v-model="item2.isRefund"  @change="handlecheck(item2)"/> <i></i> </span>
                                <span >{{item2.name}} <em class="refunded" v-if="item2.quantity==item2.returnQuantity">已退货</em></span>
                            </dd>
                        </dl>
                        <dl class="col">
                            <dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">
                                {{item2.price | currency}} x {{item2.quantity}}
							</dd>
                        </dl>
                        <span class="col">{{item.username}}</span>
                        <span class="col">{{item.amountPaid | currency}}</span>
                        <span class="col">
                            <a class="check-btn" :class="{dis:!item.canRefunds}" v-show="!item.showRefunds"  @click="handleShowCheck(item)">退款</a>
                            <a class="refund-btn" v-show="item.showRefunds" @click="handleRefund(item)">确定</a>
                            <a class="cancel-btn" v-show="item.showRefunds" @click="handleCancel(item)">取消</a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="list-footer" slot="list-footer">
                <div class="footer-left">
                    <pagination :page="listData" :go-callback="handleCurrentChange" ></pagination>
                </div>
                <div class="footer-center">
                    总现在收入<span>{{totalAmount | currency }}</span>元
                    </div>
                <div class="footer-right">

                </div>
            </div>
        </commom-list>
    </div>
</template>

<style lang="less" scoped>

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .refunded{
        color: @themeColor;
    }
    .list-row{
        clear: both;
        .col{
            display: block; width: 15%; float: left; text-align: center;
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
        overflow: hidden;
        display: inline-block;
        border-radius: 50%;
        border: solid 1px #cccccc;
        position: relative;

        &.inner-checkbox{
            margin-top:0;
            top:@gutter/2;
            margin-left:@gutter/2;
            width: 20px;
            height: 20px;
            overflow: hidden;
        }
        i{
            width: 100%;
            height:100%;
            overflow: hidden;
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
            border-radius: 50%;
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
                    dd{line-height: 30px;
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

        .refund-btn,.check-btn{
            font-size: 12px;
            line-height: 20px;
            .diy-btn(#ffffff,@themeColor,@themeColor,30px,@padding: 5px 20px);
        }
        .check-btn.dis{
            pointer-events: none;
            .diy-btn(#ffffff,#cccccc,#cccccc,30px,@padding: 5px 20px);
            opacity: 0.9;
        }
        .cancel-btn {
            margin-left: 5px;
            font-size: 12px;
            line-height: 20px;
            .diy-btn(@themeColor,#ffffff,@themeColor,30px,@padding: 5px 20px);
        }
    }
    .list-footer{
        .footer-center {
            height: 60px;
            width: 100%;
            line-height: 60px;
            text-align: right;
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
            z-index:2;
            top:@gutter;
            left:@gutter;
        }
        .footer-right{
            position: absolute;
            top:@gutter;
            right:@gutter;



        }
    }

</style>
<script>

    export default{
    	name: 'CustomList',
        data(){
            return {
                title:"订单中心",
                back:{"label":"返回","url":"/","show":true},
                listData:{},
                pageNum:1,                 //一页显示多少
                type:null,
                memberId:null,
                totalAmount:0

            }
        },
        created(){
            this.memberId=this.$route.query.mid;
            this.pageNum=this.$route.query.p||1;
            this.type=this.$route.query.type;


            if(this.type=="custom"){
                this.title="会员订单"
            }
            if(this.type=="wechat"){
                this.title="微商城订单"
            }


            this.fetchList();
        },

        methods:{
            handlecheck(item){
                var on=item.isRefund;
                this.$set(item, 'isRefund', on);
                //如果子元素
                if(item.items) {
                    item.items.forEach((ele, index) => {
                        this.$set(ele, 'isRefund', on)
                    })
                }

            },
            handleCurrentChange(pageIndex){
                //this.$router.push({path:'/membercargo',query:{mid:item.id,p:this.pageNum}});
                this.pageNum=pageIndex;
                this.$router.replace({path:this.$route.path,query:{p:this.pageNum}});
                this.fetchList();
                window.scrollTo(0,0);
            },
            handleShowCheck(item){
                this.listData.list.forEach((ele,index)=>{
                       // ele.refundShow=false;
                       this.$set(ele, 'refundShow',false)
                })
                this.$set(item, 'refundShow',true)

            },
            handleRefund(item){


                var refundsJson=[];

                item.items.forEach((ele,index)=>{
                        console.log(ele);
                        if(ele.isRefund) {
                            refundsJson.push({itemId: ele.itemId, quantity: ele.quantity})
                        }
                })
                if(refundsJson.length==0){
                    this.$message.warning('请选择退货项');
                    return false;
                }


                var refundData={
                    sn:item.sn,
                    refundsJson:JSON.stringify(refundsJson),

                }

                this.$store.dispatch('refundOrder',refundData).then(_=>{
                                    this.$alert('操作成功',{
                                        type: 'success',
                                    }).then(_=>{
                                        item.refundShow=false;
                                        this.fetchList();
                                    })
                }).catch(res=>{
                    this.$alert(res.msg,{
                        type: 'error',
                    })

                })

            },
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchOrderList',{pageNum:this.pageNum, memberId:this.memberId}).then(res=> {
                    console.log(res);
                    this.listData = res.page;
                    this.totalAmount=res.totalAmount;

                    this.listData=res.page;
                    this.totalAmount=res.totalAmount;

                    this.listData.list.forEach((ele,index)=>{
                        ele.canRefunds=false;

                        ele.items.forEach((ele2,index)=>{
                            if(ele2.quantity>ele2.returnQuantity){

                                ele.canRefunds=false;
                            }
                        });
                    });
                    this.$nextTick(_ => {
                        this.$simpleScroll('#order-list-main-list');
                    })
                }).catch(res=>{
                    console.log(res);
                    console.log('err');
                });
            },
            fetchCutsomList() {
                this.$store.dispatch('fetchOrderList',{pageNum:this.pageNum}).then(res=> {
                    console.log(res);
                    this.listData = res.page;
                    this.totalAmount=res.totalAmount;

                    this.listData=res.page;
                    this.totalAmount=res.totalAmount;

                    this.listData.list.forEach((ele,index)=>{
                        ele.canRefunds=false;

                        ele.items.forEach((ele2,index)=>{
                            if(ele2.quantity>ele2.returnQuantity){

                                ele.canRefunds=false;
                            }
                        });
                    });
                    this.$nextTick(_ => {
                        this.$simpleScroll('#order-list-main-list');
                    })
                }).catch(res=>{
                    console.log(res);
                    console.log('err');
                });
            }
        }

    }
</script>

