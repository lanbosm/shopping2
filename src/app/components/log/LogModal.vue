<template>
    <div id="layer-log-box" class="layer-log">
        <div class="row">
            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">应有现金 <span>{{logData.endSpareCash | currency}}</span></div>
                    <div class="c">
                        <p>店内订单现金收款： {{logData.orderCashPay | currency}}</p>
                        <a class="more" @click="logTo('cash')">查看详细 ></a>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">总销售额 <span>{{logData.totalSales | currency}}</span></div>
                    <div class="c">
                        <p>收银端销售额： {{logData.totalSales | currency}}</p>
                        <a class="more" @click="logTo('sales')">查看详细 ></a>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">充值 <span>{{logData.totalRecharge | currency}}</span></div>
                    <div class="c">
                        <p>现金充值： {{logData.rechargeCashPay | currency}}</p>
                        <a class="more" @click="logTo('recharge')">查看详细 ></a>
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">促销统计 <span>{{logData.promotion | currency}}</span></div>
                    <div class="c">
                        <a class="more" @click="logTo('promotion')">查看详细 ></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <a class="btn log-table" @click="logTo('products')">销售商品报表</a>
                <a class="btn log-out" @click="logOut()">交接班并退出</a>
            </div>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    /*!item modale*/
    .layer-log {
        width: 640px;
        height: 360px;
        padding: 15px;
        position: relative;
        display: none;
        overflow: hidden;
        background: #f7f7f7;

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

        .log-table{
             .green-btn();
        }

        .log-out{
            left: 160px;
            .green-btn();
            padding-left: 120px;
            padding-right: 120px;

            &:hover,&:active{
                padding-left:120px;
                padding-right: 120px;
            }
        }

    }
    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

</style>




<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';
    import layer from 'layer';


    export default{
        name:"LogModal",
        computed: {
            shopData(){
                return this.$store.state.shopData;
            }

        },
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
        data(){
            return {
                logData:{}

            }

        },
        created(){
            this.fetchLog()
        },
        methods:{
            logTo (type){
                layer.closeAll();
                this.$store.commit("setMode",'log/'+type);
                this.$router.replace('/log/'+type);

            },
            //请求列表
            fetchLog() {
                this.$store.dispatch('fetchLog',{"type":"all"}).then(res=>{
                    this.logData=res.appShiftInfo;
                    console.log(res);
                })
            },
            logOut(){
                this.$root.$refs.header.exit();
            }
        }
    }
</script>
