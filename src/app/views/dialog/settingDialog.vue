<template>
    <el-dialog
            title="系统应用"
            :visible.sync="showSettingDialog"
            size="tiny"
            top="30%"
            custom-class="dialog-setting"
            :close-on-click-modal=false
            :modal=false
            @close="closeWin();"
            >
                <div class="dialog-setting-con">
                   <ul class="row">
                       <li class="col-xs-6"><a class="dialog-setting-btn" @click="customSetting">会员</a></li>
                       <li class="col-xs-6"><a class="dialog-setting-btn" @click="shopSetting">系统设置</a></li>
                       <li class="col-xs-6"><a class="dialog-setting-btn" @click="orderSetting">网络订单</a></li>
                       <li class="col-xs-6"><a class="dialog-setting-btn" @click="adSetting">广告管理</a></li>

                   </ul>
                </div>

    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-setting{
        background:@green;
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @green;
        }
        .dialog-setting-con{
            width: 100%;
            padding-left: @gutter;
            padding-right: @gutter;
            li{ margin-top: @gutter*2;}
            .dialog-setting-btn{
                width: 80%;
                text-align: center;
                display: block;
                margin: 0 auto;
                .green-btn()
            }
        }

    }
</style>
<script>
    export default {
        name:"SettingDialog",
        props:["showSettingDialog"],
        data() {
            return {

            };
        },
        methods: {
            closeWin(){
                this.$root.showSettingDialog=false;
            },
            //会员设置
            customSetting(){
                this.$root.showCustomDialog=true;
            },
            //门店设置
            shopSetting(){
                alert(2)
            },
            //订单设置
            orderSetting(){
                alert(3)
            },
            //广告管理
            adSetting(){
                this.$root.showSettingDialog=false;
                this.$router.push('/ad');
            },
        }
    };
</script>
