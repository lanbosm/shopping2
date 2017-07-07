
<template>
    <div class="print">
        <commom-header  :title="title" :back="back" :next="next" ></commom-header>
        <div class="container order-custom">
            <div class="row">
                <div class="col-xs-12" v-if="printData.memberId">
                    <a class="btn btn-primary print-btn btn-block btn-inventory"  @click="gostock()">
                        <span class="iconfont icon-kucun" aria-hidden="true"></span> 存货

                    </a>
                </div>
                <div class="col-xs-12">
                    <a class="btn btn-primary print-btn btn-block" @click="printPage();">
                        <span class="iconfont icon-font29" aria-hidden="true"></span> 打印
                    </a>
                </div>
            </div>
        </div>

        <div class="container print-body">
            <div class="row" v-if="printData.paymentSn">
                <div class="col-xs-12 text-center ">
                    <p class="payres-txt" >{{message}}</p>
                </div>
            </div>
            <div class="row" >
                <div class="col-xs-12 text-center prev-row">
                    <p class="prev-txt">票据预览</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 print-div" id="printDiv">
                    <div class="print-box show" >
                        <hr></hr>
                        <table class="printtable">
                            <caption class="text-center">
                                <h3>{{printData.shopName}}</h3>
                                <h5 class="text-left">{{printData.time}}</h5>
                                <h5 class="text-left">订单号 {{printData.sn}}</h5>
                            </caption>
                            <tbody>
                            <tr v-show="printData.cashierName">
                                <td colspan="2" class="text-left block">营业员：{{printData.cashierName}}</td>
                            </tr>
                            <tr v-show="printData.customer">
                                <td colspan="2" class="text-left block">顾客：{{printData.customer}}</td>
                            </tr>
                            <tr v-show="printData.guiderName">
                                <td colspan="2" class="text-left  block">导购员：{{printData.guiderName}}</td>
                            </tr>
                            <tr class="split" v-for="(item,index) in printData.appOrderItemConfirms">
                                <td><span>{{item.name}}</span><span>*{{item.quantity}}</span></td>

                                <td v-if="item.editPrice">{{item.editPrice | currency}}</td>
                                <td v-else="item.price">{{item.price | currency}}</td>
                            </tr>
                            <tr class="split">
                                <td>小计 </td>
                                <td>{{printData.totalPrice | currency}}</td>
                            </tr>
                            <tr>
                                <td>优惠券 </td>
                                <td>{{printData.couponDiscount}}</td>
                            </tr>
                            <tr>
                                <td>积分支付</td>
                                <td>¥ {{printData.pointDiscount}}</td>
                            </tr>
                            <tr>
                                <td>余额支付</td>
                                <td>{{printData.balanceAmount | currency}}</td>
                            </tr>
                            <tr class="strong split">
                                <td>价格</td>
                                <td>{{order.totalAmountPayable | currency}}</td>
                            </tr>
                            <tr class="split">
                                <td>付款方式</td>
                                <td>{{printData.paymentMethodName}}</td>
                            </tr>
                            <tr class="split" v-if="orderParams.paymentMethodId == 10 ">
                                <td>现金支付</td>
                                <td>{{printData.rmb | currency}}</td>
                            </tr>
                            <tr class="split"  v-if="orderParams.paymentMethodId == 10 ">
                                <td>找零</td>
                                <td>{{printData.cash | currency}}</td>
                            </tr>

                            </tbody>
                        </table>

                        <p class="text-center" v-if="order.wechatCodeUrl">请使用{{payName}}扫码付款</p>
                        <div id="qrcCode"></div>
                        <hr></hr>
                        <div class="diy-box">
                            <p class="text-center">扫描关注公众号 更多优惠等您来</p>
                            <div  id="shopQrc">
                                    生成中...
                            </div>

                        </div>

                         <hr></hr>

                    </div>

                    <div style="display: none" id="styles">
                        *{padding:0; margin:0;}
                        body{ box-sizing: border-box;}
                        .print-box {width: 180pt; padding:10pt 10pt 10pt 10pt; margin:0 auto; font-size: 10pt;  border: solid 1px #cccccc; }
                        .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:0pt;  }
                        .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:0pt;}
                        .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-family:'黑体' }
                        .print-box  table.printtable tbody{display: block;}
                        .print-box  table.printtable caption{display:block;}
                        .print-box  table.printtable .strong{font-weight: bold; font-size: 12pt;}
                        .print-box  table.printtable .split{ margin-top:10pt;   }
                        .print-box  table.printtable tr{ display:block;clear: left;  padding-top:5pt; padding-bottom:5pt; }
                        .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
                        .print-box  table.printtable{*zoom:1;}
                        .print-box  table.printtable td:last-child{display: block; width: 50%;float: left; position: relative; text-align: right;}
                        .print-box  table.printtable td:first-child{display: block; width: 50%;float: left; position: relative;}
                        .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }
                        .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}
                        .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }
                        .print-box  .text-center {text-align: center !important;}
                        .print-box  .text-right {text-align: right !important;}
                        .print-box  .text-left {text-align: left !important;}
                        .print-box  p {margin-top:10pt;}
                        .print-box  #qrcCode{ margin-top:10pt;  }

                        .print-box #shopQrc{margin-left:5pt;  margin-top:10pt;   }
                        hr{width:100%; height:0px;   border-top:dotted 3px #cccccc; margin-top:10px; margin-bottom: 0px;}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .payres-txt{color: #e84593; margin-top: 10px; font-size: 16px; }
    .prev-row{border-top:@borderDashedStyle;   }
    .prev-txt{ margin-top: 10px; font-size: 14px; color: #999999;}
    .payres-txt.success{  color: #6fc89c;}
    .print-div{
        height:360px; overflow: hidden }

    *{padding:0; margin:0;}
    body{ box-sizing: border-box;}
    .print-box {width: 180pt; padding:10pt 10pt 10pt 10pt; margin:0 auto; font-size: 10pt;  border: solid 1px #cccccc; }
    .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:0pt;  }
    .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:0pt;}
    .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-family:'黑体' }
    .print-box  table.printtable tbody{display: block;}
    .print-box  table.printtable caption{display:block;}
    .print-box  table.printtable .strong{font-weight: bold; font-size: 12pt;}
    .print-box  table.printtable .split{ margin-top:10pt;   }
    .print-box  table.printtable tr{ display:block;clear: left;  padding-top:0pt; padding-bottom:0pt; }
    .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
    .print-box  table.printtable{*zoom:1;}
    .print-box  table.printtable td:last-child{display: block; width: 50%;float: left; position: relative; text-align: right;}
    .print-box  table.printtable td:first-child{display: block; width: 50%;float: left; position: relative;}
    .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }
    .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}
    .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }
    .print-box  .text-center {text-align: center !important;}
    .print-box  .text-right {text-align: right !important;}
    .print-box  .text-left {text-align: left !important;}
    .print-box  p {margin-top:10pt;}
    .print-box  #qrcCode{ margin-top:10pt;  }

    .print-box #shopQrc{margin-left:5pt;  margin-top:10pt;   }
    hr{width:100%; height:0px;   border-top:dotted 3px #cccccc; margin-top:10px; margin-bottom: 0px;}
    .print-box   table{ width:100% !important;}
    .btn-inventory{margin-bottom: 15px;}

</style>


<script>


    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';

    export default{
        data() {
            return {
                title:'打印',
                back:{"label":"返回","url":"order","show":false},
                next:{"label":"下个订单","url":"index","show":true,"cb":this.clearOrder},
                message: '等待付款',
                payName:"",
                amount:0,
                payStatus:"wait",
                timer:null,
                orderMsg:null,
                qrcWin:null
            }
        },
        computed: {
            //数据来自全局
            orderParams(){
                return this.$store.state.currentPage.orderParams;
            },
            //数据来自全局
            order () {
                return this.$store.state.currentPage.orderData;
            },
            //打印数据
            printData(){
                var print=this.$store.state.currentPage.printData;
                var nowDate = new Date();


               // print.paymentName=paymentName[this.orderParams.paymentMethodId];
                print.cash=this.orderParams.cash ;
                print.rmb=this.orderParams.rmb ;
                return  print;
            }

        },
        created(){


            this.$nextTick(function() {

                var amount=this.order.totalAmountPayable;
                if (!this.order.totalAmountPayable) amount='¥ '+ '0.00';
                else
                amount='¥ ' + Number(amount).toFixed(2);

                this.title='价格：'+amount;
                //付款二维码
                $('#qrcCode').html("");
                console.log(this.printData);

                //有链接就生成
                if(this.printData.wechatCodeUrl) {

                    var scanType={
                        17:"微信",
                        18:"支付宝"
                    }
                    this.payName=scanType[this.orderParams.paymentMethodId];
                    clearInterval(this.timer);
                    this.qrcWin=layer.open({
                            zIndex:99,
                            type: 2,
                            title: '请用'+ this.payName+'扫以下二维码进行付款, 成功后窗口会自动消失 ',
                            shadeClose: true,
                            shade: false,
                            maxmin: true, //开启最大化最小化按钮
                            offset: ['70px', '12px'],
                            area: ['600px', '480px'],
                            content: '/qrc.html?curl='+encodeURIComponent(this.printData.wechatCodeUrl)
                    });



                        //自定义二维码
                        $('#qrcCode').html("");
                        $('#qrcCode').qrcode({
                            render: "table",
                            text: this.printData.wechatCodeUrl,
                            width: 230,  //230内扫不出
                            height: 230
                        });

                         this.scanResListen();


                }

                if(this.printData.wechatMallUrl) {
                    //自定义二维码
                    $('#shopQrc').html("");
                    $('#shopQrc').qrcode({
                        render: "table",
                        text: this.printData.wechatMallUrl,
                        width: 230,  //230内扫不出
                        height: 230
                    });
                }

                this.$simpleScroll('#printDiv');

            });

        },
        methods: {
            clearOrder(){
                this.payStatus="success";
                clearInterval(this.timer);
                this.$store.dispatch("removePage").then(res=> {
                    this.$router.replace('/');
                });

               // this.$store.dispatch('switchPage',curPage-1);
               // this.$store.commit('switchPage', curPage);

            },
            printPage(){



                var obj=document.getElementById('printDiv').getElementsByTagName('div')[0];
                var docStr = obj.innerHTML;


                var styles=document.getElementById("styles").innerHTML;


                var header='<!DOCTYPE html>'+
                    '<html lang="en">'+
                    '<head>'+
                    '<meta charset="UTF-8">'+
                    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'+
                    '<title>打印</title>'+
                    '<style type="text/css">'+
                    styles+
                    '</style>'+
                    '</head>'+
                    '<body>';

                var footer='</body>'+
                    '</html>';
                docStr=header+docStr+footer;


                (function ($) {
                    var printAreaCount = 0;
                    $.fn.printArea = function () {
                        var idPrefix = "printArea_";
                        removePrintArea(idPrefix + printAreaCount);
                        printAreaCount++;
                        var iframeId = idPrefix + printAreaCount;
                        var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';

                        var iframe = document.createElement('iframe');

                        $(iframe).attr({
                            style: iframeStyle,
                            id: iframeId
                        });

                        document.body.appendChild(iframe);
                        var doc = iframe.contentWindow.document;
                        doc.write( docStr);
                        doc.close();
                        var frameWindow = iframe.contentWindow;
                        frameWindow.close();
                        frameWindow.focus();
                        frameWindow.print();
                    }
                    var removePrintArea = function (id) {
                        $("iframe#" + id).remove();
                    };
                })(jQuery);

                $("#printDiv").printArea();
            },
            scanResListen(){
                    var apiObj={
                        url:API_URLS.payments+"/"+this.order.paymentSn,
                        data:{r:Math.random()}
                    }

                    request.fnGet(apiObj).then(res=>{
                        console.log(this.payStatus);
                        this.payStatus=res.status;
                    });

                    if(this.payStatus=="wait"){
                        this.timer=setTimeout(()=> {              //每5秒一次请求
                            this.scanResListen();
                        },1000);
                    }else{
                        if(this.payStatus=="success"){
                            this.message="付款成功";
                            clearInterval(this.timer);
                            $(".payres-txt").addClass("success");
                            layer.msg(this.message, {icon: 1,zIndex:999});
                            layer.close(this.qrcWin);
                            setTimeout(_=> {
                                this.printPage();
                            },300);
                        }else {
                            this.message="付款失败";
                            clearInterval(this.timer);
                            $(".payres-txt").addClass("error");
                            //layer.msg(this.message, {icon: 2,zIndex:999});
                        }
                    }


            },

            gostock(){

                this.$store.dispatch("stockGoods",{"orderSn":this.printData.sn}).then(res=>{

                    this.$router.push({path:'/member',query:{sn:this.printData.sn,mid:this.printData.memberId}})
                })
            }
        }

    }
</script>


</body>
</html>