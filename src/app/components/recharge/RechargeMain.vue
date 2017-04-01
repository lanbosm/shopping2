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
                    <a class="btn btn-default recharge-layer-ok" @click="rechargePrint">确定</a>
                    <a class="btn btn-default recharge-layer-cancel" @click="closeRechargeModal" >取消</a>
                </div>


            </div>
        </div>
        <div class="printDiv" id="printDiv" style="position:absolute; display: none;  pointer-events: none; width: 320px; font-size:12px;   z-index:9999; left: 0; top:0; background: #ffffff">
            <div class="print-box show" >

                <table class="printtable">
                    <caption class="text-left">
                        <h5>{{printData.DateTime}}</h5>
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
                    <tr v-show="printData.guiderName">
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
            .print-box {width: 260px; padding:100px 15px; margin:0 auto; font-size: 16px; }
            .print-box  h5{font-size: 18px; line-height:30px;}
            .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }
            .print-box  table.printtable tbody,.print-box  table.printtable caption{display: block; font-size: 18px;}
            .print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}
            .print-box  table.printtable .split{   }
            .print-box  table.printtable tr{ display:block;clear: left;}
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
            .print-box  p {margin-top:10px;}
            .print-box  #qrcCode{ margin-left:0px; margin-top:10px; }
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  scope lang="less">


    @import "../../../css/util/skin.less";

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

    import RechargeList from './RechargeList.vue'
    import PayCard from 'views/pay/PayCard.vue'
    import PayMoney from 'views/pay/PayMoney.vue'
    import PayScan from 'views/pay/PayScan.vue'

    import layer from 'layer';
    import $ from 'jquery';

    import {request, API_URLS} from 'util/request.js';


    export default{
        mounted(){

        },
        data(){
            return {
                title:"充值",
                message: '请选择一个充值方式',
                amount:0,
                giftAmount:0,
                diySeleted:false,
                payMethod:null,
            }
        },
        computed:{
            custom (){
               return this.$store.state.currentPage.customData;
            },
            order(){
               return  this.$store.state.currentPage.orderData;
            },
            shopAdminData(){
                return  this.$store.state.currentPage.shopAdminData;
            },
            printData(){

                var print=this.$store.state.currentPage.printData;

                var nowDate = new Date();
                var myDate=nowDate.toLocaleDateString();
                var myTime=nowDate.toLocaleTimeString();     //获取当前时间

                print.cashierName=this.order.cashierName;
                print.guiderName=this.shopAdminData.cashierName;
                print.DateTime=myDate+" "+myTime;

                return  print;
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

            toPrint(){
                var apiObj={
                    url:API_URLS.recharge,
                    data:{
                        phone:this.custom.username,
                        amount:this.amount,
                        paymentMethodId: this.payMethod

                    }
                }
                var vm=this;

                request.fnPost(this,apiObj,function(res){
                    //console.log(res.appOrderPayment);
                    vm.$store.commit("setPrintData",res.appOrderPayment);
                    vm.$nextTick(function() {

                        $('#qrcCode').html("");
                        //有链接就生成
                        if(res.appOrderPayment.wechatCodeUrl) {
                            $('#qrcCode').qrcode({
                                render: "table",
                                text: res.appOrderPayment.wechatCodeUrl,
                                width: 260,  //260内扫不出
                                height: 260
                            });
                        }
                        vm.printPage();
                    });
                })

            },
            rechargePrint(){
                if(this.payMethod==null){ layer.msg("请选择充值方式", {icon: 2}); return false;}
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
                var obj=document.getElementById('printDiv');
                var docStr = obj.innerHTML;

                var newWindow=window.open("./print.html","_blank");

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



                newWindow.document.write(docStr);

                newWindow.print();
                newWindow.document.close();
                newWindow.close();


            }
        }
    }
</script>

