<template>
    <div role="dialog" class="modal fade recharge-layer" id="layer-recharge">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">充值</h4>
                    <a class="close" data-dismiss="modal">&times;</span></a>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-nn-30">
                            <div class="recharge-menu">
                                <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==17||payMethod==18}"  @click="payScan"><span class="iconfont icon-qr2" aria-hidden="true"></span> 扫码</a>
                                <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==10}"  @click="payMoney"><span class="iconfont icon-icon" aria-hidden="true"></span>现金</a>
                                <a  class="btn btn-primary scan-btn btn-block" :class="{on:payMethod==11}"  @click="payCard" ><span class="iconfont icon-xinyongqiahuankuan" aria-hidden="true"></span>刷卡</a>
                            </div>
                        </div>
                        <div class="col-nn-70 ">
                                <recharge-list  :payMethod="payMethod" :amount="amount" :gift-amount="giftAmount" :message="message" ></recharge-list>
                        </div>
                    </div>
                </div>
                <div class="modal-foot">
                    <a class="btn btn-primary recharge-layer-ok" @click="rechargePrint">确定</a>
                    <a class="btn btn-primary recharge-layer-cancel" @click="closeRechargeModal" >取消</a>
                </div>


            </div>
        </div>
        <div class="printDiv" id="printDiv" style="position:absolute; display: none;  pointer-events: none; width: 320px; font-size:12px;   z-index:9999; left: 0; top:0; background: #ffffff">
            <div class="print-box show" >

                <table class="printtable">
                    <caption class="text-left">
                        <h5>{{printData.time}}</h5>
                        <h5>订单号 {{printData.sn}}</h5>
                    </caption>
                    <tbody >
                    <tr>
                        <td colspan="2" class="text-left block">阿喔优品公司</td>
                    </tr>
                    <tr v-show="printData.cashierName">
                        <td colspan="2" class="text-left block">营业员：{{printData.cashierName}}</td>
                    </tr>
                    <tr v-show="printData.customer">
                        <td colspan="2" class="text-left block">顾客：{{printData.customer}}</td>
                    </tr>
                    <tr v-show="printData.guiderName" >
                        <td colspan="2" class="text-left  block">导购员：{{printData.guiderName}}</td>
                    </tr>
                    <tr class="split">
                        <td>充值</td>
                        <td>¥ {{printData.amount}}</td>
                    </tr>
                    <tr class="split">
                        <td>返利</td>
                        <td>¥ {{printData.giftAmount}}</td>
                    </tr>
                    <tr class="split">
                        <td>付款方式</td>
                        <td>{{printData.paymentName}}</td>
                    </tr>
                    </tbody>
                </table>

                <p class="text-center" v-if="printData.wechatCodeUrl">请微信扫码付款</p>
                <div id="qrcCode"></div>

            </div>
        </div>

        <div style="display: none" id="styles">
                         *{padding:0; margin:0;}
                         body{ box-sizing: border-box;}
                         .print-box {width: 180pt; padding:10pt 10pt 50pt 10pt; margin:0 auto; font-size: 10pt;  }
                         .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:20pt;  }
                         .print-box  h5{font-size: 10pt; display:block; adding-top:10pt; padding-bottom:10pt;}
                         .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:20pt; padding-bottom:20pt;  font-family:'黑体' }
                         .print-box  table.printtable tbody{display: block;}
                         .print-box  table.printtable caption{display:block;}
                         .print-box  table.printtable .strong{font-weight: bold; font-size: 12pt;}
                         .print-box  table.printtable .split{ margin-top:10pt;   }
                         .print-box  table.printtable tr{ display:block;clear: left;  padding-top:10pt; padding-bottom:10pt; }
                         .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
                         .print-box  table.printtable{*zoom:1;}
                         .print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}
                         .print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}
                         .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }
                         .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}
                         .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }
                         .print-box  .text-center {text-align: center !important;}
                         .print-box  .text-right {text-align: right !important;}
                         .print-box  .text-left {text-align: left !important;}
                         .print-box  p {margin-top:10pt;}
                         .print-box  #qrcCode{margin-left:5pt; margin-top:30pt;  }

                         .print-box #shopQrc{margin-left:5pt;  margin-top:30pt;   }
                         hr{width:100%; height:0px;margin-top:30pt;  border-top:dotted 3px #cccccc;}
         </div>
    </div>
</template>


<script>

    import RechargeList from './RechargeList.vue'

    import layer from 'layer';
    import $ from 'jquery';

    import {request, API_URLS} from 'util/request.js';


    export default{
        data(){
            return {
                title:"充值",
                message: '请选择一个充值方式',
                amount:0,
                giftAmount:0,
                customId:"",
                diySeleted:false,
                payMethod:null,
                customName:null,
                id:null,
                printData:{}
            }
        },
        computed:{
            shopAdminData(){
                return  this.$store.state.currentPage.shopAdminData;
            },
        },
        components:{
            RechargeList,
        },
        methods:{
            choseAmount(){
                this.payMethod=null;
            },
            payScan(){
                this.payMethod=17;
            },
            payMoney(){
                this.payMethod=10;
            },
            payCard(){
                this.payMethod=11;
            },
            closeRechargeModal(){
                var modal='#layer-recharge';
                $(modal).modal('hide');
            },

            toPrint(){


                var apiObj={
                    url:API_URLS.recharge,
                    data:{
                        phone:this.customName,
                        amount:this.amount,
                        paymentMethodId: this.payMethod,
                        id:this.id
                    }
                }
                var vm=this;

                request.fnPost(this,apiObj,function(res){
                    //console.log(res.appOrderPayment);
                    vm.printData=res.appOrderPayment;

                    console.log(vm.printData);
                   //vm.$store.commit("setPrintData",);

                    vm.$nextTick(function()  {

                        $('#qrcCode').html("");
                        //有链接就生成
                        if(res.appOrderPayment.wechatCodeUrl) {
                            $('#qrcCode').qrcode({
                                render: "table",
                                text: res.appOrderPayment.wechatCodeUrl,
                                width: 230,  //230内扫不出
                                height: 230
                            });
                        }
                        vm.printPage();
                    });
                },function(res){

                    layer.msg(res.msg, {icon: 2}); return false;

                })

            },
            rechargePrint(){
                if(this.payMethod==null){
                    layer.msg("请选择充值方式", {icon: 2}); return false;
                }
                if(this.amount<=0){ layer.msg("请选择充值金额", {icon: 2}); return false;}


                var vm=this;
                //询问框
                layer.confirm("确认打印吗？", {
                    btn: ['确定'] //按钮
                }, function(index){
                    vm.toPrint();
                    layer.close(index);
                });


            },
            printPage(){
              //  var obj=document.getElementById('printDiv').getElementsByTagName('div')[0];
            //    var docStr = obj.innerHTML;
                var obj=document.getElementById('printDiv');
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




            }
        }
    }
</script>

