webpackJsonp([1,4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//es6 简单导入
	//http://blog.csdn.net/lihongxun945/article/details/49031383
	var util = {
	
	    pushLocal: function pushLocal(key, value) {
	        var str = JSON.stringify(value); // 将对象转换为字符串
	        localStorage.setItem(key, str);
	    },
	
	    pullLocal: function pullLocal(key) {
	        var str = localStorage.getItem(key); //将字符串转换为对象
	        var obj = JSON.parse(str);
	        return obj;
	    },
	
	    delLocal: function delLocal(key) {
	        var str = localStorage.removeItem(key);
	        return str;
	    },
	
	    initLocal: function initLocal(key) {
	        localStorage.clear();
	    },
	    /**
	     * 获取随机数
	     */
	    randomNum: function randomNum(n, m) {
	        return parseInt(Math.random() * (m + 1 - n)) + n;
	    },
	    /**
	     * [获取分页id]
	     * @return {[type]} [description]
	     */
	    getUrlHash: function getUrlHash() {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.hash.substr(1).match(reg);
	        if (r != null) return decodeURI(r[2]);return null;
	    },
	
	    /**
	     * [获取选择日期]
	     * @return {[type]} [2016-11-11]
	     */
	    getSelectDate: function getSelectDate() {
	        var date = new Date();
	        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	    },
	
	    /**
	     * [获取单件价格 ]
	     * @return {[type]} [数量*单价]
	     */
	    getItemPrice: function getItemPrice() {
	        var date = new Date();
	        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	    }
	
	};
	
	//  导出
	exports.default = util;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //var  util= require('util/util.js');
	
	
	!function () {
	
		if (!document.getElementById("header-nav")) {
			return false;
		}
		var navbar = document.getElementById("header-nav");
		var template = navbar.innerHTML;
	
		var queueTools = _defineProperty({
			login: false,
			template: template,
			data: {
				index: 0,
				staff: "里可行",
				list: []
			},
			init: function init() {
	
				var localData = _util2.default.pullLocal("queue");
				if (localData) {
					this.data = localData;
				}
	
				if (this.data.list == 0) {
					this.addCustom();
				}
	
				this.refresh();
				this.contact();
			},
			//获得用户资料
			getCustomData: function getCustomData() {
				var custom = {};
				custom.uid = "1001";
				custom.name = "custom_" + new Date().getTime();
				custom.cid = parseInt(Math.random() * 1000);
				return custom;
			},
			//获得时间信息
			getTimeData: function getTimeData() {
				function nz(n) {
					if (n < 10) {
						n = "0" + n;
					} else {
						n = n + "";
					}
					return n;
				}
	
				var time = new Date();
				var timestr = nz(time.getHours()) + ":" + nz(time.getMinutes());
	
				return timestr;
			},
			refresh: function refresh() {
	
				var html = this.getHeaderHtml();
	
				navbar.innerHTML = html;
			},
			makeCustom: function makeCustom(data) {
				var _self = this;
				var html = "";
				var template = '<li><a class="custom {cur}" onclick="queueTools.switchCustom({index})"><span class="num">{index}</span><span class="time">{time}</span></a></li>';
				data.forEach(function (e, i) {
					var cur = "cur";
					i == _self.data.index ? cur = cur : cur = "";
					var tmp = template.replace(/{index}/g, i + 1).replace(/{cur}/g, cur).replace(/{time}/g, e.time);
					html += tmp;
				});
				return html;
			},
			//获得最新的html
			getHeaderHtml: function getHeaderHtml() {
				var staff = this.data.staff;
				var aaa = this.data.list;
				var queue = this.makeCustom(aaa);
				var tmp = this.template.replace(/{staff}/g, staff).replace(/{queue}/g, queue);
				return tmp;
			},
			//切换用户
			switchCustom: function switchCustom(index) {
				this.data.index = index - 1;
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
	
				//查询购物车
				this.findCart(this.data.list[index - 1].custom.name, this.data.list[index - 1].custom.cid);
			},
			//新增用户
			addCustom: function addCustom() {
				var queue = {};
				//记录客户当前时间
				queue.time = this.getTimeData();
				//记录客户名会员
				queue.custom = this.getCustomData();
				//
				this.data.list.push(queue);
				this.data.index = this.data.list.length - 1;
	
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
			},
	
			//删除用户
			removeCustom: function removeCustom() {
				var index = this.data.index;
				this.data.list.splice(index, 1);
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
			},
			//查询购物记录
			findCart: function findCart(name, cartid) {
				alert("用户名:" + name + ",购物车id:" + cartid);
			},
			//设置用户信息
			setCustom: function setCustom(custom) {
				if (this.data.list.length == 0) {
					return;
				}
				var index = this.data.index;
	
				this.data.list[index].custom = custom;
				_util2.default.pushLocal("queue", this.data);
			},
			//连接设备
			contact: function contact() {
				document.querySelector('.contact-btn').classList.remove('success', 'error');
				if (2 > 1) {
					document.querySelector('.contact-btn').classList.add('success');
				} else {
					document.querySelector('.contact-btn').classList.add('error');
				}
			},
			//连接设备
			exit: function exit() {
				var res = confirm("确定退出吗? ");
				if (res) {
					_util2.default.delLocal('queue');
					location.href = "./login.html";
				}
			}
		}, "setCustom", function setCustom(custom) {
			if (this.data.list.length == 0) {
				return;
			}
			var index = this.data.index;
	
			this.data.list[index].custom = custom;
			_util2.default.pushLocal("queue", this.data);
		});
	
		queueTools.init();
	
		window.queueTools = queueTools;
	}();

/***/ }
]);
//# sourceMappingURL=header.js.map