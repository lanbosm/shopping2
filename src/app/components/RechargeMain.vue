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
                        <div class="col-nn-30  left-con">
                            <div class="recharge-menu">
                                <a  class="btn btn-default scan-btn btn-block" :class="{on:payMethod==12}"  @click="payScan"><span class="iconfont icon-qr2" aria-hidden="true"></span> 扫码</a>
                                <a  class="btn btn-default scan-btn btn-block" :class="{on:payMethod==10}"  @click="payMoney"><span class="iconfont icon-icon" aria-hidden="true"></span>现金</a>
                                <a  class="btn btn-default scan-btn btn-block" :class="{on:payMethod==11}"  @click="payCard" ><span class="iconfont icon-xinyongqiahuankuan" aria-hidden="true"></span>刷卡</a>
                            </div>
                        </div>
                        <div class="col-nn-70 right-con">
                                <recharge-list  :amount="amount" :gift-amount="giftAmount" :message="message" ></recharge-list>
                        </div>
                    </div>
                </div>
                <div class="modal-foot">
                    <a class="btn btn-default recharge-layer-ok" @click="rechargePrint">打印</a>
                    <a class="btn btn-default recharge-layer-cancel" @click="closeRechargeModal" >取消</a>
                </div>


            </div>
        </div>
        <div class="printDiv" id="printDiv" style="position:absolute; display: none; width: 640px;  z-index:9999; left: 0; top:0; background: #ffffff">
            <div class="print-box show" >
                <table>
                    <caption class="text-left">
                        <h5>11/23/2016 上午 10：00</h5>
                        <h5>订单号 620101021001201</h5>
                    </caption>
                    <tbody >
                    <tr>
                        <td colspan="2" class="text-left block">阿喔优品公司</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-left block">营业员：luc</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-left block">顾客：luc</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-left  block">导购员：luc</td>
                    </tr>
                    <tr class="split">
                        <td>充值</td>
                        <td>¥ 500</td>
                    </tr>
                    <tr class="split">
                        <td>现金支付</td>
                        <td>¥ 100.00</td>
                    </tr>
                    <tr class="split">
                        <td>找零</td>
                        <td>¥ 30.00</td>
                    </tr>
                    <tr style="clear: both; ">
                        <td colspan="2" class="text-center split block" >
                            <p>扫码支付</p>
                            <img :src="qrcUrl"  />
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <div style="display: none" id="styles">
            *{padding:0; margin:0;}
            .print-box {width: 160px; padding:70px 15px; margin:0 auto;}
            .print-box  table{ width: 100%; display: block;position: relative; line-height: 18px; font-size: 8px; font-family:'微软雅黑' }
            .print-box  table tbody,.print-box  table caption{display: block;}
            .print-box  table .strong{font-weight: bold; font-size: 16px;}
            .print-box  table .split{   }
            .print-box  table tr{ display:block;clear: left;}
            .print-box  table:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
            .print-box  table{*zoom:1;}
            .print-box  table td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}
            .print-box  table td:first-child{display: block; width: 60%;float: left; position: relative;}
            .print-box  table span:last-child{display: inline-block; width:20%; float:right;  }
            .print-box  table span:first-child{display: inline-block; width:80%; float: left;}
            .print-box  table td.block{width:100% !important;   clear:both; text-align:center;  }
            .print-box  table img{ width: 100px;  margin:0 auto; display:block;}
            .print-box  table .text-center {text-align: center !important;}
            .print-box  table .text-right {text-align: right !important;}
            .print-box  table .text-left {text-align: left !important;}
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">




    @import "../../css/util/skin.less";

    @imgPath:"/images";

    /*!Recharge modale*/
    .recharge-layer {
        .modal-dialog{width: 768px; }
        border-bottom:solid 3px #93d6b3;padding:10px 30px;
        .modal-header{
            border-bottom: solid 3px @green;
            text-align: center;
            .close{margin-top:-20px}
        }
        .modal-body {
            padding: 30px 30px;
            .recharge-menu{
                    .btn{
                        color: #666;
                        padding: 15px;
                        position: relative;
                        border-color: #ccc;
                        border-radius: 5px;
                        background: #f0eeef;
                        margin-top: 15px;
                        margin-bottom: 30px;
                        font-size: 14px;
                        span {
                            margin-right: 20px;
                        }
                        &:hover,&.on{
                            background-color: @green;
                            color: #ffffff;
                        }
                    }
            }
            .tab-con{
                border-bottom: @borderDashedStyle;
                border-width: 2px;
                min-height: 260px;
                display: none;
                position: relative;
                &.tabShow{display: block;
                    .pay-amount{ color: @themeColor;   font-size: 30px; line-height: 40px; }
                    .pay-gift-amount {color: @themeColor; margin-top: 10px; font-size: 16px; }
                    .pay-tips {color: @themeColor; margin-top: 10px; font-size: 16px; }
                    .txt{color: #999999; line-height: 20px;}
                }
            }

            .list-box{
                padding-bottom:0px;
                table{border: none;}
                table td,table th{ width: 25%; text-align: center;border: none; font-size: 14px; padding: 4px; line-height: 30px; }
                table tbody tr{ background: @green; color: #ffffff;}

                table tbody tr td:nth-child(2) span {  background: #ffffff; color:@green;  width: 90%;  display: inline-block; border-radius: 4px; }

                table tbody tr td:nth-child(3){ background: #b998cd; color:#ffffff;}

                border-bottom: @borderDashedStyle;
                border-width: 2px;
            }

            .calc-box{
                padding-top: 15px;
                padding-bottom: 30px;
                ul {
                    width: 180px; background: #eeeeee; border-left: solid 1px #cccccc; border-top: solid 1px #cccccc;
                    margin: 0; padding: 0;
                    li {
                        box-sizing: border-box;
                        border-right: solid 1px #cccccc;
                        border-bottom: solid 1px #cccccc;
                        width: 33%;
                        height: 60px;
                        line-height: 60px;
                        font-size: 16px;
                        float: left;
                    }
                }
            }

        }
        .modal-foot{
            border-top:1px dashed #e5e5e5;
            padding:10px 0px; text-align: center;
            .recharge-layer-ok{display: inline-block;
                background:@green; color: #ffffff; padding:10px 50px;
                margin: 0 20px;
            }
            .recharge-layer-cancel{display: inline-block;
                padding:10px 50px;
                margin: 0 20px;
            }
        }

    }
</style>

<script>

    import RechargeList from 'components/RechargeList.vue'
    import PayCard from 'components/PayCard.vue'
    import PayMoney from 'components/PayMoney.vue'
    import PayScan from 'components/PayScan.vue'

    import layer from 'layer';

    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        mounted(){
            this.custom = this.$store.state.currentPage.customData
        },
        data(){
            return {
                title:"充值",
                message: '请选择一个充值方式',
                amount:0,
                giftAmount:0,
                diySeleted:false,
                payMethod:null,
                qrcUrl:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1761723146,2435534986&fm=58"
            }
        },
        components:{
            RechargeList,
            PayCard,
            PayMoney,
            PayScan
        },
        methods:{
            choseAmount(){
              this.payMethod=null;
            },
            payScan(){
                this.payMethod=12;
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
            rechargePrint(){
                //if(this.payMethod==null){ alert("请选择充值方式"); return false;}
                //if(this.amount<=0){ alert("请输入正确的金额"); return false;}
                this.printPage();
                //alert("打印");
                //var a=confirm("确认打印吗？");

//                if(a){
//                    var apiObj={
//                        url:API_URLS.recharge,
//                        data:{
//                            phone:13636574272,
//                            amount:this.amount,
//                            paymentMethodId: this.payMethod
//
//                        }
//                    }
//
//                    request.fnPost(this,apiObj,function(res){
//                            console.log(res);
//
//                    })
//
//
//                }


            },
            printPage(){

                var obj=document.getElementById('printDiv');

                //alert(document.getElementById('printDiv'));
                var docStr = obj.innerHTML;

                var newWindow=window.open("/print.html","_blank");

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
                console.log(header);
                var footer='</body>'+
                    '</html>';
                docStr=header+docStr+footer;

                newWindow.document.write(docStr);
                newWindow.document.close();
                newWindow.print();
                newWindow.close();


            }
        }
    }
</script>

