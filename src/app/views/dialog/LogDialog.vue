<template>
    <el-dialog
            title="营业状态"
            :visible.sync="dialogShow"
            top="20%"
            custom-class="dialog-log"
            :close-on-click-modal=false
            :modal=true
            @close="closeWin();"
            >
                <div class="dialog-log-con">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="grid">
                                <div class="t">应有现金 <span>{{logData.endSpareCash | currency}}</span></div>
                                <div class="c">
                                    <p>店内订单现金收款： {{logData.orderCashPay | currency}}</p>
                                    <a class="more" @click="logTo('cash')">查看详细 ></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div class="grid">
                                <div class="t">总销售额 <span>{{logData.totalSales | currency}}</span></div>
                                <div class="c">
                                    <p>收银端销售额： {{logData.totalSales | currency}}</p>
                                    <a class="more" @click="logTo('sales')">查看详细 ></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div class="grid">
                                <div class="t">充值 <span>{{logData.totalRecharge | currency}}</span></div>
                                <div class="c">
                                    <p>现金充值： {{logData.rechargeCashPay | currency}}</p>
                                    <a class="more" @click="logTo('recharge')">查看详细 ></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="grid">
                                <div class="t">促销统计 <span>{{logData.promotion | currency}}</span></div>
                                <div class="c">
                                    <a class="more" @click="logTo('promotion')">查看详细 ></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer" slot="footer">
                    <div class="row">
                        <div class="col-xs-12 col-sm-3 col-sm-offset-1 text-center">
                            <a class="log-table btn btn-primary btn-block" @click="logTo('products')">销售商品报表</a>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-sm-offset-1 text-center">
                            <a class="log-out btn btn-primary btn-block" @click="logOut()">交接班并退出</a>
                        </div>

                    </div>
                </div>
    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-log{
        .dialog();
         width: 720px !important;
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @green;
        }
        .el-dialog__body{
            padding: @gutter 20px;
        }
        .el-dialog__footer{
            padding-top:0;
        }
        .dialog-log-con{
            width: 100%;

            .grid{
                height:  120px;
                margin-top: 12px;
                margin-bottom: 12px;
                border: solid 1px @border-color;
                border-radius: 3px;
                background: #ffffff;
                .t{
                    padding: 6px;
                    color: @thinColor;
                    span{color: @themeColor; float: right;}
                    line-height: 20px;
                    position: relative;
                }
                .c{
                    border-top:solid 1px @border-color;
                    position: relative;
                    line-height: 20px;
                    height: 80px;
                    padding:5px;
                    clear: both;
                    p{color: @themeColor;}
                    .more{ position: absolute; right: 6px; bottom: 6px; color: @thinColor;}
                }
            }


        }

        .dialog-footer{
            .log-out,.log-table{
                margin: @gutter/2 auto;
                padding: 10px 30px;
            }


        }

    }
</style>
<script>
    export default {
        name:"CashDialog",
        data() {
            return {
                dialogShow: true,
                logData:{}
            };
        },
        computed: {
            shopData(){
                return this.$store.state.shopData;
            },
        },
        created(){
            this.fetchLog()
        },
        methods:{
            closeWin(){
                this.dialogShow=false;
                setTimeout(_=> {
                    this.$root.showLogDialog = false;
                },300);

            },
            logTo (type){
                this.closeWin();
                this.$router.replace('/log/'+type);

            },
            //请求列表
            fetchLog() {
                this.$store.dispatch('fetchLog',{"type":"all"}).then(res=>{
                    this.logData=res.appShiftInfo;
                }).catch(res=>{
                    console.log(res);
                    this.$alert(res.msg,{
                        type: 'error',
                    })
                })
            },
            logOut(){
                this.closeWin();
                this.$root.$refs.header.exit();
            }
        }

    };
</script>
