webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = window.jQuery;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = window.layer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2017/2/6.
	 * wiki http://www.cnblogs.com/keepfool/p/5625583.html
	 */
	//wiku http://www.cnblogs.com/dupd/p/5951311.html
	
	/**
	 * 接口签名
	 * @type {string}
	 */
	var apiSecrect = "2a97eede0fd2de9791859f61ea6c98dd";
	
	var HOST = exports.HOST = "http://192.168.1.199"; //http://192.168.1.199
	
	var API_URLS = exports.API_URLS = {
	    public_key: "/cashier/common/public_key",
	    login: "/cashier/login",
	    login_out: "/cashier/common/log_out",
	    products: "/cashier/member/products/"
	
	};
	
	var request = exports.request = {
	
	    fnGet: function fnGet(vm, apiObj, success, error) {
	
	        vm.$http.get(HOST + apiObj.url, {
	            params: apiObj.data,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	        }).then(function (response) {
	            //成功
	
	            if (response.data.code == 20000) {
	                if (success) {
	                    success(response.data);
	                }
	            } else {
	                if (error) {
	                    error(response.data);
	                }
	            }
	        }).catch(function (response) {
	            //失败
	            console.log(response);
	            console.log("服务器连接失败");
	        });
	    },
	    fnPost: function fnPost(vm, apiObj, success, error) {
	        vm.$http.post(HOST + apiObj.url, apiObj.data, {
	            params: apiObj.data,
	            headers: { 'Content-Type': 'application/json' }
	        }).then(function (response) {
	            //成功
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
	        }).catch(function (response) {
	            //失败
	            console.log(response);
	            console.log("服务器连接失败");
	        });
	    },
	    fnPut: function fnPut(vm, apiObj, success, error) {
	        vm.$http.put(apiObj.url, apiObj.data, {
	            headers: { 'Content-Type': 'application/json' }
	        }).then(function (response) {
	            //成功
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
	        }).catch(function (response) {
	            //失败
	            console.log(response);
	            console.log("服务器连接失败");
	        });
	    },
	    fnDelete: function fnDelete(vm, apiObj, success, error) {
	        vm.$http.delete(apiObj.url, {
	            params: api.params,
	            headers: { 'Content-Type': 'application/json' },
	            emulateJSON: true
	        }).then(function (response) {
	            //成功
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
	        }).catch(function (response) {
	            //失败
	            console.log(response);
	            console.log("服务器连接失败");
	        });
	    }
	};
	
	/**
	 * 全局Vue拦截器
	 */
	Vue.http.interceptors.push(function (request, next) {
	
	    //加载层-风格3
	    var loading = layer.load(3);
	
	    var accessToken = window.localStorage.getItem("accessToken");
	    if (accessToken) {
	        request.headers.accessToken = accessToken;
	    }
	    var signature = getSign();
	    if (signature) {
	        request.headers.nonceStr = signature.nonceStr;
	        request.headers.timeStamp = signature.timeStamp;
	        request.headers.sign = signature.sign;
	    }
	
	    console.log(signature);
	    // console.log("token:" + accessToken);
	    // document.getElementById("loadBox").style.display = 'block';
	    next(function (response) {
	        // if(!response || !response.data){
	        //     return false;
	        // }
	        response.data = response.json();
	
	        if (response.data.code == 49001) {
	            layer.msg('请求失败', { icon: 2 });
	            window.location.href = response.data.loginUrl;
	            return true;
	        } else if (response.data.code == 49002) {
	            layer.msg('请求失败', { icon: 2 });
	            window.location.href = window.host_index;
	            return true;
	        } else {
	
	            Vue.nextTick(function () {
	                layer.close(loading);
	                setTimeout(function () {}, 500);
	            });
	        }
	    });
	});
	
	/**
	 * 获取guid
	 */
	var guid = function guid() {
	    function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
	
	/**
	 * 获取接口签名
	 */
	var getSign = function getSign() {
	    var nonceStr = guid();
	    var timeStamp = new Date().getTime();
	    var sign = hex_md5("apiSecrect=" + apiSecrect + "&nonceStr=" + nonceStr + "&timeStamp=" + timeStamp);
	    return {
	        'nonceStr': nonceStr,
	        'timeStamp': timeStamp,
	        'sign': sign
	    };
	};
	
	/**
	 * md5
	 */
	var hexcase = 0;
	var b64pad = "";
	var chrsz = 8;
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
	
	    x[len >> 5] |= 0x80 << len % 32;
	    x[(len + 64 >>> 9 << 4) + 14] = len;
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
	    return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}
	
	function md5_gg(a, b, c, d, x, s, t) {
	    return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}
	
	function md5_hh(a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	
	function md5_ii(a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}
	
	function core_hmac_md5(key, data) {
	    var bkey = str2binl(key);
	    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
	
	    var ipad = Array(16),
	        opad = Array(16);
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
	    return msw << 16 | lsw & 0xFFFF;
	}
	
	function bit_rol(num, cnt) {
	    return num << cnt | num >>> 32 - cnt;
	}
	
	function str2binl(str) {
	    var bin = Array();
	    var mask = (1 << chrsz) - 1;
	    for (var i = 0; i < str.length * chrsz; i += chrsz) {
	        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
	    }return bin;
	}
	
	function binl2hex(binarray) {
	    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	    var str = "";
	    for (var i = 0; i < binarray.length * 4; i++) {
	        str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
	    }
	    return str;
	}
	
	function binl2b64(binarray) {
	    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	    var str = "";
	    for (var i = 0; i < binarray.length * 4; i += 3) {
	        var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
	        for (var j = 0; j < 4; j++) {
	            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
	        }
	    }
	    return str;
	}

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _jquery = __webpack_require__(3);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _layer = __webpack_require__(4);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _request = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import RSAKey from 'util/rsa.js';
	
	
	var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64pad = "=";
	
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	function int2char(n) {
	    return BI_RM.charAt(n);
	}
	
	function hex2b64(h) {
	    var i;
	    var c;
	    var ret = "";
	
	    for (i = 0; i + 3 <= h.length; i += 3) {
	        c = parseInt(h.substring(i, i + 3), 16);
	        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
	    }
	    if (i + 1 == h.length) {
	        c = parseInt(h.substring(i, i + 1), 16);
	        ret += b64map.charAt(c << 2);
	    } else if (i + 2 == h.length) {
	        c = parseInt(h.substring(i, i + 2), 16);
	        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
	    }
	    while ((ret.length & 3) > 0) {
	        ret += b64pad;
	    }return ret;
	}
	
	// convert a base64 string to hex
	function b64tohex(s) {
	    var ret = "";
	    var i;
	    var k = 0; // b64 state, 0-3
	    var slop;
	    var v;
	    for (i = 0; i < s.length; ++i) {
	        if (s.charAt(i) == b64pad) break;
	
	        v = b64map.indexOf(s.charAt(i));
	
	        if (v < 0) continue;
	        if (k == 0) {
	            ret += int2char(v >> 2);
	            slop = v & 3;
	            k = 1;
	        } else if (k == 1) {
	            ret += int2char(slop << 2 | v >> 4);
	            slop = v & 0xf;
	            k = 2;
	        } else if (k == 2) {
	            ret += int2char(slop);
	            ret += int2char(v >> 2);
	            slop = v & 3;
	            k = 3;
	        } else {
	            ret += int2char(slop << 2 | v >> 4);
	            ret += int2char(v & 0xf);
	            k = 0;
	        }
	    }
	    if (k == 1) ret += int2char(slop << 2);
	    return ret;
	}
	
	// convert a base64 string to a byte/number array
	function b64toBA(s) {
	    //piggyback on b64tohex for now, optimize later
	    var h = b64tohex(s);
	    var i;
	    var a = new Array();
	    for (i = 0; 2 * i < h.length; ++i) {
	        a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
	    }
	    return a;
	}
	
	new Vue({
	    compiled: function compiled() {},
	    ready: function ready() {
	        this.getToken();
	    },
	    data: {
	        publicKey: {},
	        token: '',
	        username: '',
	        password: ''
	    },
	    computed: {},
	    watch: {
	        'username': function username(val) {
	            if (val) {
	                //实时action
	            } else {
	                _layer2.default.tips('请输入用户名', '#username');
	            }
	        },
	        'password': function password(val) {
	            if (val) {
	                //实时action
	            } else {
	                _layer2.default.tips('请输入密码', '#password');
	            }
	        }
	    },
	    methods: {
	        getToken: function getToken() {
	            var vm = this;
	            var apiobj = {
	                url: _request.API_URLS.public_key
	            };
	            // var modulus = data.modulus;
	            // var exponent = data.exponent;
	            // var tmpKey = data.tmpKey;
	
	            _request.request.fnGet(vm, apiobj, function (res) {
	                vm.publicKey = res.data;
	                console.log(vm.publicKey);
	                //  $api.setStorage('tmpKey', tmpKey);
	                _util2.default.pushLocal('token', vm.publicKey.tmpKey);
	                var rsaKey = new RSAKey();
	
	                rsaKey.setPublic(b64tohex(vm.publicKey.modulus), b64tohex(vm.publicKey.exponent));
	                var enPassword = hex2b64(rsaKey.encrypt(vm.passwordValue));
	                console.log(enPassword);
	            });
	        },
	        toLogin: function toLogin() {
	            var vm = this;
	            var apiobj = {
	                url: _request.API_URLS.login,
	                data: {
	                    username: vm.username,
	                    enPasswd: vm.password,
	                    tmpKey: vm.token
	                }
	            };
	
	            if (!this.username) {
	                _layer2.default.tips('请输入用户名', '#username');return false;
	            }
	            if (!this.password) {
	                _layer2.default.tips('请输入密码', '#password');return false;
	            }
	
	            _request.request.fnPost(vm, apiobj, function (res) {
	                // alert(2222);
	                console.log(res);
	            }, function (res) {
	
	                _layer2.default.msg('用户名密码错误', { icon: 2 });
	            });
	            //layer.msg('登录失败', {icon: 2});
	
	            //lert(this.username);
	        }
	
	    }
	}).$mount('#main');

/***/ }
]);
//# sourceMappingURL=login.js.map