<template>
    <div id="layer-log-box" class="layer-log">
        <div class="row">
            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">应有现金 <span>106.20</span></div>
                    <div class="c">
                        <p>店内订单现金收款： 0</p>
                        <a class="more" @click="logTo('cash')">查看详细 ></a>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">充值 <span>106.20</span></div>
                    <div class="c">
                        <p>店内订单现金收款： 0</p>
                        <a class="more" @click="logTo('recharge')">查看详细 ></a>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">应有现金 <span>106.20</span></div>
                    <div class="c">
                        <p>店内订单现金收款： 0</p>
                        <a class="more">查看详细 ></a>
                    </div>
                </div>
            </div>

            <div class="col-xs-6">
                <div class="grid">
                    <div class="t">应有现金 <span>106.20</span></div>
                    <div class="c">
                        <p>店内订单现金收款： 0</p>
                        <a class="more">查看详细 ></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <a class="btn log-table">销售商品报表</a>
                <a class="btn log-out">交接班并登出</a>
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

        .grid{
            height:  120px;
            margin-top: 12px;
            margin-bottom: 12px;
            border: solid 1px #eeeeee;
            border-radius: 3px;
            .t{
                padding: 6px;
                color: @thinColor;
                span{color: @themeColor; float: right;}
                line-height: 20px;
                position: relative;
            }
            .c{
                border-top:solid 1px #eeeeee;
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
            padding-left: 60px;
            padding-right: 60px;
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


        },
        data(){
            return {
                stockQuantity:0,
                shopRepository:{},
                shopRepositoryList:null

            }

        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        created(){
           
        },
        methods:{

            logTo (type){

                layer.closeAll();
                this.$store.commit("setMode",'log/'+type);
                this.$router.replace('/log/'+type);

            }



        }
    }
</script>
