
import Vue from 'vue'
import layer from 'layer';
import {request, API_URLS} from 'util/request.js';
import util from 'util/util.js';
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js';



Vue.islogin=false;
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


new Vue({
        compiled:function(){

        },
        mounted: function() {


        },
        data: {
            logining:false,
            username: '',
            password: '',
            lastUserName:""
        },
        computed:{

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
                    vm.password = enPwd;
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
                           util.pushLocal("pageList", []);
                       }

                        vm.setCookie("username",username,7);
                        location.href="./index.html";

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
    }).$mount('#main');