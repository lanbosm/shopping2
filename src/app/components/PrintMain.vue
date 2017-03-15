
<template>
    <div class="print">
        <app-center-header :title="title" :back="back" :next="next" mode="mode"></app-center-header>
        <div class="container order-custom">
            <div class="row">
                <div class="col-xs-12">
                    <a class="btn btn-default print-btn btn-block" @click="printPage();">
                        打印
                    </a>
                </div>
            </div>
        </div>

        <div class="container print-body" >
            <div class="row">
                <div class="col-xs-12" id="printDiv">
                    <div class="print-box show" >

                        <table>
                            <caption class="text-center">
                                <h5>11/23/2016 上午 10：00</h5>
                                <h5>订单号 620101021001201</h5>
                            </caption>
                            <tbody >
                            <tr>
                                <td colspan="2">阿喔优品公司</td>
                            </tr>
                            <tr>
                                <td colspan="2">营业员：张山</td>
                            </tr>
                            <tr>
                                <td colspan="2">顾客：luc</td>
                            </tr>
                            <tr class="split" v-for="(item,index) in currentPage.cartData">
                                <td><span>{{item.name}}</span><span>*{{item.amount}}</span></td>
                                <td>¥ {{item.price}}</td>
                            </tr>
                            <tr class="split">
                                <td>小计 </td>
                                <td>¥ {{totalPrice}}</td>
                            </tr>
                            <tr>
                                <td>优惠券 </td>
                                <td>¥ {{currentPage.couponPay}}</td>
                            </tr>
                            <tr>
                                <td>积分</td>
                                <td>¥ {{currentPage.pointPay}}</td>
                            </tr>
                            <tr class="strong split">
                                <td>价格</td>
                                <td>¥ {{totalPrice}}</td>
                            </tr>
                            <tr class="split">
                                <td>现金支付</td>
                                <td>¥ 100.00</td>
                            </tr>
                            <tr class="split">
                                <td>找零</td>
                                <td>¥ 30.00</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center split block" >
                                    <p>
                                        感谢您的光临<br/>
                                        关注二维码 更多优惠</p>
                                    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1761723146,2435534986&fm=58"   />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                    <div style="display: none" id="styles">
                        *{padding:0; margin:0;}
                        .print-box {width: 100%; padding:70px 0;}
                        .print-box  table{ width: 100%; display: block;position: relative; line-height: 20pt; font-size: 12px; font-family:'微软雅黑' }
                        .print-box  table tbody,.print-box  table caption{display: block;}
                        .print-box  table .text-center {text-align: center;}
                        .print-box  table .strong{font-weight: bold; font-size: 16px;}
                        .print-box  table .split{ padding-top: 20px;  }
                        .print-box  table tr{ display:block;clear: left;}
                        .print-box  table:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
                        .print-box  table{*zoom:1;}
                        .print-box  table td:first-child{display: block; width: 60%;float: left; position: relative;}
                        .print-box  table span:last-child{display: inline-block; width:20%; float:right;  text-align: right;}
                        .print-box  table span:first-child{display: inline-block; width:80%; float: left;}
                        .print-box  table td.block{width:100%; padding: 20px;  }
                        .print-box  table img{ width: 100px;  margin:0 auto; display:block;}
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<style >
      .print-box {width: 640px;}
      .print-box  table{ width: 100%; display: block;position: relative; line-height: 24px; font-size: 14px; }
      .print-box  table tbody,.print-box  table caption{display: block;}
      .print-box  table .text-center {text-align: center;}
      .print-box  table .strong{font-weight: bold; font-size: 24px;}
      .print-box  table .split{ padding-top: 40px;  }
      .print-box  table tr{ display:block;clear: left;}
      .print-box  table:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
      .print-box  table{*zoom:1;}
      .print-box  table td:first-child{display: block; width: 75%;float: left; position: relative;}
      .print-box  table span:last-child{display: inline-block; width:20%; float:right;  text-align: right;}
      .print-box  table span:first-child{display: inline-block; width:80%; float: left;}
      .print-box  table td.block{width:100%; padding: 20px;  }
      .print-box  table img{ width: 100px;  margin:0 auto;}

</style>

<script>
    import AppCenterHeader from 'components/AppCenterHeader.vue';
    import AppCenterCustom from 'components/AppCenterCustom.vue';
    import AppCenterMenu from 'components/AppCenterMenu.vue';

    export default{
        data() {
            return {
                title:"价格",
                back:{"label":"返回","url":"order","show":false},
                next:{"label":"下个订单","url":"index","show":true,"cb":this.clearOrder},
                message: '请选择一个付款方式',
                amount:0,
                index: 0
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
            currentPage(){
                return this.$store.state.currentPage;
            },
            //数据来自全局
            totalPrice () {
                var total=0;
                this.currentPage.cartData.forEach(function(e,i){
                    total+=e.price*e.amount;
                })
                return total;
            }
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
                console.log(header);
                var footer='</body>'+
                    '</html>';
                docStr=header+docStr+footer;

                newWindow.document.write(docStr);
                newWindow.document.close();
                newWindow.print();
                newWindow.close();


            }
        },
        mounted(){
           // console.log(this.currentPage);
        }
    }
</script>


</body>
</html>