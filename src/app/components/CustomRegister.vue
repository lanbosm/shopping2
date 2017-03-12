<!-- register-->
<template>
    <div class="custom-register">
        <div class="custom-table-header">
            <div class="row">
                <div class="col-xs-5 col-xs-offset-3">
                    <div class="input-group searchCustom">
                        <!--@click="searchItem.text=searchItem.input;"-->
                        <span class="input-group-btn" @click="searchCustom"><button class="btn btn-default" ><span class="glyphicon glyphicon-search" ></span></button>
                                    </span>
                        <!--v-model="searchCustom.input" v-on:keyup.enter="searchCustom.text=searchCustom.input;"-->
                        <input type="text" class="form-control" placeholder="搜索顾客" v-model="searchName"  @keyup.enter="searchCustom()">
                    </div>
                </div>
                <div class="col-xs-4">
                    <a class="btn cancel-custom"  @click="toCancel">取消</a>
                    <!--<a class="btn select-ticket btn-lightgreen" v-show="customModal.status=='info'" @click="">选择</a>-->
                </div>
            </div>
        </div>
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
                                            <input type="radio" name="sex" id="custom-women"  value="female" v-model="newCustom.sex">
                                            <label for="custom-women"></label>
                                        </div>
                                    </div>
                                    <div class="input-group custom-name custom-group">
                                        <span class="input-group-addon "><i class="iconfont icon-guanliyuan"></i></span>
                                        <input type="text" class="form-control" placeholder="姓名" v-model="newCustom.name"  >
                                    </div>
                                    <div class="input-group custom-phone custom-group">
                                        <span class="input-group-addon"><i  class="iconfont icon-mobilefill"></i></span>
                                        <input type="num" class="form-control" placeholder="手机号" maxlength="11" v-model="newCustom.phone" >
                                    </div>
                                    <a class="btn btn-lightgreen btn-block" @click="toSub">保存</a>
                                </div>
                            </div>
             </div>
        </div>
    </div>
</template>
<style>

</style>

<script>

    import {request, API_URLS, HOST} from 'util/request.js';



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
            toCancel(){
               this.$parent.searchShow=true;
               this.$parent.registerShow=false;
               this.$parent.infoShow=false;
            },
            searchCustom(){

                if(this.searchName!=''){

                    var apiObj={
                        url:API_URLS.customers,
                        data:{'username':this.searchName}
                    }
//                    request.fnPost(this,apiObj,function(){
//                        alert(2222);
//                    })

                    var sss={
                        "appMember":{
                            "id":6282,
                            "headPortrait":"http://wx.qlogo.cn/mmopen/0nn3FBrD9a3NichacG5w0ic23TUfNCuOHP7IuSN0uSrfwNnZxlcFwJTVFaicr070Id03Ne8bzlCz04IstCQN07cgKXZ76GGb9tM/0",
                            "username":"15616268045",
                            "nickname":"aoop",
                            "sex":'male',
                            "point":0,
                            "balance":0,
                            "appCoupons":[
                            ]
                        },
                        "code":20000,
                        "msg":"响应成功"
                    }

                    this.$parent.searchShow=false;
                    this.$parent.registerShow=false;
                    this.$parent.infoShow=true;

                }

            },
            //to
            toCustom(){

                $('#example').modal('show')

            },
            //去注册
            toSub(){
                if(!this.newCustom.name){
                    alert("用户名不能为空");
                    return
                }
                if(!this.newCustom.phone){
                    alert("手机不能为空");
                    return
                }
                if(!this.newCustom.sex){
                    alert("请选择性别");
                    return
                }
                if(this.newCustom.phone.length!=11){
                    alert("手机号码不正确");
                    return
                }




//                request.fnPost(this,apiObj,function(){
//                    console.log("sss");
//                });
                //alert("提交");
            }
        }
    }
</script>


