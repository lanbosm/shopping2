<template>
    <div class="login">
        <div class="container" >
            <div class="row">
                <div class="right-con col-xs-6 col-xs-offset-6">
                    <div class="register-box pr">
                        <div class="register-row1 pr" >
                            <a class="logo"></a>
                            <span class="weclome">
                                            <h1 >欢迎来到 阿喔优品</h1>
                                            <small >阿喔优品 专业核销平台</small>
                                        </span>
                        </div>
                        <div class="register-row2 pr">
                            <h3>欢迎回来</h3>
                        </div>
                        <div class="register-row3 pr">
                            <div class="register-row3-input">
                                <label for="username" class="username"></label>
                                <input   type="text" name="username" id="username" v-model="username" placeholder="请输入账号" />
                            </div>
                            <div class="register-row3-input">
                                <label for="password" class="password"></label>
                                <input type="password" name="username" id="password"  v-model="password" v-on:keyup.enter="toLogin()" placeholder="请输入密码"/>
                            </div>
                        </div>
                        <div class="register-row4 pr">
                            <a class="btn login" @click="toLogin()">登录</a>
                            <p>如登录出现异常，请清理浏览器缓存后再尝试。</p>
                        </div>
                        <div class="register-row5 pr">
                            <p>Powered by ©2012-2016 aouyoupin.cn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
<script>


    import Vue from 'vue'
    import layer from 'layer';
    import {request, API_URLS} from 'util/request.js';
    import util from 'util/util.js';
    import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js';




    //设置cookie,增加到vue实例方便全局调用
    //vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
    //当然，如果session保存到vuex的话除外
    Vue.prototype.setCookie = (c_name, value, expiredays) => {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

    //获取cookie
    Vue.prototype.getCookie = (name) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }

    Vue.prototype.fullScreen =()=> {
        var el = document.documentElement;

        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
//            var wscript = new ActiveXObject("WScript.Shell");
//            if (wscript != null) {
//                wscript.SendKeys("{F11}");
//            }
        }
    }


    Vue.prototype.exitFullScreen =()=> {
        var el = document;
        var efs = el.exitFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.msExitFullScreen;
        if (typeof efs != "undefined" && efs) {
            efs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
//            var wscript = new ActiveXObject("WScript.Shell");
//            if (wscript != null) {
//                wscript.SendKeys("{F11}");
//            }
        }
    }


    export default{
        name:"Login",
        data(){
            return {
                logining: false,
                username: '',
                password: '',
                lastUserName: ""
            }
        },
        created(){

            this.lastUserName=  this.getCookie("username") ;
            this.username=this.lastUserName;

        },
        watch: {
            'username': function (val) {
                if(this.logining){return;}
                if(val){
                    //实时action
                }
                else{
                    //layer.tips('请输入用户名', '#username');
                }
            },
            'password': function (val) {
                if(val){
                    //实时action
                }
                else{
                    //layer.tips('请输入密码', '#password');
                }
            }
        },
        methods: {
            toLogin:function(){


                this.fullScreen();

                let vm=this;
                let apiobj={
                    url:API_URLS.public_key,
                };

                if(vm.logining){return false;}
                if(!vm.username){ layer.tips('请输入用户名', '#username'); return false;}
                if(!vm.password){ layer.tips('请输入密码', '#password'); return false;}

                vm.logining=true;

                request.fnGet(apiobj).then(res=>{

                    let publicKey=res.data;
                    let rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                    let enPwd = hex2b64(rsaKey.encrypt(vm.password));
                    //vm.password = enPwd
                    vm.doLogin(publicKey, vm.username, enPwd);

                })
            },
            doLogin:function(publicKey, username, enPwd) {
                if(publicKey && enPwd){
                    let vm = this;
                    let cid=localStorage.getItem("currentShiftId");
                    let apiobj = {
                        url: API_URLS.login,
                        data: {
                            currentShiftId:cid,
                            username: username,
                            enPasswd: enPwd,
                            tmpKey: publicKey.tmpKey
                        }
                    };

                    let loading = layer.load(2, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });

                    request.fnPost(vm, apiobj, function (res) {
                        layer.close(loading);
                        window.localStorage.setItem("accessToken",res.accessToken);
                        util.pushLocal('shopData',res);
                        if(vm.lastUserName!=vm.username){
                            util.pushLocal("lastData", []);
                        }
                        vm.setCookie("username",username,7);
                        vm.$store.state.login=res.accessToken;
                        vm.logining=false;
                        vm.$router.replace('/');


                    }, function (res) {
                        layer.close(loading);
                        layer.msg(res.msg, {icon: 2});
                        vm.password="";
                        vm.logining=false;
                    })

                }else{
                    alert('服务器链接失败');
                }
            }
        }
    }
</script>

