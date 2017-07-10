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

                    <!--<p class="text-center" v-if="order.wechatCodeUrl">请使用{{payName}}扫码付款</p>-->
                    <!--<div v-if="order.wechatCodeUrl" id="qrcCode">-->
                        <!--生成中...-->
                    <!--</div>-->

                    <div class="diy-box">
                        <p class="text-center">{{shopData.shopSetting.memo}}</p>
                        <div  id="shopQrc">
                            生成中...
                    </div>
                        <p>
                            门店地址 ：{{shopData.shopSetting.shopAddress}}
                                </p>
                        <p>
                            联系电话 ：{{shopData.shopSetting.contactTel}}
                                </p>
                    </div>

            </div>
        </div>

        <div style="display: none" id="styles">
            *{padding:0; margin:0; font-size: 8pt;  font-family:'微软雅黑'; }
             img{width: 100%;}
             body{ width: 144pt;  box-sizing: border-box;}
            .print-box {width: 144pt; padding:10pt 0pt 10pt 0pt; margin:0 auto; font-size: 8pt;  border: solid 1px #cccccc ;  font-family:'微软雅黑'; }
            .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:5pt;  }
            .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:5pt;}
            .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-size: 8pt;  font-family:'微软雅黑'; }
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
            .print-box  p {margin-top:5pt;}
            .print-box  #qrcCode{ margin-top:5pt;  }
            .print-npx .diy-box{}
            .print-box #shopQrc{  margin-top:5pt;   }
            hr{width:100%; height:0px;   border-top:dotted 3px #cccccc; margin-top:10px; margin-bottom: 0px;}
            .print-box   table{ width:100% !important;}
            .btn-inventory{margin-bottom: 15px;}

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
                payStatus:null,
                printData:{}
            }
        },
        computed:{
            shopAdminData(){
                return  this.$store.state.currentPage.shopAdminData;
            },
            shopData(){

                return this.$store.state.shopData;
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

                request.fnPost(this,apiObj,res=>{
                    console.log(res.appOrderPayment);
                    vm.printData=res.appOrderPayment;


                   //vm.$store.commit("setPrintData",)
                    vm.$nextTick(_=>{

                        //有链接就生成
                        if(this.printData.wechatCodeBase64) {

                            this.payName=res.appOrderPayment.paymentName;
                            clearInterval(this.timer);
                            this.qrcWin=layer.open({
                                zIndex:9999,
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
                            var imgData="data:image/png;base64,"
                            var base64=this.printData.wechatCodeBase64;
                            $('#qrcCode').html('<img src="'+imgData+base64+'"/>');
                            this.scanResListen();

                        }else{
                            vm.printPage();
                        }
//                        //有链接就生成
//                        if(this.printData.wechatCodeBase64) {
//
//                            var scanType={
//                                17:"微信",
//                                18:"支付宝"
//                            }
//                            this.payName=scanType[this.orderParams.paymentMethodId];
//                            clearInterval(this.timer);
//                            this.qrcWin=layer.open({
//                                zIndex:99,
//                                type: 2,
//                                title: '请用'+ this.payName+'扫以下二维码进行付款, 成功后窗口会自动消失 ',
//                                shadeClose: true,
//                                shade: false,
//                                maxmin: true, //开启最大化最小化按钮
//                                offset: ['70px', '12px'],
//                                area: ['600px', '480px'],
//                                content: '/qrc.html?curl='+encodeURIComponent(this.printData.wechatCodeUrl)
//                            });
//
//
//                            //自定义二维码
//                            var imgData="data:image/png;base64,"
//                            var base64=this.printData.wechatCodeBase64;
//                            $('#qrcCode').html('<img src="'+imgData+base64+'"/>');
//                            this. scanResListen();
//
//
//                        }
//
//                        if(this.printData.wechatMallBase64) {
//                            //自定义二维码
//                            var imgData="data:image/png;base64,"
//                            var base64=this.printData.wechatMallBase64;
//                            $('#shopQrc').html('<img src="'+imgData+base64+'"/>');
//                        }
//                            $('#qrcCode').html("");
//                            //有链接就生成
//                            if(res.appOrderPayment.wechatCodeUrl) {
//                                $('#qrcCode').qrcode({
//                                    render: "table",
//                                    text: res.appOrderPayment.wechatCodeUrl,
//                                    width: 230,  //230内扫不出
//                                    height: 230
//                                });
//                            }

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
                layer.confirm("确认充值吗？", {
                    btn: ['确定'] //按钮
                }, function(index){
                    vm.toPrint();
                    layer.close(index);
                });


            },
            scanResListen(){
                var apiObj={
                    url:API_URLS.payments+"/"+this.printData.sn,
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
                        vm.printData();
                    }else {
                        this.message="付款失败";
                        clearInterval(this.timer);
                        $(".payres-txt").addClass("error");
                        //layer.msg(this.message, {icon: 2,zIndex:999});
                    }
                }


            },
            printPage(){
                this.closeRechargeModal();
                layer.msg("充值成功", {icon: 1}); return false;



              //  var obj=document.getElementById('printDiv').getElementsByTagName('div')[0];
            //    var docStr = obj.innerHTML;
//                var obj=document.getElementById('printDiv');
//                var docStr = obj.innerHTML;
//
//
//
//
//                var styles=document.getElementById("styles").innerHTML;
//                var header='<!DOCTYPE html>'+
//                    '<html lang="en">'+
//                    '<head>'+
//                    '<meta charset="UTF-8">'+
//                    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'+
//                    '<title>打印</title>'+
//                    '<style type="text/css">'+
//                    styles+
//                    '</style>'+
//                    '</head>'+
//                    '<body>';
//
//                var footer='</body>'+
//                    '</html>';
//                docStr=header+docStr+footer;
//
//                var h=obj.offsetHeight;
//
//
//                LODOP=getLodop();
//                LODOP.PRINT_INIT("");
//                //LODOP.SET_PRINT_PAGESIZE(1,580,2100,"A3")
//                var h=document.getElementById('printDiv').offsetHeight;
//                //var strBodyStyle="<style>"+document.getElementById("test").innerHTML+"</style>";
//                //var strFormHtml=strBodyStyle+"<body>"+document.getElementById("printDiv").innerHTML+"</body>";
//                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
//                //1in = 2.54cm = 25.4mm = 72pt = 96px
//                LODOP.SET_PRINT_STYLE("FontName","微软雅黑");
//
//
//                var toMM=25.4/96*10;
//
//                LODOP.ADD_PRINT_HTM(0,0,'144pt',h*toMM,docStr);
//                LODOP.PRINT();


            }
        }
    }
</script>

