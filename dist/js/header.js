webpackJsonp([1],[function(t,e,n){t.exports=n(20)},,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i=n(21),u=r(i),a=n(10),o=r(a);!function(){if(!document.getElementById("header-nav"))return!1;var t=document.getElementById("header-nav"),e=t.innerHTML,n=(0,u.default)({login:!1,template:e,data:{index:0,staff:"里可行",list:[]},init:function(){var t=o.default.pullLocal("queue");t&&(this.data=t),0==this.data.list&&this.addCustom(),this.refresh(),this.contact()},getCustomData:function(){var t={};return t.uid="1001",t.name="custom_"+(new Date).getTime(),t.cid=parseInt(1e3*Math.random()),t},getTimeData:function(){function t(t){return t<10?t="0"+t:t+="",t}var e=new Date,n=t(e.getHours())+":"+t(e.getMinutes());return n},refresh:function(){var e=this.getHeaderHtml();t.innerHTML=e},makeCustom:function(t){var e=this,n="",r='<li><a class="custom {cur}" onclick="queueTools.switchCustom({index})"><span class="num">{index}</span><span class="time">{time}</span></a></li>';return t.forEach(function(t,i){var u="cur";u=i==e.data.index?u:"";var a=r.replace(/{index}/g,i+1).replace(/{cur}/g,u).replace(/{time}/g,t.time);n+=a}),n},getHeaderHtml:function(){var t=this.data.staff,e=this.data.list,n=this.makeCustom(e),r=this.template.replace(/{staff}/g,t).replace(/{queue}/g,n);return r},switchCustom:function(t){this.data.index=t-1,this.refresh(),o.default.pushLocal("queue",this.data),this.findCart(this.data.list[t-1].custom.name,this.data.list[t-1].custom.cid)},addCustom:function(){var t={};t.time=this.getTimeData(),t.custom=this.getCustomData(),this.data.list.push(t),this.data.index=this.data.list.length-1,this.refresh(),o.default.pushLocal("queue",this.data)},removeCustom:function(){var t=this.data.index;this.data.list.splice(t,1),this.refresh(),o.default.pushLocal("queue",this.data)},findCart:function(t,e){alert("用户名:"+t+",购物车id:"+e)},setCustom:function(t){if(0!=this.data.list.length){var e=this.data.index;this.data.list[e].custom=t,o.default.pushLocal("queue",this.data)}},contact:function(){document.querySelector(".contact-btn").classList.remove("success","error"),document.querySelector(".contact-btn").classList.add("success")},exit:function(){var t=confirm("确定退出吗? ");t&&(o.default.delLocal("queue"),location.href="./login.html")}},"setCustom",function(t){if(0!=this.data.list.length){var e=this.data.index;this.data.list[e].custom=t,o.default.pushLocal("queue",this.data)}});n.init(),window.queueTools=n}()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(22),u=r(i);e.default=function(t,e,n){return e in t?(0,u.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){t.exports={default:n(23),__esModule:!0}},function(t,e,n){n(24);var r=n(13).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(25);r(r.S+r.F*!n(34),"Object",{defineProperty:n(30).f})},function(t,e,n){var r=n(26),i=n(13),u=n(27),a=n(29),o="prototype",c=function(t,e,n){var s,f,l,d=t&c.F,h=t&c.G,p=t&c.S,m=t&c.P,v=t&c.B,g=t&c.W,y=h?i:i[e]||(i[e]={}),x=y[o],w=h?r:p?r[e]:(r[e]||{})[o];h&&(n=e);for(s in n)f=!d&&w&&void 0!==w[s],f&&s in y||(l=f?w[s]:n[s],y[s]=h&&"function"!=typeof w[s]?n[s]:v&&f?u(l,r):g&&w[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[o]=t[o],e}(l):m&&"function"==typeof l?u(Function.call,l):l,m&&((y.virtual||(y.virtual={}))[s]=l,t&c.R&&x&&!x[s]&&a(x,s,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(28);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(30),i=n(38);t.exports=n(34)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(31),i=n(33),u=n(37),a=Object.defineProperty;e.f=n(34)?Object.defineProperty:function(t,e,n){if(r(t),e=u(e,!0),r(n),i)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(32);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(34)&&!n(35)(function(){return 7!=Object.defineProperty(n(36)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(35)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(32),i=n(26).document,u=r(i)&&r(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,e,n){var r=n(32);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}}]);