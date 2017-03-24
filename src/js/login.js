
import Vue from 'vue'
import layer from 'layer';
import {request, API_URLS} from 'util/request.js';
import util from 'util/util.js';
import RSAKey from 'util/rsa.js';


let b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let b64pad="=";

let BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) { return BI_RM.charAt(n); }

function hex2b64(h) {
    let i;
    let c;
    let ret = "";

    for(i = 0; i+3 <= h.length; i+=3) {
        c = parseInt(h.substring(i,i+3),16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if(i+1 == h.length) {
        c = parseInt(h.substring(i,i+1),16);
        ret += b64map.charAt(c << 2);
    }
    else if(i+2 == h.length) {
        c = parseInt(h.substring(i,i+2),16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while((ret.length & 3) > 0) ret += b64pad;
    return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
    let ret = ""
    let i;
    let k = 0; // b64 state, 0-3
    let slop;
    let v;
    for(i = 0; i < s.length; ++i) {
        if(s.charAt(i) == b64pad) break;

        v = b64map.indexOf(s.charAt(i));

        if(v < 0) continue;
        if(k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if(k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if(k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if(k == 1)
        ret += int2char(slop << 2);
    return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
    //piggyback on b64tohex for now, optimize later
    let h = b64tohex(s);
    let i;
    let a = new Array();
    for(i = 0; 2*i < h.length; ++i) {
        a[i] = parseInt(h.substring(2*i,2*i+2),16);
    }
    return a;
}

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
            password: ''
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

                request.fnGet(vm,apiobj,function(res) {

                    let publicKey=res.data;
                    let rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                    let enPwd = hex2b64(rsaKey.encrypt(vm.password));
                    vm.password = enPwd;
                    vm.doLogin(publicKey, vm.username, enPwd);
                });
            },
            doLogin:function(publicKey, username, enPwd) {
                if(publicKey && enPwd){
                    let vm = this;
                    let apiobj = {
                        url: API_URLS.login,
                        data: {
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
                        window.localStorage.setItem("accessToken",res.accessToken)
                        util.pushLocal("shopData",{
                            "name":res.name,
                            "adminName":res.adminName
                        });


                       //TODO
                       // if("username"!=)
                       if(this.lastUserName==this.username){
                           //clear
                       }


                        vm.setCookie("username",username,7)
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