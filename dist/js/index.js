webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


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
/* 7 */
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
	
	// import util from 'ui/model.js';
	
	
	/**
	 * [设置购物车的高]
	 */
	function setCartHeight() {
	
	    setTimeout(function () {
	        var w = window.innerHeight;
	        var lh = document.querySelector('.left-con').offsetHeight;
	        var ch = document.querySelector('.shoppingCalc').offsetHeight;
	
	        if (w >= 768) {
	            (0, _jquery2.default)("#shoppingCart-list").show();
	            (0, _jquery2.default)("#shoppingCart-list").height(lh - ch - 160 + "px");
	        } else {
	            (0, _jquery2.default)("#shoppingCart-list").hide();
	        }
	    }, 300);
	}
	
	//定义组件
	Vue.component('layer-item', {
	    template: '#layer-item-Component', //如果要传参 一定要遵循相关的规范 参考wiki 驼峰要 -拆开
	    props: { //定义参数类型
	        itemDetail: Object
	    },
	    methods: {
	        switchSpec: function switchSpec(pid) {
	            if (pid) {
	                this.$dispatch('switchSpec', pid);
	            }
	        },
	        pushCart: function pushCart(appProductDetail) {
	            if (appProductDetail) {
	                this.$dispatch('pushCart', appProductDetail);
	            }
	        }
	    }
	
	});
	
	Vue.component('layer-custom', {
	    template: '#layer-custom-Component', //如果要传参 一定要遵循相关的规范 参考wiki 驼峰要 -拆开
	    props: { //定义参数类型
	        customModal: { //会员弹层
	            type: Object
	        },
	        customData: {
	            type: Object
	        }
	    },
	    methods: {
	        save: function save(customdata) {
	            if (customdata) {
	                this.$dispatch('register', customdata);
	            }
	        }
	    }
	});
	
	new Vue({
	    compiled: function compiled() {
	
	        this.getNavList();
	    },
	    ready: function ready() {
	
	        var cid = _util2.default.getUrlHash("category");
	        this.getItemList(cid);
	        this.getCustomList();
	    },
	    filters: {
	        sex: function sex(value) {
	            if (value == "男") {
	                return "man";
	            } else {
	                return "women";
	            }
	        }
	    },
	    data: {
	        productParams: {
	            'pageNum': 1,
	            'categoryId': null,
	            'keyword': null,
	            'brandId': null
	        },
	        searchItem: {
	            text: "", //文本
	            input: "", //控件
	            searching: false //是否搜索中
	        },
	        searchCustom: {
	            text: "", //文本
	            input: "", //控件
	            searching: false //是否搜索中
	        },
	        //导航数据
	        navData: {
	            apiUrl: '../data/navData.json',
	            index: 0,
	            show: false,
	            path: [],
	            list: []
	        },
	        //页对象
	        page: {},
	        //商品数据
	        itemData: [],
	        itemDetail: {},
	        //购物车
	        cartData: {
	            index: 0,
	            list: []
	        },
	        //会员数据
	        customData: {
	            apiUrl: '../data/customData.json',
	            index: 0,
	            list: [],
	            newCustom: {},
	            curCustom: {}
	        },
	        //会员弹层
	        customModal: {
	            status: 'normal',
	            history: '',
	            code: 0
	        }
	
	    },
	    computed: {
	        //选中的谷歌
	
	        totalprice: function totalprice() {
	            var total = 0;
	            this.cartData.list.forEach(function (e, i) {
	                total += e.price * e.amount;
	            });
	            return total;
	        },
	        //过滤物品数据列表
	        filteredItemDataList: function filteredItemDataList() {
	            var self = this;
	            var p = this.itemData;
	            var l = this.limit;
	
	            //如果有搜索
	            if (this.searchItem.searching) {
	                p = p.filter(function (item) {
	                    return item.title.indexOf(self.searchItem.text) !== -1;
	                });
	            }
	
	            //分页显示
	            return p;
	        },
	        //filteredCustomDataList
	        filteredCustomDataList: function filteredCustomDataList() {
	            var self = this;
	            var p = this.customData.list;
	
	            p = p.filter(function (custom) {
	
	                if (self.searchCustom.text == custom.name || self.searchCustom.text == custom.phone) {
	                    return custom;
	                }
	            });
	            return p;
	        }
	
	    },
	    watch: {
	        'searchItem.text': function searchItemText(val) {
	            if (val) {
	                this.searchItem.searching = true;
	            } else {
	                this.searchItem.searching = false;
	            }
	            //从第一页开始找
	            this.pageCur = 1;
	        },
	        'searchCustom.text': function searchCustomText(val) {
	            var self = this;
	            if (val) {
	                this.searchCustom.searching = true;
	                this.customModal.code = 301;
	                setTimeout(function () {
	                    (0, _jquery2.default)('#custom-layer').modal('hide');
	                    if (self.filteredCustomDataList != "") {
	                        self.customData.curCustom = self.filteredCustomDataList[0];
	                        self.customModal.status = 'info';
	                        self.customModal.history = 'info';
	                        self.customModal.code = 200;
	                    } else {
	                        self.customModal.status = 'normal';
	                        self.customModal.history = 'normal';
	                        self.customModal.code = 404;
	                    }
	                }, 200);
	                setTimeout(function () {
	                    (0, _jquery2.default)('#custom-layer').modal('show');
	                }, 800);
	            } else {
	                this.searchItem.searching = false;
	                this.customModal.status = 'normal';
	                this.customModal.history = 'normal';
	                this.customModal.code = 0;
	            }
	        }
	    },
	    //共有方法
	    events: {
	        //会员注册
	        register: function register(customdata) {
	            var name = customdata.newCustom.name;
	            var phone = customdata.newCustom.phone;
	            var sex = customdata.newCustom.sex;
	
	            alert(name + '====' + phone + '===' + sex);
	        },
	        //选择规格
	        switchSpec: function switchSpec(sid) {
	            alert("规格" + sid);
	        },
	        //放入购物车
	        pushCart: function pushCart(item) {
	            _layer2.default.closeAll();
	            var vm = this;
	            var newitem = {};
	            Object.assign(newitem, item);
	
	            console.log(vm.itemDetail.appProductDetail);
	
	            newitem.selectDate = _util2.default.getSelectDate(); //自动获取选择日期
	            newitem.amount = 1; //自动获取选择日期
	            this.cartData.list.push(newitem);
	        }
	
	    },
	    methods: {
	        //获取导航列表
	        getNavList: function getNavList() {
	            var vm = this;
	            vm.$http.get(vm.navData.apiUrl, {
	                params: { 'cache': Math.random() },
	                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	                emulateJSON: true
	            }).then(function (response) {
	                //成功
	                // console.log(response.data);
	                vm.$set('navData.list', response.data.data);
	                vm.$set('navData.path', response.data.path);
	            }).catch(function (response) {
	                //失败
	                //console.log(response);
	                alert("读取导航失败");
	            });
	        },
	        //获取会员列表
	        getCustomList: function getCustomList() {
	            var vm = this;
	            vm.$http.get(vm.customData.apiUrl, {
	                params: { 'p': 1 },
	                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	                emulateJSON: true
	            }).then(function (response) {
	                //成功
	                //console.log(response.data);
	                vm.$set('customData.list', response.data.data);
	            }).catch(function (response) {
	                //失败
	                //console.log(response);
	                alert("读取会员失败");
	            });
	        },
	        //获取物品列表
	        getItemList: function getItemList() {
	            var vm = this;
	            var apiobj = {
	                url: _request.API_URLS.products, //API_URLS.products
	                data: vm.productParams
	            };
	            _request.request.fnGet(vm, apiobj, function (res) {
	                console.log(res);
	                vm.page = res.page;
	                vm.itemData = vm.page.list;
	                setCartHeight();
	                window.onresize = setCartHeight;
	            });
	        },
	        //获取物品详情
	        openItem: function openItem(pid) {
	
	            var vm = this;
	            var apiobj = {
	                url: _request.API_URLS.products + pid,
	                data: {
	                    'id': pid
	                }
	            };
	            var itemGift = false;
	            var itemswiper = '';
	
	            _request.request.fnGet(vm, apiobj, function (res) {
	
	                vm.itemDetail = res.data;
	                console.log(vm.itemDetail.appProductDetail);
	                //是否存在赠品
	                vm.itemDetail.appProductDetail.appGiftActivity != null ? itemGift : itemGift = true;
	
	                //弹出页面层
	                _layer2.default.open({
	                    id: 'layui-layer-item',
	                    type: 1, //1 普通层
	                    shade: 0.01, //遮罩
	                    anim: 0,
	                    zIndex: 1000,
	                    closeBtn: 2,
	                    title: false,
	                    area: ['auto', 'auto'], //宽高
	                    content: (0, _jquery2.default)('#layer-item-box'),
	                    success: function success() {
	                        if (itemGift) {
	                            //如果存在赠品
	                            //data-gift
	                            itemswiper = new Swiper('.gift-detail-item', {
	                                pagination: '.gift-detail-item-pagination',
	                                paginationClickable: true,
	                                spaceBetween: 10
	
	                            });
	
	                            itemswiper.on('onSlideChangeEnd', function (swiper) {
	                                //some code
	                                (0, _jquery2.default)(".gift-detail-tab").find('a').removeClass('selected');
	                                (0, _jquery2.default)(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
	                            });
	
	                            (0, _jquery2.default)(".gift-detail-tab").find('a').eq(0).addClass('selected');
	                            (0, _jquery2.default)(".gift-detail-tab").find('a').on('click', function () {
	
	                                itemswiper.slideTo((0, _jquery2.default)(this).index()); //
	                            });
	                        }
	                    },
	                    cancel: function cancel(index) {
	                        // if(confirm('确定要关闭么')){
	                        //     layer.close(index)
	                        //  }
	                        //  return false;
	                    },
	                    end: function end() {
	                        // alert("销毁了");
	                        if (itemGift) {
	                            itemswiper.destroy();
	                            (0, _jquery2.default)(".gift-detail-tab").find('a').off().removeClass('selected');
	                        }
	                    }
	                });
	            });
	        },
	
	        checkcartData: function checkcartData(ev, index) {
	            this.cartData.index = index;
	        },
	        buildBill: function buildBill() {
	            if (this.cartData.list.length > 0) {
	                console.log(this.cartData.list);
	                location.href = "./bill.html";
	            } else {
	                alert('请先选择物品');
	            }
	        },
	        //计算器
	        calc: function calc(keycode) {
	            var vm = this;
	            if (this.cartData.list.length == 0) {
	                return;
	            }
	
	            var index = this.cartData.index;
	            //选中的单价
	            var price = this.cartData.list[index].price;
	            //选中的数量
	            var amount = this.cartData.list[index].amount;
	
	            if (isNaN(keycode)) {
	                switch (keycode) {
	                    case 'qty':
	                        //resize
	                        this.cartData[index].amount = 1;
	                        break;
	                    case 'x':
	                        //close
	                        var str = amount + "";
	                        amount = str.substring(0, str.length - 1);
	                        if (amount == "") {
	                            this.cartData.list.splice(index, 1);
	                        } else {
	                            this.cartData.list[index].amount = parseInt(amount);
	                        }
	                        break;
	                }
	            } else {
	
	                if (amount != 1) {
	                    amount += keycode + '';
	                } else {
	
	                    amount = keycode;
	                }
	
	                this.cartData.list[index].amount = parseInt(amount);
	                // this.cartData[index].amount=parseInt(amount);
	                console.log(this.cartData.list);
	            }
	        },
	        //分页
	        filteredByPage: function filteredByPage(arr, limit) {
	            this.pageTotal = Math.ceil(arr.length / limit);
	            return arr.slice((this.pageCur - 1) * limit, this.pageCur * limit);
	        },
	        //页码点击事件
	        pageTo: function pageTo(page) {
	            if (page != this.productParams.pageNum) {
	
	                this.productParams.pageNum = page;
	                this.getItemList();
	            }
	        },
	        getspecsClick: function getspecsClick(index) {
	
	            return this.itemData.newItem.specs.index;
	        },
	        specsClick: function specsClick(index) {
	
	            this.itemData.newItem.specs.index = index;
	        },
	        //增加用户
	        addNewCustom: function addNewCustom() {
	            if (this.customData.newCustom.name == "") {
	                alert("姓名不能为空");
	                return false;
	            }
	            if (this.customData.newCustom.phone == "") {
	                alert("手机号不能为空");
	                return false;
	            }
	
	            this.customData.list.push(this.customData.newCustom);
	
	            console.log(this.customData.list);
	        }
	
	    }
	}).$mount('#main');

/***/ }
]);
//# sourceMappingURL=index.js.map