<template>
    <div role="dialog" class="modal fade custom-layer" id="custom-layer">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">顾客</h4>
                    <a class="close" data-dismiss="modal">&times;</span></a>
                </div>
                <div class="modal-body">
                    <div class="custom-table-header">
                        <div class="row">
                            <div class="col-xs-5 col-xs-offset-3">
                                <div class="input-group searchCustom">
										       					<span class="input-group-btn">
														        <button class="btn btn-default" ><span class="glyphicon glyphicon-search" @click="searchItem.text=searchItem.input;"></span></button>
														        </span>
                                    <input type="text" class="form-control" v-model="searchCustom.input" v-on:keyup.enter="searchCustom.text=searchCustom.input;" placeholder="搜索顾客">
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <a class="btn add-custom" v-show="customModal.status=='normal'|| customModal.status=='info'" @click="customModal.status='register';"></a>
                                <a class="btn cancel-custom" v-show="customModal.status=='register'" @click="customModal.status=customModal.history">取消</a>
                                <a class="btn select-ticket btn-lightgreen" v-show="customModal.status=='info'" @click="">选择</a>
                            </div>
                        </div>
                    </div>
                    <div class="custom-table-body">
                        <!-- normal -->
                        <template v-if="customModal.status=='normal'">
                            <div class="normal">
                                <p class="text-center bg-success" v-show="customModal.code==301" >搜索中...</p>
                                <p class="text-center bg-success" v-show="customModal.code==404" >没有找到此会员</p>
                            </div>
                        </template>
                        <!-- registration -->
                        <template v-if="customModal.status=='register'">
                            <div class="registration">
                                <div class="row">
                                    <div class="col-xs-8 col-xs-offset-2">
                                        <div class="custom-sex clearfix text-center">
                                            <div class="man-radio radio">
                                                <input type="radio"  name="sex" value="男" id="custom-man" checked="checked" v-model="customData.newCustom.sex"/>
                                                <label for="custom-man"></label>
                                            </div>
                                            <div class="women-radio radio">
                                                <input type="radio" name="sex" id="custom-women" v-model="customData.newCustom.sex" value="女">
                                                <label for="custom-women"></label>
                                            </div>
                                        </div>
                                        <div class="input-group custom-name custom-group">
                                            <span class="input-group-addon "><i class="iconfont icon-peoplefill"></i></span>
                                            <input type="text" class="form-control" placeholder="姓名"  v-model="customData.newCustom.name">
                                        </div>
                                        <div class="input-group custom-phone custom-group">
                                            <span class="input-group-addon"><i class="iconfont icon-mobilefill"></i></span>
                                            <input type="num" class="form-control" placeholder="手机号" maxlength="13" v-model="customData.newCustom.phone">
                                        </div>
                                        <a class="btn btn-lightgreen btn-block" @click="save(customData)">保存</a>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- custominfo -->
                        <template v-if="customModal.status=='info'">
                            <div class="info" >
                                <div class="custom-info">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 clearfix">
                                            <em class="sex-photo {{customData.curCustom.sex | sex}} "></em><span class="nickname">{{customData.curCustom.name}}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6">手机号<span>{{customData.curCustom.phone}}</span></div>
                                        <div class="col-xs-12 col-sm-6">积分<span>{{customData.curCustom.points}}</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6">余额 <span>{{customData.curCustom.monney}}</span></div>
                                    </div>
                                </div>
                                <div class="line"><span class="primary glyphicon glyphicon-tag">
								       					</span></div>
                                <div class="custom-ticket">
                                    <div class="custom-ticket-header">优惠券</div>
                                    <div class="custom-ticket-body">
                                        <ul>
                                            <li v-for="(index,custom) in customData.curCustom.tickets">
                                                <div class="left">
                                                    <span class="m">{{custom.price}}</span>
                                                    <span class="u">{{custom.condition}}</span>
                                                </div>
                                                <div class="right">
                                                    <span style="color: #cccccc">有效期
                                                        <em class="primary">{{custom.expired}}</em>
                                                    </span>
                                                    <span class="l2">{{custom.category}}</span>
                                                    <span class="l3 primary">抵用券</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<style scoped rel=”stylesheet/less”  lang="less">
    @import "../../css/util/skin.less";

    @imgPath:"../../images";

    /*!custom modale*/
    .custom-layer {
        border-bottom:solid 3px #93d6b3;padding:10px 30px;
        .modal-header{
        .close{margin-top:-20px}
    }
    .modal-body {
        padding: 30px 30px;
    }

    .custom-table-header{width:100%;height:auto}
    .custom-table-body{height:auto;margin-top:10px;padding:20px 30px;border:1px dashed #ccc;border-radius:5px}
    .custom-table-body .normal{height:250px;background:url('@{imgPath}/awyp.jpg') 50% 50% no-repeat}
    .custom-table-foot{margin-top:10px}
    .custom-table-foot .btn-default{padding:5px 20px}
    .add-custom{width:72px;height:36px;display:inline-block;background:url('@{imgPath}/add_custom.png') no-repeat;cursor:pointer;border-radius:0}
    .cancel-custom,.select-ticket{width:72px;height:36px;cursor:pointer;text-align:center;border-radius:20px;display:inline-block}
    .cancel-custom{background:#ccc;color:#fff}
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
    .custom-info{
    .custom-name, .custom-phone{margin-top:10px;margin-bottom:10px}
    .custom-name .input-group-addon,.custom-layer .custom-phone .input-group-addon{background:0 0}
    color:#ccc;margin-top:-20px;
    .row{margin-top:20px}
    .sex-photo{width:70px;height:70px;display:block;float:left}
    .sex-photo.man{background:url('@{imgPath}/man_check.png') 50% 50% no-repeat;background-size:100%}
    .sex-photo.women{background:url('@{imgPath}/women_check.png') 50% 50% no-repeat;background-size:100%}
    span{color:#000;margin-left:30px}
    .col-xs-12{padding-left:30px}
    .nickname{line-height:70px;font-size:1.5rem;display:block;float:left}
    }
    .custom-ticket{
        height:auto;
    .custom-ticket-header{padding-bottom:20px}
    .custom-ticket-body{height:300px;overflow-x:hidden}
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
    .line{width:113%;background:@themeColor;height:1px;margin-top:15px;margin-bottom:15px;margin-left:-30px;position:relative}
    .line>span{font-size:2rem;display:block;position:absolute;left:20px;top:-5px}
    }
    .custom-group{
        margin: 10px 0;
    }
    }
</style>

<script>


    export default{
        data(){
            return {
                msg:''
            }
        },
        props: {                                       //定义参数类型
             customModal: {                             //会员弹层
                 type: Object
             },
             customData: {
                 type: Object
             }
        },
        methods:{
            save(customdata){
                 if (customdata){
                     this.$dispatch('register', customdata)
                 }
            }
        }
    }
</script>


