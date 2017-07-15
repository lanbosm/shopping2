
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
                        <table class="printtable" >
                            <caption class="text-center">
                                <h5 class="text-center">{{printData.shopName}}</h5>
                                <h5 class="text-left">{{printData.time}}</h5>
                                <h5 class="text-left">订单号 {{printData.sn}}</h5>
                                <h5 class="text-left"  v-if="printData.cashierName">营业员：{{printData.cashierName}}</h5>
                                <h5 class="text-left"  v-if="printData.customer">顾客：{{printData.customer}}</h5>
                                <h5 class="text-left"  v-if="printData.guiderName">导购员：{{printData.guiderName}}</h5>
                            </caption>
                            <tbody >
                            <tr>
                                <td colspan="2" >
                                    <div class="dashline"></div>
                                </td>
                            </tr>
                            <template  v-for="(item,index) in printData.appOrderItemConfirms">
                             <tr>
                                <td colspan="2" class="itemsName">
                                    {{item.name}}
                                </td>
                             </tr>
                            <tr >
                                <td colspan="2" class="itemsRow">
                                    <span>数量*{{item.quantity}}</span>
                                    <span class="text-right" v-if="item.editPrice">{{item.editPrice | currency}}</span>
                                    <span class="text-right" v-else="item.price">{{item.price | currency}}</span>
                                </td>
                            </tr>
                            </template>
                            <tr>
                                <td colspan="2" >
                                    <div class="dashline"></div>
                                </td>
                            </tr>
                            <tr >
                                <td>小计 </td>
                                <td  class="text-right">{{printData.totalPrice | currency}}</td>
                            </tr>
                            <tr v-if="printData.couponDiscount">
                                <td>优惠券 </td>
                                <td  class="text-right">{{printData.couponDiscount}}</td>
                            </tr>
                            <tr v-if="printData.pointDiscount">
                                <td>积分支付</td>
                                <td class="text-right">¥ {{printData.pointDiscount}}</td>
                            </tr>
                            <tr v-if="printData.balanceAmount">
                                <td>余额支付</td>
                                <td  class="text-right">{{printData.balanceAmount | currency}}</td>
                            </tr>
                            <tr class="strong">
                                <td>价格</td>
                                <td  class="text-right">{{order.totalAmountPayable | currency}}</td>
                            </tr>
                            <tr >
                                <td>付款方式</td>
                                <td  class="text-right">{{printData.paymentMethodName}}</td>
                            </tr>
                            <tr v-if="orderParams.paymentMethodId == 10 ">
                                <td>现金支付</td>
                                <td  class="text-right">{{printData.rmb | currency}}</td>
                            </tr>
                            <tr  v-if="orderParams.paymentMethodId == 10 ">
                                <td>找零</td>
                                <td  class="text-right">{{printData.cash | currency}}</td>
                            </tr>

                            </tbody>
                        </table>

                        <p class="text-center mt2" v-if="order.wechatCodeUrl">请使用{{payName}}扫码付款</p>
                        <div v-if="order.wechatCodeUrl" id="qrcCode" class="text-center mt5" >
                            生成中...
                        </div>

                        <div class="diy-box" >
                            <p class="text-center mt2">{{shopData.shopSetting.memo}}</p>
                            <div  id="shopQrc" class="text-center mt5">
                                    生成中2...
                            </div>
                            <p class="text-left mt5">
                                门店地址 ：{{shopData.shopSetting.shopAddress}}
                            </p>
                            <p class="text-left mt2">
                                联系电话 ：{{shopData.shopSetting.contactTel}}
                            </p>
                        </div>


                    </div>

                    <div style="display: none" id="styles">
                *{padding:0; margin:0; font-size: {size};  font-family:'{font}'; }
                 img{width: 60%; margin:0 auto;}
                 body{ width: 136pt; box-sizing: border-box;}

                .print-box {width: 136pt; padding:10pt 0pt 10pt 0pt; margin:0; font-size: {fontSize};  border: solid 1px #cccccc ;  font-family:'{font}'; }
                .print-box  h5{font-size: '{font}'; display:block; padding-top:0pt; padding-bottom:0pt; line-height:'{font}'; }
                .print-box  p {  }
                .print-box  table.printtable{ width: 100%;  line-height:'{font}'; }
                .print-box  table.printtable caption{}
                .print-box  table.printtable .dashline{
                        height:0pt;
                        margin-top:3pt;
                        margin-bottom:3pt;
                        border-bottom: 2pt dashed #666666;

                }
                .print-box  table.printtable .strong{ margin-top: 2pt;}
                .print-box  table.printtable .split{ margin-top:10pt;   }
                .print-box  table.printtable tr{ padding-top:0pt; padding-bottom:0pt; }

                .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
                .print-box  table.printtable{*zoom:1;}



                .print-box  table.printtable .itemsName{ width:100% ;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
                .print-box  table.printtable .itemsRow{clear: both;}
                .print-box  table.printtable .itemsRow span{  width:50%; display:block; float: left; }




                .text-center {text-align: center !important;}
                .text-right {text-align: right !important;}
                .text-left {text-align: left !important;}
                .mt2{ margin-top:2pt !important;}
                .mt5{ margin-top:5pt !important;}
                .print-box .diy-box{ width:100%;}


                .print-box  #qrcCode{margin:0 auto;     }
                .print-box #shopQrc{margin:0 auto;     }

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
        height:360px; overflow-x: hidden;  }

    *{padding:0; margin:0;}
    body{ box-sizing: border-box;}
    .print-box img{width: 60%; margin: 0 auto;}
    .print-box {width: 180pt; padding:10pt 5pt 10pt 5pt; margin:0 auto; font-size: 10pt;  border: solid 1px #cccccc;  font-family:'微软雅黑'; }
    .print-box  h5{ font-size: 10pt; display:block; padding-top:0pt; padding-bottom:0pt; margin:0; line-height:14pt; }
    .print-box  p { margin:0; }
    .print-box  table.printtable{ width: 100%;  line-height: 12pt; }
    .print-box  table.printtable caption{}
    .print-box  table.printtable .dashline{
        height:0pt;
        margin-top:3pt;
        margin-bottom:3pt;
        border-bottom: 2pt dashed #666666;

    }
    .print-box  table.printtable .strong{ margin-top: 2pt;}
    .print-box  table.printtable .split{ margin-top:10pt;   }
    .print-box  table.printtable tr{ padding-top:0pt; padding-bottom:0pt; }

    .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
    .print-box  table.printtable{*zoom:1;}


    .print-box  table.printtable .itemsName{ width:100% ;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    .print-box  table.printtable .itemsRow{clear: both;}
    .print-box  table.printtable .itemsRow span{  width:50%; display:block; float: left; }




    .text-center {text-align: center !important;}
    .text-right {text-align: right !important;}
    .text-left {text-align: left !important;}
    .mt2{ margin-top:2pt !important;}
    .mt5{ margin-top:5pt !important;}
    .print-box .diy-box{ width:100%;}


    .print-box  #qrcCode{margin:0 auto;     }
    .print-box  #shopQrc{margin:0 auto;     }

    .btn-inventory{margin-bottom: 15px;}

</style>


<script>
    function CreatePrinterList(){

        if(LODOP){
            var iPrinterCount=LODOP.GET_PRINTER_COUNT();
            var arr={list:[]};
            for(var i=0;i<iPrinterCount;i++){
                arr.list.push({ value: i,  label: LODOP.GET_PRINTER_NAME(i)})
            };
            arr.value= 0 ;
            return arr;
        }else{
            return [];
        }
    };

    function CreateFontList(){

        var arr={list:[]};
        var fontList=['微软雅黑','宋体','黑体'];
        for(var i=0;i<fontList.length;i++){
            //var option=document.createElement('option');
            arr.list.push({ value: i,  label: fontList[i]})
        };
        arr.value= 0 ;
        return arr;
    };

    function CreateFontSize(){

        var arr={list:[]};
        var fontList=['8pt','10pt','12pt'];
        for(var i=0;i<fontList.length;i++){
            //var option=document.createElement('option');
            arr.list.push({ value: i,  label: fontList[i]})
        };
        arr.value= 0 ;
        return arr;
    };

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
                qrcWin:null,
                printer: {
                    hardsoft:{},
                    font:{},
                    size:{},
                    pageBottom:30,
                    copies:1,
                }
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
            shopData(){

                return this.$store.state.shopData;
            },
            //打印数据
            printData(){
                var print=this.$store.state.currentPage.printData;


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
                if(this.printData.wechatCodeBase64) {

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
                    var imgData="data:image/png;base64,"
                    var base64=this.printData.wechatCodeBase64;
                    $('#qrcCode').html('<img src="'+imgData+base64+'"/>');
                    //this. scanResListen();


                }

                if(this.printData.wechatMallBase64) {
                    //自定义二维码
                    var imgData="data:image/png;base64,"
                    var base64=this.printData.wechatMallBase64;
                    $('#shopQrc').html('<img src="'+imgData+base64+'"/>');
                }
            });

            this.setPrinter();

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
            setPrinter(){

                //获取打印机类型
                this.printer.hardsoft=CreatePrinterList();
                this.printer.font=CreateFontList();
                this.printer.size=CreateFontSize();

                if(this.shopData.printer){

                    this.printer=this.shopData.printer;
                }

            },
            printPage(){

                if(isNaN(this.printer.hardsoft.value)){
                    alert("未连接打印机");
                    return false;
                }
                var obj=document.getElementById('printDiv');
                var docStr = obj.innerHTML;

                var styles=document.getElementById("styles").innerHTML;

             //  alert(this.printer.font.list[this.printer.font.value].label);


                var stylestr = styles.replace(/{size}/g, this.printer.size.list[this.printer.size.value].label)
                    .replace(/{font}/g, this.printer.font.list[this.printer.font.value].label);

                var header='<!DOCTYPE html>'+
                    '<html lang="en">'+
                    '<head>'+
                    '<meta charset="UTF-8">'+
                    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'+
                    '<title>打印</title>'+
                    '<style type="text/css">'+
                    stylestr+
                    '</style>'+
                    '</head>'+
                    '<body>';

                var footer='</body>'+
                    '</html>';
                docStr=header+docStr+footer;





                var h=document.getElementById('printDiv').offsetHeight;
                var LODOP=getLodop();

                //LODOP.SET_PRINT_PAGESIZE(1,580,2100,"A3")
                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
                LODOP.SET_PRINTER_INDEX(this.printer.hardsoft.value);
                //1in = 2.54cm = 25.4mm = 72pt = 96px
               // LODOP.SET_PRINT_STYLE("FontName","微软雅黑");
                LODOP.SET_PRINT_COPIES(this.printer.copies);
                LODOP.SET_PRINT_MODE("POS_BASEON_PAPER",true);
                LODOP.SET_PRINT_PAGESIZE(3,'136pt',this.printer.pageBottom+'mm',"");
                var toMM=25.4/96*10;
              //  LODOP.ADD_PRINT_LINE(50, 0, 50, '144pt', 2, 0);
                LODOP.ADD_PRINT_HTM(0,0,'136pt',h*toMM,docStr);
                LODOP.PRINT();


                console.log(this.printer);
               // LODOP.PREVIEW();


//                var LODOP=getLodop();
//                LODOP.PRINT_INIT("");
//                //LODOP.SET_PRINT_PAGESIZE(1,580,2100,"A3")
//
//                //var strBodyStyle="<style>"+document.getElementById("test").innerHTML+"</style>";
//                //var strFormHtml=strBodyStyle+"<body>"+document.getElementById("printDiv").innerHTML+"</body>";
//                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
//                //1in = 2.54cm = 25.4mm = 72pt = 96px
//                LODOP.SET_PRINT_STYLE("FontName","微软雅黑");
//                LODOP.SET_PRINT_PAGESIZE(3,'144pt',45,"");
//
//                var toMM=25.4/96*10;
//                LODOP.ADD_PRINT_HTM(0,0,'144pt',h*toMM,docStr);
//                LODOP.PRINT();
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
                            this.printPage();
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