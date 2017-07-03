<template>
    <el-dialog
            title="备用金"
            :visible.sync="dialogShow"
            top="20%"
            custom-class="dialog-cash"
            :close-on-click-modal=false
            :modal=true
            @close="closeWin();"
            >
                <div class="dialog-cash-con">
                    <div class="c form-horizontal">
                        <div class="col-xs-12 form-title">
                            <p>当前备用金 <span>{{shopData.spareCash }}</span></p>
                            <small>注意：备用金为0时无法现金支付找零</small>
                        </div>
                        <div class="form-group ">
                            <div class="col-xs-9 btn-text">
                                <input type="tel" class="form-control text-right input-lg"  autocomplete="off" v-model="spareCash" >
                            </div>
                            <div class="col-xs-3 btn-group">
                                <input class="btn btn-default btn-lg" type="button" value="+" @click="add(100)" >
                                <input class="btn btn-default btn-lg" type="button" value="-" @click="minus(100)">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input type="password" class="form-control input-lg" v-model="password" placeholder="请输入店长密码" autocomplete="off"  @keyup.enter="addCash()" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer" slot="footer">
                    <a class="btn cash-ok" @click="addCash()">确认</a>
                </div>
    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-cash{
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
        .dialog-cash-con{
            width: 100%;
            input{
                font-size: 16px !important;
                &:focus{
                    border-color: @themeColor;

                }
            }
            .c{
                height: 200px;
                padding: @gutter;
                color: @themeColor;
                .form-title{
                    text-align: center;
                    height: 60px;
                }
                p{font-size: 16px; line-height:30px; }
                small{color: @thinColor; top:-20px; line-height: 20px; position:relative;
                }
                span{ margin-left:@gutter; font-size: 16px; line-height: 30px;}
                .btn-text{padding-right: 0px;
                    position: relative;
                    &:after{
                        content: '¥';
                        position: absolute;
                        left:@gutter*2;
                        top:@gutter;
                        font-size: 16px;
                    }
                    .form-control{padding-left:@gutter*2; color: @themeColor; }
                }
                .btn{position: relative; display: inline-block;
                    color: @themeColor;
                    outline: none;
                    width: 50%; height: 45px; text-align: center; font-size: 20px; line-height: 45px; padding: 0;
                }
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
        data() {
            return {
                dialogShow: true,
                password:"",
                spareCash:0
            };
        },

        computed: {
            shopData(){
                return this.$store.state.shopData;
            },
        },
        created(){
            this.$store.dispatch('fetchLog',{"type":"all"}).then(res=>{
                this.spareCash= this.$store.state.shopData.spareCash;
            })
        },
        methods:{
            closeWin(){
                this.dialogShow=false;
                setTimeout(_=> {
                    this.$root.showCashDialog = false;
                },300);
            },
            add(val){
                var tmp=  Number(this.spareCash);
                tmp+=Number(val)
                this.spareCash=tmp;
            },
            minus(val){
                var tmp= Number(this.spareCash);
                tmp-=Number(val);
                if(tmp<0){tmp=0;}
                this.spareCash=tmp;
            },
            addCash(){
                if(this.spareCash==0){
                    this.$message.error('请输入备用金');
                    return false;
                }
                if(isNaN(this.spareCash)){
                    this.$message.error('备用金只能为整数');
                    return false;
                }
                if(!this.password){
                    this.$message.error('请输入密码');
                    return false;
                }
                this.$store.dispatch("addSpareCash",{password:this.password,spareCash:this.spareCash}).then(res=>{

                    this.password="";
                    this.spareCash=res.spareCash;

                   //

                    this.$alert('操作成功',{
                        type: 'success',
                    }).then(_=>{
                         this.dialogShow=false;
                         this.$root.showCashDialog=false;
                    });

                }).catch(res=>{
                    console.log(res);
                    var msg=res.errmsg||res.msg;
                    this.$alert(msg,'操作失败',{
                        type: 'error',
                    }).then(_=>{
//                        this.dialogShow=false;
//                        this.$root.showCashDialog=false;
                    });



                })

            }
        }
    };
</script>
