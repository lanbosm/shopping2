/**
 * Created by Administrator on 2017/2/6.
 * wiki http://www.cnblogs.com/keepfool/p/5625583.html
 */
//wiki es6  http://www.cnblogs.com/dupd/p/5951311.html
//vue-resource https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
//then http://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/
import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../vuex/store'
import layer from 'layer';
import * as data from '../util/mock';
//http请求
Vue.use(VueResource)
/**
 * 接口签名
 * @type {string}
 */
const apiSecrect = "2a97eede0fd2de9791859f61ea6c98dd";


//export const HOST = "http://localhost:3000"; //http://192.168.1.199:82/
//export const HOST = "http://192.168.1.99:82"; //http://192.168.1.199:82/
//export const HOST = "http://zgq2017-xwbz.tunnel.qydev.com"; //http://192.168.1.199:82/
// export const HOST = "http://cs.awo123.cn"; //http://192.168.1.199:82/
const HOST_main="http://192.168.1.69:82";              //主服务器
const HOST_back="http://cs.awo123.cn";                 //备服务器


export let HOST=HOST_main;

//export const HOST="";
export const API_URLS = {
    public_key:"/cashier/common/public_key",
    login:"/cashier/login",
    login_out:"/cashier/common/log_out",
    products: "/cashier/member/products",
    customers:"/cashier/member/customers",               //会员模块
    category:"/cashier/member/products/categories",               //会员模块
    recharge:"/cashier/member/recharge",//充值
    shop_admins:'/cashier/member/shop_admins',       //员工
    b2b_orders:'/cashier/member/b2b_orders',                   //订单模块
    payments:'/cashier/member/payments',                        //验证支付
    log_out:'/cashier/common/log_out',
    cashier_shift:'/cashier/member/cashier_shift' ,                    //零售订单
    take_goods:'/cashier/member/consigns',   //提取货接口
    send:'/cashier/common/send_code'
};

//Vue.http.options.emulateJSON = true; //json模式
Vue.http.options.timeout = 1000;  //500超时
/**
 * 四大金刚
 * @type {{fnGet: request.fnGet, fnPost: request.fnPost, fnPut: request.fnPut, fnDelete: request.fnDelete}}
 */

export const request = {

    //通信错误方法 可扩展新进程
    fnError(host,apiObj){
       console.log('out');
        //return ("alaa");
        if(host==HOST_main){
            HOST=HOST_back;   //尝试链接备用服务器
            //alert("this");
            //再次请求
            return this.fnGet_dev(apiObj);
        }else{
            return Promise.reject("ServerError");
        }


    },


    fnGet (apiObj) {
        return new Promise((resolve, reject) => {
            Vue.http.get(HOST+apiObj.url, {
               params: apiObj.data,
               headers: {'Content-Type': 'application/json'},
            }).then(response => { //成功
                 //  console.log(response)
                    resolve(response.data);
               })
               .catch(response=> { //失败
                    reject(response);
                    layer.alert("服务器连接失败");
               })
        });
    },

    //开发的get方法
    fnGet_dev(apiObj) {
        console.log('get');

        return  Vue.http.get(HOST+apiObj.url, {
                params: apiObj.data,
                timeout:3000,
                headers: {'Content-Type': 'application/json'},
            }).catch(response=> { //失败

               return  this.fnError(HOST,apiObj);
            })

    },
    //开发的post方法
    fnPost_dev (apiObj) {
        console.log('post');
        return  Vue.http.post(HOST+apiObj.url, apiObj.data, {
                params: apiObj.data,
                timeout:3000,
                headers: {'Content-Type': 'application/json'}
            }).catch(response=> { //失败
            return  this.fnError(HOST,apiObj);
        })
    },
    //开发的post方法
    fnPost2 (apiObj) {
        return new Promise((resolve, reject) => {
            Vue.http.post(HOST+apiObj.url, apiObj.data, {
                params: apiObj.data,
                headers: {'Content-Type': 'application/json'}
            }).then(response => { //成功
                //  console.log(response)
                 resolve(response.data);
                 })
                .catch(response=>{ //失败
                    reject(response.data);
                    layer.alert("服务器连接失败");
                })
        });
    },
    fnPost: function (vm, apiObj, success, error) {

            vm.$http.post(HOST+apiObj.url, apiObj.data, {
                params: apiObj.data,
                headers: {'Content-Type': 'application/json'}
            })
            .then((response) => { //成功
                console.log(response.data);
                if (response.data.code == 20000) {
                    if (success) {
                        success(response.data);
                    }
                } else {
                    if (error) {
                        error(response.data);

                    }
                }
            })
            .catch(function (response) { //失败
                error(response.data);
                layer.alert("服务器连接失败");
            })
    },
    fnPut: function (vm, apiObj, success, error) {
        vm.$http.put(apiObj.url, apiObj.data, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => { //成功
                console.log(response.data);
                if (response.data.code == 20000) {
                    if (success) {
                        success(response.data);
                    }
                } else {
                    if (error) {
                        error(response.data);

                    }
                }
            })
            .catch(function (response) { //失败
                error(response.data);
                layer.alert("服务器连接失败");
            })
    },
    fnDelete: function (vm, apiObj, success, error) {
        vm.$http.delete(apiObj.url, {
            params: api.params,
            headers: {'Content-Type': 'application/json'},
            emulateJSON: true
        })
            .then((response) => { //成功
                console.log(response.data);
                if (response.data.code == 20000) {
                    if (success) {
                        success(response.data);
                    }
                } else {
                    if (error) {
                        error(response.data);
                    }
                }
            })
            .catch(function (response) { //失败
                error(response.data);
                layer.alert("服务器连接失败");
            })
    }
};



/**
 * 全局Vue拦截器
 */
Vue.http.interceptors.push(function (request, next) {

    let accessToken = window.localStorage.getItem("accessToken");


    if (request && accessToken  ) {
        if(!request.params){
            request.params = {};
        }
        request.params['accessToken'] =accessToken + '';
    }

    let signature = getSign();

    if (signature && Vue.islogin) {
        Vue.http.headers.common['nonceStr'] = signature.nonceStr + '';
        Vue.http.headers.common['timeStamp'] = signature.timeStamp + '';
        Vue.http.headers.common['sign'] = signature.sign + '';
    }

    next(function (response) {

        if (response.data && response.data.code == 49001) {
            layer.alert("访问令牌过期 请重新登录",{anim:-1,closeBtn: 0},function(){
                store.dispatch("logout");
                layer.closeAll();
            });
            return response;
        }else if (response.data && response.data.code == 40001) {

            return response;
        }
        else if (response.data && response.data.code == 49002) {
            //window.location.href = './login.html';
            return  response;
        } else if (response.data && response.data.code ==  45004) {
            layer.alert("商品库存不足",{closeBtn: 0})
            return response;
        }
        else {
            return response;
        }
    });
});

/**
 * 获取guid
 */
const guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};


/**
 * 获取接口签名
 */
const getSign = function () {
    let nonceStr = guid();
    let timeStamp = new Date().getTime();
    let sign = hex_md5("apiSecrect=" + apiSecrect + "&nonceStr=" + nonceStr + "&timeStamp=" + timeStamp);
    return {
        'nonceStr': nonceStr,
        'timeStamp': timeStamp,
        'sign': sign
    };
};

/**
 * md5
 */
let hexcase = 0;
let b64pad = "";
let chrsz = 8;
function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}

function calcMD5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len) {

    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16)
        bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8  )) & 0xF);
    }
    return str;
}

function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8 ) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32)
                str += b64pad;
            else
                str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}
