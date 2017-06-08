<template>
    <el-dialog
            title="门店设置"
            :visible.sync="dialogShow"
            top="20%"
            custom-class="dialog-shop"
            :close-on-click-modal=false
            :modal=true
            @close="closeWin();"
            >
                <div class="dialog-shop-con">
                   <ul class="row">
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
                           <label class="input-title" >地址</label>
                           <el-input v-model="address.val" type="textarea" :rows="2" :readonly="address.readonly" placeholder="地址"></el-input>
                       </li>
                   </ul>
                </div>
          <div slot="footer" class="dialog-footer">
               <a class="dialog-shop-btn-ok" v-show="!edit" @click="handleEdit()">修改</a>
               <a class="dialog-shop-btn-ok" v-show="edit" @click="handleSave()" >确定</a>
               <a class="dialog-shop-btn-cancel" @click="handleCancel()">取消</a>
          </div>

    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-shop{
        .dialog();
        width: 40% !important;
        input:focus{
            border-color: @themeColor;
        }
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @themeColor;
        }
        .el-dialog__body{
            padding: @gutter 20px;
        }
        .el-dialog__footer{
            text-align: left;
        }
        .dialog-shop-con{
            width: 100%;
            li{ margin-top: @gutter;}
            .dialog-setting-btn{
                width: 80%;
                text-align: center;
                .green-btn();

            }
        }
        .dialog-footer{

            .dialog-shop-btn-ok{
               .diy-btn(#ffffff,@themeColor);
            }
            .dialog-shop-btn-cancel{
                margin-left: 20px;
                .diy-btn(#666666,#ffffff);
            }
        }

    }
</style>
<script>
    export default {
        name:"ShopDialog",
        data() {
            return {
                dialogShow: true,
                shopName:{val:'',readonly:true},
                contactName:{val:'',readonly:true},
                contactPhone:{val:'',readonly:true},
                address:{val:'',readonly:true},
                edit:false
            };
        },
        created(){
            this.$store.dispatch("fetchShopData").then(res=>{
                console.log(res);
                            this.shopName.val=res.shopSetting.shopName;
                            this.contactName.val=res.shopSetting.contactName;
                            this.contactPhone.val=res.shopSetting.contactTel;
                            this.address.val=res.shopSetting.shopAddress;


            }).catch(res=>{
                this.$alert('获取失败',{
                    type: 'error',
                })
            })

        },
        methods: {
            closeWin(){
                this.dialogShow=false;
                setTimeout(_=> {
                    this.$root.showShopDialog = false;
                },300);
            },

            //修改
            handleEdit(){
                this.edit=true;
                this.shopName.readonly=false;
                this.contactName.readonly=false;
                this.contactPhone.readonly=false;
                this.address.readonly=false;
                document.querySelector('.shopname-input input').focus();

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
                this.edit=false;

                var postData={
                    'shopName':this.shopName.val,
                    'contactName':this.contactName.val,
                    'contactTel':this.contactPhone.val,
                    'shopAddress':this.address.val,
                }
                this.$store.dispatch("saveShopData",postData).then(res=>{
                    console.log(res);

                    this.$alert('修改成功',{
                        type: 'success',
                    }).then(_=>{
                        this.dialogShow=false;
                        this.$root.showShopDialog=false;
                    });
                })
            },
            handleCancel(){
                this.edit=false;
                this.dialogShow=false;
                this.$root.showShopDialog=false;
            }

        }
    };
</script>
