
<template>
    <div class="print">
        <app-center-header :title="title" :back="back" :next="next" mode="mode"></app-center-header>
        <div class="container order-custom">
            <div class="row">
                <div class="col-xs-12">
                    <a class="btn btn-default print-btn btn-block" @click="printPage();">
                        <span class="iconfont icon-font29" aria-hidden="true"></span> 打印
                    </a>
                </div>
            </div>
        </div>

        <div class="container print-body" >
            <div class="row" v-if="printData.paymentSn">
                <div class="col-xs-12 text-center">
                    <p class="payres-txt" >{{message}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12" id="printDiv">
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
                            <tr class="split" v-for="(item,index) in printData.appOrderItemConfirms">
                                <td><span>{{item.name}}</span><span>*{{item.quantity}}</span></td>
                                <td>¥ {{item.price}}</td>
                            </tr>
                            <tr class="split">
                                <td>小计 </td>
                                <td>¥ {{printData.totalOrderAmount}}</td>
                            </tr>
                            <tr>
                                <td>优惠券 </td>
                                <td>¥ {{printData.couponDiscount}}</td>
                            </tr>
                            <tr>
                                <td>积分支付</td>
                                <td>¥ {{printData.pointDiscount}}</td>
                            </tr>
                            <tr>
                                <td>余额支付</td>
                                <td>¥ {{printData.balanceAmount}}</td>
                            </tr>
                            <tr class="strong split">
                                <td>总计</td>
                                <td>¥ {{order.totalAmountPayable}}</td>
                            </tr>
                            <tr class="split">
                                <td>付款方式</td>
                                <td>{{printData.paymentName}}</td>
                            </tr>
                            <tr class="split">
                                <td>找零</td>
                                <td>¥ {{printData.cash}}</td>
                            </tr>

                            </tbody>
                        </table>
                        <p class="text-center" v-if="order.wechatCodeUrl">请微信扫码付款</p>
                        <div id="qrcCode"></div>

                    </div>

                    <div style="display: none" id="styles">
                        *{padding:0; margin:0;}
                        body{width: 290px;}
                        .print-box {width: 290px; padding:100px 15px; margin:0 auto; font-size: 12px; }
                        .print-box  h5{font-size: 14px; line-height:20px; display:block;  }
                        .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }
                        .print-box  table.printtable tbody{display: block;}
                        .print-box  table.printtable caption{display:block;}
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
                        .print-box  #qrcCode{ margin-left:15px; margin-top:10px;  }
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style >

    .payres-txt{color: #e84593; margin-top: 10px; font-size: 16px;}
    .payres-txt.success{  color: #6fc89c;}
    .print-box {width: 290px; padding:50px 15px 100px 15px; margin:0 auto; font-size: 14px;
        display: block;
        border: solid 1px #dddddd;
        border-radius: 5px;
    }

    .print-box  h5{
        font-size: 14px; line-height:20px;  display: block;
    }

    .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }
    .print-box  table.printtable tbody{display: block;}
    .print-box  table.printtable caption{display:block;}
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
    .print-box  #qrcCode{ margin-left:0px; margin-top:10px;  }

</style>


<script>
    import AppCenterHeader from 'components/AppCenterHeader.vue';
    import AppCenterCustom from 'components/AppCenterCustom.vue';
    import AppCenterMenu from 'components/AppCenterMenu.vue';

    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';

    export default{
        data() {
            return {
                title:"打印",
                back:{"label":"返回","url":"order","show":false},
                next:{"label":"下个订单","url":"index","show":true,"cb":this.clearOrder},
                message: '等待付款',
                amount:0,
                payStatus:"wait"

            }
        },
        components:{
            AppCenterHeader,
            AppCenterMenu,
            AppCenterCustom
        },
        computed: {
            //数据来自全局
            mode(){
                return this.$store.state.currentPage.mode;
            },
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
                var myDate=nowDate.toLocaleDateString();
                var myTime=nowDate.toLocaleTimeString();     //获取当前时间


                var paymentName={12:"扫码支付",10:"现在支付",11:"刷卡支付"};

                print.paymentName=paymentName[this.orderParams.paymentMethodId];
                print.cash=this.orderParams.cash || 0;

                print.DateTime=myDate+" "+myTime;


                return  print;
            }

        },
        created(){

            this.$nextTick(function() {
                $('#qrcCode').html("");

                console.log(this.printData);
                //有链接就生成
                if(this.printData.wechatCodeUrl) {
                    $('#qrcCode').qrcode({
                        render: "table",
                        text: this.printData.wechatCodeUrl,
                        width: 260,  //260内扫不出
                        height: 260
                    });

                    this.scanResListen();
                }
            });

        },
        methods: {
            clearOrder(){
                var curPage=this.$store.state.currentPage.index;
                this.$store.commit('removePage', curPage);
                this.$store.commit('switchPage', curPage);
                //切换路由
                this.$router.replace('/'+this.mode);
            },
            printPage(){

                var obj=document.getElementById('printDiv');
                var docStr = obj.innerHTML;

                var newWindow=window.open("/print.html","_blank");

                var styles=document.getElementById("styles").innerHTML;

                var header='<!DOCTYPE html>'+
                    '<html lang="en">'+
                    '<head>'+
                    '<meta charset="UTF-8">'+
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
                newWindow.document.close();
                newWindow.print();
                newWindow.close();



            },
            scanResListen(){
                    var apiObj={
                        url:API_URLS.payments+"/"+this.order.paymentSn,
                        data:{r:Math.random()}
                    }

                    request.fnGet(this,apiObj,(res)=>{
                        console.log(this.payStatus);
                        this.payStatus=res.status;
                    })

                    if(this.payStatus=="wait"){
                        setTimeout(()=> {              //每5秒一次请求
                            this.scanResListen();
                        },5000);
                    }else{
                        if(this.payStatus=="success"){
                            this.message="付款成功";
                            $(".payres-txt").addClass("success");
                            layer.msg(this.message, {icon: 1});
                        }else {
                            this.message="付款失败";
                            $(".payres-txt").addClass("error");
                            layer.msg(this.message, {icon: 2});
                        }
                    }


            }
        }

    }
</script>


</body>
</html>