<!-- register-->
<template>
    <div class="custom-register">
        <div class="custom-table-body">
             <!--registration -->
             <div class="registration">
                    <div class="row">
                        <div class="col-xs-8 col-xs-offset-2">
                            <div class="custom-sex clearfix text-center">
                                <div class="man-radio radio">
                                    <input type="radio"  name="sex" value="male" id="custom-man" v-model="newCustom.sex"  />
                                    <label for="custom-man"></label>
                                </div>
                                <div class="women-radio radio">
                                    <input type="radio" name="sex" id="custom-women" value="female" v-model="newCustom.sex">
                                    <label for="custom-women"></label>
                                </div>
                            </div>
                            <div class="input-group custom-name custom-group">
                                <span class="input-group-addon "><i class="iconfont icon-guanliyuan"></i></span>
                                <input type="text" class="form-control" placeholder="姓名" id="name" v-model="newCustom.name"  >
                            </div>
                            <div class="input-group custom-phone custom-group">
                                <span class="input-group-addon"><i  class="iconfont icon-mobilefill"></i></span>
                                <input type="num" class="form-control" placeholder="手机号" maxlength="11" id="phone" v-model="newCustom.phone" @keyup.enter="doRegister" >
                            </div>
                            <a class="btn btn-lightgreen btn-block" @click="doRegister">保存</a>
                        </div>
                    </div>
             </div>
        </div>
    </div>
</template>
<style>

</style>

<script>

    import {request, API_URLS} from 'util/request.js';
    import layer from 'layer';
    import $ from  'jquery';

    export default{
        name:"CustomRegister",
        data(){
            return {
                searchName:"",
                newCustom:{
                    'phone':'',
                    'name':'',
                    'sex':''
                }
            }
        },
        created(){

        },
        methods:{
            //去注册
            doRegister(){
                let vm = this;
                if(!this.newCustom.name){
                    layer.tips('姓名不能为空', '#name');
                    return;
                }
                if(!this.newCustom.phone){
                    layer.tips('手机号码不能为空', '#phone');
                    return;
                }
                if(!this.newCustom.sex){
                    layer.msg("请选择性别");
                    return;
                }
                if(!/\d{11}/.test(this.newCustom.phone)){
                    layer.tips('手机号码不正确', '#phone');
                    return;
                }
                let apiObj = {
                    url:API_URLS.customers,
                    data:this.newCustom
                };
                request.fnPost(this,apiObj,function(res){
                    layer.msg("保存成功");
                    // 存储到vuex
                    vm.$store.commit('setCustomData', res.appMember );
                    if(vm.$store.state.currentPage.mode=="order") {
                        vm.$store.dispatch('fetchOrder');
                    }
                    //关闭弹窗
                    $('#layer-custom').modal('hide');
                }, function (err) {
                    layer.msg(err.msg);
                });
            }
        }
    }
</script>


