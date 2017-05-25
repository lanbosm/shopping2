<template>
    <div id="layer-again-box" class="layer-again">
        <div class="t text-center">
            输入密码与验证码
        </div>

        <div class="validation">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-block">
                <input type="text" v-model="verifCode">
            </div>
            <div class="send-msg" @click="send_msg()" id="send-msg">发送验证码</div>
        </div>
        <div class="password">
            <label class="layui-form-label">输入密码</label>
            <div class="layui-input-block">
                <input type="password" v-model="password">
            </div>
        </div>
        <div class="submit_pas">
            <p class="submit-ok" @click="submit_msg()">确认</p>
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    /*!item modale*/
    .layer-again {
        display: none;
        width: 370px;
        height: 200px;
        overflow: hidden;
        padding: @gutter;
        overflow: hidden;
        background: #f7f7f7;
    }
    .t{font-size: 15px;}
    .validation,.password{margin-top: 15px;overflow: hidden;font-size: 15px;line-height: 40px;height: 40px;}
    .validation label ,.password label{float: left;width: 85px;}
    .validation .layui-input-block,.password .layui-input-block{float: left}
    .validation .layui-input-block input,.password .layui-input-block input{width: 150px;border: 1px solid #ccc; box-sizing: border-box; height: 38px; margin-left: 10px;text-align: center;}
    .submit_pas{width: 100px;height: 40px;border-radius: 5px;line-height: 40px;margin: 0 auto;text-align: center;margin-top: 10px;background-color: #6ec89b ;color: #fff;font-size: 16px;cursor: pointer}
    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    .send-msg{float: left;background:#6ec89b;border-radius: 5px;margin-left: 10px;font-size: 15px;color: #fff;text-align: center;width: 90px;}
    .send-msg:hover{
        color: #ffffff;
        background: #6ec89b;
    }
    .send-msg:active{
        color: #fff;
        background-color:#397252 ;
    }
    .dis{
        pointer-events: none;
    }
</style>
<script>
    import layer from 'layer';
    import $ from 'jquery';
    import {request, API_URLS, HOST} from 'util/request.js';
    export default{
        name:'AgainPass',
        data(){
            return {
                password:'',
                verifCode:''
            }
        },
        methods:{
            send_msg(){
                var vm=this;
                var codeLock = false;
                var  sendMsg=document.getElementById("send-msg");
                var username=vm.$store.state.currentPage.customData.username;
                sendCode();
                //倒计时
                function codeRemain() {
                    var cd = 60;
                    var unlock = function () {
                        cd--;
                        document.getElementById("send-msg").className = "send-msg dis";
                        document.getElementById("send-msg").innerHTML = "发送中 (" + cd + ")";
                        setTimeout(function () {
                            if (cd > 0) {
                                unlock();
                            } else {
                                document.getElementById("send-msg").className = "send-msg";
                                document.getElementById("send-msg").innerHTML = "获取验证码";
                                codeLock = false;
                            }

                        }, 1000)
                    };
                    unlock();
                };
                //发送验证码
                function sendCode(){
                    if (codeLock) {
                        return false;
                    }
                    codeLock = true;
                    var apiObj = {
                        url:API_URLS.send,
                        data:{
                            "phone":username,
                            "codeType": "forgetpassword"

                        }

                    };
                    console.log(apiObj.data);
                    request.fnPost2(apiObj).then(res=>{
                        if(res.code==20000){
                            codeRemain();
                        }
                    })
                }
            },
            submit_msg(){
                var vm=this;
                if(!vm.verifCode){
                    layer.msg('请输入验证码',{
                        time:1000
                    });
                    return false
                }
                if(!vm.password){
                    layer.msg('请输入密码',{
                        time:1000
                    });
                    return false;
                }
                alert(vm.$store.state.currentPage.customData.username);
                //这里后台接口有误
                this.$store.dispatch("reset",{phone:vm.$store.state.currentPage.customData.username,enPassword:vm.password,verifCode:vm.verifCode}).then(res=>{
                    layer.alert("成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                })
            },
        }
    }
</script>

