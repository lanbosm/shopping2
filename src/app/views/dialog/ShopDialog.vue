<template>

    <el-dialog
            title="系统设置"
            :visible.sync="dialogShow"
            top="10%"
            custom-class="dialog-shop"
            :close-on-click-modal=false
            :modal=true
            @close="closeWin();"
            >
                <div class="dialog-shop-con row">
                    <div class="col-xs-6">
                          <ul class="row">
                                    <h5 class="col-xs-12">
                                        门店管理
                                        <a class="dialog-shop-btn-ok" v-show="!edit" @click="handleEdit()">修改</a>
                                        <a class="dialog-shop-btn-ok" v-show="edit" @click="handleSave()" >确定</a>
                                        <a class="dialog-shop-btn-cancel" @click="handleCancel()">取消</a>
                                    </h5>
                                    <li class="col-xs-6">
                                        <label class="input-title" >门店名称</label>
                                        <el-input v-model="shopName.val"  class="shopname-input" :readonly="shopName.readonly" placeholder="门店名称"></el-input>
                                    </li>
                                    <li class="col-xs-6">
                                        <label class="input-title" >联系人</label>
                                        <el-input v-model="contactName.val" :readonly="contactName.readonly" placeholder="联系人"></el-input>
                                    </li>
                                    <li class="col-xs-6">
                                        <label class="input-title" >联系方式</label>
                                        <el-input v-model="contactPhone.val" type="tel" :maxlength="11"  :readonly="contactPhone.readonly" placeholder="联系方式"></el-input>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title" >门店地址</label>
                                        <el-input v-model="address.val" type="textarea" :rows="2" :readonly="address.readonly"   resize="none" placeholder="地址"></el-input>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title" >门店备注</label>
                                        <el-input v-model="memo.val" type="textarea" :rows="2" :readonly="memo.readonly"  resize="none" placeholder="备注"></el-input>
                                    </li>
                          </ul>
                    </div>

                    <div class="col-xs-6">
                            <ul class="row">
                                    <h5 class="col-xs-12">
                                        打印管理
                                        <a class="dialog-shop-btn-ok"  @click="handlePrintSave()" >确定</a>
                                        <a class="dialog-shop-btn-testPrint"  @click="printPage()">测试打印</a>
                                    </h5>
                                    <li class="col-xs-12">
                                        <label class="input-title">打印机  </label>
                                        <el-select v-model="printer.hardsoft.value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in printer.hardsoft.list"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>

                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title">字体类型</label>
                                        <el-select v-model="printer.font.value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in printer.font.list"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title">字体大小</label>
                                        <el-select v-model="printer.size.value" placeholder="请选择">
                                            <el-option
                                                    v-for="item in printer.size.list"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title" >走纸(mm)</label>
                                        <el-input-number v-model="printer.pageBottom"  :min="1" :max="100"></el-input-number>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title" >打印份数</label>
                                        <el-input-number v-model="printer.copies"  :min="1" :max="2"></el-input-number>
                                    </li>
                                    <li class="col-xs-12">
                                        <label class="input-title" >打印二维码内容</label>
                                        <el-input v-model="printer.qrCodeContent" type="textarea"  resize="none" :rows="2" placeholder="二维码内容 默认微商城链接"></el-input>
                                    </li>

                        </ul>
                    </div>
                </div>

                <div slot="footer" class="">
                    <div class="row">
                        <div class="col-xs-12 dialog-footer">
                            <h5>其他设置</h5>
                            <div class="row">
                                 <el-checkbox class="col-xs-4 " disabled v-model="backScreen">副屏显示</el-checkbox>
                                 <el-checkbox class="col-xs-4" v-model="noticeTips">消息推送</el-checkbox>
                                 <div class="col-xs-3">

                                 </div>


                            </div>

                        </div>
                    </div>


                </div>
        <div style="display: none" id="styles">

            *{padding:0; margin:0; font-size: {size};  font-family:'{font}'; }
             img{width: 60%; margin:0}
             body{ width: 100%; box-sizing: border-box;}
            .print-box {width: 100%; padding:10pt 0pt 10pt 0pt; margin:0; font-size: {fontSize};  border: solid 1px #cccccc ;  font-family:'{font}'; }
            .print-box  h3{font-size: 12pt; display:block; padding-top:0pt; padding-bottom:5pt;  }
            .print-box  h5{font-size: 10pt; display:block; padding-top:0pt; padding-bottom:5pt;}
            .print-box  table.printtable{ width: 100%; display: block;position: relative;  padding-top:0pt; padding-bottom:10pt;  font-size: {fontSize};  font-family:'{font}'; }
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

             #test{
                border-bottom:dash 2px #333333;
                fonr-size:32px;
            }
         </div>
    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-shop{
        .dialog();
        width: 720px !important;
        input:focus{
            border-color: @themeColor;
        }
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @green;
        }
        .el-dialog__body{
            padding: @gutter 20px;
        }
        .el-dialog__footer{
            text-align: left;
        }
        .dialog-shop-con{
            .input-title{
                width: 120px;
            }
            width: 100%;
            li{ margin-top: @gutter;}
            .dialog-setting-btn{
                width: 80%;
                text-align: center;
                .green-btn();

            }

        }



        .dialog-shop-btn-ok{
                  margin-left: 20px;
                font-size: 12px;
                line-height: 20px;
                 .diy-btn(#ffffff,@green,@green,30px,@padding: 5px 15px);
        }
        .dialog-shop-btn-cancel{
                margin-left: 20px;
                font-size: 12px;
                line-height: 20px;
                .diy-btn(@green,#ffffff,@green,30px,@padding: 5px 15px);
        }
        .dialog-shop-btn-testPrint{
                margin-left: 20px;
                font-size: 12px;
                line-height: 20px;
                .diy-btn(@green,#ffffff,@green,30px,@padding: 5px 15px);
        }

    }
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


    function setDiyColor(color,styles,id){

        var myStyle=document.getElementById(id);
        if(myStyle){
            document.getElementsByTagName('HEAD').item(0).removeChild(myStyle);
        }

        var newstyle=styles;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id=id;

        var newColor=color;
        style.innerHTML=newstyle.replace(/#6fc89c/g,newColor)
            .replace(/#6ec89b/g,newColor)
            .replace(/#6FC89C/g,darken(newColor,'30%'))
            .replace(/#4aba83/g,darken(newColor,'50%'))
            .replace(/#3a9769/g,darken(newColor,'70%'));
        console.log(style.innerHTML);

        document.getElementsByTagName('HEAD').item(0).appendChild(style);

    }

    export default {
        name:"ShopDialog",
        data() {
            return {
                dialogShow: true,
                shopName: {val: '', readonly: true},
                contactName: {val: '', readonly: true},
                contactPhone: {val: '', readonly: true},
                address: {val: '', readonly: true},
                memo: {val: '', readonly: true},
                edit: false,
                printer: {
                    hardsoft:{},
                    font:{},
                    size:{},
                    pageBottom:30,
                    copies:1,
                    qrcCodeContent:''
                },
                backScreen:false,
                noticeTips:true
            }
        },
        computed:{
            shopData () {
                return this.$store.state.shopData;
            },

        },
        created(){
//            $.get('./css/main.css',function(res){
//                setDiyColor('red',res,'myStyle')
//
//
//            })

            this.$store.dispatch("fetchShopData").then(res=>{
                            console.log(res);
                            this.shopName.val=res.shopSetting.shopName;
                            this.contactName.val=res.shopSetting.contactName;
                            this.contactPhone.val=res.shopSetting.contactTel;
                            this.address.val=res.shopSetting.shopAddress;
                            this.memo.val=res.shopSetting.memo;

                            if(this.shopData.printer){
                                this.printer=this.shopData.printer;

                            }
                            this.printer.qrCodeContent= res.shopSetting.qrCodeContent;

            }).catch(res=>{

                this.$alert(res.msg,{
                    type: 'error',
                })
            });

             this.setPrinter();

        },
        methods: {
            printPage(){


                if(isNaN(this.printer.hardsoft.value)){
                    alert("未连接打印机");
                    return false;
                }


               // var obj=document.getElementById('printDiv');
                var docStr = "<div id='test'>测试打印机链接,当你看到这段文字时 测试成功</div>";

                var styles=document.getElementById("styles").innerHTML;



                var stylestr = styles.replace(/{size}/g, this.printer.size.list[this.printer.size.value].label)
                                .replace(/{font}/g, this.printer.font.list[this.printer.font.value].label)


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

                //api 参考 http://blog.csdn.net/lybwwp/article/details/9320247
                var LODOP=getLodop();

                //LODOP.SET_PRINT_PAGESIZE(1,580,2100,"A3")
                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
                LODOP.SET_PRINTER_INDEX(this.printer.hardsoft.value);
                //1in = 2.54cm = 25.4mm = 72pt = 96px

                LODOP.SET_PRINT_STYLE("FontName","黑体");
                LODOP.SET_PRINT_COPIES(this.printer.copies);
                LODOP.SET_PRINT_MODE("POS_BASEON_PAPER",true);
                LODOP.SET_PRINT_PAGESIZE(3,'144pt',this.printer.pageBottom+'mm',"");
                var toMM=25.4/96*10;
               // 数字型，0--实线 1--破折线 2--点线 3--点划线 4--双点划线
                LODOP.ADD_PRINT_LINE(0, 0, 0,"RightMargin:0mm", 3,0);
                LODOP.ADD_PRINT_HTM('10mm',0,"RightMargin:0mm",30*toMM,docStr);
                LODOP.PRINT();
            },
            closeWin(){
                this.dialogShow=false;
                setTimeout(_=> {
                    this.$root.showShopDialog = false;
                },300);
            },
            setPrinter(){

                //获取打印机类型
                this.printer.hardsoft=CreatePrinterList();
                this.printer.font=CreateFontList();
                this.printer.size=CreateFontSize();

                if(this.shopData.printer){

                    this.printer=this.shopData.printer;
                }
               // console.log(this.printer.font);

            },
            //修改
            handleEdit(){
                this.edit=true;
                this.shopName.readonly=false;
                this.contactName.readonly=false;
                this.contactPhone.readonly=false;
                this.address.readonly=false;
                this.memo.readonly=false;
                document.querySelector('.shopname-input input').focus();

            },
            handlePrintSave(){

                var postData={
                    'shopName':this.shopName.val,
                    'contactName':this.contactName.val,
                    'contactTel':this.contactPhone.val,
                    'shopAddress':this.address.val,
                    'memo':this.memo.val,
                    'qrCodeContent':this.printer.qrCodeContent,
                }
                this.$store.dispatch("saveShopData",postData).then(res=>{
                    this.shopData.printer=this.printer;

                    this.$alert('修改成功',{
                        type: 'success',
                    }).then(_=>{

                    });
                })

            },
            //保存
            handleSave(){
                var testPhone=/^(1[345678][0-9]{1})[0-9]{8}$/;

                if(!testPhone.test(this.contactPhone.val)) {
                    this.$message({
                        message: '联系人手机号错误',
                        type: 'warning'
                    });
                    return;
                }


                this.shopName.readonly=true;
                this.contactName.readonly=true;
                this.contactPhone.readonly=true;
                this.address.readonly=true;
                this.memo.readonly=true;
                this.edit=false;

                var postData={
                    'shopName':this.shopName.val,
                    'contactName':this.contactName.val,
                    'contactTel':this.contactPhone.val,
                    'shopAddress':this.address.val,
                    'memo':this.memo.val
                }
                this.$store.dispatch("saveShopData",postData).then(res=>{
                    console.log(res);

                    this.$alert('修改成功',{
                        type: 'success',
                    })
                })
            },
            handleCancel(){
                this.edit=false;
               // this.dialogShow=false;
               // this.$root.showShopDialog=false;
            }

        }
    };
</script>
