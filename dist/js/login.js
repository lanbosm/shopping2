webpackJsonp([3],{0:function(t,o,n){t.exports=n(66)},7:function(t,o){t.exports=window.jQuery},8:function(t,o){t.exports=window.layer},9:function(t,o){"use strict";function n(t){return l(i(f(t),t.length*g))}function i(t,o){t[o>>5]|=128<<o%32,t[(o+64>>>9<<4)+14]=o;for(var n=1732584193,i=-271733879,r=-1732584194,c=271733878,f=0;f<t.length;f+=16){var l=n,p=i,d=r,m=c;n=e(n,i,r,c,t[f+0],7,-680876936),c=e(c,n,i,r,t[f+1],12,-389564586),r=e(r,c,n,i,t[f+2],17,606105819),i=e(i,r,c,n,t[f+3],22,-1044525330),n=e(n,i,r,c,t[f+4],7,-176418897),c=e(c,n,i,r,t[f+5],12,1200080426),r=e(r,c,n,i,t[f+6],17,-1473231341),i=e(i,r,c,n,t[f+7],22,-45705983),n=e(n,i,r,c,t[f+8],7,1770035416),c=e(c,n,i,r,t[f+9],12,-1958414417),r=e(r,c,n,i,t[f+10],17,-42063),i=e(i,r,c,n,t[f+11],22,-1990404162),n=e(n,i,r,c,t[f+12],7,1804603682),c=e(c,n,i,r,t[f+13],12,-40341101),r=e(r,c,n,i,t[f+14],17,-1502002290),i=e(i,r,c,n,t[f+15],22,1236535329),n=s(n,i,r,c,t[f+1],5,-165796510),c=s(c,n,i,r,t[f+6],9,-1069501632),r=s(r,c,n,i,t[f+11],14,643717713),i=s(i,r,c,n,t[f+0],20,-373897302),n=s(n,i,r,c,t[f+5],5,-701558691),c=s(c,n,i,r,t[f+10],9,38016083),r=s(r,c,n,i,t[f+15],14,-660478335),i=s(i,r,c,n,t[f+4],20,-405537848),n=s(n,i,r,c,t[f+9],5,568446438),c=s(c,n,i,r,t[f+14],9,-1019803690),r=s(r,c,n,i,t[f+3],14,-187363961),i=s(i,r,c,n,t[f+8],20,1163531501),n=s(n,i,r,c,t[f+13],5,-1444681467),c=s(c,n,i,r,t[f+2],9,-51403784),r=s(r,c,n,i,t[f+7],14,1735328473),i=s(i,r,c,n,t[f+12],20,-1926607734),n=a(n,i,r,c,t[f+5],4,-378558),c=a(c,n,i,r,t[f+8],11,-2022574463),r=a(r,c,n,i,t[f+11],16,1839030562),i=a(i,r,c,n,t[f+14],23,-35309556),n=a(n,i,r,c,t[f+1],4,-1530992060),c=a(c,n,i,r,t[f+4],11,1272893353),r=a(r,c,n,i,t[f+7],16,-155497632),i=a(i,r,c,n,t[f+10],23,-1094730640),n=a(n,i,r,c,t[f+13],4,681279174),c=a(c,n,i,r,t[f+0],11,-358537222),r=a(r,c,n,i,t[f+3],16,-722521979),i=a(i,r,c,n,t[f+6],23,76029189),n=a(n,i,r,c,t[f+9],4,-640364487),c=a(c,n,i,r,t[f+12],11,-421815835),r=a(r,c,n,i,t[f+15],16,530742520),i=a(i,r,c,n,t[f+2],23,-995338651),n=u(n,i,r,c,t[f+0],6,-198630844),c=u(c,n,i,r,t[f+7],10,1126891415),r=u(r,c,n,i,t[f+14],15,-1416354905),i=u(i,r,c,n,t[f+5],21,-57434055),n=u(n,i,r,c,t[f+12],6,1700485571),c=u(c,n,i,r,t[f+3],10,-1894986606),r=u(r,c,n,i,t[f+10],15,-1051523),i=u(i,r,c,n,t[f+1],21,-2054922799),n=u(n,i,r,c,t[f+8],6,1873313359),c=u(c,n,i,r,t[f+15],10,-30611744),r=u(r,c,n,i,t[f+6],15,-1560198380),i=u(i,r,c,n,t[f+13],21,1309151649),n=u(n,i,r,c,t[f+4],6,-145523070),c=u(c,n,i,r,t[f+11],10,-1120210379),r=u(r,c,n,i,t[f+2],15,718787259),i=u(i,r,c,n,t[f+9],21,-343485551),n=h(n,l),i=h(i,p),r=h(r,d),c=h(c,m)}return Array(n,i,r,c)}function r(t,o,n,i,r,e){return h(c(h(h(o,t),h(i,e)),r),n)}function e(t,o,n,i,e,s,a){return r(o&n|~o&i,t,o,e,s,a)}function s(t,o,n,i,e,s,a){return r(o&i|n&~i,t,o,e,s,a)}function a(t,o,n,i,e,s,a){return r(o^n^i,t,o,e,s,a)}function u(t,o,n,i,e,s,a){return r(n^(o|~i),t,o,e,s,a)}function h(t,o){var n=(65535&t)+(65535&o),i=(t>>16)+(o>>16)+(n>>16);return i<<16|65535&n}function c(t,o){return t<<o|t>>>32-o}function f(t){for(var o=Array(),n=(1<<g)-1,i=0;i<t.length*g;i+=g)o[i>>5]|=(t.charCodeAt(i/g)&n)<<i%32;return o}function l(t){for(var o=y?"0123456789ABCDEF":"0123456789abcdef",n="",i=0;i<4*t.length;i++)n+=o.charAt(t[i>>2]>>i%4*8+4&15)+o.charAt(t[i>>2]>>i%4*8&15);return n}Object.defineProperty(o,"__esModule",{value:!0});var p="2a97eede0fd2de9791859f61ea6c98dd",d=o.HOST="http://192.168.1.199";o.API_URLS={public_key:"/cashier/common/public_key",login:"/cashier/login",login_out:"/cashier/common/log_out",products:"/cashier/member/products/"},o.request={fnGet:function(t,o,n,i){t.$http.get(d+o.url,{params:o.data,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){2e4==t.data.code?n&&n(t.data):i&&i(t.data)}).catch(function(t){console.log(t),console.log("服务器连接失败")})},fnPost:function(t,o,n,i){t.$http.post(d+o.url,o.data,{params:o.data,headers:{"Content-Type":"application/json"}}).then(function(t){console.log(t.data),2e4==t.data.code?n&&n(t.data):i&&i(t.data)}).catch(function(t){console.log(t),console.log("服务器连接失败")})},fnPut:function(t,o,n,i){t.$http.put(o.url,o.data,{headers:{"Content-Type":"application/json"}}).then(function(t){console.log(t.data),2e4==t.data.code?n&&n(t.data):i&&i(t.data)}).catch(function(t){console.log(t),console.log("服务器连接失败")})},fnDelete:function(t,o,n,i){t.$http.delete(o.url,{params:api.params,headers:{"Content-Type":"application/json"},emulateJSON:!0}).then(function(t){console.log(t.data),2e4==t.data.code?n&&n(t.data):i&&i(t.data)}).catch(function(t){console.log(t),console.log("服务器连接失败")})}};Vue.http.interceptors.push(function(t,o){var n=layer.load(3),i=window.localStorage.getItem("accessToken");i&&(t.headers.accessToken=i);var r=v();r&&(t.headers.nonceStr=r.nonceStr,t.headers.timeStamp=r.timeStamp,t.headers.sign=r.sign),console.log(r),o(function(t){return t.data=t.json(),49001==t.data.code?(layer.msg("请求失败",{icon:2}),window.location.href=t.data.loginUrl,!0):49002==t.data.code?(layer.msg("请求失败",{icon:2}),window.location.href=window.host_index,!0):void Vue.nextTick(function(){layer.close(n),setTimeout(function(){},500)})})});var m=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},v=function(){var t=m(),o=(new Date).getTime(),i=n("apiSecrect="+p+"&nonceStr="+t+"&timeStamp="+o);return{nonceStr:t,timeStamp:o,sign:i}},y=0,g=8},66:function(t,o,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t){return y.charAt(t)}function e(t){var o,n,i="";for(o=0;o+3<=t.length;o+=3)n=parseInt(t.substring(o,o+3),16),i+=m.charAt(n>>6)+m.charAt(63&n);for(o+1==t.length?(n=parseInt(t.substring(o,o+1),16),i+=m.charAt(n<<2)):o+2==t.length&&(n=parseInt(t.substring(o,o+2),16),i+=m.charAt(n>>2)+m.charAt((3&n)<<4));(3&i.length)>0;)i+=v;return i}function s(t){var o,n,i,e="",s=0;for(o=0;o<t.length&&t.charAt(o)!=v;++o)i=m.indexOf(t.charAt(o)),i<0||(0==s?(e+=r(i>>2),n=3&i,s=1):1==s?(e+=r(n<<2|i>>4),n=15&i,s=2):2==s?(e+=r(n),e+=r(i>>2),n=3&i,s=3):(e+=r(n<<2|i>>4),e+=r(15&i),s=0));return 1==s&&(e+=r(n<<2)),e}var a=n(3),u=i(a),h=n(7),c=(i(h),n(8)),f=i(c),l=n(9),p=n(67),d=i(p),m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",v="=",y="0123456789abcdefghijklmnopqrstuvwxyz";new Vue({compiled:function(){},ready:function(){this.getToken()},data:{publicKey:{},token:"",username:"",password:""},computed:{},watch:{username:function(t){t||f.default.tips("请输入用户名","#username")},password:function(t){t||f.default.tips("请输入密码","#password")}},methods:{getToken:function(){var t=this,o={url:l.API_URLS.public_key};l.request.fnGet(t,o,function(o){t.publicKey=o.data,console.log(t.publicKey),u.default.pushLocal("token",t.publicKey.tmpKey);var n=new d.default;n.setPublic(s(t.publicKey.modulus),s(t.publicKey.exponent));var i=e(n.encrypt(t.password));console.log(i)})},toLogin:function(){var t=this,o={url:l.API_URLS.login,data:{username:t.username,enPasswd:t.password,tmpKey:t.token}};return this.username?this.password?void l.request.fnPost(t,o,function(t){console.log(t)},function(t){f.default.msg("用户名密码错误",{icon:2})}):(f.default.tips("请输入密码","#password"),!1):(f.default.tips("请输入用户名","#username"),!1)}}}).$mount("#main")},67:function(t,o,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,o){var n=new f.default(t,o);return n}function e(t,o){if(o<t.length+11)return alert("Message too long for RSA"),null;for(var n=new Array,i=t.length-1;i>=0&&o>0;){var r=t.charCodeAt(i--);r<128?n[--o]=r:r>127&&r<2048?(n[--o]=63&r|128,n[--o]=r>>6|192):(n[--o]=63&r|128,n[--o]=r>>6&63|128,n[--o]=r>>12|224)}n[--o]=0;for(var e=new p.default,s=new Array;o>2;){for(s[0]=0;0==s[0];)e.nextBytes(s);n[--o]=s[0]}return n[--o]=2,n[--o]=0,new f.default(n)}function s(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}function a(t,o){null!=t&&null!=o&&t.length>0&&o.length>0?(this.n=r(t,16),this.e=parseInt(o,16)):alert("Invalid RSA public key")}function u(t){return t.modPowInt(this.e,this.n)}function h(t){var o=e(t,this.n.bitLength()+7>>3);if(null==o)return null;var n=this.doPublic(o);if(null==n)return null;var i=n.toString(16);return 0==(1&i.length)?i:"0"+i}Object.defineProperty(o,"__esModule",{value:!0});var c=n(68),f=i(c),l=n(69),p=i(l);s.prototype.doPublic=u,s.prototype.setPublic=a,s.prototype.encrypt=h,o.default=s},68:function(t,o){"use strict";function n(t,o,n){null!=t&&("number"==typeof t?this.fromNumber(t,o,n):null==o&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,o))}function i(){return new n(null)}function r(t,o,n,i,r,e){for(;--e>=0;){var s=o*this[t++]+n[i]+r;r=Math.floor(s/67108864),n[i++]=67108863&s}return r}function e(t,o,n,i,r,e){for(var s=32767&o,a=o>>15;--e>=0;){var u=32767&this[t],h=this[t++]>>15,c=a*u+h*s;u=s*u+((32767&c)<<15)+n[i]+(1073741823&r),r=(u>>>30)+(c>>>15)+a*h+(r>>>30),n[i++]=1073741823&u}return r}function s(t,o,n,i,r,e){for(var s=16383&o,a=o>>14;--e>=0;){var u=16383&this[t],h=this[t++]>>14,c=a*u+h*s;u=s*u+((16383&c)<<14)+n[i]+r,r=(u>>28)+(c>>14)+a*h,n[i++]=268435455&u}return r}function a(t){return W.charAt(t)}function u(t,o){var n=X[t.charCodeAt(o)];return null==n?-1:n}function h(t){for(var o=this.t-1;o>=0;--o)t[o]=this[o];t.t=this.t,t.s=this.s}function c(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+DV:this.t=0}function f(t){var o=i();return o.fromInt(t),o}function l(t,o){var i;if(16==o)i=4;else if(8==o)i=3;else if(256==o)i=8;else if(2==o)i=1;else if(32==o)i=5;else{if(4!=o)return void this.fromRadix(t,o);i=2}this.t=0,this.s=0;for(var r=t.length,e=!1,s=0;--r>=0;){var a=8==i?255&t[r]:u(t,r);a<0?"-"==t.charAt(r)&&(e=!0):(e=!1,0==s?this[this.t++]=a:s+i>this.DB?(this[this.t-1]|=(a&(1<<this.DB-s)-1)<<s,this[this.t++]=a>>this.DB-s):this[this.t-1]|=a<<s,s+=i,s>=this.DB&&(s-=this.DB))}8==i&&0!=(128&t[0])&&(this.s=-1,s>0&&(this[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),e&&n.ZERO.subTo(this,this)}function p(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t}function d(t){if(this.s<0)return"-"+this.negate().toString(t);var o;if(16==t)o=4;else if(8==t)o=3;else if(2==t)o=1;else if(32==t)o=5;else{if(4!=t)return this.toRadix(t);o=2}var n,i=(1<<o)-1,r=!1,e="",s=this.t,u=this.DB-s*this.DB%o;if(s-- >0)for(u<this.DB&&(n=this[s]>>u)>0&&(r=!0,e=a(n));s>=0;)u<o?(n=(this[s]&(1<<u)-1)<<o-u,n|=this[--s]>>(u+=this.DB-o)):(n=this[s]>>(u-=o)&i,u<=0&&(u+=this.DB,--s)),n>0&&(r=!0),r&&(e+=a(n));return r?e:"0"}function m(){var t=i();return n.ZERO.subTo(this,t),t}function v(){return this.s<0?this.negate():this}function y(t){var o=this.s-t.s;if(0!=o)return o;var n=this.t;if(o=n-t.t,0!=o)return this.s<0?-o:o;for(;--n>=0;)if(0!=(o=this[n]-t[n]))return o;return 0}function g(t){var o,n=1;return 0!=(o=t>>>16)&&(t=o,n+=16),0!=(o=t>>8)&&(t=o,n+=8),0!=(o=t>>4)&&(t=o,n+=4),0!=(o=t>>2)&&(t=o,n+=2),0!=(o=t>>1)&&(t=o,n+=1),n}function T(){return this.t<=0?0:this.DB*(this.t-1)+g(this[this.t-1]^this.s&this.DM)}function b(t,o){var n;for(n=this.t-1;n>=0;--n)o[n+t]=this[n];for(n=t-1;n>=0;--n)o[n]=0;o.t=this.t+t,o.s=this.s}function w(t,o){for(var n=t;n<this.t;++n)o[n-t]=this[n];o.t=Math.max(this.t-t,0),o.s=this.s}function S(t,o){var n,i=t%this.DB,r=this.DB-i,e=(1<<r)-1,s=Math.floor(t/this.DB),a=this.s<<i&this.DM;for(n=this.t-1;n>=0;--n)o[n+s+1]=this[n]>>r|a,a=(this[n]&e)<<i;for(n=s-1;n>=0;--n)o[n]=0;o[s]=a,o.t=this.t+s+1,o.s=this.s,o.clamp()}function D(t,o){o.s=this.s;var n=Math.floor(t/this.DB);if(n>=this.t)return void(o.t=0);var i=t%this.DB,r=this.DB-i,e=(1<<i)-1;o[0]=this[n]>>i;for(var s=n+1;s<this.t;++s)o[s-n-1]|=(this[s]&e)<<r,o[s-n]=this[s]>>i;i>0&&(o[this.t-n-1]|=(this.s&e)<<r),o.t=this.t-n,o.clamp()}function A(t,o){for(var n=0,i=0,r=Math.min(t.t,this.t);n<r;)i+=this[n]-t[n],o[n++]=i&this.DM,i>>=this.DB;if(t.t<this.t){for(i-=t.s;n<this.t;)i+=this[n],o[n++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;n<t.t;)i-=t[n],o[n++]=i&this.DM,i>>=this.DB;i-=t.s}o.s=i<0?-1:0,i<-1?o[n++]=this.DV+i:i>0&&(o[n++]=i),o.t=n,o.clamp()}function M(t,o){var i=this.abs(),r=t.abs(),e=i.t;for(o.t=e+r.t;--e>=0;)o[e]=0;for(e=0;e<r.t;++e)o[e+i.t]=i.am(0,r[e],o,e,0,i.t);o.s=0,o.clamp(),this.s!=t.s&&n.ZERO.subTo(o,o)}function _(t){for(var o=this.abs(),n=t.t=2*o.t;--n>=0;)t[n]=0;for(n=0;n<o.t-1;++n){var i=o.am(n,o[n],t,2*n,0,1);(t[n+o.t]+=o.am(n+1,2*o[n],t,2*n+1,i,o.t-n-1))>=o.DV&&(t[n+o.t]-=o.DV,t[n+o.t+1]=1)}t.t>0&&(t[t.t-1]+=o.am(n,o[n],t,2*n,0,1)),t.s=0,t.clamp()}function B(t,o,r){var e=t.abs();if(!(e.t<=0)){var s=this.abs();if(s.t<e.t)return null!=o&&o.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=i());var a=i(),u=this.s,h=t.s,c=this.DB-g(e[e.t-1]);c>0?(e.lShiftTo(c,a),s.lShiftTo(c,r)):(e.copyTo(a),s.copyTo(r));var f=a.t,l=a[f-1];if(0!=l){var p=l*(1<<this.F1)+(f>1?a[f-2]>>this.F2:0),d=this.FV/p,m=(1<<this.F1)/p,v=1<<this.F2,y=r.t,T=y-f,b=null==o?i():o;for(a.dlShiftTo(T,b),r.compareTo(b)>=0&&(r[r.t++]=1,r.subTo(b,r)),n.ONE.dlShiftTo(f,b),b.subTo(a,a);a.t<f;)a[a.t++]=0;for(;--T>=0;){var w=r[--y]==l?this.DM:Math.floor(r[y]*d+(r[y-1]+v)*m);if((r[y]+=a.am(0,w,r,T,0,f))<w)for(a.dlShiftTo(T,b),r.subTo(b,r);r[y]<--w;)r.subTo(b,r)}null!=o&&(r.drShiftTo(f,o),u!=h&&n.ZERO.subTo(o,o)),r.t=f,r.clamp(),c>0&&r.rShiftTo(c,r),u<0&&n.ZERO.subTo(r,r)}}}function x(t){var o=i();return this.abs().divRemTo(t,null,o),this.s<0&&o.compareTo(n.ZERO)>0&&t.subTo(o,o),o}function O(t){this.m=t}function R(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t}function j(t){return t}function P(t){t.divRemTo(this.m,null,t)}function V(t,o,n){t.multiplyTo(o,n),this.reduce(n)}function k(t,o){t.squareTo(o),this.reduce(o)}function E(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var o=3&t;return o=o*(2-(15&t)*o)&15,o=o*(2-(255&t)*o)&255,o=o*(2-((65535&t)*o&65535))&65535,o=o*(2-t*o%this.DV)%this.DV,o>0?this.DV-o:-o}function I(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function q(t){var o=i();return t.abs().dlShiftTo(this.m.t,o),o.divRemTo(this.m,null,o),t.s<0&&o.compareTo(n.ZERO)>0&&this.m.subTo(o,o),o}function C(t){var o=i();return t.copyTo(o),this.reduce(o),o}function N(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var o=0;o<this.m.t;++o){var n=32767&t[o],i=n*this.mpl+((n*this.mph+(t[o]>>15)*this.mpl&this.um)<<15)&t.DM;for(n=o+this.m.t,t[n]+=this.m.am(0,i,t,o,0,this.m.t);t[n]>=t.DV;)t[n]-=t.DV,t[++n]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)}function F(t,o){t.squareTo(o),this.reduce(o)}function K(t,o,n){t.multiplyTo(o,n),this.reduce(n)}function Z(){return 0==(this.t>0?1&this[0]:this.s)}function L(t,o){if(t>4294967295||t<1)return n.ONE;var r=i(),e=i(),s=o.convert(this),a=g(t)-1;for(s.copyTo(r);--a>=0;)if(o.sqrTo(r,e),(t&1<<a)>0)o.mulTo(e,s,r);else{var u=r;r=e,e=u}return o.revert(r)}function z(t,o){var n;return n=t<256||o.isEven()?new O(o):new I(o),this.exp(t,n)}Object.defineProperty(o,"__esModule",{value:!0});var U,$=0xdeadbeefcafe,G=15715070==(16777215&$);G&&"Microsoft Internet Explorer"==navigator.appName?(n.prototype.am=e,U=30):G&&"Netscape"!=navigator.appName?(n.prototype.am=r,U=26):(n.prototype.am=s,U=28),n.prototype.DB=U,n.prototype.DM=(1<<U)-1,n.prototype.DV=1<<U;var J=52;n.prototype.FV=Math.pow(2,J),n.prototype.F1=J-U,n.prototype.F2=2*U-J;var H,Q,W="0123456789abcdefghijklmnopqrstuvwxyz",X=new Array;for(H="0".charCodeAt(0),Q=0;Q<=9;++Q)X[H++]=Q;for(H="a".charCodeAt(0),Q=10;Q<36;++Q)X[H++]=Q;for(H="A".charCodeAt(0),Q=10;Q<36;++Q)X[H++]=Q;O.prototype.convert=R,O.prototype.revert=j,O.prototype.reduce=P,O.prototype.mulTo=V,O.prototype.sqrTo=k,I.prototype.convert=q,I.prototype.revert=C,I.prototype.reduce=N,I.prototype.mulTo=K,I.prototype.sqrTo=F,n.prototype.copyTo=h,n.prototype.fromInt=c,n.prototype.fromString=l,n.prototype.clamp=p,n.prototype.dlShiftTo=b,n.prototype.drShiftTo=w,n.prototype.lShiftTo=S,n.prototype.rShiftTo=D,n.prototype.subTo=A,n.prototype.multiplyTo=M,n.prototype.squareTo=_,n.prototype.divRemTo=B,n.prototype.invDigit=E,n.prototype.isEven=Z,n.prototype.exp=L,n.prototype.toString=d,n.prototype.negate=m,n.prototype.abs=v,n.prototype.compareTo=y,n.prototype.bitLength=T,n.prototype.mod=x,n.prototype.modPowInt=z,n.ZERO=f(0),n.ONE=f(1),o.default=n},69:function(t,o,n){"use strict";function i(t){h[c++]^=255&t,h[c++]^=t>>8&255,h[c++]^=t>>16&255,h[c++]^=t>>24&255,c>=f.rng_psize&&(c-=f.rng_psize)}function r(){i((new Date).getTime())}function e(){if(null==u){for(r(),u=(0,f.prng_newstate)(),u.init(h),c=0;c<h.length;++c)h[c]=0;c=0}return u.next()}function s(t){var o;for(o=0;o<t.length;++o)t[o]=e()}function a(){}Object.defineProperty(o,"__esModule",{value:!0});var u,h,c,f=n(70);if(null==h){h=new Array,c=0;var l;if("Netscape"==navigator.appName&&navigator.appVersion<"5"&&window.crypto){var p=window.crypto.random(32);for(l=0;l<p.length;++l)h[c++]=255&p.charCodeAt(l)}for(;c<f.rng_psize;)l=Math.floor(65536*Math.random()),h[c++]=l>>>8,h[c++]=255&l;c=0,r()}a.prototype.nextBytes=s,o.default=a},70:function(t,o){"use strict";function n(){this.i=0,this.j=0,this.S=new Array}function i(t){var o,n,i;for(o=0;o<256;++o)this.S[o]=o;for(n=0,o=0;o<256;++o)n=n+this.S[o]+t[o%t.length]&255,i=this.S[o],this.S[o]=this.S[n],this.S[n]=i;this.i=0,this.j=0}function r(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]}function e(){return new n}Object.defineProperty(o,"__esModule",{value:!0}),n.prototype.init=i,n.prototype.next=r;var s=256;o.rng_psize=s,o.prng_newstate=e}});