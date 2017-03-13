<template>
    <div role="dialog" class="modal fade custom-layer" id="layer-custom">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">顾客</h4>
                    <a class="close" data-dismiss="modal">&times;</span></a>
                </div>
                <div class="modal-body">
                    <custom-search v-show="searchShow"></custom-search>
                    <custom-register v-show="registerShow"></custom-register>
                    <custom-info v-show="infoShow"></custom-info>
                </div>
            </div>
        </div>
    </div>
</template>
<style  rel=”stylesheet/less”  lang="less">
    @import "../../css/util/skin.less";

    @imgPath:"../../images";

    /*!custom modale*/
    .custom-layer {
        border-bottom:solid 3px #93d6b3;padding:10px 30px;
        .modal-header{
            border-bottom: solid 3px @green;
            .close{margin-top:-20px}
         }
        .modal-body {
            padding: 30px 30px;
        }

        .custom-table-header{width:100%;height:auto}
        .custom-table-body{height:auto;margin-top:10px;padding:20px 30px;border:1px dashed #999;border-radius:5px}
        .custom-table-body .normal{height:250px;background:url('@{imgPath}/awyp.jpg') 50% 50% no-repeat}
        .custom-table-foot{margin-top:10px}
        .custom-table-foot .btn-default{padding:5px 20px}
        .add-custom{width:72px;height:36px;display:inline-block;background:url('@{imgPath}/add_custom.png') no-repeat;cursor:pointer;border-radius:0}
        .cancel-custom,.select-ticket{width:72px;height:36px;cursor:pointer;text-align:center;border-radius:20px;display:inline-block}
        .cancel-custom{background:#999;color:#fff}
        .searchCustom button{border-top-left-radius:30px!important;border-bottom-left-radius:30px!important}
        .searchCustom input{border-top-right-radius:30px!important;border-bottom-right-radius:30px!important}

        .registration{
        .custom-sex{padding:10px 20px}
        .custom-sex .radio{position:relative;margin:0 20px;display:inline-block}
        .custom-sex .radio>input{position:absolute;top:0;left:0;opacity:0;margin-left:0}
        .custom-sex .radio>label{margin-left:0;padding-left:0;width:90px;height:90px}
        .man-radio.radio label{background:url('@{imgPath}/man.png') 50% 50% no-repeat}
        .women-radio.radio label{background:url('@{imgPath}/women.png') 50% 50% no-repeat}
        .man-radio.radio input:checked+label{background:url('@{imgPath}/man_check.png') 50% 50% no-repeat}
        .women-radio.radio input:checked+label{background:url('@{imgPath}/women_check.png') 50% 50% no-repeat}
        }
        .custom-member{
            .custom-name, .custom-phone{margin-top:10px;margin-bottom:10px}
            .custom-name .input-group-addon,.custom-layer .custom-phone .input-group-addon{background:0 0}
            color:#999;margin-top:-20px;
            .row{margin-top:20px}
            .sex-photo{width:70px;height:70px;display:block;float:left;border-radius: 50%; overflow: hidden;}
            .sex-photo.male{background:url('@{imgPath}/man_check.png') 50% 50% no-repeat;background-size:100%}
            .sex-photo.female{background:url('@{imgPath}/women_check.png') 50% 50% no-repeat;background-size:100%}

            .col-xs-12{padding-left:30px}
            .nickname{line-height:70px;font-size:1.5rem;display:block;float:left;}
            span{padding-left: 30px;}
        }
        .custom-ticket{
             height:auto;
             color:#333333;
            .custom-ticket-header{padding-bottom:20px;padding-left:60px}
            .custom-ticket-body{height:300px;overflow-x:hidden;}
            .custom-ticket-body ul{list-style:none;padding:0}
            .custom-ticket-body li{width:80%;height:90px;display:block;border:2px solid #e8e9f1;border-radius:5px;margin:10px auto 0;font-size:.8rem}
            .custom-ticket-body li:first-child{margin-top:0}
            .custom-ticket-body li .left{width:33%;height:100%;background:#e8e9f1;position:relative;float:left}
            .custom-ticket-body li .right{width:66%;height:100%;position:relative;float:left;background:#fff;padding:10px 20px}
            .custom-ticket-body li .left .m{position:absolute;font-size:2rem;left:20px;top:10px}
            .custom-ticket-body li .left .u{position:absolute;left:30px;top:60px}
            .custom-ticket-body li .left .m:before{content:"¥";font-size:1rem}
            .custom-ticket-body li .right span{margin-top:5px;display:block}
            .custom-ticket-body li .right em{font-style:normal}
        }
        .line{width:113%;background:@themeColor;height:1px;margin-top:15px;margin-bottom:15px;margin-left:-30px;position:relative}
        .line>span{font-size:2rem;display:block;position:absolute;left:20px;top:-5px}
        .custom-group{
            margin: 10px 0;
        }
    }
</style>

<script>

    import CustomSearch from 'components/CustomSearch.vue';
    import CustomRegister from 'components/CustomRegister.vue';
    import CustomInfo from 'components/CustomInfo.vue';
    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        data(){
            return {
                searchShow:true,
                registerShow:false,
                infoShow:false,
                username:''
            }
        },
        components:{
            CustomSearch,                               //顾客查找
            CustomRegister,                             //顾客注册
            CustomInfo,                                 //顾客信息
        },
        methods:{
            //to
            toCustom(){

                $('#example').modal('show')

            },
            //去登录
            tologin(){


            },
            //去注册
            toregister(customdata){
                 if (customdata){
                     this.$dispatch('register', customdata)
                 }
            },
            toRegisterView(){
                this.searchShow=false;
                this.registerShow=true;
                this.infoShow=false;
            },
            doSearch(){
                let vm = this;
                if(vm.username){
                    let apiobj = {
                        url : API_URLS.customers,
                        data:{username:vm.username}
                    };
                    request.fnGet(vm, apiobj, function (res) {
                        console.log(res);
                    })
                }else{
                    alert('请输入手机号码');
                }
            }
        }
    }
</script>


