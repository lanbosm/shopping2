
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
                            <tr v-if="printData.cashierName">
                                <td colspan="2" class="text-left block">营业员：{{printData.cashierName}}</td>
                            </tr>
                            <tr v-if="printData.customer">
                                <td colspan="2" class="text-left block">顾客：{{printData.customer}}</td>
                            </tr>
                            <tr v-if="printData.guiderName">
                                <td colspan="2" class="text-left  block">导购员：{{printData.guiderName}}</td>
                            </tr>
                            <tr class="itemsRow" v-for="(item,index) in printData.appOrderItemConfirms">
                                <td>
                                    <span>{{item.name}}</span>
                                </td>
                                <td>
                                    <span>
                                              <em>数量*{{item.quantity}}</em>
                                              <em v-if="item.editPrice">{{item.editPrice | currency}}</em>
                                              <em v-else="item.price">{{item.price | currency}}</em>
                                     </span>
                                </td>


                            </tr>
                            <tr >
                                <td>小计 </td>
                                <td>{{printData.totalPrice | currency}}</td>
                            </tr>
                            <tr v-if="printData.couponDiscount">
                                <td>优惠券 </td>
                                <td>{{printData.couponDiscount}}</td>
                            </tr>
                            <tr v-if="printData.pointDiscount">
                                <td>积分支付</td>
                                <td>¥ {{printData.pointDiscount}}</td>
                            </tr>
                            <tr v-if="printData.balanceAmount"
                                <td>余额支付</td>
                                <td>{{printData.balanceAmount | currency}}</td>
                            </tr>
                            <tr class="strong">
                                <td>价格</td>
                                <td>{{order.totalAmountPayable | currency}}</td>
                            </tr>
                            <tr >
                                <td>付款方式</td>
                                <td>{{printData.paymentMethodName}}</td>
                            </tr>
                            <tr v-if="orderParams.paymentMethodId == 10 ">
                                <td>现金支付</td>
                                <td>{{printData.rmb | currency}}</td>
                            </tr>
                            <tr  v-if="orderParams.paymentMethodId == 10 ">
                                <td>找零</td>
                                <td>{{printData.cash | currency}}</td>
                            </tr>

                            </tbody>
                        </table>

                        <p class="text-center" v-if="order.wechatCodeUrl">请使用{{payName}}扫码付款</p>
                        <div v-if="order.wechatCodeUrl" id="qrcCode">
                            生成中...
                        </div>

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

                    <div style="display: none" id="styles">
                      img{width: 60%; margin:0}
                      body{ width: 100%; box-sizing: border-box;}
                     .print-box {width: 100%; padding:10pt 0pt 10pt 0pt; margin:0; font-size: {fontSize};  border: solid 1px #cccccc ;  font-family:'{font}'; }
                     .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:0pt;  }
                     .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:0pt;}
                     .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-family:'黑体' }
                     .print-box  table.printtable tbody{display: block;}
                     .print-box  table.printtable caption{display:block;}
                     .print-box  table.printtable .strong{ margin-top: 2pt;}
                     .print-box  table.printtable .split{ margin-top:10pt;   }
                     .print-box  table.printtable tr{ display:block;clear: left;  padding-top:0pt; padding-bottom:0pt; }

                     .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
                     .print-box  table.printtable{*zoom:1;}
                     .print-box  table.printtable td:last-child{display: block; width: 50%;float: left; position: relative; text-align: right;}
                     .print-box  table.printtable td:first-child{display: block; width: 50%;float: left; position: relative;}

                     .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }
                     .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}

                     .print-box  table.printtable tr.itemsRow  td{
                         width: 100% !important; clear: both;
                     }
                     .print-box  table.printtable tr.itemsRow  td span{
                         width: 100% !important; float: none;
                     }
                     .print-box  table.printtable tr.itemsRow em:last-child{display: inline-block; width:50%; float:right;  text-align: right}
                     .print-box  table.printtable tr.itemsRow em:first-child{display: inline-block; width:50%; float: left; text-align: left;}

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
        height:360px; overflow-x: hidden; }

    *{padding:0; margin:0;}
    body{ box-sizing: border-box;}
    .print-box img{width: 60%; margin: 0 auto;}
    .print-box {width: 180pt; padding:10pt 10pt 10pt 10pt; margin:0 auto; font-size: 10pt;  border: solid 1px #cccccc; }
    .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:0pt;  }
    .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:0pt;}
    .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-family:'黑体' }
    .print-box  table.printtable tbody{display: block;}
    .print-box  table.printtable caption{display:block;}
    .print-box  table.printtable .strong{ margin-top: 2pt;}
    .print-box  table.printtable .split{ margin-top:10pt;   }
    .print-box  table.printtable tr{ display:block;clear: left;  padding-top:0pt; padding-bottom:0pt; }

    .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
    .print-box  table.printtable{*zoom:1;}
    .print-box  table.printtable td:last-child{display: block; width: 50%;float: left; position: relative; text-align: right;}
    .print-box  table.printtable td:first-child{display: block; width: 50%;float: left; position: relative;}

    .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }
    .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}

    .print-box  table.printtable tr.itemsRow  td{
        width: 100% !important; clear: both;
    }
    .print-box  table.printtable tr.itemsRow  td span{
        width: 100% !important; float: none;
    }
    .print-box  table.printtable tr.itemsRow em:last-child{display: inline-block; width:50%; float:right;  text-align: right}
    .print-box  table.printtable tr.itemsRow em:first-child{display: inline-block; width:50%; float: left; text-align: left;}

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
    function CreatePrinterList(){

        var LODOP=getLodop();
        var iPrinterCount=LODOP.GET_PRINTER_COUNT();
        var arr={list:[]};
        for(var i=0;i<iPrinterCount;i++){
            arr.list.push({ value: i,  label: LODOP.GET_PRINTER_NAME(i)})
        };
        arr.value= 0 ;
        return arr;
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
                    this. scanResListen();


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
                LODOP.SET_PRINT_STYLE("FontName","微软雅黑");
                LODOP.SET_PRINT_COPIES(this.printer.copies);
                LODOP.SET_PRINT_MODE("POS_BASEON_PAPER",true);
                LODOP.SET_PRINT_PAGESIZE(3,'144pt',this.printer.pageBottom+'mm',"");
                var toMM=25.4/96*10;
                LODOP.ADD_PRINT_LINE(0, 0, 0,"RightMargin:0mm", 3,0);
                LODOP.ADD_PRINT_HTM(9,0,"RightMargin:0mm",h*toMM,docStr);
                LODOP.PRINT();



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