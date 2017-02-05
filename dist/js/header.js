webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	!function () {
		var templates = '' + '<div class="navbar navbar-inverse navbar-fixed-top" id="header">' + '<a class="navbar-brand"><img src="/images/logo.jpg" alt="Brand"></a>' + '<div class="container">' + '<div class="staff">{staff}</div>' + ' <div class="navbar-header">' + '<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">' + '<span class="sr-only">Toggle navigation</span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '</button>' + '</div>' + '<div class="navbar-collapse collapse" role="navigation">' + '<ul class="nav navbar-nav">' + '{custom}' + '<li><a class="custom-add" onclick="queueTools.addCustom();">+</a></li>' + '<li><a class="custom-remove" onclick="queueTools.removeCustom();">-</a></li>' + '</ul>' + ' </div>' + '</div>' + '</div>';
	
		var queueTools = {
			login: false,
			template: templates,
			data: {
				index: 0,
				staff: "收营员XXX",
				list: []
			},
			init: function init() {
	
				var localData = _util2.default.pullLocal("queue");
				if (localData) {
					this.data = localData;
				}
			},
			getSystemCustom: function getSystemCustom() {
				//默认匿名用户
				var custom = {};
				custom.name = "custom_" + new Date().getTime();
				custom.cid = null;
	
				return custom;
			},
			getSystemTime: function getSystemTime() {
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
				if (!document.getElementById("header")) {
					$("body").append(html);
				} else {
					document.getElementById("header").innerHTML = html;
				}
				//pushLocal("miku",this.data);
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
			getHeaderHtml: function getHeaderHtml() {
				var staff = this.data.staff;
				var queue = this.data.list;
				var custom = this.makeCustom(queue);
				var tmp = this.template.replace(/{staff}/g, staff).replace(/{custom}/g, custom);
				return tmp;
			},
			switchCustom: function switchCustom(index) {
				this.data.index = index - 1;
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
	
				//alert(queueTools.data.list[queueTools.data.index].custom.name)
			},
			addCustom: function addCustom(custom) {
				var queue = {};
				//记录客户当前时间
				queue.time = this.getSystemTime();
				//记录客户名会员
				queue.custom = this.getSystemCustom();
	
				this.data.list.push(queue);
				this.data.index = this.data.list.length - 1;
	
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
			},
			setCustom: function setCustom(custom) {
				if (this.data.list.length == 0) {
					return;
				}
				var index = this.data.index;
				alert(index);
				this.data.list[index].custom = custom;
				_util2.default.pushLocal("queue", this.data);
			},
			removeCustom: function removeCustom() {
				var index = this.data.index;
				this.data.list.splice(index, 1);
				this.refresh();
				_util2.default.pushLocal("queue", this.data);
			}
	
		};
	
		//
		queueTools.init();
		queueTools.refresh();
	
		window.queueTools = queueTools;
	}(); //var  util= require('util/util.js');

/***/ }
]);
//# sourceMappingURL=header.js.map