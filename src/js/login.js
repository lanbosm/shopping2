import util from 'util/util.js';
import $ from 'jquery';
import layer from 'layer';
import {request, API_URLS, HOST} from 'util/request.js';
import RSAKey from 'util/rsa.js';

var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) { return BI_RM.charAt(n); }

function hex2b64(h) {
    var i;
    var c;
    var ret = "";

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
    var ret = ""
    var i;
    var k = 0; // b64 state, 0-3
    var slop;
    var v;
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
    var h = b64tohex(s);
    var i;
    var a = new Array();
    for(i = 0; 2*i < h.length; ++i) {
        a[i] = parseInt(h.substring(2*i,2*i+2),16);
    }
    return a;
}


new Vue({
        compiled:function(){

        },
        ready: function() {
               this.getToken();
        },
        data: {
            publicKey:{},
            token:'',
            username: '',
            password: ''
        },
        computed:{

        },
        watch: {
            'username': function (val) {
                if(val){
                   //实时action
                }
                else{
                    layer.tips('请输入用户名', '#username');

                }

            },
            'password': function (val) {
                if(val){
                    //实时action
                }
                else{
                    layer.tips('请输入密码', '#password');
                }

            }
        },
        methods: {
            getToken:function(){
                var vm=this;
                var apiobj={
                    url:API_URLS.public_key,
                };
                // var modulus = data.modulus;
                // var exponent = data.exponent;
                // var tmpKey = data.tmpKey;

                request.fnGet(vm,apiobj,function(res) {
                    vm.publicKey=res.data;
                    console.log( vm.publicKey);
                    //  $api.setStorage('tmpKey', tmpKey);
                    util.pushLocal('token',vm.publicKey.tmpKey);
                    var rsaKey = new RSAKey();

                    rsaKey.setPublic(b64tohex(vm.publicKey.modulus), b64tohex(vm.publicKey.exponent));
                    var enPassword = hex2b64(rsaKey.encrypt(vm.password));
                    console.log(enPassword );
                });

            },
            toLogin:function(){
                var vm=this;
                var apiobj={
                    url:API_URLS.login,
                    data:{
                        username:vm.username,
                        enPasswd:vm.password,
                        tmpKey:vm.token
                    }
                };

                if(!this.username){ layer.tips('请输入用户名', '#username'); return false;}
                if(!this.password){ layer.tips('请输入密码', '#password'); return false;}

                request.fnPost(vm,apiobj,function(res) {
                   // alert(2222);
                    console.log(res);
                },function(res){

                    layer.msg('用户名密码错误', {icon: 2});
                });
                //layer.msg('登录失败', {icon: 2});

               //lert(this.username);
            }


        }
    }).$mount('#main');