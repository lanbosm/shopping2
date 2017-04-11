webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(320);


/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _layer = __webpack_require__(82);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _rsa = __webpack_require__(177);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.islogin = false;
	//设置cookie,增加到vue实例方便全局调用
	//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
	//当然，如果session保存到vuex的话除外
	_vue2.default.prototype.setCookie = function (c_name, value, expiredays) {
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + expiredays);
	    document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
	};
	
	//获取cookie
	_vue2.default.prototype.getCookie = function (name) {
	    var arr,
	        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) return arr[2];else return null;
	};
	
	new _vue2.default({
	    compiled: function compiled() {},
	    mounted: function mounted() {},
	    data: {
	        logining: false,
	        username: '',
	        password: '',
	        lastUserName: ""
	    },
	    computed: {},
	    created: function created() {
	
	        this.lastUserName = this.getCookie("username");
	        this.username = this.lastUserName;
	    },
	
	    watch: {
	        'username': function username(val) {
	            if (this.logining) {
	                return;
	            }
	            if (val) {
	                //实时action
	            } else {
	                    //layer.tips('请输入用户名', '#username');
	                }
	        },
	        'password': function password(val) {
	            if (val) {
	                //实时action
	            } else {
	                    //layer.tips('请输入密码', '#password');
	                }
	        }
	    },
	    methods: {
	        toLogin: function toLogin() {
	            var vm = this;
	            var apiobj = {
	                url: _request.API_URLS.public_key
	            };
	
	            if (vm.logining) {
	                return false;
	            }
	            if (!vm.username) {
	                _layer2.default.tips('请输入用户名', '#username');return false;
	            }
	            if (!vm.password) {
	                _layer2.default.tips('请输入密码', '#password');return false;
	            }
	
	            vm.logining = true;
	
	            _request.request.fnGet(apiobj).then(function (res) {
	
	                var publicKey = res.data;
	                var rsaKey = new _rsa.RSAKey();
	                rsaKey.setPublic((0, _rsa.b64tohex)(publicKey.modulus), (0, _rsa.b64tohex)(publicKey.exponent));
	                var enPwd = (0, _rsa.hex2b64)(rsaKey.encrypt(vm.password));
	                vm.password = enPwd;
	                vm.doLogin(publicKey, vm.username, enPwd);
	            });
	        },
	        doLogin: function doLogin(publicKey, username, enPwd) {
	            if (publicKey && enPwd) {
	                var vm = this;
	                var cid = localStorage.getItem("currentShiftId");
	                var apiobj = {
	                    url: _request.API_URLS.login,
	                    data: {
	                        currentShiftId: cid,
	                        username: username,
	                        enPasswd: enPwd,
	                        tmpKey: publicKey.tmpKey
	                    }
	                };
	
	                var loading = _layer2.default.load(2, {
	                    shade: [0.1, '#fff'] //0.1透明度的白色背景
	                });
	
	                _request.request.fnPost(vm, apiobj, function (res) {
	                    _layer2.default.close(loading);
	                    window.localStorage.setItem("accessToken", res.accessToken);
	                    _util2.default.pushLocal('shopData', res);
	
	                    if (vm.lastUserName != vm.username) {
	                        _util2.default.pushLocal("pageList", []);
	                    }
	
	                    vm.setCookie("username", username, 7);
	                    location.href = "./index.html";
	                }, function (res) {
	                    _layer2.default.close(loading);
	                    _layer2.default.msg(res.msg, { icon: 2 });
	                    vm.password = "";
	                    vm.logining = false;
	                });
	            } else {
	                alert('服务器链接失败');
	            }
	        }
	    }
	}).$mount('#main');

/***/ }

});
//# sourceMappingURL=login.js.map