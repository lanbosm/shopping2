<template>
    <div id="layer-cash-box" class="layer-cash">

        <div class="t text-center">
            备用金
        </div>
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
        <div class="f text-center">
            <a class="btn cash-ok" @click="addCash()">确认</a>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    /*!item modale*/
    .layer-cash {
        width: 400px;
        height: 300px;
        overflow: hidden;
        padding: @gutter;
        display: none;
        overflow: hidden;
        background: #f7f7f7;
        .t{
            line-height: 20px;
        }
        .c{
            height: 200px;
            padding: @gutter;
            color: @themeColor;
            .form-title{
                text-align: center;
                height: 60px;
            }
            p{font-size: 16px; line-height: 40px; }
            small{color: @thinColor; top:-20px; line-height: 20px; position:relative;
            }
            span{ margin-left:@gutter; font-size: 24px; line-height: 40px;}
            .btn-text{padding-right: 0px;
                position: relative;
                &:after{
                    content: '¥';
                    position: absolute;
                    left:@gutter*2;
                    top:@gutter;
                }
                .form-control{padding-left:@gutter*2; color: @themeColor; }
            }
            .btn{position: relative; display: inline-block;
                color: @themeColor;
                outline: none;
                width: 35px; height: 45px; text-align: center; font-size: 20px; line-height: 45px; padding: 0;
            }
        }
        .f{
            height: 80px;
            .cash-ok{
                position: relative; display: inline-block;
                .green-btn();
                padding-left: 60px;
                padding-right: 60px;

                &:hover,&:active{
                    padding-left: 60px;
                    padding-right: 60px;
                }
            }
        }

    }
    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

</style>




<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';
    import layer from 'layer';

    export default{
        name:"CashModal",
        computed: {
            shopData(){
                return this.$store.state.shopData;
            },
        },
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
        data(){
            return {
                password:"",
                spareCash:0
            }

        },
        created(){
            this.$store.dispatch('fetchLog',{"type":"all"}).then(res=>{

                this.$store.state.shopData.spareCash=   Number(res.appShiftInfo.endSpareCash);;

            })

        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{

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
                    layer.alert("请输入备用金",{icon:2});
                    return false;
                }
                if(!this.password){
                    layer.alert("请输入密码",{icon:2});
                    return false;
                }
                this.$store.dispatch("addSpareCash",{password:this.password,spareCash:this.spareCash}).then(res=>{

                    layer.alert("成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    this.password="";
                    this.spareCash=0;
                    var  needSpareCash=false;
                    if(res.spareCash<=0){
                        needSpareCash=true;
                    }

                    this.$store.commit('setShopData',{'spareCash':Number(res.spareCash),'needSpareCash':needSpareCash});

                    util.pushLocal('shopData',this.shopData);



                }).catch(res=>{
                    var msg=res.errmsg||res.msg;
                    layer.alert(msg,{icon:2 ,closeBtn :false,yes:function(index){ layer.closeAll();}});


                })

            }
        }
    }
</script>
