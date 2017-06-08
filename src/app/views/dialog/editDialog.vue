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
                        <el-input type="tel" v-model="discountPrice"  class="editPrice-input" placeholder="请输入价格"></el-input>
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
                discountPrice:""
            };
        },

        computed: {
            cartData(){
                return this.$store.state.currentPage.cartData;
            }
        },
        created(){
            console.log(this.editItem);
        },
        methods:{
            closeWin(){
                this.dialogShow=false;
      
                //如果价格还是空的
                //没有动过 //动过但和原价一样
                if(!this.$parent.editItem.discountPrice || Number(this.$parent.editItem.discountPrice)==Number(this.$parent.editItem.amount)*Number(this.$parent.editItem.price)){
                    this.$parent.editItem.isDiscount=false;
                }


                setTimeout(_=> {
                    this.$parent.showEditDialog = false;
                },300);
            },

            checkPrice(){

                if(isNaN(this.discountPrice)){
                    this.$message.error('价格只能为数字');
                    return false;
                }


                if(Number(this.discountPrice)<=0){
                    this.$message.error('价格必须大于0');
                    return false;
                }
                //最好还是根据索引 和数组来玩。 这里不严谨
                var item=this.$parent.editItem;


                this.$set(item,'discountPrice',this.discountPrice);

                this.$alert('操作成功',{
                    type: 'success',
                }).then(_=>{
                    this.closeWin();
                });

            }
        }
    };
</script>
