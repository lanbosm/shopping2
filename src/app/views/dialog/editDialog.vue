<template>
    <el-dialog
            title="修改现价"
            :visible.sync="dialogShow"
            top="30%"
            custom-class="dialog-edit"
            :close-on-click-modal=false
            :modal=false
            @close="closeWin();"
            >
                <div class="dialog-edit-con">
                    <div class="item-info">
                        <p><span>{{editItem.name}}</span> <span>{{editItem.selectDate}}</span></p>
                        <p><span v-if="editItem.appGiftItem">赠送：{{editItem.appGiftItem.name}}</span></p>
                        <p><span >数量 :{{editItem.amount}} * 单价 {{editItem.price  }}</span><span style="float: right">现价：{{editItem.amount*editItem.price | currency }}</span></p>
                    </div>
                    <div class="item-edit">
                        <el-input type="tel" v-model="editPrice"  class="editPrice-input" placeholder="请输入价格"></el-input>
                    </div>
                </div>
                <div class="dialog-footer" slot="footer">
                    <a class="btn cash-ok" @click="checkPrice()">确认</a>
                </div>
    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-edit{
        .dialog();
         width: 35% !important;
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @green;
        }
        .el-dialog__body{
            padding: @gutter 40px;
        }
        .el-dialog__footer{
            text-align: center;
        }
        .dialog-edit-con{
            width: 100%;
            input{
                font-size: 16px !important;
                text-align: center;
                &:focus{
                    border-color: @themeColor;

                }
            }
            .item-edit{
                width: 60%; margin: 0 auto;
            }

        }

        .dialog-footer{
            text-align: center;
            .cash-ok{
                position: relative; display: inline-block;
                .green-btn(@padding:10px 60px);
            }


        }

    }
</style>
<script>
    export default {
        name:"CashDialog",
        props:['editItem'],
        data() {
            return {
                dialogShow: true,
                editPrice:""
            };
        },

        computed: {
//            shopData(){
//                return this.$store.state.shopData;
//            }
        },
        created(){
            console.log(this.editItem);
        },
        methods:{
            closeWin(){
                this.dialogShow=false;
                this.$parent.editItem.editPrice=false;
                setTimeout(_=> {
                    this.$parent.showEditDialog = false;
                },300);
            },

            checkPrice(){
                if(this.editPrice==0){
                    this.$message.error('请输入价格');
                    return false;
                }
                if(isNaN(this.editPrice)){
                    this.$message.error('价格只能为整数');
                    return false;
                }

                this.$alert('操作成功',{
                    type: 'success',
                }).then(_=>{
                    this.closeWin();
                });
//                this.$store.dispatch("addSpareCash",{password:this.password,spareCash:this.spareCash}).then(res=>{
//
//                    this.password="";
//                    this.spareCash=0;
//                    var  needSpareCash=false;
//                    if(res.spareCash<=0){
//                        needSpareCash=true;
//                    }
//                    this.$store.commit('setShopData',{'spareCash':Number(res.spareCash),'needSpareCash':needSpareCash});
//                    util.pushLocal('shopData',this.shopData);
//
//                    this.$alert('操作成功',{
//                        type: 'success',
//                    }).then(_=>{
//                        this.dialogShow=false;
//                        this.$root.showCashDialog=false;
//                    });
//
//                }).catch(res=>{
//                    var msg=res.errmsg||res.msg;
//                    this.$alert(msg,'操作失败',{
//                        type: 'error',
//                    }).then(_=>{
//                        this.dialogShow=false;
//                        this.$root.showCashDialog=false;
//                    });
//
//
//
//                })

            }
        }
    };
</script>
