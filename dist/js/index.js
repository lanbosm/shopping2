webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _header = __webpack_require__(5);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _CustomMain = __webpack_require__(266);
	
	var _CustomMain2 = _interopRequireDefault(_CustomMain);
	
	var _ShopAdminMain = __webpack_require__(286);
	
	var _ShopAdminMain2 = _interopRequireDefault(_ShopAdminMain);
	
	var _CouponMain = __webpack_require__(291);
	
	var _CouponMain2 = _interopRequireDefault(_CouponMain);
	
	var _RechargeMain = __webpack_require__(296);
	
	var _RechargeMain2 = _interopRequireDefault(_RechargeMain);
	
	var _MsgModal = __webpack_require__(306);
	
	var _MsgModal2 = _interopRequireDefault(_MsgModal);
	
	var _LogModal = __webpack_require__(313);
	
	var _LogModal2 = _interopRequireDefault(_LogModal);
	
	var _CashModal = __webpack_require__(318);
	
	var _CashModal2 = _interopRequireDefault(_CashModal);
	
	var _AppCenterloading = __webpack_require__(163);
	
	var _AppCenterloading2 = _interopRequireDefault(_AppCenterloading);
	
	var _store = __webpack_require__(263);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _router = __webpack_require__(82);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//定义头组件
	_vue2.default.component('app-header', _header2.default);
	
	//定义顾客组件
	_vue2.default.component('layer-custom', _CustomMain2.default);
	
	//定义导购组件
	_vue2.default.component('layer-shopadmin', _ShopAdminMain2.default);
	
	//定义优惠券组件
	_vue2.default.component('layer-coupon', _CouponMain2.default);
	
	//定义充值组件
	_vue2.default.component('layer-recharge', _RechargeMain2.default);
	
	//定义msg组件
	_vue2.default.component('layer-msg', _MsgModal2.default);
	
	//定义日记组件
	_vue2.default.component('layer-log', _LogModal2.default);
	
	//定义备用金组件
	_vue2.default.component('layer-cash', _CashModal2.default);
	
	//自定义属性
	_vue2.default.islogin = true;
	
	_router2.default.beforeEach(function (_ref, from, next) {
	    var path = _ref.path;
	
	
	    // const {auth = true} = meta      // meta代表的是to中的meta对象，path代表的是to中的path对象
	
	    var auth = true;
	
	    var isLogin = Boolean(_store2.default.state.login); // true用户已登录， false用户未登录　
	
	
	    if (auth && !isLogin && path !== '/login') {
	        // auth 代表需要通过用户身份验证，默认为true，代表需要被验证， false为不用检验
	        return next({ path: '/login' }); //  跳转到login页面
	    }
	
	    return next(); // 进行下一个钩子函数
	});
	
	_router2.default.afterEach(function (route) {
	    _store2.default.state.appLoading = true;
	    // alert(Vue.islogin);
	    setTimeout(function () {
	        _store2.default.state.appLoading = false;
	    }, 100);
	});
	
	//vue实例
	var vm = new _vue2.default({
	    store: _store2.default,
	    router: _router2.default,
	    el: '#main',
	    data: { //这里不是组件模式 不return
	        showShopAdminModal: false,
	        showCustomModal: false,
	        showCouponModal: false,
	        showRechargeModal: false,
	        showMsgModal: false,
	        showLogModal: false,
	        showCashModal: false
	    },
	    components: {
	        AppCenterLoading: _AppCenterloading2.default
	    },
	    computed: {
	        login: function login() {
	            return this.$store.state.login;
	        },
	        waiting: function waiting() {
	            return this.$store.state.waiting;
	        }
	    },
	    created: function created() {
	        var accessToken = window.localStorage.getItem("accessToken");
	        this.$store.state.login = accessToken;
	
	        // 关闭窗口时弹出确认提示
	        // $(window).bind('beforeunload', function(){
	        //     return '您可能有数据没有保存';
	        // });
	        //起始路由
	        //this.$router.push('/log/products');
	        // this.$router.push('/log/sales');
	
	        //this.$router.push('/');
	
	        this.$router.push('/');
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.2.2
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
	}(this, (function () { 'use strict';
	
	/*  */
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}
	
	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});
	
	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; };
	
	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}
	
	/*  */
	
	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',
	
	  /**
	   * Whether to record perf
	   */
	  performance: "development" !== 'production',
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],
	
	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],
	
	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	
	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}
	
	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	
	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();
	
	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };
	
	    return Set;
	  }());
	}
	
	var perf;
	
	{
	  perf = inBrowser && window.performance;
	  if (perf && (!perf.mark || !perf.measure)) {
	    perf = undefined;
	  }
	}
	
	/*  */
	
	var emptyObject = Object.freeze({});
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}
	
	var warn = noop;
	var tip = noop;
	var formatComponentName;
	
	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };
	
	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };
	
	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	
	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }
	
	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };
	
	  var formatLocation = function (str) {
	    if (str === "<Anonymous>") {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}
	
	/*  */
	
	
	var uid$1 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop();
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target)) {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = target.__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target)) {
	    target.splice(key, 1);
	    return
	  }
	  var ob = target.__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;
	
	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};
	
	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};
	
	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ("development" !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}
	
	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}
	
	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    {
	      warn(("Error in " + info + ":"), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var initProxy;
	
	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );
	
	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };
	
	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);
	
	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }
	
	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };
	
	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};
	
	var prototypeAccessors = { child: {} };
	
	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};
	
	Object.defineProperties( VNode.prototype, prototypeAccessors );
	
	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}
	
	/*  */
	
	var normalizeEvent = cached(function (name) {
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture
	  }
	});
	
	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;
	
	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.fns) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}
	
	/*  */
	
	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];
	
	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }
	
	  if (!oldHook) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (oldHook.fns && oldHook.merged) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }
	
	  invoker.merged = true;
	  def[hookKey] = invoker;
	}
	
	/*  */
	
	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:
	
	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}
	
	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}
	
	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}
	
	/*  */
	
	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}
	
	var target;
	
	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}
	
	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}
	
	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}
	
	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };
	
	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}
	
	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}
	
	function resolveScopedSlots (
	  fns
	) {
	  var res = {};
	  for (var i = 0; i < fns.length; i++) {
	    res[fns[i][0]] = fns[i][1];
	  }
	  return res
	}
	
	/*  */
	
	var activeInstance = null;
	
	function initLifecycle (vm) {
	  var options = vm.$options;
	
	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }
	
	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;
	
	  vm.$children = [];
	  vm.$refs = {};
	
	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };
	
	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}
	
	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');
	
	  var updateComponent;
	  /* istanbul ignore if */
	  if ("development" !== 'production' && config.performance && perf) {
	    updateComponent = function () {
	      var name = vm._name;
	      var startTag = "start " + name;
	      var endTag = "end " + name;
	      perf.mark(startTag);
	      var vnode = vm._render();
	      perf.mark(endTag);
	      perf.measure((name + " render"), startTag, endTag);
	      perf.mark(startTag);
	      vm._update(vnode, hydrating);
	      perf.mark(endTag);
	      perf.measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }
	
	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;
	
	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}
	
	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );
	
	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;
	
	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}
	
	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}
	
	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive == null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}
	
	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}
	
	/*  */
	
	
	var queue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }
	
	  // call updated hooks
	  index = queue.length;
	  while (index--) {
	    watcher = queue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	
	  resetSchedulerState();
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}
	
	/*  */
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}
	
	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}
	
	/*  */
	
	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};
	
	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}
	
	var isReservedProp = { key: 1, ref: 1, slot: 1 };
	
	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };
	
	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}
	
	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}
	
	var computedWatcherOptions = { lazy: true };
	
	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);
	
	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);
	
	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    }
	  }
	}
	
	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}
	
	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}
	
	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);
	
	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}
	
	/*  */
	
	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
	var hooksToMerge = Object.keys(hooks);
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }
	
	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }
	
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }
	
	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);
	
	  data = data || {};
	
	  // transform component v-model data into props & events
	  if (data.model) {
	    transformModel(Ctor.options, data);
	  }
	
	  // extract props
	  var propsData = extractProps(data, Ctor);
	
	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;
	
	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	    var child = vnode.componentInstance = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}
	
	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.componentInstance = oldVnode.componentInstance;
	  updateChildComponent(
	    child,
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}
	
	function insert (vnode) {
	  if (!vnode.componentInstance._isMounted) {
	    vnode.componentInstance._isMounted = true;
	    callHook(vnode.componentInstance, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    activateChildComponent(vnode.componentInstance, true /* direct */);
	  }
	}
	
	function destroy (vnode) {
	  if (!vnode.componentInstance._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.componentInstance.$destroy();
	    } else {
	      deactivateChildComponent(vnode.componentInstance, true /* direct */);
	    }
	  }
	}
	
	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;
	
	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };
	
	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };
	
	    var res = factory(resolve, reject);
	
	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }
	
	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}
	
	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}
	
	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}
	
	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (on[event]) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}
	
	/*  */
	
	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}
	
	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  return ret
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}
	
	/*  */
	
	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      "development" !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          data[key] = value[key];
	        } else {
	          var type = data.attrs && data.attrs.type;
	          var hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}
	
	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}
	
	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}
	
	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}
	
	/*  */
	
	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };
	
	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }
	
	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	
	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = _toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}
	
	/*  */
	
	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}
	
	function initInjections (vm) {
	  var inject = vm.$options.inject;
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);
	
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          vm[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	    }
	  }
	}
	
	/*  */
	
	var uid = 0;
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && perf) {
	      perf.mark('init');
	    }
	
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');
	
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && perf) {
	      vm._name = formatComponentName(vm, false);
	      perf.mark('init end');
	      perf.measure(((vm._name) + " init"), 'init', 'init end');
	    }
	
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}
	
	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}
	
	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}
	
	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], sealed[key]);
	    }
	  }
	  return modified
	}
	
	function dedupe (latest, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    for (var i = 0; i < latest.length; i++) {
	      if (sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}
	
	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}
	
	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	
	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }
	
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);
	
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}
	
	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}
	
	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}
	
	/*  */
	
	var patternTypes = [String, RegExp];
	
	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}
	
	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (pattern instanceof RegExp) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}
	
	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },
	
	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },
	
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	};
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	
	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };
	
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;
	
	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });
	
	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;
	
	  extend(Vue.options.components, builtInComponents);
	
	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}
	
	initGlobalAPI(Vue$3);
	
	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});
	
	Vue$3.version = '2.2.2';
	
	/*  */
	
	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);
	
	var isPreTag = function (tag) { return tag === 'pre'; };
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}
	
	/*  */
	
	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild (node, child) {
	  node.removeChild(child);
	}
	
	function appendChild (node, child) {
	  node.appendChild(child);
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text;
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }
	
	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyNode = new VNode('', {}, []);
	
	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	function isUndef (s) {
	  return s == null
	}
	
	function isDef (s) {
	  return s != null
	}
	
	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }
	
	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }
	
	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }
	
	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	
	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }
	
	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }
	
	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }
	
	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }
	
	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }
	
	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }
	
	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');
	
	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }
	
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];
	
	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );
	
	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }
	
	        if (parentElm$1 !== null) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};
	
	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}
	
	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];
	
	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }
	
	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }
	
	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }
	
	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}
	
	var emptyModifiers = Object.create(null);
	
	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}
	
	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}
	
	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	];
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }
	
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode);
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	};
	
	/*  */
	
	var validDivisionCharRE = /[\w).+\-_$\]]/;
	
	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;
	
	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }
	
	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }
	
	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }
	
	  return expression
	}
	
	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}
	
	/*  */
	
	function baseWarn (msg) {
	  console.error(("[Vue compiler]: " + msg));
	}
	
	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}
	
	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}
	
	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}
	
	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}
	
	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}
	
	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}
	
	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}
	
	/*  */
	
	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
	  el,
	  value,
	  modifiers
	) {
	  var ref = modifiers || {};
	  var number = ref.number;
	  var trim = ref.trim;
	
	  var baseValueExpression = '$$v';
	  var valueExpression = baseValueExpression;
	  if (trim) {
	    valueExpression =
	      "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	  var assignment = genAssignmentCode(value, valueExpression);
	
	  el.model = {
	    value: ("(" + value + ")"),
	    expression: ("\"" + value + "\""),
	    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	  };
	}
	
	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
	  value,
	  assignment
	) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}
	
	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */
	
	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;
	
	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;
	
	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }
	
	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }
	
	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}
	
	function next () {
	  return str.charCodeAt(++index$1)
	}
	
	function eof () {
	  return index$1 >= len
	}
	
	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}
	
	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}
	
	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}
	
	/*  */
	
	var warn$1;
	
	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';
	
	function model (
	  el,
	  dir,
	  _warn
	) {
	  warn$1 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$1(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	    // inputs with type="file" are read only and setting the input's
	    // value will throw an error.
	    if (tag === 'input' && type === 'file') {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	        "File inputs are read only. Use a v-on:change listener instead."
	      );
	    }
	  }
	
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else if (tag === 'input' || tag === 'textarea') {
	    genDefaultModel(el, value, modifiers);
	  } else if (!config.isReservedTag(tag)) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else {
	    warn$1(
	      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	      "v-model is not supported on this element type. " +
	      'If you are working with contenteditable, it\'s recommended to ' +
	      'wrap a library dedicated for that purpose inside a custom component.'
	    );
	  }
	
	  // ensure runtime directive metadata
	  return true
	}
	
	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, CHECKBOX_RADIO_TOKEN,
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}
	
	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
	}
	
	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var selectedVal = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})";
	
	  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	  var code = "var $$selectedVal = " + selectedVal + ";";
	  code = code + " " + (genAssignmentCode(value, assignment));
	  addHandler(el, 'change', code, null, true);
	}
	
	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var needCompositionGuard = !lazy && type !== 'range';
	  var event = lazy
	    ? 'change'
	    : type === 'range'
	      ? RANGE_TOKEN
	      : 'input';
	
	  var valueExpression = '$event.target.value';
	  if (trim) {
	    valueExpression = "$event.target.value.trim()";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	
	  var code = genAssignmentCode(value, valueExpression);
	  if (needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	
	  addProp(el, 'value', ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}
	
	/*  */
	
	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (on[RANGE_TOKEN]) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (on[CHECKBOX_RADIO_TOKEN]) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}
	
	var target$1;
	
	function add$1 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}
	
	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}
	
	// check platforms/web/util/attrs.js acceptValue
	
	
	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}
	
	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}
	
	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};
	
	/*  */
	
	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});
	
	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}
	
	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}
	
	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;
	
	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }
	
	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }
	
	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}
	
	/*  */
	
	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};
	
	var prefixes = ['Webkit', 'Moz', 'ms'];
	
	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});
	
	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	
	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }
	
	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};
	
	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;
	
	  var style = normalizeStyleBinding(vnode.data.style) || {};
	
	  vnode.data.style = style.__ob__ ? extend({}, style) : style;
	
	  var newStyle = getStyle(vnode, true);
	
	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	};
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}
	
	/*  */
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});
	
	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';
	
	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}
	
	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;
	
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}
	
	var transformRE = /\b(transform|all)(,|$)/;
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }
	
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;
	
	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;
	
	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;
	
	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );
	
	  if ("development" !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }
	
	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm;
	
	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);
	
	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );
	
	  if ("development" !== 'production' && explicitLeaveDuration != null) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });
	
	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}
	
	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}
	
	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}
	
	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (!fn) { return false }
	  var invokerFns = fn.fns;
	  if (invokerFns) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}
	
	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}
	
	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);
	
	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}
	
	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};
	
	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true;
	}
	
	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },
	
	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};
	
	var platformDirectives = {
	  model: model$1,
	  show: show
	};
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }
	
	    var mode = this.mode;
	
	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }
	
	    var rawChild = children[0];
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;
	
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }
	
	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }
	
	    return rawChild
	  }
	};
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);
	
	delete props.mode;
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);
	
	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};
	
	/*  */
	
	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;
	
	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);
	
	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;
	
	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if ("development" !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if ("development" !== 'production' &&
	      config.productionTip !== false &&
	      inBrowser && typeof console !== 'undefined') {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);
	
	/*  */
	
	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}
	
	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;
	
	/*  */
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr'
	);
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track'
	);
	
	/*  */
	
	var decoder;
	
	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}
	
	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */
	
	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */
	
	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);
	
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;
	
	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});
	
	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var reCache = {};
	
	var decodingMap = {
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&amp;': '&',
	  '&#10;': '\n'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;
	
	function decodeAttr (value, shouldDecodeNewlines) {
	  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	  return value.replace(re, function (match) { return decodingMap[match]; })
	}
	
	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isScriptOrStyle(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');
	
	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }
	
	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');
	
	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }
	
	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }
	
	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }
	
	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }
	
	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd >= 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }
	
	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }
	
	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }
	
	    if (html === last) {
	      options.chars && options.chars(html);
	      if ("development" !== 'production' && !stack.length && options.warn) {
	        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
	      }
	      break
	    }
	  }
	
	  // Clean up any remaining tags
	  parseEndTag();
	
	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }
	
	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }
	
	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;
	
	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }
	
	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;
	
	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }
	
	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	    }
	
	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }
	
	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }
	
	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }
	
	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }
	
	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if ("development" !== 'production' &&
	            (i > pos || !tagName) &&
	            options.warn) {
	          options.warn(
	            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
	          );
	        }
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }
	
	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}
	
	/*  */
	
	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});
	
	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}
	
	/*  */
	
	var dirRE = /^v-|^@|^:/;
	var onRE = /^@|^v-on:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;
	
	var decodeHTMLCached = cached(decode);
	
	// configurable state
	var warn$2;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;
	
	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$2 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	
	  function endPre (element) {
	    // check pre state
	    if (element.pre) {
	      inVPre = false;
	    }
	    if (platformIsPreTag(element.tag)) {
	      inPre = false;
	    }
	  }
	
	  parseHTML(template, {
	    warn: warn$2,
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
	
	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }
	
	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }
	
	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$2(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }
	
	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }
	
	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);
	
	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;
	
	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }
	
	      function checkRootConstraints (el) {
	        if ("development" !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$2(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes.'
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$2(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements.'
	            );
	          }
	        }
	      }
	
	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if ("development" !== 'production' && !warned) {
	          warned = true;
	          warn$2(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      } else {
	        endPre(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },
	
	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      endPre(element);
	    },
	
	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$2(
	            'Component template requires a root element, rather than just text.'
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	          children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}
	
	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}
	
	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}
	
	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}
	
	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}
	
	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$2(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}
	
	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}
	
	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$2(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}
	
	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$2(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}
	
	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}
	
	function processOnce (el) {
	  var once$$1 = getAndRemoveAttr(el, 'v-once');
	  if (once$$1 != null) {
	    el.once = true;
	  }
	}
	
	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$2(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}
	
	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}
	
	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$2(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}
	
	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}
	
	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}
	
	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$2('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}
	
	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}
	
	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;
	
	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}
	
	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$2(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}
	
	/*  */
	
	var isStaticKey;
	var isPlatformReservedTag;
	
	var genStaticKeysCached = cached(genStaticKeys$1);
	
	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic$1(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}
	
	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}
	
	function markStatic$1 (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic$1(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}
	
	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}
	
	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}
	
	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}
	
	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}
	
	/*  */
	
	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};
	
	// #4868: modifiers that prevent the execution of the listener
	// need to explicitly return null so that we can determine whether to remove
	// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };
	
	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: genGuard("$event.target !== $event.currentTarget"),
	  ctrl: genGuard("!$event.ctrlKey"),
	  shift: genGuard("!$event.shiftKey"),
	  alt: genGuard("!$event.altKey"),
	  meta: genGuard("!$event.metaKey"),
	  left: genGuard("'button' in $event && $event.button !== 0"),
	  middle: genGuard("'button' in $event && $event.button !== 1"),
	  right: genGuard("'button' in $event && $event.button !== 2")
	};
	
	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}
	
	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  }
	
	  if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  }
	
	  var isMethodPath = simplePathRE.test(handler.value);
	  var isFunctionExpression = fnExpRE.test(handler.value);
	
	  if (!handler.modifiers) {
	    return isMethodPath || isFunctionExpression
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}") // inline statement
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	        // left/right
	        if (keyCodes[key]) {
	          keys.push(key);
	        }
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code += genKeyFilter(keys);
	    }
	    var handlerCode = isMethodPath
	      ? handler.value + '($event)'
	      : isFunctionExpression
	        ? ("(" + (handler.value) + ")($event)")
	        : handler.value;
	    return ("function($event){" + code + handlerCode + "}")
	  }
	}
	
	function genKeyFilter (keys) {
	  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}
	
	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}
	
	/*  */
	
	function bind$1 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}
	
	/*  */
	
	var baseDirectives = {
	  bind: bind$1,
	  cloak: noop
	};
	
	/*  */
	
	// configurable state
	var warn$3;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;
	
	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$3 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}
	
	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);
	
	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}
	
	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}
	
	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$3(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}
	
	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}
	
	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }
	
	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }
	
	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}
	
	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	
	  if (
	    "development" !== 'production' &&
	    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
	  ) {
	    warn$3(
	      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	      "v-for should have explicit keys. " +
	      "See https://vuejs.org/guide/list.html#key for more info.",
	      true /* tip */
	    );
	  }
	
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}
	
	function genData (el) {
	  var data = '{';
	
	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }
	
	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // component v-model
	  if (el.model) {
	    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}
	
	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$3);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}
	
	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$3('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}
	
	function genScopedSlots (slots) {
	  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
	}
	
	function genScopedSlot (key, el) {
	  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}]"
	}
	
	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
	    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
	  }
	}
	
	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}
	
	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}
	
	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}
	
	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}
	
	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}
	
	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}
	
	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}
	
	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}
	
	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}
	
	/*  */
	
	// these keywords should not appear inside expressions, but operators like
	// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	
	// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
	  'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
	
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}
	
	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else if (onRE.test(name)) {
	            checkEvent(value, (name + "=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}
	
	function checkEvent (exp, text, errors) {
	  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
	  if (keywordMatch) {
	    errors.push(
	      "avoid using JavaScript unary operator as property name: " +
	      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	    );
	  }
	  checkExpression(exp, text, errors);
	}
	
	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}
	
	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
	  }
	}
	
	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	      );
	    } else {
	      errors.push(("invalid expression: " + (text.trim())));
	    }
	  }
	}
	
	/*  */
	
	function baseCompile (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}
	
	function makeFunction (code, errors) {
	  try {
	    return new Function(code)
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}
	
	function createCompiler (baseOptions) {
	  var functionCompileCache = Object.create(null);
	
	  function compile (
	    template,
	    options
	  ) {
	    var finalOptions = Object.create(baseOptions);
	    var errors = [];
	    var tips = [];
	    finalOptions.warn = function (msg, tip$$1) {
	      (tip$$1 ? tips : errors).push(msg);
	    };
	
	    if (options) {
	      // merge custom modules
	      if (options.modules) {
	        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
	      }
	      // merge custom directives
	      if (options.directives) {
	        finalOptions.directives = extend(
	          Object.create(baseOptions.directives),
	          options.directives
	        );
	      }
	      // copy other options
	      for (var key in options) {
	        if (key !== 'modules' && key !== 'directives') {
	          finalOptions[key] = options[key];
	        }
	      }
	    }
	
	    var compiled = baseCompile(template, finalOptions);
	    {
	      errors.push.apply(errors, detectErrors(compiled.ast));
	    }
	    compiled.errors = errors;
	    compiled.tips = tips;
	    return compiled
	  }
	
	  function compileToFunctions (
	    template,
	    options,
	    vm
	  ) {
	    options = options || {};
	
	    /* istanbul ignore if */
	    {
	      // detect possible CSP restriction
	      try {
	        new Function('return 1');
	      } catch (e) {
	        if (e.toString().match(/unsafe-eval|CSP/)) {
	          warn(
	            'It seems you are using the standalone build of Vue.js in an ' +
	            'environment with Content Security Policy that prohibits unsafe-eval. ' +
	            'The template compiler cannot work in this environment. Consider ' +
	            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	            'templates into render functions.'
	          );
	        }
	      }
	    }
	
	    // check cache
	    var key = options.delimiters
	      ? String(options.delimiters) + template
	      : template;
	    if (functionCompileCache[key]) {
	      return functionCompileCache[key]
	    }
	
	    // compile
	    var compiled = compile(template, options);
	
	    // check compilation errors/tips
	    {
	      if (compiled.errors && compiled.errors.length) {
	        warn(
	          "Error compiling template:\n\n" + template + "\n\n" +
	          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	          vm
	        );
	      }
	      if (compiled.tips && compiled.tips.length) {
	        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	      }
	    }
	
	    // turn code into functions
	    var res = {};
	    var fnGenErrors = [];
	    res.render = makeFunction(compiled.render, fnGenErrors);
	    var l = compiled.staticRenderFns.length;
	    res.staticRenderFns = new Array(l);
	    for (var i = 0; i < l; i++) {
	      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
	    }
	
	    // check function generation errors.
	    // this should only happen if there is a bug in the compiler itself.
	    // mostly for codegen development use
	    /* istanbul ignore if */
	    {
	      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	        warn(
	          "Failed to generate render function:\n\n" +
	          fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;
	
	            return ((err.toString()) + " in\n\n" + code + "\n");
	        }).join('\n'),
	          vm
	        );
	      }
	    }
	
	    return (functionCompileCache[key] = res)
	  }
	
	  return {
	    compile: compile,
	    compileToFunctions: compileToFunctions
	  }
	}
	
	/*  */
	
	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}
	
	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}
	
	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};
	
	/*  */
	
	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }
	
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}
	
	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}
	
	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};
	
	var modules$1 = [
	  klass$1,
	  style$1
	];
	
	/*  */
	
	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	/*  */
	
	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	var directives$1 = {
	  model: model,
	  text: text,
	  html: html
	};
	
	/*  */
	
	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  directives: directives$1,
	  isPreTag: isPreTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  isReservedTag: isReservedTag,
	  getTagNamespace: getTagNamespace,
	  staticKeys: genStaticKeys(modules$1)
	};
	
	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;
	
	/*  */
	
	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});
	
	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);
	
	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }
	
	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && perf) {
	        perf.mark('compile');
	      }
	
	      var ref = compileToFunctions(template, {
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && perf) {
	        perf.mark('compile end');
	        perf.measure(((this._name) + " compile"), 'compile', 'compile end');
	      }
	    }
	  }
	  return mount.call(this, el, hydrating)
	};
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}
	
	Vue$3.compile = compileToFunctions;
	
	return Vue$3;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(6)
	__vue_script__ = __webpack_require__(10)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(265)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b7cacc80/header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"header.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _request = __webpack_require__(15);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	
	    computed: {
	        headIndex: function headIndex() {
	            return this.$store.state.headIndex;
	        },
	        shopData: function shopData() {
	            return this.$store.state.shopData;
	        },
	        msgData: function msgData() {
	            return this.$store.state.msgData;
	        },
	        pageList: function pageList() {
	            return this.$store.state.pageList;
	        },
	        currentPage: function currentPage() {
	            return this.$store.state.currentPage;
	        },
	        member: function member() {
	            return this.$store.state.member;
	        },
	        mode: function mode() {
	            return this.$store.state.currentPage.mode;
	        }
	    },
	    data: function data() {
	        return {
	            timer: null
	        };
	    },
	    created: function created() {
	        var _this = this;
	
	        var shopData = _util2.default.pullLocal("shopData");
	        this.$store.commit('setShopData', shopData);
	
	        if (this.shopData.needSpareCash) {
	            this.shopData.needSpareCash = false;
	            _util2.default.pushLocal("shopData", this.shopData);
	            setTimeout(function () {
	                _this.cash();
	            }, 300);
	        }
	
	        this.$store.dispatch("loadLastData");
	        this.addMsglistener();
	    },
	
	    methods: {
	        addPage: function addPage() {
	            var _this2 = this;
	
	            this.$store.dispatch('addPage').then(function (res) {
	                _this2.$router.replace('/' + _this2.mode);
	            });
	        },
	        removePage: function removePage() {
	            var vm = this;
	            _layer2.default.confirm('确定要删除吗？删除后数据将丢失！', function (index) {
	                vm.$store.dispatch("removePage").then(function (res) {
	                    console.log(res);
	                    _layer2.default.close(index);
	                    vm.$router.replace('/' + vm.mode);
	                });
	            });
	        },
	        switchPage: function switchPage(index) {
	            var _this3 = this;
	
	            this.$store.dispatch('switchPage', index).then(function (res) {
	                _this3.mode = _this3.mode.replace(/\//i, "");
	                _this3.$router.replace('/' + _this3.mode);
	            });
	        },
	        cash: function cash() {
	
	            var vm = this;
	
	            this.$root.showCashModal = true;
	
	            this.$nextTick(function () {
	                _layer2.default.open({
	                    id: 'layui-cash',
	                    type: 1,
	                    shade: 0.01,
	                    anim: 0,
	                    zIndex: 1000,
	                    closeBtn: 2,
	                    title: false,
	                    area: ['auto', 'auto'],
	                    content: $('#layer-cash-box'),
	                    success: function success() {},
	                    end: function end() {
	
	                        vm.$root.showCashModal = false;
	                    }
	                });
	            });
	        },
	        msg: function msg() {
	
	            this.$store.commit("setMode", "message");
	            this.$router.replace('/message');
	        },
	        addMsglistener: function addMsglistener() {
	            var _this4 = this;
	
	            var delay = 10000;
	            var roopOver = false;
	
	            var roopAction = function roopAction() {
	                _this4.$store.state.msgTimer = setTimeout(function () {
	                    console.log("发生请求包");
	                    _this4.$store.dispatch("addListenAllocation").then(function (res) {
	                        if (res.appUnconfirmList.length > 0) {
	                            _this4.$root.showMsgModal = true;
	                            roopOver = true;
	                        }
	
	                        if (!roopOver) {
	                            roopAction();
	                        }
	                    });
	                }, delay);
	            };
	            roopAction();
	        },
	        log: function log() {
	
	            var vm = this;
	
	            this.$root.showLogModal = true;
	
	            this.$nextTick(function () {
	                _layer2.default.open({
	                    id: 'layui-msg',
	                    type: 1,
	                    shade: 0.01,
	                    anim: 0,
	                    zIndex: 1000,
	                    closeBtn: 2,
	                    title: false,
	                    area: ['auto', 'auto'],
	                    content: $('#layer-log-box'),
	                    success: function success() {},
	                    end: function end() {
	
	                        vm.$root.showLogModal = false;
	                    }
	                });
	            });
	        },
	        exit: function exit() {
	            var vm = this;
	            _layer2.default.confirm('确定要退出吗？', function (index) {
	                vm.$store.dispatch('logout', vm.shopData.currentShiftId).then(function () {
	                    _layer2.default.closeAll();
	                    vm.exitFullScreen();
	                });
	            });
	        }
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(12);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//es6 简单导入
	
	// {
	//     "list":[
	//     {
	//         "id":1,
	//         "createDate":1488960097000,
	//         "modifyDate":1488960099000,
	//         "amount":200,
	//         "baseline":300,
	//         "name":"充300送200"
	//     }
	// ],
	//     "code":20000,
	//     "msg":"响应成功"
	// }
	
	//http://blog.csdn.net/lihongxun945/article/details/49031383
	var util = {
	
	    pushLocal: function pushLocal(key, value) {
	        var str = (0, _stringify2.default)(value); // 将对象转换为字符串
	        localStorage.setItem(key, str);
	    },
	
	    pullLocal: function pullLocal(key) {
	        var str = localStorage.getItem(key); //将字符串转换为对象
	        var obj = JSON.parse(str);
	        return obj;
	    },
	
	    delLocal: function delLocal(key) {
	        localStorage.removeItem(key);
	    },
	
	    initLocal: function initLocal() {
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
	
	    // 对象深拷贝
	    deepCopy: function deepCopy(origin, _copy) {
	        var self = arguments.callee,
	            type = Object.prototype.toString.call(origin),
	            copy = origin;
	        switch (type) {
	            case '[object Object]':
	                copy = _copy || {};
	                for (var k in origin) {
	                    if (origin.hasOwnProperty(k)) {
	                        copy[k] = self(origin[k]);
	                    }
	                }
	                break;
	            case '[object Array]':
	                copy = _copy || [];
	                for (var i = 0, l = origin.length; i < l; i++) {
	                    copy[i] = self(origin[i]);
	                }
	                break;
	            case '[object Function]':
	                copy = new Function(origin.toString());
	                break;
	        }
	        return copy;
	    }
	
	};
	
	//  导出
	exports.default = util;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(14)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.request = exports.API_URLS = exports.HOST = undefined;
	
	var _promise = __webpack_require__(16);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(80);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _router = __webpack_require__(82);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _store = __webpack_require__(263);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//http请求
	_vue2.default.use(_vueResource2.default);
	/**
	 * 接口签名
	 * @type {string}
	 */
	/**
	 * Created by Administrator on 2017/2/6.
	 * wiki http://www.cnblogs.com/keepfool/p/5625583.html
	 */
	//wiki es6  http://www.cnblogs.com/dupd/p/5951311.html
	//vue-resource https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
	//then http://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/
	var apiSecrect = "2a97eede0fd2de9791859f61ea6c98dd";
	
	//export const HOST = "http://localhost:3000"; //http://192.168.1.199:82/
	//export const HOST = "http://192.168.1.99:82"; //http://192.168.1.199:82/
	//export const HOST = "http://zgq2017-xwbz.tunnel.qydev.com"; //http://192.168.1.199:82/
	var HOST = exports.HOST = "http://cs.awo123.cn"; //http://192.168.1.199:82/
	
	
	//export const HOST="";
	var API_URLS = exports.API_URLS = {
	    public_key: "/cashier/common/public_key",
	    login: "/cashier/login",
	    login_out: "/cashier/common/log_out",
	    products: "/cashier/member/products",
	    customers: "/cashier/member/customers", //会员模块
	    category: "/cashier/member/products/categories", //会员模块
	    recharge: "/cashier/member/recharge", //充值
	    shop_admins: '/cashier/member/shop_admins', //员工
	    b2b_orders: '/cashier/member/b2b_orders', //订单模块
	    payments: '/cashier/member/payments', //验证支付
	    log_out: '/cashier/common/log_out',
	    cashier_shift: '/cashier/member/cashier_shift' //零售订单
	};
	
	//Vue.http.options.emulateJSON = true; //json模式
	_vue2.default.http.options.timeout = 10000; //500超时
	/**
	 * 四大金刚
	 * @type {{fnGet: request.fnGet, fnPost: request.fnPost, fnPut: request.fnPut, fnDelete: request.fnDelete}}
	 */
	var request = exports.request = {
	    fnGet: function fnGet(apiObj) {
	        return new _promise2.default(function (resolve, reject) {
	            _vue2.default.http.get(HOST + apiObj.url, {
	                params: apiObj.data,
	                headers: { 'Content-Type': 'application/json' }
	            }).then(function (response) {
	                //成功
	                //  console.log(response)
	                resolve(response.data);
	            }).catch(function (response) {
	                //失败
	                reject(response);
	                _layer2.default.alert("服务器连接失败");
	            });
	        });
	    },
	    fnPost2: function fnPost2(apiObj) {
	        return new _promise2.default(function (resolve, reject) {
	            _vue2.default.http.post(HOST + apiObj.url, apiObj.data, {
	                params: apiObj.data,
	                headers: { 'Content-Type': 'application/json' }
	            }).then(function (response) {
	                //成功
	                //  console.log(response)
	                resolve(response.data);
	            }).catch(function (response) {
	                //失败
	                reject(response.data);
	                _layer2.default.alert("服务器连接失败");
	            });
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
	            error(response.data);
	            _layer2.default.alert("服务器连接失败");
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
	            error(response.data);
	            _layer2.default.alert("服务器连接失败");
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
	            error(response.data);
	            _layer2.default.alert("服务器连接失败");
	        });
	    }
	};
	
	/**
	 * 全局Vue拦截器
	 */
	_vue2.default.http.interceptors.push(function (request, next) {
	
	    var accessToken = window.localStorage.getItem("accessToken");
	
	    if (request && accessToken) {
	        if (!request.params) {
	            request.params = {};
	        }
	        request.params['accessToken'] = accessToken + '';
	    }
	
	    var signature = getSign();
	
	    if (signature && _vue2.default.islogin) {
	        _vue2.default.http.headers.common['nonceStr'] = signature.nonceStr + '';
	        _vue2.default.http.headers.common['timeStamp'] = signature.timeStamp + '';
	        _vue2.default.http.headers.common['sign'] = signature.sign + '';
	    }
	
	    next(function (response) {
	
	        if (response.data && response.data.code == 49001) {
	
	            _layer2.default.alert("访问令牌过期 请重新登录", { anim: -1, closeBtn: 0 }, function () {
	                _store2.default.dispatch("logout");
	                _layer2.default.closeAll();
	            });
	            return response;
	        } else if (response.data && response.data.code == 40001) {
	
	            return response;
	        } else if (response.data && response.data.code == 49002) {
	            //window.location.href = './login.html';
	            return response;
	        } else if (response.data && response.data.code == 45004) {
	            _layer2.default.alert("商品库存不足", { closeBtn: 0 });
	            return response;
	        } else {
	            return response;
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(62);
	__webpack_require__(66);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 18 */
/***/ function(module, exports) {



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(20)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(23)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(21)
	  , defined   = __webpack_require__(22);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(24)
	  , $export        = __webpack_require__(25)
	  , redefine       = __webpack_require__(39)
	  , hide           = __webpack_require__(29)
	  , has            = __webpack_require__(40)
	  , Iterators      = __webpack_require__(41)
	  , $iterCreate    = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(58)
	  , getPrototypeOf = __webpack_require__(60)
	  , ITERATOR       = __webpack_require__(59)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(26)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(27)
	  , hide      = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 26 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(28);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(30)
	  , createDesc = __webpack_require__(38);
	module.exports = __webpack_require__(34) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(31)
	  , IE8_DOM_DEFINE = __webpack_require__(33)
	  , toPrimitive    = __webpack_require__(37)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(34) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(32);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(34) && !__webpack_require__(35)(function(){
	  return Object.defineProperty(__webpack_require__(36)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(35)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(32)
	  , document = __webpack_require__(26).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(32);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29);

/***/ },
/* 40 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(43)
	  , descriptor     = __webpack_require__(38)
	  , setToStringTag = __webpack_require__(58)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(29)(IteratorPrototype, __webpack_require__(59)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(31)
	  , dPs         = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(53)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(36)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(57).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(30)
	  , anObject = __webpack_require__(31)
	  , getKeys  = __webpack_require__(45);
	
	module.exports = __webpack_require__(34) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(56);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(40)
	  , toIObject    = __webpack_require__(47)
	  , arrayIndexOf = __webpack_require__(50)(false)
	  , IE_PROTO     = __webpack_require__(53)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(48)
	  , defined = __webpack_require__(22);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(49);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(47)
	  , toLength  = __webpack_require__(51)
	  , toIndex   = __webpack_require__(52);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(21)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(21)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(54)('keys')
	  , uid    = __webpack_require__(55);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(26)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(30).f
	  , has = __webpack_require__(40)
	  , TAG = __webpack_require__(59)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(54)('wks')
	  , uid        = __webpack_require__(55)
	  , Symbol     = __webpack_require__(26).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(40)
	  , toObject    = __webpack_require__(61)
	  , IE_PROTO    = __webpack_require__(53)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(22);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	var global        = __webpack_require__(26)
	  , hide          = __webpack_require__(29)
	  , Iterators     = __webpack_require__(41)
	  , TO_STRING_TAG = __webpack_require__(59)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
	  , Iterators        = __webpack_require__(41)
	  , toIObject        = __webpack_require__(47);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(23)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(24)
	  , global             = __webpack_require__(26)
	  , ctx                = __webpack_require__(27)
	  , classof            = __webpack_require__(67)
	  , $export            = __webpack_require__(25)
	  , isObject           = __webpack_require__(32)
	  , aFunction          = __webpack_require__(28)
	  , anInstance         = __webpack_require__(68)
	  , forOf              = __webpack_require__(69)
	  , speciesConstructor = __webpack_require__(73)
	  , task               = __webpack_require__(74).set
	  , microtask          = __webpack_require__(76)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(59)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(77)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(58)($Promise, PROMISE);
	__webpack_require__(78)(PROMISE);
	Wrapper = __webpack_require__(14)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(79)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(49)
	  , TAG = __webpack_require__(59)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(27)
	  , call        = __webpack_require__(70)
	  , isArrayIter = __webpack_require__(71)
	  , anObject    = __webpack_require__(31)
	  , toLength    = __webpack_require__(51)
	  , getIterFn   = __webpack_require__(72)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(31);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(41)
	  , ITERATOR   = __webpack_require__(59)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(67)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(41);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(31)
	  , aFunction = __webpack_require__(28)
	  , SPECIES   = __webpack_require__(59)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(27)
	  , invoke             = __webpack_require__(75)
	  , html               = __webpack_require__(57)
	  , cel                = __webpack_require__(36)
	  , global             = __webpack_require__(26)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(49)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(26)
	  , macrotask = __webpack_require__(74).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(49)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(29);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(26)
	  , core        = __webpack_require__(14)
	  , dP          = __webpack_require__(30)
	  , DESCRIPTORS = __webpack_require__(34)
	  , SPECIES     = __webpack_require__(59)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(59)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-resource v1.2.1
	 * https://github.com/pagekit/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;
	
	function Promise$1(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0, result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$1.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	/**
	 * Promise adapter.
	 */
	
	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}
	
	function PromiseObj(executor, context) {
	
	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};
	
	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};
	
	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};
	
	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};
	
	var p = PromiseObj.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return Promise.reject(reason);
	        }
	    );
	};
	
	/**
	 * Utility functions.
	 */
	
	var ref = {};
	var hasOwnProperty = ref.hasOwnProperty;
	
	var ref$1 = [];
	var slice = ref$1.slice;
	var debug = false;
	var ntick;
	
	var inBrowser = typeof window !== 'undefined';
	
	var Util = function (ref) {
	    var config = ref.config;
	    var nextTick = ref.nextTick;
	
	    ntick = nextTick;
	    debug = config.debug || !config.silent;
	};
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return ntick(cb, ctx);
	}
	
	function trim(str) {
	    return str ? str.replace(/^\s*|\s*$/g, '') : '';
	}
	
	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}
	
	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}
	
	var isArray = Array.isArray;
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}
	
	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = PromiseObj.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (isArray(obj)) {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	var assign = Object.assign || _assign;
	
	function merge(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });
	
	    return target;
	}
	
	function defaults(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	
	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	
	    });
	
	    return target;
	}
	
	function _assign(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	/**
	 * Root Prefix Transform.
	 */
	
	var root = function (options$$1, next) {
	
	    var url = next(options$$1);
	
	    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
	        url = options$$1.root + '/' + url;
	    }
	
	    return url;
	};
	
	/**
	 * Query Parameter Transform.
	 */
	
	var query = function (options$$1, next) {
	
	    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);
	
	    each(options$$1.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	};
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url), expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];
	
	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null, values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key], result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	/**
	 * URL Template (RFC 6570) Transform.
	 */
	
	var template = function (options) {
	
	    var variables = [], url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};
	
	/**
	 * Service for URL templating.
	 */
	
	function Url(url, params) {
	
	    var self = this || {}, options$$1 = url, transform;
	
	    if (isString(url)) {
	        options$$1 = {url: url, params: params};
	    }
	
	    options$$1 = merge({}, Url.options, self.$options, options$$1);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });
	
	    return transform(options$$1);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [template, query, root];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [], escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    var el = document.createElement('a');
	
	    if (document.documentMode) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options$$1) {
	        return handler.call(vm, options$$1, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj), plain = isPlainObject(obj), hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	/**
	 * XDomain client (Internet Explorer).
	 */
	
	var xdrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xdr = new XDomainRequest(), handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            resolve(request.respondWith(xdr.responseText, {status: status}));
	        };
	
	        request.abort = function () { return xdr.abort(); };
	
	        xdr.open(request.method, request.getUrl());
	
	        if (request.timeout) {
	            xdr.timeout = request.timeout;
	        }
	
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	};
	
	/**
	 * CORS Interceptor.
	 */
	
	var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();
	
	var cors = function (request, next) {
	
	    if (inBrowser) {
	
	        var orgUrl = Url.parse(location.href);
	        var reqUrl = Url.parse(request.getUrl());
	
	        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {
	
	            request.crossOrigin = true;
	            request.emulateHTTP = false;
	
	            if (!SUPPORTS_CORS) {
	                request.client = xdrClient;
	            }
	        }
	    }
	
	    next();
	};
	
	/**
	 * Body Interceptor.
	 */
	
	var body = function (request, next) {
	
	    if (isFormData(request.body)) {
	
	        request.headers.delete('Content-Type');
	
	    } else if (isObject(request.body) || isArray(request.body)) {
	
	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }
	
	    next(function (response) {
	
	        Object.defineProperty(response, 'data', {
	
	            get: function get() {
	                return this.body;
	            },
	
	            set: function set(body) {
	                this.body = body;
	            }
	
	        });
	
	        return response.bodyText ? when(response.text(), function (text) {
	
	            var type = response.headers.get('Content-Type') || '';
	
	            if (type.indexOf('application/json') === 0 || isJson(text)) {
	
	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	
	            } else {
	                response.body = text;
	            }
	
	            return response;
	
	        }) : response;
	
	    });
	};
	
	function isJson(str) {
	
	    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};
	
	    return start && end[start[0]].test(str);
	}
	
	/**
	 * JSONP client (Browser).
	 */
	
	var jsonpClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;
	
	        handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            if (status && window[callback]) {
	                delete window[callback];
	                document.body.removeChild(script);
	            }
	
	            resolve(request.respondWith(body, {status: status}));
	        };
	
	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };
	
	        request.abort = function () {
	            handler({type: 'abort'});
	        };
	
	        request.params[name] = callback;
	
	        if (request.timeout) {
	            setTimeout(request.abort, request.timeout);
	        }
	
	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	};
	
	/**
	 * JSONP Interceptor.
	 */
	
	var jsonp = function (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next();
	};
	
	/**
	 * Before Interceptor.
	 */
	
	var before = function (request, next) {
	
	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }
	
	    next();
	};
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	var method = function (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }
	
	    next();
	};
	
	/**
	 * Header Interceptor.
	 */
	
	var header = function (request, next) {
	
	    var headers = assign({}, Http.headers.common,
	        !request.crossOrigin ? Http.headers.custom : {},
	        Http.headers[toLower(request.method)]
	    );
	
	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });
	
	    next();
	};
	
	/**
	 * XMLHttp client (Browser).
	 */
	
	var SUPPORTS_BLOB = typeof Blob !== 'undefined' && typeof FileReader !== 'undefined';
	
	var xhrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xhr = new XMLHttpRequest(), handler = function (event) {
	
	            var response = request.respondWith(
	                'response' in xhr ? xhr.response : xhr.responseText, {
	                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	                }
	            );
	
	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () { return xhr.abort(); };
	
	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }
	
	        xhr.open(request.method, request.getUrl(), true);
	
	        if (request.timeout) {
	            xhr.timeout = request.timeout;
	        }
	
	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }
	
	        if (!request.crossOrigin) {
	            request.headers.set('X-Requested-With', 'XMLHttpRequest');
	        }
	
	        if ('responseType' in xhr && SUPPORTS_BLOB) {
	            xhr.responseType = 'blob';
	        }
	
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = handler;
	        xhr.send(request.getBody());
	    });
	};
	
	/**
	 * Http client (Node).
	 */
	
	var nodeClient = function (request) {
	
	    var client = __webpack_require__(81);
	
	    return new PromiseObj(function (resolve) {
	
	        var url = request.getUrl();
	        var body = request.getBody();
	        var method = request.method;
	        var headers = {}, handler;
	
	        request.headers.forEach(function (value, name) {
	            headers[name] = value;
	        });
	
	        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {
	
	            var response = request.respondWith(resp.body, {
	                    status: resp.statusCode,
	                    statusText: trim(resp.statusMessage)
	                }
	            );
	
	            each(resp.headers, function (value, name) {
	                response.headers.set(name, value);
	            });
	
	            resolve(response);
	
	        }, function (error$$1) { return handler(error$$1.response); });
	    });
	};
	
	/**
	 * Base client.
	 */
	
	var Client = function (context) {
	
	    var reqHandlers = [sendRequest], resHandlers = [], handler;
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new PromiseObj(function (resolve) {
	
	            function exec() {
	
	                handler = reqHandlers.pop();
	
	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
	                    next();
	                }
	            }
	
	            function next(response) {
	
	                if (isFunction(response)) {
	
	                    resHandlers.unshift(response);
	
	                } else if (isObject(response)) {
	
	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });
	
	                    when(response, resolve);
	
	                    return;
	                }
	
	                exec();
	            }
	
	            exec();
	
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	};
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || (inBrowser ? xhrClient : nodeClient);
	
	    resolve(client(request));
	}
	
	/**
	 * HTTP Headers.
	 */
	
	var Headers = function Headers(headers) {
	    var this$1 = this;
	
	
	    this.map = {};
	
	    each(headers, function (value, name) { return this$1.append(name, value); });
	};
	
	Headers.prototype.has = function has (name) {
	    return getName(this.map, name) !== null;
	};
	
	Headers.prototype.get = function get (name) {
	
	    var list = this.map[getName(this.map, name)];
	
	    return list ? list.join() : null;
	};
	
	Headers.prototype.getAll = function getAll (name) {
	    return this.map[getName(this.map, name)] || [];
	};
	
	Headers.prototype.set = function set (name, value) {
	    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	};
	
	Headers.prototype.append = function append (name, value){
	
	    var list = this.map[getName(this.map, name)];
	
	    if (list) {
	        list.push(trim(value));
	    } else {
	        this.set(name, value);
	    }
	};
	
	Headers.prototype.delete = function delete$1 (name){
	    delete this.map[getName(this.map, name)];
	};
	
	Headers.prototype.deleteAll = function deleteAll (){
	    this.map = {};
	};
	
	Headers.prototype.forEach = function forEach (callback, thisArg) {
	        var this$1 = this;
	
	    each(this.map, function (list, name) {
	        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
	    });
	};
	
	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}
	
	function normalizeName(name) {
	
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	
	    return trim(name);
	}
	
	/**
	 * HTTP Response.
	 */
	
	var Response = function Response(body, ref) {
	    var url = ref.url;
	    var headers = ref.headers;
	    var status = ref.status;
	    var statusText = ref.statusText;
	
	
	    this.url = url;
	    this.ok = status >= 200 && status < 300;
	    this.status = status || 0;
	    this.statusText = statusText || '';
	    this.headers = new Headers(headers);
	    this.body = body;
	
	    if (isString(body)) {
	
	        this.bodyText = body;
	
	    } else if (isBlob(body)) {
	
	        this.bodyBlob = body;
	
	        if (isBlobText(body)) {
	            this.bodyText = blobText(body);
	        }
	    }
	};
	
	Response.prototype.blob = function blob () {
	    return when(this.bodyBlob);
	};
	
	Response.prototype.text = function text () {
	    return when(this.bodyText);
	};
	
	Response.prototype.json = function json () {
	    return when(this.text(), function (text) { return JSON.parse(text); });
	};
	
	function blobText(body) {
	    return new PromiseObj(function (resolve) {
	
	        var reader = new FileReader();
	
	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	
	    });
	}
	
	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}
	
	/**
	 * HTTP Request.
	 */
	
	var Request = function Request(options$$1) {
	
	    this.body = null;
	    this.params = {};
	
	    assign(this, options$$1, {
	        method: toUpper(options$$1.method || 'GET')
	    });
	
	    if (!(this.headers instanceof Headers)) {
	        this.headers = new Headers(this.headers);
	    }
	};
	
	Request.prototype.getUrl = function getUrl (){
	    return Url(this);
	};
	
	Request.prototype.getBody = function getBody (){
	    return this.body;
	};
	
	Request.prototype.respondWith = function respondWith (body, options$$1) {
	    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
	};
	
	/**
	 * Service for sending network requests.
	 */
	
	var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
	var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};
	
	function Http(options$$1) {
	
	    var self = this || {}, client = Client(self.$vm);
	
	    defaults(options$$1 || {}, self.$options, Http.options);
	
	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });
	
	    return client(new Request(options$$1)).then(function (response) {
	
	        return response.ok ? response : PromiseObj.reject(response);
	
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return PromiseObj.reject(response);
	    });
	}
	
	Http.options = {};
	
	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    common: COMMON_HEADERS,
	    custom: {}
	};
	
	Http.interceptors = [before, method, body, jsonp, header, cors];
	
	['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
	    };
	
	});
	
	['post', 'put', 'patch'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, body$$1, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
	    };
	
	});
	
	/**
	 * Service for interacting with RESTful services.
	 */
	
	function Resource(url, params, actions, options$$1) {
	
	    var self = this || {}, resource = {};
	
	    actions = assign({},
	        Resource.actions,
	        actions
	    );
	
	    each(actions, function (action, name) {
	
	        action = merge({url: url, params: assign({}, params)}, options$$1, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options$$1 = assign({}, action), params = {}, body;
	
	    switch (args.length) {
	
	        case 2:
	
	            params = args[0];
	            body = args[1];
	
	            break;
	
	        case 1:
	
	            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
	    }
	
	    options$$1.body = body;
	    options$$1.params = assign({}, options$$1.params, params);
	
	    return options$$1;
	}
	
	Resource.actions = {
	
	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}
	
	};
	
	/**
	 * Install plugin.
	 */
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function get() {
	                var this$1 = this;
	
	                return function (executor) { return new Vue.Promise(executor, this$1); };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(83);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _login = __webpack_require__(85);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _App = __webpack_require__(95);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _AppCenter = __webpack_require__(159);
	
	var _AppCenter2 = _interopRequireDefault(_AppCenter);
	
	var _MsgMain = __webpack_require__(197);
	
	var _MsgMain2 = _interopRequireDefault(_MsgMain);
	
	var _OrderDefault = __webpack_require__(202);
	
	var _OrderDefault2 = _interopRequireDefault(_OrderDefault);
	
	var _PayScan = __webpack_require__(208);
	
	var _PayScan2 = _interopRequireDefault(_PayScan);
	
	var _PayCard = __webpack_require__(213);
	
	var _PayCard2 = _interopRequireDefault(_PayCard);
	
	var _PayMoney = __webpack_require__(218);
	
	var _PayMoney2 = _interopRequireDefault(_PayMoney);
	
	var _RechargeDefault = __webpack_require__(223);
	
	var _RechargeDefault2 = _interopRequireDefault(_RechargeDefault);
	
	var _LogMain = __webpack_require__(228);
	
	var _LogMain2 = _interopRequireDefault(_LogMain);
	
	var _NoPage = __webpack_require__(258);
	
	var _NoPage2 = _interopRequireDefault(_NoPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//路由配置
	_vue2.default.use(_vueRouter2.default);
	
	//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
	var router = new _vueRouter2.default({
	    //mode: 'history',
	    routes: [{
	        path: '/',
	        component: _App2.default
	    }, { path: '/login',
	        name: 'Login',
	        component: _login2.default
	    }, { path: '/index', redirect: '/' }, { path: '/message', //消息中心
	        name: 'MsgCenter',
	        component: _MsgMain2.default
	    }, {
	        path: '/log',
	        name: 'logCenter',
	        component: _LogMain2.default
	    }, {
	        path: '/log/:type',
	        name: 'logCenterList',
	        component: _LogMain2.default
	    }, {
	        path: '/appCenter',
	        alias: ['/order', '/recharge', '/print'], //中心有 订单 充值 打印
	        name: 'AppCenter',
	        component: _AppCenter2.default,
	        children: [{
	            path: '/order/', //默认支付
	            name: 'OrderDefault',
	            component: _OrderDefault2.default
	        }, {
	            path: '/recharge/', //默认充值
	            name: 'RechargeDefault',
	            component: _RechargeDefault2.default
	        }, {
	            path: '/scan',
	            name: 'PayScan',
	            component: _PayScan2.default
	        }, {
	            path: '/card',
	            name: 'PayCard',
	            component: _PayCard2.default
	        }, {
	            path: '/money',
	            name: 'PayMoney',
	            component: _PayMoney2.default
	        }]
	    },
	    // 404 page
	    { path: '*',
	        name: '404',
	        component: _NoPage2.default
	    }],
	    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
	        return { x: 0, y: 0 };
	    }
	});
	
	exports.default = router;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.2.1
	  * (c) 2017 Evan You
	  * @license MIT
	  */
	'use strict';
	
	/*  */
	
	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}
	
	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
	  }
	}
	
	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;
	
	    data.routerView = true;
	
	    var name = props.name;
	    var route = parent.$route;
	    var cache = parent._routerViewCache || (parent._routerViewCache = {});
	
	    // determine current view depth, also check to see if the tree
	    // has been toggled inactive but kept-alive.
	    var depth = 0;
	    var inactive = false;
	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++;
	      }
	      if (parent._inactive) {
	        inactive = true;
	      }
	      parent = parent.$parent;
	    }
	    data.routerViewDepth = depth;
	
	    // render previous view if the tree is inactive and kept-alive
	    if (inactive) {
	      return h(cache[name], data, children)
	    }
	
	    var matched = route.matched[depth];
	    // render empty node if no matched route
	    if (!matched) {
	      cache[name] = null;
	      return h()
	    }
	
	    var component = cache[name] = matched.components[name];
	
	    // inject instance registration hooks
	    var hooks = data.hook || (data.hook = {});
	    hooks.init = function (vnode) {
	      matched.instances[name] = vnode.child;
	    };
	    hooks.prepatch = function (oldVnode, vnode) {
	      matched.instances[name] = vnode.child;
	    };
	    hooks.destroy = function (vnode) {
	      if (matched.instances[name] === vnode.child) {
	        matched.instances[name] = undefined;
	      }
	    };
	
	    // resolve props
	    data.props = resolveProps(route, matched.props && matched.props[name]);
	
	    return h(component, data, children)
	  }
	};
	
	function resolveProps (route, config) {
	  switch (typeof config) {
	    case 'undefined':
	      return
	    case 'object':
	      return config
	    case 'function':
	      return config(route)
	    case 'boolean':
	      return config ? route.params : undefined
	    default:
	      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
	  }
	}
	
	/*  */
	
	var encodeReserveRE = /[!'()*]/g;
	var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
	var commaRE = /%2C/g;
	
	// fixed encodeURIComponent which is more comformant to RFC3986:
	// - escapes [!'()*]
	// - preserve commas
	var encode = function (str) { return encodeURIComponent(str)
	  .replace(encodeReserveRE, encodeReserveReplacer)
	  .replace(commaRE, ','); };
	
	var decode = decodeURIComponent;
	
	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};
	
	  if (query) {
	    var parsedQuery;
	    try {
	      parsedQuery = parseQuery(query);
	    } catch (e) {
	      process.env.NODE_ENV !== 'production' && warn(false, e.message);
	      parsedQuery = {};
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key];
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}
	
	function parseQuery (query) {
	  var res = {};
	
	  query = query.trim().replace(/^(\?|#|&)/, '');
	
	  if (!query) {
	    return res
	  }
	
	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = decode(parts.shift());
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null;
	
	    if (res[key] === undefined) {
	      res[key] = val;
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val);
	    } else {
	      res[key] = [res[key], val];
	    }
	  });
	
	  return res
	}
	
	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key];
	
	    if (val === undefined) {
	      return ''
	    }
	
	    if (val === null) {
	      return encode(key)
	    }
	
	    if (Array.isArray(val)) {
	      var result = [];
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key));
	        } else {
	          result.push(encode(key) + '=' + encode(val2));
	        }
	      });
	      return result.join('&')
	    }
	
	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null;
	  return res ? ("?" + res) : ''
	}
	
	/*  */
	
	var trailingSlashRE = /\/?$/;
	
	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  };
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom);
	  }
	  return Object.freeze(route)
	}
	
	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	});
	
	function formatMatch (record) {
	  var res = [];
	  while (record) {
	    res.unshift(record);
	    record = record.parent;
	  }
	  return res
	}
	
	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';
	
	  return (path || '/') + stringifyQuery(query) + hash
	}
	
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}
	
	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};
	
	  var aKeys = Object.keys(a);
	  var bKeys = Object.keys(b);
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}
	
	function isIncludedRoute (current, target) {
	  return (
	    current.path.replace(trailingSlashRE, '/').indexOf(
	      target.path.replace(trailingSlashRE, '/')
	    ) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}
	
	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}
	
	/*  */
	
	// work around weird flow bug
	var toTypes = [String, Object];
	var eventTypes = [String, Array];
	
	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    event: {
	      type: eventTypes,
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;
	
	    var router = this.$router;
	    var current = this.$route;
	    var ref = router.resolve(this.to, current, this.append);
	    var location = ref.location;
	    var route = ref.route;
	    var href = ref.href;
	    var classes = {};
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
	    var compareTarget = location.path ? createRoute(null, location) : route;
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget);
	
	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(location);
	        } else {
	          router.push(location);
	        }
	      }
	    };
	
	    var on = { click: guardEvent };
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler; });
	    } else {
	      on[this.event] = handler;
	    }
	
	    var data = {
	      class: classes
	    };
	
	    if (this.tag === 'a') {
	      data.on = on;
	      data.attrs = { href: href };
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default);
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false;
	        var extend = _Vue.util.extend;
	        var aData = a.data = extend({}, a.data);
	        aData.on = on;
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
	        aAttrs.href = href;
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on;
	      }
	    }
	
	    return h(this.tag, data, this.$slots.default)
	  }
	};
	
	function guardEvent (e) {
	  // don't redirect with control keys
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  if (e.button !== undefined && e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  if (e.target && e.target.getAttribute) {
	    var target = e.target.getAttribute('target');
	    if (/\b_blank\b/i.test(target)) { return }
	  }
	  // this may be a Weex event which doesn't have this method
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	  return true
	}
	
	function findAnchor (children) {
	  if (children) {
	    var child;
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}
	
	var _Vue;
	
	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true;
	
	  _Vue = Vue;
	
	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  });
	
	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get () { return this.$root._route }
	  });
	
	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router;
	        this._router.init(this);
	        Vue.util.defineReactive(this, '_route', this._router.history.current);
	      }
	    }
	  });
	
	  Vue.component('router-view', View);
	  Vue.component('router-link', Link);
	
	  var strats = Vue.config.optionMergeStrategies;
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
	}
	
	/*  */
	
	var inBrowser = typeof window !== 'undefined';
	
	/*  */
	
	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }
	
	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }
	
	  var stack = base.split('/');
	
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	
	  return stack.join('/')
	}
	
	function parsePath (path) {
	  var hash = '';
	  var query = '';
	
	  var hashIndex = path.indexOf('#');
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex);
	    path = path.slice(0, hashIndex);
	  }
	
	  var queryIndex = path.indexOf('?');
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1);
	    path = path.slice(0, queryIndex);
	  }
	
	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}
	
	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}
	
	/*  */
	
	function createRouteMap (
	  routes,
	  oldPathMap,
	  oldNameMap
	) {
	  var pathMap = oldPathMap || Object.create(null);
	  var nameMap = oldNameMap || Object.create(null);
	
	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route);
	  });
	
	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}
	
	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.");
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    );
	  }
	
	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {},
	    props: route.props == null
	      ? {}
	      : route.components
	        ? route.props
	        : { default: route.props }
	  };
	
	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(
	          false,
	          "Named Route '" + (route.name) + "' has a default child route. " +
	          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
	          "the default child route will not be rendered. Remove the name from " +
	          "this route and use the name of the default child route for named " +
	          "links instead."
	        );
	      }
	    }
	    route.children.forEach(function (child) {
	      var childMatchAs = matchAs
	        ? cleanPath((matchAs + "/" + (child.path)))
	        : undefined;
	      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
	    });
	  }
	
	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        var aliasRoute = {
	          path: alias,
	          children: route.children
	        };
	        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
	      });
	    } else {
	      var aliasRoute = {
	        path: route.alias,
	        children: route.children
	      };
	      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
	    }
	  }
	
	  if (!pathMap[record.path]) {
	    pathMap[record.path] = record;
	  }
	
	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record;
	    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
	      warn(
	        false,
	        "Duplicate named routes definition: " +
	        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
	      );
	    }
	  }
	}
	
	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '');
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}
	
	var index$1 = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};
	
	var isarray = index$1;
	
	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp;
	var parse_1 = parse;
	var compile_1 = compile;
	var tokensToFunction_1 = tokensToFunction;
	var tokensToRegExp_1 = tokensToRegExp;
	
	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g');
	
	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;
	
	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;
	
	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue
	    }
	
	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];
	
	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }
	
	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;
	
	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    });
	  }
	
	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }
	
	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }
	
	  return tokens
	}
	
	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}
	
	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);
	
	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }
	
	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;
	
	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];
	
	      if (typeof token === 'string') {
	        path += token;
	
	        continue
	      }
	
	      var value = data[token.name];
	      var segment;
	
	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }
	
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }
	
	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }
	
	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }
	
	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);
	
	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }
	
	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }
	
	        continue
	      }
	
	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);
	
	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }
	
	      path += token.prefix + segment;
	    }
	
	    return path
	  }
	}
	
	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}
	
	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}
	
	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys;
	  return re
	}
	
	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}
	
	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);
	
	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }
	
	  return attachKeys(path, keys)
	}
	
	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = [];
	
	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }
	
	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
	
	  return attachKeys(regexp, keys)
	}
	
	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}
	
	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }
	
	  options = options || {};
	
	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';
	
	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];
	
	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';
	
	      keys.push(token);
	
	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }
	
	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }
	
	      route += capture;
	    }
	  }
	
	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }
	
	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
	  }
	
	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}
	
	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }
	
	  options = options || {};
	
	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }
	
	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }
	
	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}
	
	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;
	
	/*  */
	
	var regexpCache = Object.create(null);
	
	function getRouteRegex (path) {
	  var hit = regexpCache[path];
	  var keys, regexp;
	
	  if (hit) {
	    keys = hit.keys;
	    regexp = hit.regexp;
	  } else {
	    keys = [];
	    regexp = index(path, keys);
	    regexpCache[path] = { keys: keys, regexp: regexp };
	  }
	
	  return { keys: keys, regexp: regexp }
	}
	
	var regexpCompileCache = Object.create(null);
	
	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path));
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
	    }
	    return ''
	  }
	}
	
	/*  */
	
	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw;
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }
	
	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next);
	    next._normalized = true;
	    var params = assign(assign({}, current.params), next.params);
	    if (current.name) {
	      next.name = current.name;
	      next.params = params;
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path;
	      next.path = fillParams(rawPath, params, ("path " + (current.path)));
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.");
	    }
	    return next
	  }
	
	  var parsedPath = parsePath(next.path || '');
	  var basePath = (current && current.path) || '/';
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : (current && current.path) || '/';
	  var query = resolveQuery(parsedPath.query, next.query);
	  var hash = next.hash || parsedPath.hash;
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash;
	  }
	
	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}
	
	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key];
	  }
	  return a
	}
	
	/*  */
	
	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;
	
	  function addRoutes (routes) {
	    createRouteMap(routes, pathMap, nameMap);
	  }
	
	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute);
	    var name = location.name;
	
	    if (name) {
	      var record = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        warn(record, ("Route with name '" + name + "' does not exist"));
	      }
	      var paramNames = getRouteRegex(record.path).keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; });
	
	      if (typeof location.params !== 'object') {
	        location.params = {};
	      }
	
	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key];
	          }
	        }
	      }
	
	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {};
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }
	
	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect;
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect;
	
	    if (typeof redirect === 'string') {
	      redirect = { path: redirect };
	    }
	
	    if (!redirect || typeof redirect !== 'object') {
	      process.env.NODE_ENV !== 'production' && warn(
	        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	      );
	      return _createRoute(null, location)
	    }
	
	    var re = redirect;
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query;
	    hash = re.hasOwnProperty('hash') ? re.hash : hash;
	    params = re.hasOwnProperty('params') ? re.params : params;
	
	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record);
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
	      return _createRoute(null, location)
	    }
	  }
	
	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    });
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched;
	      var aliasedRecord = matched[matched.length - 1];
	      location.params = aliasedMatch.params;
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }
	
	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }
	
	  return {
	    match: match,
	    addRoutes: addRoutes
	  }
	}
	
	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var ref = getRouteRegex(path);
	  var regexp = ref.regexp;
	  var keys = ref.keys;
	  var m = pathname.match(regexp);
	
	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }
	
	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1];
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
	    if (key) { params[key.name] = val; }
	  }
	
	  return true
	}
	
	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}
	
	/*  */
	
	
	var positionStore = Object.create(null);
	
	function setupScroll () {
	  window.addEventListener('popstate', function (e) {
	    saveScrollPosition();
	    if (e.state && e.state.key) {
	      setStateKey(e.state.key);
	    }
	  });
	}
	
	function handleScroll (
	  router,
	  to,
	  from,
	  isPop
	) {
	  if (!router.app) {
	    return
	  }
	
	  var behavior = router.options.scrollBehavior;
	  if (!behavior) {
	    return
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof behavior === 'function', "scrollBehavior must be a function");
	  }
	
	  // wait until re-render finishes before scrolling
	  router.app.$nextTick(function () {
	    var position = getScrollPosition();
	    var shouldScroll = behavior(to, from, isPop ? position : null);
	    if (!shouldScroll) {
	      return
	    }
	    var isObject = typeof shouldScroll === 'object';
	    if (isObject && typeof shouldScroll.selector === 'string') {
	      var el = document.querySelector(shouldScroll.selector);
	      if (el) {
	        position = getElementPosition(el);
	      } else if (isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll);
	      }
	    } else if (isObject && isValidPosition(shouldScroll)) {
	      position = normalizePosition(shouldScroll);
	    }
	
	    if (position) {
	      window.scrollTo(position.x, position.y);
	    }
	  });
	}
	
	function saveScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    positionStore[key] = {
	      x: window.pageXOffset,
	      y: window.pageYOffset
	    };
	  }
	}
	
	function getScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    return positionStore[key]
	  }
	}
	
	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect();
	  var elRect = el.getBoundingClientRect();
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}
	
	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}
	
	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}
	
	function isNumber (v) {
	  return typeof v === 'number'
	}
	
	/*  */
	
	var supportsPushState = inBrowser && (function () {
	  var ua = window.navigator.userAgent;
	
	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }
	
	  return window.history && 'pushState' in window.history
	})();
	
	// use User Timing api (if present) for more accurate key precision
	var Time = inBrowser && window.performance && window.performance.now
	  ? window.performance
	  : Date;
	
	var _key = genKey();
	
	function genKey () {
	  return Time.now().toFixed(3)
	}
	
	function getStateKey () {
	  return _key
	}
	
	function setStateKey (key) {
	  _key = key;
	}
	
	function pushState (url, replace) {
	  saveScrollPosition();
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history;
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url);
	    } else {
	      _key = genKey();
	      history.pushState({ key: _key }, '', url);
	    }
	  } catch (e) {
	    window.location[replace ? 'replace' : 'assign'](url);
	  }
	}
	
	function replaceState (url) {
	  pushState(url, true);
	}
	
	/*  */
	
	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb();
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1);
	        });
	      } else {
	        step(index + 1);
	      }
	    }
	  };
	  step(0);
	}
	
	/*  */
	
	
	var History = function History (router, base) {
	  this.router = router;
	  this.base = normalizeBase(base);
	  // start with a route object that stands for "nowhere"
	  this.current = START;
	  this.pending = null;
	  this.ready = false;
	  this.readyCbs = [];
	};
	
	History.prototype.listen = function listen (cb) {
	  this.cb = cb;
	};
	
	History.prototype.onReady = function onReady (cb) {
	  if (this.ready) {
	    cb();
	  } else {
	    this.readyCbs.push(cb);
	  }
	};
	
	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;
	
	  var route = this.router.match(location, this.current);
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route);
	    onComplete && onComplete(route);
	    this$1.ensureURL();
	
	    // fire ready cbs once
	    if (!this$1.ready) {
	      this$1.ready = true;
	      this$1.readyCbs.forEach(function (cb) {
	        cb(route);
	      });
	    }
	  }, onAbort);
	};
	
	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;
	
	  var current = this.current;
	  var abort = function () { onAbort && onAbort(); };
	  if (
	    isSameRoute(route, current) &&
	    // in the case the route map has been dynamically appended to
	    route.matched.length === current.matched.length
	  ) {
	    this.ensureURL();
	    return abort()
	  }
	
	  var ref = resolveQueue(this.current.matched, route.matched);
	    var updated = ref.updated;
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;
	
	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // in-component update hooks
	    extractUpdateHooks(updated),
	    // in-config enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  );
	
	  this.pending = route;
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL(true);
	        abort();
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
	        abort();
	      } else {
	        // confirm transition and pass on the value
	        next(to);
	      }
	    });
	  };
	
	  runQueue(queue, iterator, function () {
	    var postEnterCbs = [];
	    var isValid = function () { return this$1.current === route; };
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null;
	      onComplete(route);
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); });
	        });
	      }
	    });
	  });
	};
	
	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current;
	  this.current = route;
	  this.cb && this.cb(route);
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev);
	  });
	};
	
	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base');
	      base = baseEl ? baseEl.getAttribute('href') : '/';
	    } else {
	      base = '/';
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base;
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}
	
	function resolveQueue (
	  current,
	  next
	) {
	  var i;
	  var max = Math.max(current.length, next.length);
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    updated: next.slice(0, i),
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}
	
	function extractGuards (
	  records,
	  name,
	  bind,
	  reverse
	) {
	  var guards = flatMapComponents(records, function (def, instance, match, key) {
	    var guard = extractGuard(def, name);
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
	        : bind(guard, instance, match, key)
	    }
	  });
	  return flatten(reverse ? guards.reverse() : guards)
	}
	
	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def);
	  }
	  return def.options[key]
	}
	
	function extractLeaveGuards (deactivated) {
	  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
	}
	
	function extractUpdateHooks (updated) {
	  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
	}
	
	function bindGuard (guard, instance) {
	  return function boundRouteGuard () {
	    return guard.apply(instance, arguments)
	  }
	}
	
	function extractEnterGuards (
	  activated,
	  cbs,
	  isValid
	) {
	  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
	    return bindEnterGuard(guard, match, key, cbs, isValid)
	  })
	}
	
	function bindEnterGuard (
	  guard,
	  match,
	  key,
	  cbs,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb);
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid);
	        });
	      }
	    })
	  }
	}
	
	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key]);
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid);
	    }, 16);
	  }
	}
	
	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = once(function (resolvedDef) {
	          match.components[key] = resolvedDef;
	          next();
	        });
	
	        var reject = once(function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason));
	          next(false);
	        });
	
	        var res = def(resolve, reject);
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject);
	        }
	      }
	    }
	  })
	}
	
	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}
	
	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}
	
	// in Webpack 2, require.ensure now also returns a Promise
	// so the resolve/reject functions may get called an extra time
	// if the user uses an arrow function shorthand that happens to
	// return that Promise.
	function once (fn) {
	  var called = false;
	  return function () {
	    if (called) { return }
	    called = true;
	    return fn.apply(this, arguments)
	  }
	}
	
	/*  */
	
	
	var HTML5History = (function (History$$1) {
	  function HTML5History (router, base) {
	    var this$1 = this;
	
	    History$$1.call(this, router, base);
	
	    var expectScroll = router.options.scrollBehavior;
	
	    if (expectScroll) {
	      setupScroll();
	    }
	
	    window.addEventListener('popstate', function (e) {
	      this$1.transitionTo(getLocation(this$1.base), function (route) {
	        if (expectScroll) {
	          handleScroll(router, route, this$1.current, true);
	        }
	      });
	    });
	  }
	
	  if ( History$$1 ) HTML5History.__proto__ = History$$1;
	  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
	  HTML5History.prototype.constructor = HTML5History;
	
	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n);
	  };
	
	  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, this$1.current, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, this$1.current, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath);
	      push ? pushState(current) : replaceState(current);
	    }
	  };
	
	  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getLocation(this.base)
	  };
	
	  return HTML5History;
	}(History));
	
	function getLocation (base) {
	  var path = window.location.pathname;
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length);
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}
	
	/*  */
	
	
	var HashHistory = (function (History$$1) {
	  function HashHistory (router, base, fallback) {
	    History$$1.call(this, router, base);
	    // check history fallback deeplinking
	    if (fallback && checkFallback(this.base)) {
	      return
	    }
	    ensureSlash();
	  }
	
	  if ( History$$1 ) HashHistory.__proto__ = History$$1;
	  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  HashHistory.prototype.constructor = HashHistory;
	
	  // this is delayed until the app mounts
	  // to avoid the hashchange listener being fired too early
	  HashHistory.prototype.setupListeners = function setupListeners () {
	    var this$1 = this;
	
	    window.addEventListener('hashchange', function () {
	      if (!ensureSlash()) {
	        return
	      }
	      this$1.transitionTo(getHash(), function (route) {
	        replaceHash(route.fullPath);
	      });
	    });
	  };
	
	  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n);
	  };
	
	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath;
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current);
	    }
	  };
	
	  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getHash()
	  };
	
	  return HashHistory;
	}(History));
	
	function checkFallback (base) {
	  var location = getLocation(base);
	  if (!/^\/#/.test(location)) {
	    window.location.replace(
	      cleanPath(base + '/#' + location)
	    );
	    return true
	  }
	}
	
	function ensureSlash () {
	  var path = getHash();
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path);
	  return false
	}
	
	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.slice(index + 1)
	}
	
	function pushHash (path) {
	  window.location.hash = path;
	}
	
	function replaceHash (path) {
	  var i = window.location.href.indexOf('#');
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  );
	}
	
	/*  */
	
	
	var AbstractHistory = (function (History$$1) {
	  function AbstractHistory (router, base) {
	    History$$1.call(this, router, base);
	    this.stack = [];
	    this.index = -1;
	  }
	
	  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
	  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;
	
	  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
	      this$1.index++;
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;
	
	    var targetIndex = this.index + n;
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex];
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex;
	      this$1.updateRoute(route);
	    });
	  };
	
	  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    var current = this.stack[this.stack.length - 1];
	    return current ? current.fullPath : '/'
	  };
	
	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };
	
	  return AbstractHistory;
	}(History));
	
	/*  */
	
	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};
	
	  this.app = null;
	  this.apps = [];
	  this.options = options;
	  this.beforeHooks = [];
	  this.afterHooks = [];
	  this.matcher = createMatcher(options.routes || []);
	
	  var mode = options.mode || 'hash';
	  this.fallback = mode === 'history' && !supportsPushState;
	  if (this.fallback) {
	    mode = 'hash';
	  }
	  if (!inBrowser) {
	    mode = 'abstract';
	  }
	  this.mode = mode;
	
	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base);
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback);
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this, options.base);
	      break
	    default:
	      if (process.env.NODE_ENV !== 'production') {
	        assert(false, ("invalid mode: " + mode));
	      }
	  }
	};
	
	var prototypeAccessors = { currentRoute: {} };
	
	VueRouter.prototype.match = function match (
	  raw,
	  current,
	  redirectedFrom
	) {
	  return this.matcher.match(raw, current, redirectedFrom)
	};
	
	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};
	
	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;
	
	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  );
	
	  this.apps.push(app);
	
	  // main app already initialized.
	  if (this.app) {
	    return
	  }
	
	  this.app = app;
	
	  var history = this.history;
	
	  if (history instanceof HTML5History) {
	    history.transitionTo(history.getCurrentLocation());
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      history.setupListeners();
	    };
	    history.transitionTo(
	      history.getCurrentLocation(),
	      setupHashListener,
	      setupHashListener
	    );
	  }
	
	  history.listen(function (route) {
	    this$1.apps.forEach(function (app) {
	      app._route = route;
	    });
	  });
	};
	
	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn);
	};
	
	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn);
	};
	
	VueRouter.prototype.onReady = function onReady (cb) {
	  this.history.onReady(cb);
	};
	
	VueRouter.prototype.push = function push (location, onComplete, onAbort) {
	  this.history.push(location, onComplete, onAbort);
	};
	
	VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
	  this.history.replace(location, onComplete, onAbort);
	};
	
	VueRouter.prototype.go = function go (n) {
	  this.history.go(n);
	};
	
	VueRouter.prototype.back = function back () {
	  this.go(-1);
	};
	
	VueRouter.prototype.forward = function forward () {
	  this.go(1);
	};
	
	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? this.resolve(to).route
	    : this.currentRoute;
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};
	
	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var location = normalizeLocation(to, current || this.history.current, append);
	  var route = this.match(location, current);
	  var fullPath = route.redirectedFrom || route.fullPath;
	  var base = this.history.base;
	  var href = createHref(base, fullPath, this.mode);
	  return {
	    location: location,
	    route: route,
	    href: href,
	    // for backwards compat
	    normalizedTo: location,
	    resolved: route
	  }
	};
	
	VueRouter.prototype.addRoutes = function addRoutes (routes) {
	  this.matcher.addRoutes(routes);
	  if (this.history.current !== START) {
	    this.history.transitionTo(this.history.getCurrentLocation());
	  }
	};
	
	Object.defineProperties( VueRouter.prototype, prototypeAccessors );
	
	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath;
	  return base ? cleanPath(base + '/' + path) : path
	}
	
	VueRouter.install = install;
	VueRouter.version = '2.2.1';
	
	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter);
	}
	
	module.exports = VueRouter;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84)))

/***/ },
/* 84 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(86)
	__vue_script__ = __webpack_require__(88)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\login\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(94)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-af30dada/login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"login.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _rsa = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.prototype.setCookie = function (c_name, value, expiredays) {
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + expiredays);
	    document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
	};
	
	_vue2.default.prototype.getCookie = function (name) {
	    var arr,
	        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) return arr[2];else return null;
	};
	
	_vue2.default.prototype.fullScreen = function () {
	    var el = document.documentElement;
	
	    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
	    if (typeof rfs != "undefined" && rfs) {
	        rfs.call(el);
	    } else if (typeof window.ActiveXObject != "undefined") {}
	};
	
	_vue2.default.prototype.exitFullScreen = function () {
	    var el = document;
	    var efs = el.exitFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.msExitFullScreen;
	    if (typeof efs != "undefined" && efs) {
	        efs.call(el);
	    } else if (typeof window.ActiveXObject != "undefined") {}
	};
	
	exports.default = {
	    name: "Login",
	    data: function data() {
	        return {
	            logining: false,
	            username: '',
	            password: '',
	            lastUserName: ""
	        };
	    },
	    created: function created() {
	
	        this.lastUserName = this.getCookie("username");
	        this.username = this.lastUserName;
	    },
	
	    watch: {
	        'username': function username(val) {
	            if (this.logining) {
	                return;
	            }
	            if (val) {} else {}
	        },
	        'password': function password(val) {
	            if (val) {} else {}
	        }
	    },
	    methods: {
	        toLogin: function toLogin() {
	
	            this.fullScreen();
	
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
	                    shade: [0.1, '#fff'] });
	
	                _request.request.fnPost(vm, apiobj, function (res) {
	                    _layer2.default.close(loading);
	                    window.localStorage.setItem("accessToken", res.accessToken);
	                    _util2.default.pushLocal('shopData', res);
	                    if (vm.lastUserName != vm.username) {
	                        _util2.default.pushLocal("lastData", []);
	                    }
	                    vm.setCookie("username", username, 7);
	                    vm.$store.state.login = res.accessToken;
	                    vm.logining = false;
	                    vm.$router.replace('/');
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
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = window.layer;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hex2b64 = hex2b64;
	exports.b64tohex = b64tohex;
	exports.b64toBA = b64toBA;
	exports.RSAKey = RSAKey;
	
	var _jsbn = __webpack_require__(91);
	
	var _jsbn2 = _interopRequireDefault(_jsbn);
	
	var _rng = __webpack_require__(92);
	
	var _rng2 = _interopRequireDefault(_rng);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Depends on jsbn.js and rng.js
	
	// Version 1.1: support utf-8 encoding in pkcs1pad2
	
	// convert a (hex) string to a bignum object
	function parseBigInt(str, r) {
	  var ss = new _jsbn2.default(str, r);
	
	  return ss;
	}
	
	function linebrk(s, n) {
	  var ret = "";
	  var i = 0;
	  while (i + n < s.length) {
	    ret += s.substring(i, i + n) + "\n";
	    i += n;
	  }
	  return ret + s.substring(i, s.length);
	}
	
	function byte2Hex(b) {
	  if (b < 0x10) return "0" + b.toString(16);else return b.toString(16);
	}
	
	// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
	function pkcs1pad2(s, n) {
	  if (n < s.length + 11) {
	    // TODO: fix for utf-8
	    alert("Message too long for RSA");
	    return null;
	  }
	  var ba = new Array();
	  var i = s.length - 1;
	  while (i >= 0 && n > 0) {
	    var c = s.charCodeAt(i--);
	    if (c < 128) {
	      // encode using utf-8
	      ba[--n] = c;
	    } else if (c > 127 && c < 2048) {
	      ba[--n] = c & 63 | 128;
	      ba[--n] = c >> 6 | 192;
	    } else {
	      ba[--n] = c & 63 | 128;
	      ba[--n] = c >> 6 & 63 | 128;
	      ba[--n] = c >> 12 | 224;
	    }
	  }
	  ba[--n] = 0;
	  var rng = new _rng2.default();
	  var x = new Array();
	  while (n > 2) {
	    // random non-zero pad
	    x[0] = 0;
	    while (x[0] == 0) {
	      rng.nextBytes(x);
	    }ba[--n] = x[0];
	  }
	  ba[--n] = 2;
	  ba[--n] = 0;
	  return new _jsbn2.default(ba);
	}
	
	var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64pad = "=";
	
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	function int2char(n) {
	  return BI_RM.charAt(n);
	}
	
	function hex2b64(h) {
	  var i = void 0;
	  var c = void 0;
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
	  var i = void 0;
	  var k = 0; // b64 state, 0-3
	  var slop = void 0;
	  var v = void 0;
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
	  var i = void 0;
	  var a = new Array();
	  for (i = 0; 2 * i < h.length; ++i) {
	    a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
	  }
	  return a;
	}
	
	// "empty" RSA key constructor
	function RSAKey() {
	  this.n = null;
	  this.e = 0;
	  this.d = null;
	  this.p = null;
	  this.q = null;
	  this.dmp1 = null;
	  this.dmq1 = null;
	  this.coeff = null;
	}
	
	// Set the public key fields N and e from hex strings
	function RSASetPublic(N, E) {
	  if (N != null && E != null && N.length > 0 && E.length > 0) {
	    //alert(1111111);
	    this.n = parseBigInt(N, 16);
	    //console.log(this.n);
	    this.e = parseInt(E, 16);
	  } else alert("Invalid RSA public key");
	}
	
	// Perform raw public operation on "x": return x^e (mod n)
	function RSADoPublic(x) {
	  return x.modPowInt(this.e, this.n);
	}
	
	// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
	function RSAEncrypt(text) {
	  var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
	  if (m == null) return null;
	  var c = this.doPublic(m);
	  if (c == null) return null;
	  var h = c.toString(16);
	  if ((h.length & 1) == 0) return h;else return "0" + h;
	}
	
	// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
	//function RSAEncryptB64(text) {
	//  var h = this.encrypt(text);
	//  if(h) return hex2b64(h); else return null;
	//}
	
	// protected
	RSAKey.prototype.doPublic = RSADoPublic;
	
	// public
	RSAKey.prototype.setPublic = RSASetPublic;
	RSAKey.prototype.encrypt = RSAEncrypt;
	//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;
	
	
	//export default  RSAKey;

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Copyright (c) 2005  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.
	
	// Basic JavaScript BN library - subset useful for RSA encryption.
	
	// Bits per digit
	var dbits;
	
	// JavaScript engine analysis
	var canary = 0xdeadbeefcafe;
	var j_lm = (canary & 0xffffff) == 0xefcafe;
	
	// (public) Constructor
	function BigInteger(a, b, c) {
	  if (a != null) if ("number" == typeof a) this.fromNumber(a, b, c);else if (b == null && "string" != typeof a) this.fromString(a, 256);else this.fromString(a, b);
	}
	
	// return new, unset BigInteger
	function nbi() {
	  return new BigInteger(null);
	}
	
	// am: Compute w_j += (x*this_i), propagate carries,
	// c is initial carry, returns final carry.
	// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
	// We need to select the fastest one that works in this environment.
	
	// am1: use a single mult and divide to get the high bits,
	// max digit bits should be 26 because
	// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
	function am1(i, x, w, j, c, n) {
	  while (--n >= 0) {
	    var v = x * this[i++] + w[j] + c;
	    c = Math.floor(v / 0x4000000);
	    w[j++] = v & 0x3ffffff;
	  }
	  return c;
	}
	// am2 avoids a big mult-and-extract completely.
	// Max digit bits should be <= 30 because we do bitwise ops
	// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
	function am2(i, x, w, j, c, n) {
	  var xl = x & 0x7fff,
	      xh = x >> 15;
	  while (--n >= 0) {
	    var l = this[i] & 0x7fff;
	    var h = this[i++] >> 15;
	    var m = xh * l + h * xl;
	    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
	    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
	    w[j++] = l & 0x3fffffff;
	  }
	  return c;
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i, x, w, j, c, n) {
	  var xl = x & 0x3fff,
	      xh = x >> 14;
	  while (--n >= 0) {
	    var l = this[i] & 0x3fff;
	    var h = this[i++] >> 14;
	    var m = xh * l + h * xl;
	    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
	    c = (l >> 28) + (m >> 14) + xh * h;
	    w[j++] = l & 0xfffffff;
	  }
	  return c;
	}
	if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
	  BigInteger.prototype.am = am2;
	  dbits = 30;
	} else if (j_lm && navigator.appName != "Netscape") {
	  BigInteger.prototype.am = am1;
	  dbits = 26;
	} else {
	  // Mozilla/Netscape seems to prefer am3
	  BigInteger.prototype.am = am3;
	  dbits = 28;
	}
	
	BigInteger.prototype.DB = dbits;
	BigInteger.prototype.DM = (1 << dbits) - 1;
	BigInteger.prototype.DV = 1 << dbits;
	
	var BI_FP = 52;
	BigInteger.prototype.FV = Math.pow(2, BI_FP);
	BigInteger.prototype.F1 = BI_FP - dbits;
	BigInteger.prototype.F2 = 2 * dbits - BI_FP;
	
	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr, vv;
	rr = "0".charCodeAt(0);
	for (vv = 0; vv <= 9; ++vv) {
	  BI_RC[rr++] = vv;
	}rr = "a".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) {
	  BI_RC[rr++] = vv;
	}rr = "A".charCodeAt(0);
	for (vv = 10; vv < 36; ++vv) {
	  BI_RC[rr++] = vv;
	}function int2char(n) {
	  return BI_RM.charAt(n);
	}
	function intAt(s, i) {
	  var c = BI_RC[s.charCodeAt(i)];
	  return c == null ? -1 : c;
	}
	
	// (protected) copy this to r
	function bnpCopyTo(r) {
	  for (var i = this.t - 1; i >= 0; --i) {
	    r[i] = this[i];
	  }r.t = this.t;
	  r.s = this.s;
	}
	
	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x) {
	  this.t = 1;
	  this.s = x < 0 ? -1 : 0;
	  if (x > 0) this[0] = x;else if (x < -1) this[0] = x + DV;else this.t = 0;
	}
	
	// return bigint initialized to value
	function nbv(i) {
	  var r = nbi();r.fromInt(i);return r;
	}
	
	// (protected) set from string and radix
	function bnpFromString(s, b) {
	  var k;
	  if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 256) k = 8; // byte array
	  else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else {
	      this.fromRadix(s, b);return;
	    }
	  this.t = 0;
	  this.s = 0;
	  var i = s.length,
	      mi = false,
	      sh = 0;
	  while (--i >= 0) {
	    var x = k == 8 ? s[i] & 0xff : intAt(s, i);
	    if (x < 0) {
	      if (s.charAt(i) == "-") mi = true;
	      continue;
	    }
	    mi = false;
	    if (sh == 0) this[this.t++] = x;else if (sh + k > this.DB) {
	      this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
	      this[this.t++] = x >> this.DB - sh;
	    } else this[this.t - 1] |= x << sh;
	    sh += k;
	    if (sh >= this.DB) sh -= this.DB;
	  }
	  if (k == 8 && (s[0] & 0x80) != 0) {
	    this.s = -1;
	    if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
	  }
	  this.clamp();
	  if (mi) BigInteger.ZERO.subTo(this, this);
	}
	
	// (protected) clamp off excess high words
	function bnpClamp() {
	  var c = this.s & this.DM;
	  while (this.t > 0 && this[this.t - 1] == c) {
	    --this.t;
	  }
	}
	
	// (public) return string representation in given radix
	function bnToString(b) {
	  if (this.s < 0) return "-" + this.negate().toString(b);
	  var k;
	  if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);
	  var km = (1 << k) - 1,
	      d,
	      m = false,
	      r = "",
	      i = this.t;
	  var p = this.DB - i * this.DB % k;
	  if (i-- > 0) {
	    if (p < this.DB && (d = this[i] >> p) > 0) {
	      m = true;r = int2char(d);
	    }
	    while (i >= 0) {
	      if (p < k) {
	        d = (this[i] & (1 << p) - 1) << k - p;
	        d |= this[--i] >> (p += this.DB - k);
	      } else {
	        d = this[i] >> (p -= k) & km;
	        if (p <= 0) {
	          p += this.DB;--i;
	        }
	      }
	      if (d > 0) m = true;
	      if (m) r += int2char(d);
	    }
	  }
	  return m ? r : "0";
	}
	
	// (public) -this
	function bnNegate() {
	  var r = nbi();BigInteger.ZERO.subTo(this, r);return r;
	}
	
	// (public) |this|
	function bnAbs() {
	  return this.s < 0 ? this.negate() : this;
	}
	
	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a) {
	  var r = this.s - a.s;
	  if (r != 0) return r;
	  var i = this.t;
	  r = i - a.t;
	  if (r != 0) return this.s < 0 ? -r : r;
	  while (--i >= 0) {
	    if ((r = this[i] - a[i]) != 0) return r;
	  }return 0;
	}
	
	// returns bit length of the integer x
	function nbits(x) {
	  var r = 1,
	      t;
	  if ((t = x >>> 16) != 0) {
	    x = t;r += 16;
	  }
	  if ((t = x >> 8) != 0) {
	    x = t;r += 8;
	  }
	  if ((t = x >> 4) != 0) {
	    x = t;r += 4;
	  }
	  if ((t = x >> 2) != 0) {
	    x = t;r += 2;
	  }
	  if ((t = x >> 1) != 0) {
	    x = t;r += 1;
	  }
	  return r;
	}
	
	// (public) return the number of bits in "this"
	function bnBitLength() {
	  if (this.t <= 0) return 0;
	  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
	}
	
	// (protected) r = this << n*DB
	function bnpDLShiftTo(n, r) {
	  var i;
	  for (i = this.t - 1; i >= 0; --i) {
	    r[i + n] = this[i];
	  }for (i = n - 1; i >= 0; --i) {
	    r[i] = 0;
	  }r.t = this.t + n;
	  r.s = this.s;
	}
	
	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n, r) {
	  for (var i = n; i < this.t; ++i) {
	    r[i - n] = this[i];
	  }r.t = Math.max(this.t - n, 0);
	  r.s = this.s;
	}
	
	// (protected) r = this << n
	function bnpLShiftTo(n, r) {
	  var bs = n % this.DB;
	  var cbs = this.DB - bs;
	  var bm = (1 << cbs) - 1;
	  var ds = Math.floor(n / this.DB),
	      c = this.s << bs & this.DM,
	      i;
	  for (i = this.t - 1; i >= 0; --i) {
	    r[i + ds + 1] = this[i] >> cbs | c;
	    c = (this[i] & bm) << bs;
	  }
	  for (i = ds - 1; i >= 0; --i) {
	    r[i] = 0;
	  }r[ds] = c;
	  r.t = this.t + ds + 1;
	  r.s = this.s;
	  r.clamp();
	}
	
	// (protected) r = this >> n
	function bnpRShiftTo(n, r) {
	  r.s = this.s;
	  var ds = Math.floor(n / this.DB);
	  if (ds >= this.t) {
	    r.t = 0;return;
	  }
	  var bs = n % this.DB;
	  var cbs = this.DB - bs;
	  var bm = (1 << bs) - 1;
	  r[0] = this[ds] >> bs;
	  for (var i = ds + 1; i < this.t; ++i) {
	    r[i - ds - 1] |= (this[i] & bm) << cbs;
	    r[i - ds] = this[i] >> bs;
	  }
	  if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
	  r.t = this.t - ds;
	  r.clamp();
	}
	
	// (protected) r = this - a
	function bnpSubTo(a, r) {
	  var i = 0,
	      c = 0,
	      m = Math.min(a.t, this.t);
	  while (i < m) {
	    c += this[i] - a[i];
	    r[i++] = c & this.DM;
	    c >>= this.DB;
	  }
	  if (a.t < this.t) {
	    c -= a.s;
	    while (i < this.t) {
	      c += this[i];
	      r[i++] = c & this.DM;
	      c >>= this.DB;
	    }
	    c += this.s;
	  } else {
	    c += this.s;
	    while (i < a.t) {
	      c -= a[i];
	      r[i++] = c & this.DM;
	      c >>= this.DB;
	    }
	    c -= a.s;
	  }
	  r.s = c < 0 ? -1 : 0;
	  if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;
	  r.t = i;
	  r.clamp();
	}
	
	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a, r) {
	  var x = this.abs(),
	      y = a.abs();
	  var i = x.t;
	  r.t = i + y.t;
	  while (--i >= 0) {
	    r[i] = 0;
	  }for (i = 0; i < y.t; ++i) {
	    r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
	  }r.s = 0;
	  r.clamp();
	  if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
	}
	
	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r) {
	  var x = this.abs();
	  var i = r.t = 2 * x.t;
	  while (--i >= 0) {
	    r[i] = 0;
	  }for (i = 0; i < x.t - 1; ++i) {
	    var c = x.am(i, x[i], r, 2 * i, 0, 1);
	    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
	      r[i + x.t] -= x.DV;
	      r[i + x.t + 1] = 1;
	    }
	  }
	  if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
	  r.s = 0;
	  r.clamp();
	}
	
	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m, q, r) {
	  var pm = m.abs();
	  if (pm.t <= 0) return;
	  var pt = this.abs();
	  if (pt.t < pm.t) {
	    if (q != null) q.fromInt(0);
	    if (r != null) this.copyTo(r);
	    return;
	  }
	  if (r == null) r = nbi();
	  var y = nbi(),
	      ts = this.s,
	      ms = m.s;
	  var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
	  if (nsh > 0) {
	    pm.lShiftTo(nsh, y);pt.lShiftTo(nsh, r);
	  } else {
	    pm.copyTo(y);pt.copyTo(r);
	  }
	  var ys = y.t;
	  var y0 = y[ys - 1];
	  if (y0 == 0) return;
	  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
	  var d1 = this.FV / yt,
	      d2 = (1 << this.F1) / yt,
	      e = 1 << this.F2;
	  var i = r.t,
	      j = i - ys,
	      t = q == null ? nbi() : q;
	  y.dlShiftTo(j, t);
	  if (r.compareTo(t) >= 0) {
	    r[r.t++] = 1;
	    r.subTo(t, r);
	  }
	  BigInteger.ONE.dlShiftTo(ys, t);
	  t.subTo(y, y); // "negative" y so we can replace sub with am later
	  while (y.t < ys) {
	    y[y.t++] = 0;
	  }while (--j >= 0) {
	    // Estimate quotient digit
	    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
	    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
	      // Try it out
	      y.dlShiftTo(j, t);
	      r.subTo(t, r);
	      while (r[i] < --qd) {
	        r.subTo(t, r);
	      }
	    }
	  }
	  if (q != null) {
	    r.drShiftTo(ys, q);
	    if (ts != ms) BigInteger.ZERO.subTo(q, q);
	  }
	  r.t = ys;
	  r.clamp();
	  if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
	  if (ts < 0) BigInteger.ZERO.subTo(r, r);
	}
	
	// (public) this mod a
	function bnMod(a) {
	  var r = nbi();
	  this.abs().divRemTo(a, null, r);
	  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
	  return r;
	}
	
	// Modular reduction using "classic" algorithm
	function Classic(m) {
	  this.m = m;
	}
	function cConvert(x) {
	  if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;
	}
	function cRevert(x) {
	  return x;
	}
	function cReduce(x) {
	  x.divRemTo(this.m, null, x);
	}
	function cMulTo(x, y, r) {
	  x.multiplyTo(y, r);this.reduce(r);
	}
	function cSqrTo(x, r) {
	  x.squareTo(r);this.reduce(r);
	}
	
	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;
	
	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
	//         xy == 1 (mod m)
	//         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit() {
	  if (this.t < 1) return 0;
	  var x = this[0];
	  if ((x & 1) == 0) return 0;
	  var y = x & 3; // y == 1/x mod 2^2
	  y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
	  y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
	  y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
	  // last step - calculate inverse mod DV directly;
	  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	  y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
	  // we really want the negative inverse, and -DV < y < DV
	  return y > 0 ? this.DV - y : -y;
	}
	
	// Montgomery reduction
	function Montgomery(m) {
	  this.m = m;
	  this.mp = m.invDigit();
	  this.mpl = this.mp & 0x7fff;
	  this.mph = this.mp >> 15;
	  this.um = (1 << m.DB - 15) - 1;
	  this.mt2 = 2 * m.t;
	}
	
	// xR mod m
	function montConvert(x) {
	  var r = nbi();
	  x.abs().dlShiftTo(this.m.t, r);
	  r.divRemTo(this.m, null, r);
	  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
	  return r;
	}
	
	// x/R mod m
	function montRevert(x) {
	  var r = nbi();
	  x.copyTo(r);
	  this.reduce(r);
	  return r;
	}
	
	// x = x/R mod m (HAC 14.32)
	function montReduce(x) {
	  while (x.t <= this.mt2) {
	    // pad x so am has enough room later
	    x[x.t++] = 0;
	  }for (var i = 0; i < this.m.t; ++i) {
	    // faster way of calculating u0 = x[i]*mp mod DV
	    var j = x[i] & 0x7fff;
	    var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
	    // use am to combine the multiply-shift-add into one call
	    j = i + this.m.t;
	    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
	    // propagate carry
	    while (x[j] >= x.DV) {
	      x[j] -= x.DV;x[++j]++;
	    }
	  }
	  x.clamp();
	  x.drShiftTo(this.m.t, x);
	  if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
	}
	
	// r = "x^2/R mod m"; x != r
	function montSqrTo(x, r) {
	  x.squareTo(r);this.reduce(r);
	}
	
	// r = "xy/R mod m"; x,y != r
	function montMulTo(x, y, r) {
	  x.multiplyTo(y, r);this.reduce(r);
	}
	
	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;
	
	// (protected) true iff this is even
	function bnpIsEven() {
	  return (this.t > 0 ? this[0] & 1 : this.s) == 0;
	}
	
	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e, z) {
	  if (e > 0xffffffff || e < 1) return BigInteger.ONE;
	  var r = nbi(),
	      r2 = nbi(),
	      g = z.convert(this),
	      i = nbits(e) - 1;
	  g.copyTo(r);
	  while (--i >= 0) {
	    z.sqrTo(r, r2);
	    if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {
	      var t = r;r = r2;r2 = t;
	    }
	  }
	  return z.revert(r);
	}
	
	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e, m) {
	  var z;
	  if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);
	  return this.exp(e, z);
	}
	
	// protected
	BigInteger.prototype.copyTo = bnpCopyTo;
	BigInteger.prototype.fromInt = bnpFromInt;
	BigInteger.prototype.fromString = bnpFromString;
	BigInteger.prototype.clamp = bnpClamp;
	BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger.prototype.lShiftTo = bnpLShiftTo;
	BigInteger.prototype.rShiftTo = bnpRShiftTo;
	BigInteger.prototype.subTo = bnpSubTo;
	BigInteger.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger.prototype.squareTo = bnpSquareTo;
	BigInteger.prototype.divRemTo = bnpDivRemTo;
	BigInteger.prototype.invDigit = bnpInvDigit;
	BigInteger.prototype.isEven = bnpIsEven;
	BigInteger.prototype.exp = bnpExp;
	
	// public
	BigInteger.prototype.toString = bnToString;
	BigInteger.prototype.negate = bnNegate;
	BigInteger.prototype.abs = bnAbs;
	BigInteger.prototype.compareTo = bnCompareTo;
	BigInteger.prototype.bitLength = bnBitLength;
	BigInteger.prototype.mod = bnMod;
	BigInteger.prototype.modPowInt = bnModPowInt;
	
	// "constants"
	BigInteger.ZERO = nbv(0);
	BigInteger.ONE = nbv(1);
	
	exports.default = BigInteger;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _prng = __webpack_require__(93);
	
	var rng_state; // Random number generator - requires a PRNG backend, e.g. prng4.js
	
	// For best results, put code like
	// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
	// in your main HTML document.
	
	var rng_pool;
	var rng_pptr;
	
	// Mix in a 32-bit integer into the pool
	function rng_seed_int(x) {
	  rng_pool[rng_pptr++] ^= x & 255;
	  rng_pool[rng_pptr++] ^= x >> 8 & 255;
	  rng_pool[rng_pptr++] ^= x >> 16 & 255;
	  rng_pool[rng_pptr++] ^= x >> 24 & 255;
	  if (rng_pptr >= _prng.rng_psize) rng_pptr -= _prng.rng_psize;
	}
	
	// Mix in the current time (w/milliseconds) into the pool
	function rng_seed_time() {
	  rng_seed_int(new Date().getTime());
	}
	
	// Initialize the pool with junk if needed.
	if (rng_pool == null) {
	  rng_pool = new Array();
	  rng_pptr = 0;
	  var t;
	  if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
	    // Extract entropy (256 bits) from NS4 RNG if available
	    var z = window.crypto.random(32);
	    for (t = 0; t < z.length; ++t) {
	      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
	    }
	  }
	  while (rng_pptr < _prng.rng_psize) {
	    // extract some randomness from Math.random()
	    t = Math.floor(65536 * Math.random());
	    rng_pool[rng_pptr++] = t >>> 8;
	    rng_pool[rng_pptr++] = t & 255;
	  }
	  rng_pptr = 0;
	  rng_seed_time();
	  //rng_seed_int(window.screenX);
	  //rng_seed_int(window.screenY);
	}
	
	function rng_get_byte() {
	  if (rng_state == null) {
	    rng_seed_time();
	    rng_state = (0, _prng.prng_newstate)();
	    rng_state.init(rng_pool);
	    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
	      rng_pool[rng_pptr] = 0;
	    }rng_pptr = 0;
	    //rng_pool = null;
	  }
	  // TODO: allow reseeding after first request
	  return rng_state.next();
	}
	
	function rng_get_bytes(ba) {
	  var i;
	  for (i = 0; i < ba.length; ++i) {
	    ba[i] = rng_get_byte();
	  }
	}
	
	function SecureRandom() {}
	
	SecureRandom.prototype.nextBytes = rng_get_bytes;
	
	exports.default = SecureRandom;

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// prng4.js - uses Arcfour as a PRNG
	function Arcfour() {
	    this.i = 0;
	    this.j = 0;
	    this.S = new Array();
	}
	
	// Initialize arcfour context from key, an array of ints, each from [0..255]
	function ARC4init(key) {
	    var i, j, t;
	    for (i = 0; i < 256; ++i) {
	        this.S[i] = i;
	    }j = 0;
	    for (i = 0; i < 256; ++i) {
	        j = j + this.S[i] + key[i % key.length] & 255;
	        t = this.S[i];
	        this.S[i] = this.S[j];
	        this.S[j] = t;
	    }
	    this.i = 0;
	    this.j = 0;
	}
	
	function ARC4next() {
	    var t;
	    this.i = this.i + 1 & 255;
	    this.j = this.j + this.S[this.i] & 255;
	    t = this.S[this.i];
	    this.S[this.i] = this.S[this.j];
	    this.S[this.j] = t;
	    return this.S[t + this.S[this.i] & 255];
	}
	
	Arcfour.prototype.init = ARC4init;
	Arcfour.prototype.next = ARC4next;
	
	// Plug in your RNG constructor here
	function prng_newstate() {
	    return new Arcfour();
	}
	
	// Pool size must be a multiple of 4 and greater than 32.
	// An array of bytes the size of the pool will be passed to init()
	var rng_psize = 256;
	
	exports.rng_psize = rng_psize;
	exports.prng_newstate = prng_newstate;

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"login\">\n    <div class=\"container\" >\n        <div class=\"row\">\n            <div class=\"right-con col-xs-6 col-xs-offset-6\">\n                <div class=\"register-box pr\">\n                    <div class=\"register-row1 pr\" >\n                        <a class=\"logo\"></a>\n                        <span class=\"weclome\">\n                                        <h1 >欢迎来到 阿喔优品</h1>\n                                        <small >阿喔优品 专业核销平台</small>\n                                    </span>\n                    </div>\n                    <div class=\"register-row2 pr\">\n                        <h3>欢迎回来</h3>\n                    </div>\n                    <div class=\"register-row3 pr\">\n                        <div class=\"register-row3-input\">\n                            <label for=\"username\" class=\"username\"></label>\n                            <input   type=\"text\" name=\"username\" id=\"username\" v-model=\"username\" placeholder=\"请输入账号\" />\n                        </div>\n                        <div class=\"register-row3-input\">\n                            <label for=\"password\" class=\"password\"></label>\n                            <input type=\"password\" name=\"username\" id=\"password\"  v-model=\"password\" v-on:keyup.enter=\"toLogin()\" placeholder=\"请输入密码\"/>\n                        </div>\n                    </div>\n                    <div class=\"register-row4 pr\">\n                        <a class=\"btn login\" @click=\"toLogin()\">登录</a>\n                        <p>如登录出现异常，请清理浏览器缓存后再尝试。</p>\n                    </div>\n                    <div class=\"register-row5 pr\">\n                        <p>Powered by ©2016-2017 awo123.cn</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(96)
	__vue_script__ = __webpack_require__(98)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(158)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-9001f244/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(97);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"App.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _assign = __webpack_require__(99);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _stringify = __webpack_require__(12);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _breadcrumb = __webpack_require__(105);
	
	var _breadcrumb2 = _interopRequireDefault(_breadcrumb);
	
	var _searchbar = __webpack_require__(110);
	
	var _searchbar2 = _interopRequireDefault(_searchbar);
	
	var _category = __webpack_require__(115);
	
	var _category2 = _interopRequireDefault(_category);
	
	var _cart = __webpack_require__(120);
	
	var _cart2 = _interopRequireDefault(_cart);
	
	var _calc = __webpack_require__(126);
	
	var _calc2 = _interopRequireDefault(_calc);
	
	var _Loading = __webpack_require__(131);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ListItem = __webpack_require__(136);
	
	var _ListItem2 = _interopRequireDefault(_ListItem);
	
	var _StockItem = __webpack_require__(141);
	
	var _StockItem2 = _interopRequireDefault(_StockItem);
	
	var _List = __webpack_require__(146);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _request = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'app',
	    data: function data() {
	        return {
	            showCategory: false,
	            giftIndex: 0,
	            cartItemIndex: 0,
	            showStockItem: false,
	            needQuantity: 0,
	            pageNum: 1,
	            appRepertories: [] };
	    },
	
	    computed: {
	        listLoading: function listLoading() {
	            return this.$store.state.currentPage.listLoading;
	        },
	        productParams: function productParams() {
	            return this.$store.state.currentPage.list;
	        },
	        page: function page() {
	
	            return this.$store.state.currentPage.pageData;
	        },
	        productDetail: function productDetail() {
	            return this.$store.state.itemData.appProductDetail;
	        },
	        specifications: function specifications() {
	            return this.$store.state.itemData.appSpecifications;
	        },
	        productCategories: function productCategories() {
	            return this.$store.state.categoryData;
	        },
	        cartData: function cartData() {
	            return this.$store.state.currentPage.cartData;
	        },
	        customData: function customData() {
	            return this.$store.state.currentPage.customData;
	        }
	    },
	    components: {
	        cart: _cart2.default,
	        calc: _calc2.default,
	        Pagination: _Pagination2.default,
	        breadcrumb: _breadcrumb2.default,
	        category: _category2.default,
	        ListItem: _ListItem2.default,
	        StockItem: _StockItem2.default,
	        ProductList: _List2.default,
	        searchbar: _searchbar2.default,
	        Loading: _Loading2.default
	    },
	    created: function created() {
	        this.fetchList();
	    },
	
	    methods: {
	        fetchList: function fetchList() {
	            this.$store.dispatch('fetchList', { "pageNum": this.pageNum });
	        },
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	        },
	
	        buildOrder: function buildOrder(cart) {
	            var _this = this;
	
	            console.log(cart);
	            var cartParam = { itemParams: [] };
	
	            cart.forEach(function (ele, index) {
	
	                cartParam.itemParams.push({ "productId": ele.id, "quantity": ele.amount });
	            });
	
	            var giftParam = { giftIds: [] };
	
	            cart.forEach(function (ele, index) {
	
	                if (ele.appGiftItem) {
	                    giftParam.giftIds.push({ "productId": ele.appGiftItem.id, "quantity": ele.appGiftItem.amount });
	                }
	            });
	
	            this.$store.commit("setOrderParams", {
	                cartParam: (0, _stringify2.default)(cartParam),
	                giftIds: (0, _stringify2.default)(giftParam),
	                couponCodeId: null,
	                usePoint: false,
	                useBalance: false,
	                memberId: this.customData.id,
	                guiderId: null
	            });
	
	            var apiObj = {
	                url: _request.API_URLS.b2b_orders + "/build",
	                data: this.$store.state.currentPage.orderParams
	            };
	
	            _request.request.fnPost(this, apiObj, function (res) {
	                _this.$store.commit("setMode", 'order');
	                _this.$store.commit("setOrderData", res.appOrderConfirmBean);
	                _this.$router.push('/order');
	            });
	        },
	        openDetail: function openDetail() {
	            var vm = this;
	            var item = this.$store.state.itemData.appProductDetail;
	            var itemGift = !!item.appGiftActivity;
	            var itemSpec = item.appSpecificationValues;
	            var itemswiper = '';
	
	            if (!itemGift && itemSpec.length == 0) {
	
	                var newitem = {};
	                (0, _assign2.default)(newitem, item);
	                newitem.selectDate = _util2.default.getSelectDate();
	                newitem.amount = 1;
	                this.pushCart(newitem);
	                return false;
	            }
	
	            vm.$nextTick(function () {
	                _layer2.default.open({
	                    id: 'layui-layer-item',
	                    type: 1,
	                    shade: 0.01,
	                    anim: 0,
	                    zIndex: 1000,
	                    closeBtn: 2,
	                    title: false,
	                    area: ['auto', 'auto'],
	                    content: $('#layer-item-box'),
	                    success: function success() {
	
	                        if (itemGift) {
	                            itemswiper = new Swiper('.gift-detail-item', {
	                                initialSlide: 0,
	                                pagination: '.gift-detail-item-pagination',
	                                paginationClickable: true,
	                                spaceBetween: 10,
	                                onInit: function onInit(swiper) {
	                                    vm.giftIndex = swiper.activeIndex;
	                                }
	                            });
	
	                            itemswiper.on('onSlideChangeEnd', function (swiper) {
	                                $(".gift-detail-tab").find('a').removeClass('selected');
	                                $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
	                                vm.giftIndex = swiper.activeIndex;
	                            });
	                            $(".gift-detail-tab").find('a').eq(0).addClass('selected');
	                            $(".gift-detail-tab").find('a').on('click', function () {
	                                $(".gift-detail-tab").find('a').removeClass('selected');
	                                itemswiper.slideTo($(this).index());
	
	                                vm.giftIndex = $(this).index();
	                            });
	                        }
	                    },
	                    end: function end() {
	                        if (itemGift) {
	                            itemswiper.destroy(true, true);
	                            itemswiper = null;
	                            $(".gift-detail-tab").find('a').off().removeClass('selected');
	                        }
	                    }
	                });
	            });
	        },
	        closeDetail: function closeDetail(item) {
	            _layer2.default.closeAll();
	            this.pushCart(item);
	        },
	        openStock: function openStock(item) {
	            var _this2 = this;
	
	            var vm = this;
	            var params = {
	                barcode: item.barCode,
	                quantity: item.amount - item.availableStock
	            };
	
	            this.needQuantity = item.amount - item.availableStock;
	
	            this.$store.dispatch("fetchAllocationList", params).then(function (res) {
	                _this2.appRepertories = res.appRepertories;
	                _this2.showStockItem = true;
	                vm.$nextTick(function () {
	                    _layer2.default.open({
	                        id: 'layui-layer-stock',
	                        type: 1,
	                        shade: 0.01,
	                        anim: 0,
	                        zIndex: 1000,
	                        closeBtn: 2,
	                        title: false,
	                        area: ['auto', 'auto'],
	                        content: $('#layer-stock-box'),
	                        success: function success() {},
	                        end: function end() {
	                            vm.appRepertories = [];
	                            vm.needQuantity = 0;
	                            vm.showStockItem = false;
	                        }
	                    });
	                });
	            }).catch(function (res) {
	                _layer2.default.alert("获取仓库信息失败", { "icon": 2 });
	            });
	            return false;
	        },
	        closeStock: function closeStock(params) {
	
	            if (!params.shopRepertoryId) {
	                _layer2.default.alert("请选择调拨门店", { icon: 2 });
	            } else {
	                this.$store.dispatch("applyAllocation", params).then(function (res) {
	                    _layer2.default.alert("调拨申请成功", { icon: 1, closeBtn: false, yes: function yes(index) {
	                            _layer2.default.closeAll();
	                        } });
	                }).catch(function (res) {
	                    _layer2.default.alert("调拨申请失败", { icon: 2, closeBtn: false, yes: function yes(index) {
	                            _layer2.default.closeAll();
	                        } });
	                });
	            }
	        },
	        pushCart: function pushCart(item) {
	
	            var find = false;
	
	            if (this.cartData.length > 0) {
	                for (var i in this.cartData) {
	
	                    if (this.cartData[i].id == item.id) {
	                        if (!this.cartData[i].appGiftItem) {
	                            this.cartData[i].amount++;
	                            find = true;
	                        } else if (this.cartData[i].appGiftItem.id == item.appGiftItem.id) {
	                            this.cartData[i].amount++;
	                            find = true;
	                        }
	                    }
	                }
	            }
	
	            if (!find) {
	                this.cartData.push(item);
	            }
	        }
	    }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	module.exports = __webpack_require__(14).Object.assign;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(25);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(102)});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(45)
	  , gOPS     = __webpack_require__(103)
	  , pIE      = __webpack_require__(104)
	  , toObject = __webpack_require__(61)
	  , IObject  = __webpack_require__(48)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(35)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 103 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 104 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(106)
	__vue_script__ = __webpack_require__(108)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\breadcrumb.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(109)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-10bb2358/breadcrumb.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(107);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./breadcrumb.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./breadcrumb.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"breadcrumb.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	exports.default = {
	    name: "breadcrumb",
	    props: ['productParams'],
	    created: function created() {},
	
	    methods: {
	        fetchCategory: function fetchCategory(cid) {}
	    }
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = "\n\t<ol class=\"breadcrumb\">\n     <li>\n         <span  class=\"glyphicon glyphicon-home\"></span>\n         <a @click=\"fetchCategory(null)\">首页</a>\n     </li>\n     <li v-show=\"productParams.categoryName\">\n         <a @click=\"fetchCategory(productParams.categoryId)\"> {{productParams.categoryName}}</a>\n     </li>\n     <li v-show=\"productParams.brandName\">\n         <a>{{productParams.brandName}}</a>\n     </li>\n </ol>\n";

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(111)
	__vue_script__ = __webpack_require__(113)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\searchbar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(114)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4118b6b4/searchbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(112);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./searchbar.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./searchbar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"searchbar.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	exports.default = {
	    name: "searchbar",
	    props: ['productParams'],
	    data: function data() {
	        return {
	            searchItem: {
	                searching: false,
	                keyword: ""
	            }
	        };
	    },
	
	    watch: {},
	    methods: {
	        fetchList: function fetchList() {
	            this.$store.dispatch('fetchList', { "searchStr": this.searchItem.keyword, "pageNum": 1 });
	        }
	    }
	};

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = "\n\t    <div class=\"searchbar\">\n         <div class=\"input-group\">\n             <input type=\"text\" class=\"form-control\" v-model=\"searchItem.keyword\" @keyup.enter=\"fetchList\" placeholder=\"条码/商品名称\">\n             <span class=\"input-group-btn\">\n                 <button class=\"btn btn-default\" @click=\"fetchList\"><span class=\"glyphicon glyphicon-search\"></span></button>\n             </span>\n         </div>\n    </div>\n";

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(116)
	__vue_script__ = __webpack_require__(118)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(119)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-f615b3da/category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(117);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"category.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 118 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: "category",
	    props: ['showCategory', 'productCategories', 'productParams'],
	    data: function data() {
	        return {
	            cacheload: false,
	            showSubMenu: false
	        };
	    },
	
	    computed: {
	        subCategory: function subCategory() {
	            if (this.productCategories.length > 0) {
	                var list = this.productCategories.filter(function (arr) {
	                    return arr.appTags != null;
	                });
	                return list[0].appTags;
	            } else {
	                return [];
	            }
	        }
	    },
	    watch: {
	        'showCategory': function showCategory(val) {
	            if (val && !this.cacheload) {
	                this.cacheload = true;
	                this.fetchCategory(null);
	            }
	        }
	    },
	    methods: {
	        outcheck: function outcheck() {
	            var _this = this;
	
	            var out = true;
	            var lock = function lock() {
	                out = false;
	            };
	            if (document.querySelector('.category-list')) {
	                document.querySelector('.category-list').addEventListener('mouseover', lock, false);
	                setTimeout(function () {
	                    if (out && document.querySelector('.category-list')) {
	                        document.querySelector('.category-list').addEventListener('mouseover', lock, false);
	                        _this.$parent.showCategory = false;
	                    }
	                }, 500);
	            }
	        },
	        fetchCategory: function fetchCategory(cid, cname) {
	            var _this2 = this;
	
	            if (cid) {
	                this.showSubMenu = true;
	            }
	            this.$store.dispatch('fetchCategory', cid).then(function (res) {
	                if (!cid) {}
	                _this2.$store.commit("setProductParams", { "categoryId": cid, "categoryName": cname, "brandId": null, "brandName": null });
	            });
	        },
	        fetchAllBrand: function fetchAllBrand() {
	            var _this3 = this;
	
	            var params = {
	                'categoryId': null,
	                'brandId': null,
	                'pageNum': 1,
	                'searchStr': null,
	                "categoryName": null,
	                "brandName": null
	            };
	
	            this.$store.dispatch('fetchList', params).then(function (res) {
	                _this3.showSubMenu = false;
	                setTimeout(function () {
	                    _this3.$parent.showCategory = false;
	                }, 300);
	            });
	        },
	        fetchBrand: function fetchBrand(bid, bname) {
	            var _this4 = this;
	
	            var params = { "categoryId": this.productParams.categoryId, "categoryName": this.productParams.categoryName, "brandId": bid, "brandName": bname, "pageNum": 1 };
	            this.$store.dispatch('fetchList', params).then(function (res) {
	                _this4.$parent.showCategory = false;
	            });
	        }
	    }
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"categroy row\" v-if=\"showCategory\">\n    <div class=\"col-xs-12 category-list clearfix\" @mouseleave=\"outcheck\" >\n    <div class=\"menu\"  >\n        <a class=\"sub all\"  :class=\"{cur:!productParams.categoryId}\" href=\"javascript:void(0)\"  @click=\"fetchAllBrand()\">全部分类</a>\n        <a  class=\"sub\" href=\"javascript:void(0)\"\n            :class=\"{cur:item.id==productParams.categoryId}\"\n            v-for=\"(item,index) in productCategories\"\n            @click=\"fetchCategory(item.id,item.name)\">{{item.name}}</a>\n    </div>\n    <div class=\"sub-menu\" v-if=\"showSubMenu\">\n                 <div v-show=\"!subCategory || !subCategory.length\"><p> 数据加载中...</p></div>\n                 <div class=\"l\" v-for=\"(item,index) in subCategory\">\n                    <div class=\"l-t\">{{item.name}}</div>\n                    <div class=\"l-c\">\n                        <a  class=\"btn btn-default sub-menu-category\"  :class=\"{cur:item2.id==productParams.brandId}\" v-for=\"(item2,index2) in item.appBrands\"  @click=\"fetchBrand(item2.id,item2.name,subCategory.id,subCategory.name)\">{{item2.name}}</a>\n                    </div>\n                </div>\n    </div>\n\n    </div>\n</div>\n";

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(121)
	__vue_script__ = __webpack_require__(123)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\cart.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(125)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b95d6c96/cart.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(122);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./cart.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"cart.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "cart",
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        },
	        stocktips: function stocktips(value) {
	            if (value.amount > value.availableStock) {
	                return "库存不足";
	            } else {
	                return "";
	            }
	        }
	    },
	    props: ['cartData', 'cartItemIndex'],
	
	    created: function created() {},
	
	    computed: {
	        totalprice: function totalprice() {
	            var total = 0;
	            this.cartData.forEach(function (e, i) {
	                total += e.price * e.amount;
	            });
	            return total;
	        }
	    },
	    methods: {
	        setCartHeight: function setCartHeight() {
	
	            var w = window.innerWidth;
	            var lh = document.querySelector('.left-con').offsetHeight;
	            var ch = document.querySelector('.shoppingCalc').offsetHeight;
	
	            if (w >= 768) {
	                document.getElementById("#shoppingCart-list").style.display = "block";
	                document.getElementById("shoppingCart-list").style.height = lh - ch - 140 + "px";
	            } else {
	
	                document.getElementById("#shoppingCart-list").style.display = "none";
	            }
	        },
	
	        checkCartItem: function checkCartItem(index) {
	            this.$parent.cartItemIndex = index;
	        },
	        openStock: function openStock(item) {
	            if (item) {
	                this.$emit('open-stock', item);
	            }
	        }
	    }
	};

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = window.jQuery;

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "\n   \t<div class=\"shoppingCart\">\n\t\t\t\t<div class=\"shoppingCart-list\" id=\"shoppingCart-list\" :class=\"{empty:cartData.length==0}\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li :class=\"{checked:index==cartItemIndex}\" v-for=\"(item,index) in cartData \" track-by=\"$index\" @click=\"checkCartItem(index);\">\n\t\t\t\t\t\t\t<div class=\"shoppingCart-item\">\n\t\t\t\t\t\t\t\t<p>{{item.title}}</p>\n\t\t\t\t\t\t\t\t<p class=\"small\">\n\t\t\t\t\t\t\t\t\t<span>{{item.name}}</span> <span>{{item.selectDate}}</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p class=\"small\">\n\t\t\t\t\t\t\t\t\t<span>数量 :{{item.amount}} * 单价 {{item.price  }}</span><span></span>\n\t\t\t\t\t\t\t\t\t<span class=\"tips\" @click=\"openStock(item)\">{{item | stocktips}}</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p class=\"total\">\n\t\t\t\t\t\t\t\t\t<span v-if=\"item.appGiftItem\">赠送：{{item.appGiftItem.name}}</span>\n\t\t\t\t\t\t\t\t\t<span>{{item.amount*item.price | currency }}</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"totalprice\">\n\t\t\t\t\t总价 <span class=\"primary\">{{totalprice | currency }}</span>\n\t\t\t\t</div>\n\t</div>\n";

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(127)
	__vue_script__ = __webpack_require__(129)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\calc.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(130)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-cfb6b32c/calc.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(128);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./calc.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./calc.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"calc.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "calc",
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '';
	            return '¥ ' + value.toFixed(2);
	        }
	    },
	    computed: {
	        customName: function customName() {
	            var customs = this.$store.state.currentPage.customData;
	            if (customs.nickname) {
	                return customs.nickname;
	            }
	        }
	    },
	    props: ['cartData', 'cartItemIndex'],
	    methods: {
	        showCustomModal: function showCustomModal() {
	            var vm = this;
	            this.$root.showCustomModal = true;
	            function centerModals() {
	                (0, _jquery2.default)(this).each(function (i) {
	                    var $clone = (0, _jquery2.default)(this).clone().css('display', 'block').appendTo('body');
	                    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                    top = top > 0 ? top : 0;
	                    $clone.remove();
	                    (0, _jquery2.default)(this).find('.modal-content').css("margin-top", top);
	                });
	            };
	            this.$nextTick(function () {
	                var modal = '#layer-custom';
	                (0, _jquery2.default)(modal).on('show.bs.modal', centerModals);
	                (0, _jquery2.default)(modal).on('hidden.bs.modal', function () {
	                    vm.$root.showCustomModal = false;
	                });
	
	                (0, _jquery2.default)(modal).modal({
	                    backdrop: 'static',
	                    keyboard: false,
	                    show: false
	                });
	
	                (0, _jquery2.default)(window).on('resize', function (modal) {
	                    return centerModals;
	                });
	
	                (0, _jquery2.default)(modal).modal('toggle');
	            });
	        },
	
	        calc: function calc(keycode) {
	
	            if (this.cartData.length == 0) {
	                return;
	            }
	
	            var index = this.cartItemIndex;
	
	            var amount = this.cartData[index].amount;
	
	            if (!this.cartData[index].amountDiy) {
	                amount = "";
	                this.cartData[index].amountDiy = true;
	            }
	            if (isNaN(keycode)) {
	                switch (keycode) {
	                    case 'qty':
	                        this.cartData[index].amount = 1;
	                        this.cartData[index].amountDiy = false;
	                        break;
	                    case 'x':
	                        var str = amount + "";
	                        amount = str.substring(0, str.length - 1);
	                        if (amount == "") {
	                            this.cartData.splice(index, 1);
	                        } else {
	                            this.cartData[index].amount = parseInt(amount);
	                        }
	                        break;
	                }
	            } else {
	
	                amount += keycode + '';
	
	                this.cartData[index].amount = parseInt(amount);
	            }
	        },
	
	        checkOrder: function checkOrder() {
	            if (this.cartData.length > 0) {
	
	                this.$emit('trigger-build-order', this.cartData);
	            } else {
	                alert('请先选择物品');
	            }
	        }
	
	    }
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"shoppingCalc\">\n\t<table class=\"table table-bordered\" >\n\t\t<tbody >\n\t\t<tr>\n\t\t\t<td colspan=\"3\" class=\"t1\" @click=\"showCustomModal\" ><span class=\"iconfont icon-guanliyuan\"></span>{{customName}}</td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(1);\">1</a></td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(2);\">2</a></td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(3);\">3</a></td>\n\t\t\t<td rowspan=\"3\"><a class=\"num-btn btn-lightgreen\" style=\"\" @click=\"calc('qty');\" >QTY</a></td>\n\t\t</tr>\n\n\t\t<tr>\n\t\t\t<td colspan=\"3\" rowspan=\"3\" class=\"t1 \">\n\t\t\t\t<a class=\"settle-accounts-btn\" @click=\"checkOrder\"></a>\n\t\t\t</td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(4);\">4</a></td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(5);\">5</a></td>\n\t\t\t<td><a  class=\"num-btn btn-default\" @click=\"calc(6);\">6</a></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td><a class=\"num-btn btn-default\" @click=\"calc(7);\">7</a></td>\n\t\t\t<td><a class=\"num-btn btn-default\" @click=\"calc(8);\">8</a></td>\n\t\t\t<td><a class=\"num-btn btn-default\" @click=\"calc(9);\">9</a></td>\n\t\t</tr>\n\t\t<tr>\n\n\t\t\t<td colspan=\"3\"><a class=\"num-btn btn-default\" @click=\"calc(0);\">0</a></td>\n\n\t\t\t<td><a class=\"num-btn btn-default\" @click=\"calc('x');\">x</a></td>\n\t\t</tr>\n\t\t</tbody>\n\t</table>\n\n</div>\n";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(132)
	__vue_script__ = __webpack_require__(134)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\Loading.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(135)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-37f6b497/Loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(133);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-37f6b497&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Loading.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-37f6b497&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.loadEffect[_v-37f6b497]{\r\n    width: 100px;\r\n    height: 100px;\r\n    position:absolute;\r\n    margin: 0 auto;\r\n    top:50%;\r\n    left:50%;\r\n    margin-top:-50px;\r\n    margin-left:-50px;\r\n    -webkit-transform: scale(.5);\r\n            transform: scale(.5);\r\n    z-index:99;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]{\r\n    display: inline-block;\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius: 50%;\r\n    background: #67e7d5;\r\n    position: absolute;\r\n    -webkit-animation: load 1.04s ease infinite;\r\n}\r\n@-webkit-keyframes load{\r\n    0%{\r\n\t-webkit-transform: scale(1.2);\r\n\topacity: 1;\r\n    }\r\n    100%{\r\n\t-webkit-transform: scale(.3);\r\n\topacity: 0.5;\r\n    }\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(1){\r\n    left: 0;\r\n    top: 50%;\r\n    margin-top:-10px;\r\n    -webkit-animation-delay:0.13s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(2){\r\n    left: 14px;\r\n    top: 14px;\r\n    -webkit-animation-delay:0.26s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(3){\r\n    left: 50%;\r\n    top: 0;\r\n    margin-left: -10px;\r\n    -webkit-animation-delay:0.39s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(4){\r\n    top: 14px;\r\n    right:14px;\r\n    -webkit-animation-delay:0.52s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(5){\r\n    right: 0;\r\n    top: 50%;\r\n    margin-top:-10px;\r\n    -webkit-animation-delay:0.65s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(6){\r\n    right: 14px;\r\n    bottom:14px;\r\n    -webkit-animation-delay:0.78s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(7){\r\n    bottom: 0;\r\n    left: 50%;\r\n    margin-left: -10px;\r\n    -webkit-animation-delay:0.91s;\r\n}\r\n.loadEffect .ld-span[_v-37f6b497]:nth-child(8){\r\n    bottom: 14px;\r\n    left: 14px;\r\n    -webkit-animation-delay:1.04s;\r\n}\r\n", "", {"version":3,"sources":["/./src/app/views/products/Loading.vue?6ba7d92c"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;AAsBA;IACA,aAAA;IACA,cAAA;IACA,kBAAA;IACA,eAAA;IACA,QAAA;IACA,SAAA;IACA,iBAAA;IACA,kBAAA;IACA,6BAAA;YAAA,qBAAA;IACA,WAAA;CACA;AACA;IACA,sBAAA;IACA,YAAA;IACA,aAAA;IACA,mBAAA;IACA,oBAAA;IACA,mBAAA;IACA,4CAAA;CACA;AACA;IACA;CACA,8BAAA;CACA,WAAA;KACA;IACA;CACA,6BAAA;CACA,aAAA;KACA;CACA;AACA;IACA,QAAA;IACA,SAAA;IACA,iBAAA;IACA,8BAAA;CACA;AACA;IACA,WAAA;IACA,UAAA;IACA,8BAAA;CACA;AACA;IACA,UAAA;IACA,OAAA;IACA,mBAAA;IACA,8BAAA;CACA;AACA;IACA,UAAA;IACA,WAAA;IACA,8BAAA;CACA;AACA;IACA,SAAA;IACA,SAAA;IACA,iBAAA;IACA,8BAAA;CACA;AACA;IACA,YAAA;IACA,YAAA;IACA,8BAAA;CACA;AACA;IACA,UAAA;IACA,UAAA;IACA,mBAAA;IACA,8BAAA;CACA;AACA;IACA,aAAA;IACA,WAAA;IACA,8BAAA;CACA","file":"Loading.vue","sourcesContent":["//加载中的效果组件\r\n\r\n<template>\r\n<div class=\"loadEffect\">\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n    <span class=\"ld-span\"></span>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'Loading',\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.loadEffect{\r\n    width: 100px;\r\n    height: 100px;\r\n    position:absolute;\r\n    margin: 0 auto;\r\n    top:50%;\r\n    left:50%;\r\n    margin-top:-50px;\r\n    margin-left:-50px;\r\n    transform: scale(.5);\r\n    z-index:99;\r\n}\r\n.loadEffect .ld-span{\r\n    display: inline-block;\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius: 50%;\r\n    background: #67e7d5;\r\n    position: absolute;\r\n    -webkit-animation: load 1.04s ease infinite;\r\n}\r\n@-webkit-keyframes load{\r\n    0%{\r\n\t-webkit-transform: scale(1.2);\r\n\topacity: 1;\r\n    }\r\n    100%{\r\n\t-webkit-transform: scale(.3);\r\n\topacity: 0.5;\r\n    }\r\n}\r\n.loadEffect .ld-span:nth-child(1){\r\n    left: 0;\r\n    top: 50%;\r\n    margin-top:-10px;\r\n    -webkit-animation-delay:0.13s;\r\n}\r\n.loadEffect .ld-span:nth-child(2){\r\n    left: 14px;\r\n    top: 14px;\r\n    -webkit-animation-delay:0.26s;\r\n}\r\n.loadEffect .ld-span:nth-child(3){\r\n    left: 50%;\r\n    top: 0;\r\n    margin-left: -10px;\r\n    -webkit-animation-delay:0.39s;\r\n}\r\n.loadEffect .ld-span:nth-child(4){\r\n    top: 14px;\r\n    right:14px;\r\n    -webkit-animation-delay:0.52s;\r\n}\r\n.loadEffect .ld-span:nth-child(5){\r\n    right: 0;\r\n    top: 50%;\r\n    margin-top:-10px;\r\n    -webkit-animation-delay:0.65s;\r\n}\r\n.loadEffect .ld-span:nth-child(6){\r\n    right: 14px;\r\n    bottom:14px;\r\n    -webkit-animation-delay:0.78s;\r\n}\r\n.loadEffect .ld-span:nth-child(7){\r\n    bottom: 0;\r\n    left: 50%;\r\n    margin-left: -10px;\r\n    -webkit-animation-delay:0.91s;\r\n}\r\n.loadEffect .ld-span:nth-child(8){\r\n    bottom: 14px;\r\n    left: 14px;\r\n    -webkit-animation-delay:1.04s;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'Loading'
	};

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "\n\n\n<div class=\"loadEffect\" _v-37f6b497=\"\">\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n    <span class=\"ld-span\" _v-37f6b497=\"\"></span>\n</div>\n";

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(137)
	__vue_script__ = __webpack_require__(139)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\ListItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(140)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-07bc86f4/ListItem.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(138);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ListItem.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ListItem.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ListItem.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _assign = __webpack_require__(99);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "ListItem",
	    props: ['productDetail', 'specifications', 'giftIndex'],
	    computed: {
	        cartItem: function cartItem() {
	            var newitem = {};
	            (0, _assign2.default)(newitem, this.productDetail);
	            newitem.selectDate = _util2.default.getSelectDate();
	            newitem.amount = 1;
	            if (this.productDetail.giftType != 'none') {
	                newitem.appGiftItem = this.productDetail.appGiftActivity.appGifts[this.giftIndex];
	            }
	
	            return newitem;
	        }
	    },
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '';
	            return '¥ ' + value;
	        }
	    },
	    methods: {
	        fetchItem: function fetchItem(pid) {
	            var _this = this;
	
	            var apiobj = {
	                url: _request.API_URLS.products,
	                data: {
	                    'id': pid
	                }
	            };
	
	            _request.request.fnGet(this, apiobj, function (res) {
	                console.log(res);
	                _this.$store.commit("setItemData", res);
	            });
	        },
	
	        checkItem: function checkItem(item) {
	            this.$emit('close-detail', item);
	        }
	    }
	};

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"layer-item-box\" class=\"item-layer\" style=\"display: none;\">\n    <!--商品详情\t-->\n    <div class=\"item-detail\">\n        <div class=\"item-detail-con\">\n            <div class=\"product\" style=\"margin-top:15px;\">\n                <img class=\"img-responsive  center-block\" :src=\"productDetail.image\" :alt=\"productDetail.title\" :title=\"productDetail.title\">\n                <p class=\"name\">{{productDetail.name}} {{productDetail.specDesc}}</p>\n                <p class=\"price primary\">{{productDetail.price | currency }}元</p>\n                <p class=\"gift primary\" v-if=\"productDetail.appGiftActivity\">{{productDetail.appGiftActivity.name}}</p>\n                <p class=\"stock\">库存：{{productDetail.availableStock}}件</p>\n            </div>\n            <div class=\"specs-box\">\n                <div class=\"clearfix\" v-for=\"(item,index ) in specifications\" >\n                    <p class=\"span-label\">{{item.name}}</p>\n                    <a class=\"btn specs specs-btn\"  :class=\"{selected:true}\"\n                       v-for=\"(item2,index2) in item.appSpecificationValues\" @click=\"fetchItem(item2.id)\" >{{item2.name}}</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"item-detail-bom\">\n             <a class=\"btn btn-lightgreen btn-block specs-ok\"  @click=\"checkItem(cartItem)\" >确定</a>\n        </div>\n\n    </div>\n    <!--赠品详情-->\n    <div class=\"gift-detail\" v-if=\"productDetail.giftType!='none' && productDetail.appGiftActivity\" :data-gift=\"productDetail.giftType\">\n        <div class=\"gift-detail-con\">\n            <div class=\"price primary\">\n                赠{{productDetail.appGiftActivity.name}} ¥ 0 /\n                <del v-for=\"(item,index) in productDetail.appGiftActivity.appGifts\"><span v-show=\"giftIndex==index\">{{item.price}}</span></del>\n            </div>\n            <!-- Swiper -->\n            <div class=\"gift-detail-item\">\n                <div class=\"swiper-wrapper\">\n                    <div class=\"swiper-slide\"  v-for=\"(item,index) in productDetail.appGiftActivity.appGifts\" ><img :src=\"item.image\"/></div>\n                </div>\n            </div>\n            <div class=\"gift-detail-tab\">\n                <a class=\"btn btn-block gift gift-btn\" v-for=\"(item,index) in productDetail.appGiftActivity.appGifts\">{{item.name}}</a>\n            </div>\n            <!-- Add Pagination -->\n            <div class=\"gift-detail-item-pagination\"></div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(142)
	__vue_script__ = __webpack_require__(144)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\StockItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(145)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-234bcb64/StockItem.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./StockItem.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./StockItem.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!item modale*/\n.stock-layer {\n  width: auto;\n  display: none;\n  overflow: hidden;\n}\n.stock-layer .dis {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.stock-layer .item-detail {\n  width: 320px;\n  float: left;\n  height: 400px;\n  padding: 12px;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con {\n  position: relative;\n  width: 100%;\n  height: 400px;\n  overflow: auto;\n}\n.stock-layer .item-detail .item-detail-con .price {\n  position: relative;\n  color: #e84593;\n  margin-bottom: 12px;\n}\n.stock-layer .item-detail .item-detail-con .product {\n  position: relative;\n  left: 0;\n  right: 0;\n}\n.stock-layer .item-detail .item-detail-con .product img {\n  width: 80%;\n  margin: 0 auto;\n  max-height: 160px;\n}\n.stock-layer .item-detail .item-detail-con .product .name {\n  margin-top: 10px;\n  overflow: hidden;\n}\n.stock-layer .item-detail .item-detail-con .stock {\n  color: #999999;\n}\n.stock-layer .item-detail .item-detail-con .specs-box {\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn {\n  position: relative;\n  margin: 5px 12px;\n  float: left;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n}\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn:hover,\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn.selected {\n  color: #e84593;\n  border-color: #e84593;\n}\n.stock-layer .item-detail .item-detail-con .txt-box {\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con .txt-box p {\n  color: #999;\n}\n.stock-layer .item-detail .item-detail-con .txt-box p.tips {\n  color: #e84593;\n}\n.stock-layer .norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.stock-layer .stock-detail {\n  width: 320px;\n  float: left;\n  height: 400px;\n  padding: 12px;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n}\n.stock-layer .stock-detail:after {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 0px;\n  height: 400px;\n  border: solid 1px #f5f5f5;\n  top: 40px;\n  left: -1px;\n}\n.stock-layer .stock-detail .stock-detail-con {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box {\n  width: 100%;\n  height: 160px;\n  padding-top: 18px;\n  padding-bottom: 12px;\n  overflow: auto;\n  border-bottom: solid 1px #e5e5e5;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box p {\n  text-align: center;\n  margin-top: 30px;\n  color: #808080;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box ul {\n  padding: 0;\n  margin: 0;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li {\n  margin: 12px 0px;\n  color: #999999;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li .stock-btn {\n  width: 60%;\n  position: relative;\n  display: inline-block;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li span {\n  display: inline-block;\n  width: 40%;\n  text-align: center;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li:hover,\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li.selected {\n  color: #e84593;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li:hover .stock-btn,\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li.selected .stock-btn {\n  border-color: #e84593;\n  color: #e84593;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row p {\n  color: #999999;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row input {\n  padding: 7px 20px;\n  text-align: right;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row input:focus {\n  border-color: #e84593;\n  color: #e84593;\n}\n.stock-layer .stock-detail .image {\n  position: absolute;\n  width: 50%;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  top: 100px;\n}\n.stock-layer .stock-detail .item-stock-bom {\n  margin-top: 12px;\n  position: relative;\n  width: 100%;\n}\n.stock-layer .stock-detail .item-stock-bom .specs-ok {\n  position: relative;\n}\n", "", {"version":3,"sources":["/./src/app/views/products/StockItem.vue"],"names":[],"mappings":"AAAA,gBAAgB;AAChB;EACE,YAAY;EACZ,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,aAAa;EACb,qBAAqB;CACtB;AACD;EACE,aAAa;EACb,YAAY;EACZ,cAAc;EACd,cAAc;EACd,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,cAAc;EACd,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,oBAAoB;CACrB;AACD;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;CACV;AACD;EACE,WAAW;EACX,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,iBAAiB;EACjB,iBAAiB;CAClB;AACD;EACE,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,eAAe;EACf,0BAA0B;CAC3B;AACD;;EAEE,eAAe;EACf,sBAAsB;CACvB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;CACb;AACD;EACE,eAAe;CAChB;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,aAAa;EACb,YAAY;EACZ,cAAc;EACd,cAAc;EACd,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,WAAW;EACX,cAAc;EACd,0BAA0B;EAC1B,UAAU;EACV,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,aAAa;CACd;AACD;EACE,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,qBAAqB;EACrB,eAAe;EACf,iCAAiC;CAClC;AACD;EACE,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;CAChB;AACD;EACE,WAAW;EACX,UAAU;CACX;AACD;EACE,iBAAiB;EACjB,eAAe;CAChB;AACD;EACE,WAAW;EACX,mBAAmB;EACnB,sBAAsB;EACtB,eAAe;EACf,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,sBAAsB;EACtB,WAAW;EACX,mBAAmB;CACpB;AACD;;EAEE,eAAe;CAChB;AACD;;EAEE,sBAAsB;EACtB,eAAe;CAChB;AACD;EACE,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,0BAA0B;EAC1B,eAAe;EACf,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,sBAAsB;EACtB,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,QAAQ;EACR,SAAS;EACT,WAAW;CACZ;AACD;EACE,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,mBAAmB;CACpB","file":"StockItem.vue","sourcesContent":["/*!item modale*/\n.stock-layer {\n  width: auto;\n  display: none;\n  overflow: hidden;\n}\n.stock-layer .dis {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.stock-layer .item-detail {\n  width: 320px;\n  float: left;\n  height: 400px;\n  padding: 12px;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con {\n  position: relative;\n  width: 100%;\n  height: 400px;\n  overflow: auto;\n}\n.stock-layer .item-detail .item-detail-con .price {\n  position: relative;\n  color: #e84593;\n  margin-bottom: 12px;\n}\n.stock-layer .item-detail .item-detail-con .product {\n  position: relative;\n  left: 0;\n  right: 0;\n}\n.stock-layer .item-detail .item-detail-con .product img {\n  width: 80%;\n  margin: 0 auto;\n  max-height: 160px;\n}\n.stock-layer .item-detail .item-detail-con .product .name {\n  margin-top: 10px;\n  overflow: hidden;\n}\n.stock-layer .item-detail .item-detail-con .stock {\n  color: #999999;\n}\n.stock-layer .item-detail .item-detail-con .specs-box {\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn {\n  position: relative;\n  margin: 5px 12px;\n  float: left;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n}\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn:hover,\n.stock-layer .item-detail .item-detail-con .specs-box .specs-btn.selected {\n  color: #e84593;\n  border-color: #e84593;\n}\n.stock-layer .item-detail .item-detail-con .txt-box {\n  position: relative;\n}\n.stock-layer .item-detail .item-detail-con .txt-box p {\n  color: #999;\n}\n.stock-layer .item-detail .item-detail-con .txt-box p.tips {\n  color: #e84593;\n}\n.stock-layer .norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.stock-layer .stock-detail {\n  width: 320px;\n  float: left;\n  height: 400px;\n  padding: 12px;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n}\n.stock-layer .stock-detail:after {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 0px;\n  height: 400px;\n  border: solid 1px #f5f5f5;\n  top: 40px;\n  left: -1px;\n}\n.stock-layer .stock-detail .stock-detail-con {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box {\n  width: 100%;\n  height: 160px;\n  padding-top: 18px;\n  padding-bottom: 12px;\n  overflow: auto;\n  border-bottom: solid 1px #e5e5e5;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box p {\n  text-align: center;\n  margin-top: 30px;\n  color: #808080;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box ul {\n  padding: 0;\n  margin: 0;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li {\n  margin: 12px 0px;\n  color: #999999;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li .stock-btn {\n  width: 60%;\n  position: relative;\n  display: inline-block;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li span {\n  display: inline-block;\n  width: 40%;\n  text-align: center;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li:hover,\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li.selected {\n  color: #e84593;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li:hover .stock-btn,\n.stock-layer .stock-detail .stock-detail-con .stock-list-box li.selected .stock-btn {\n  border-color: #e84593;\n  color: #e84593;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row {\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row p {\n  color: #999999;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row input {\n  padding: 7px 20px;\n  text-align: right;\n  color: #999999;\n  border: solid 1px #e5e5e5;\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n}\n.stock-layer .stock-detail .stock-detail-con .stock-row input:focus {\n  border-color: #e84593;\n  color: #e84593;\n}\n.stock-layer .stock-detail .image {\n  position: absolute;\n  width: 50%;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  top: 100px;\n}\n.stock-layer .stock-detail .item-stock-bom {\n  margin-top: 12px;\n  position: relative;\n  width: 100%;\n}\n.stock-layer .stock-detail .item-stock-bom .specs-ok {\n  position: relative;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "ListItem",
	    props: ['productDetail', 'appRepertories', 'needQuantity'],
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    computed: {
	        shopRepositoryList: function shopRepositoryList() {
	            var _this = this;
	
	            var arr = [];
	
	            this.appRepertories.forEach(function (ele, index) {
	                if (_this.needStock > ele.availableStock) {
	                    ele.dis = true;
	                } else {
	                    ele.dis = false;
	                }
	                arr.push(ele);
	            });
	            return arr;
	        },
	
	        needStock: {
	            get: function get(res) {
	                return this.stockQuantity;
	            },
	            set: function set(newValue) {
	
	                if (!isNaN(newValue)) {
	                    this.stockQuantity = newValue;
	                }
	            }
	        }
	
	    },
	    data: function data() {
	        return {
	            stockQuantity: 0,
	            shopRepository: {},
	            memo: "",
	            allocationParams: {
	                id: null,
	                shopRepertoryId: null,
	                quantity: 0,
	                memo: ""
	            }
	        };
	    },
	    created: function created() {
	
	        this.stockQuantity = this.needQuantity;
	    },
	
	    methods: {
	        chooseRepository: function chooseRepository(respository) {
	            this.shopRepository = respository;
	        },
	
	        checkRepository: function checkRepository() {
	
	            this.allocationParams.id = this.productDetail.id;
	            this.allocationParams.shopRepertoryId = this.shopRepository.shopRepertoryId;
	            this.allocationParams.quantity = this.needStock;
	            this.allocationParams.memo = this.memo;
	
	            this.$emit('close-stock', this.allocationParams);
	        }
	
	    }
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"layer-stock-box\" class=\"stock-layer\" style=\"display: none;\">\n    <!--商品详情\t-->\n    <div class=\"item-detail\">\n        <div class=\"item-detail-con\">\n            <div class=\"price\">{{productDetail.price | currency}} </div>\n\n            <div class=\"product\">\n                <img class=\"img-responsive  center-block\" :src=\"productDetail.image\" :alt=\"productDetail.title\" :title=\"productDetail.title\">\n                <p class=\"name\">{{productDetail.name}} {{productDetail.specDesc}}</p>\n                <p class=\"gift primary\" v-if=\"productDetail.appGiftActivity\">{{productDetail.appGiftActivity.name}}</p>\n                <p class=\"stock\">现有库存：{{productDetail.availableStock}}件</p>\n            </div>\n            <div class=\"txt-box\">\n                <p class=\"tips\" v-if=\"!shopRepository.shopName\">请选择调拨门店</p>\n                <div v-else>\n                    <p class=\"tips\" >申请调拨： {{shopRepository.shopName}} </p>\n                    <p class=\"tips\" >申请数量： {{stockQuantity}} </p>\n                    <p class=\"tips\" >申请备注： {{memo}} </p>\n                </div>\n            </div>\n        </div>\n\n    </div>\n    <!--库存详情-->\n    <div class=\"stock-detail\" >\n        <div class=\"stock-detail-con\">\n            <div class=\"stock-list-box\">\n                <p v-if=\"!shopRepositoryList\">加载中...</p>\n                <p v-else-if=\"shopRepositoryList.length==0\">暂时没有仓库可调拨</p>\n                    <ul v-else>\n                        <li v-for=\"(item,index) in shopRepositoryList\" :class=\"{selected:item.shopId==shopRepository.shopId,dis:item.dis}\">\n                        <a class=\"btn btn-block stock-btn\"   @click=\"chooseRepository(item)\">{{item.shopName}}</a><span>库存：{{item.availableStock}}件</span>\n                    </li>\n\n                </ul>\n            </div>\n            <div class=\"stock-row\">\n                <p>申请调拨数量</p>\n                <input v-model=\"needStock\"  :disabled=\"!shopRepository.availableStock\" type=\"tel\" placeholder=\"请输入调拨数量\"  number />\n            </div>\n            <div class=\"stock-row\">\n                <p>备注</p>\n                <input v-model=\"memo\" type=\"text\" :disabled=\"!shopRepository.availableStock\" placeholder=\"请输入备注\"   />\n            </div>\n            <div class=\"item-stock-bom\">\n                <a class=\"btn btn-lightgreen btn-block specs-ok\"  @click=\"checkRepository\" >确定</a>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(147)
	__webpack_require__(149)
	__vue_script__ = __webpack_require__(151)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\products\\List.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(152)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1206175a/List.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./List.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./List.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".item {\n  height: auto;\n  position: relative;\n  margin-top: 12px;\n  border: solid 1px #e5e5e5;\n  border-radius: 3px;\n  background: #ffffff url('/images/lazyload.png') 50% 50% no-repeat;\n  background-size: 100%;\n  padding-bottom: 10px;\n}\n.cc {\n  width: 100%;\n  height: 200px;\n  background: #fff;\n  top: 0;\n  border-radius: 5px;\n}\n.cc .photo {\n  position: relative;\n  background-size: cover;\n  width: 100%;\n  height: 100%;\n}\n.cc .txt {\n  width: 100%;\n  background: blank;\n  height: 30px;\n  background: rgba(0, 0, 0, 0.5);\n  padding: 5px 10px;\n  z-index: 10;\n  bottom: 0;\n  position: absolute;\n  line-height: 20px;\n  color: #ffffff;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.cc .txt .iconfont {\n  font-size: 12px;\n  line-height: 20px;\n  text-decoration: none;\n}\n.cc .txt .icon-liebiao {\n  font-size: 14px;\n  line-height: 22px;\n}\n.cc .txt .info {\n  float: right;\n}\n.cc .txt .price {\n  color: #e84593;\n}\n.cc .txt .stock {\n  margin-left: 10px;\n  color: #ffffff;\n}\n.cc .txt .list-btn,\n.cc .txt .buy-btn {\n  position: relative;\n  z-index: 99;\n  float: left;\n  margin-left: 6px;\n  margin-right: 6px;\n  color: #e84593;\n}\n.tt {\n  width: 100%;\n  padding: 5px;\n  z-index: 10;\n  font-size: 16px;\n  position: relative;\n  padding: 5px 10px 10px 5px;\n  height: 25px;\n  line-height: 25px;\n  font-size: 12px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n", "", {"version":3,"sources":["/./src/app/views/products/List.vue"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,0BAA0B;EAC1B,mBAAmB;EACnB,kEAAkE;EAClE,sBAAsB;EACtB,qBAAqB;CACtB;AACD;EACE,YAAY;EACZ,cAAc;EACd,iBAAiB;EACjB,OAAO;EACP,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,aAAa;CACd;AACD;EACE,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,+BAA+B;EAC/B,kBAAkB;EAClB,YAAY;EACZ,UAAU;EACV,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,gBAAgB;EAChB,kBAAkB;EAClB,sBAAsB;CACvB;AACD;EACE,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,aAAa;CACd;AACD;EACE,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,eAAe;CAChB;AACD;;EAEE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,gBAAgB;EAChB,mBAAmB;EACnB,2BAA2B;EAC3B,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB","file":"List.vue","sourcesContent":[".item {\n  height: auto;\n  position: relative;\n  margin-top: 12px;\n  border: solid 1px #e5e5e5;\n  border-radius: 3px;\n  background: #ffffff url('/images/lazyload.png') 50% 50% no-repeat;\n  background-size: 100%;\n  padding-bottom: 10px;\n}\n.cc {\n  width: 100%;\n  height: 200px;\n  background: #fff;\n  top: 0;\n  border-radius: 5px;\n}\n.cc .photo {\n  position: relative;\n  background-size: cover;\n  width: 100%;\n  height: 100%;\n}\n.cc .txt {\n  width: 100%;\n  background: blank;\n  height: 30px;\n  background: rgba(0, 0, 0, 0.5);\n  padding: 5px 10px;\n  z-index: 10;\n  bottom: 0;\n  position: absolute;\n  line-height: 20px;\n  color: #ffffff;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.cc .txt .iconfont {\n  font-size: 12px;\n  line-height: 20px;\n  text-decoration: none;\n}\n.cc .txt .icon-liebiao {\n  font-size: 14px;\n  line-height: 22px;\n}\n.cc .txt .info {\n  float: right;\n}\n.cc .txt .price {\n  color: #e84593;\n}\n.cc .txt .stock {\n  margin-left: 10px;\n  color: #ffffff;\n}\n.cc .txt .list-btn,\n.cc .txt .buy-btn {\n  position: relative;\n  z-index: 99;\n  float: left;\n  margin-left: 6px;\n  margin-right: 6px;\n  color: #e84593;\n}\n.tt {\n  width: 100%;\n  padding: 5px;\n  z-index: 10;\n  font-size: 16px;\n  position: relative;\n  padding: 5px 10px 10px 5px;\n  height: 25px;\n  line-height: 25px;\n  font-size: 12px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(150);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1206175a&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./List.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1206175a&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./List.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"List.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 151 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'ProductList',
	    props: ["productParams", "page"],
	    computed: {
	        itemData: function itemData() {
	            return this.page.list;
	        }
	    },
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '';
	            return '¥ ' + value;
	        }
	    },
	    methods: {
	        fetchItem: function fetchItem(pid) {
	            var _this = this;
	
	            this.$store.dispatch('fetchItem', pid).then(function (res) {
	                _this.$emit('open-detail');
	            });
	        }
	
	    }
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"row\" v-if=\"!itemData\" _v-1206175a=\"\">\n    <div class=\"col-xs-12\" _v-1206175a=\"\">\n        加载中...\n    </div>\n</div>\n<div class=\"row\" v-else-if=\"itemData.length == 0\" _v-1206175a=\"\">\n    <div class=\"col-xs-12\" _v-1206175a=\"\">\n        没有数据\n    </div>\n</div>\n<div class=\"row\" v-else=\"\" _v-1206175a=\"\">\n\n    <div class=\"col-xs-12 col-sm-4 col-md-3\" v-for=\"(item,index) in itemData \" _v-1206175a=\"\">\n            <div class=\" item\" @click=\"fetchItem(item.id);\" _v-1206175a=\"\">\n                <!--图片盒子-->\n                <div class=\"cc\" _v-1206175a=\"\">\n                    <div class=\"photo\" :style=\"{'background-image':'url('+item.image+')'}\" _v-1206175a=\"\">\n\n                        <div class=\"txt\" _v-1206175a=\"\">\n                            <a class=\"buy-btn\" role=\"button\" v-show=\"item.giftType!='none'\" _v-1206175a=\"\"><span class=\"iconfont icon-baobei\" _v-1206175a=\"\"></span></a>\n                            <a class=\"list-btn\" role=\"button\" v-show=\"item.specDesc&amp;&amp;item.specDesc.length\" _v-1206175a=\"\"><span class=\"iconfont icon-liebiao\" _v-1206175a=\"\"></span></a>\n                            <span class=\"info\" _v-1206175a=\"\">\n                                 <span class=\"price\" _v-1206175a=\"\">{{item.price | currency }}</span><span class=\"stock\" _v-1206175a=\"\">×{{item.availableStock}}</span>\n                            </span>\n                        </div>\n                    </div>\n                </div>\n                    <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->\n                <!--文本盒子-->\n                <div class=\"tt\" _v-1206175a=\"\">\n\n                    {{item.name}}\n\n                </div>\n\n            </div>\n\n         <!--<div class=\"thumbnail\" @click=\"fetchItem(item.id);\">-->\n             <!--<a  class=\"list-btn\" role=\"button\"  v-show=\"item.specDesc&&item.specDesc.length\"><span class=\"iconfont icon-liebiao\"></span></a>-->\n             <!--<div class=\"title\">{{item.price | currency }}元 <span class=\"stock\">库存：{{item.availableStock}}件</span> </div>-->\n             <!--<div class=\"photo\"  >-->\n             <!--<img class=\"img-responsive\" :src=\"item.image\" :alt=\"item.title\" :title=\"item.title\" />-->\n         <!--</div>-->\n         <!--<div class=\"caption\"><p>{{item.name}}{{item.specDesc}}</p></div>-->\n            <!--<a  class=\"buy-btn\" role=\"button\"   v-show=\"item.giftType!='none'\"><span class=\"iconfont icon-baobei\"></span></a>-->\n         <!--</div>-->\n    </div>\n</div>\n";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(154)
	__vue_script__ = __webpack_require__(156)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\pagination\\Pagination.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(157)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2e7864fb/Pagination.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(155);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2e7864fb&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pagination.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2e7864fb&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pagination.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Pagination.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'Pagination',
	    props: ["page", "goCallback"],
	    computed: {
	        paginationList: function paginationList() {
	            var left = 1;
	            var right = this.page.pages;
	
	            var ar = [];
	            var disNum = 10;
	            if (this.page.pages >= disNum) {
	                if (this.page.pageNum > disNum / 2 && this.page.pageNum < this.page.pages - disNum / 2) {
	                    left = this.page.pageNum - disNum / 2;
	                    right = this.page.pageNum + disNum / 2;
	                } else {
	                    if (this.page.pageNum <= 5) {
	                        left = 1;
	                        right = 10;
	                    } else if (this.page.pageNum) {
	                        right = this.page.pages;
	                        left = this.page.pages - 10;
	                    }
	                }
	            }
	            while (left <= right) {
	                ar.push(left);
	                left++;
	            }
	
	            return ar;
	        }
	
	    },
	    methods: {
	        pageTo: function pageTo(index) {
	
	            if (index != this.page.pageNum) {
	                this.goCallback(index);
	            }
	        },
	        prePage: function prePage() {},
	        nextPage: function nextPage() {}
	    },
	    mounted: function mounted() {}
	};

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"page-bar\" _v-2e7864fb=\"\">\n    <ul class=\"pagination\" _v-2e7864fb=\"\">\n        <li _v-2e7864fb=\"\"><span class=\"pagination-label\" _v-2e7864fb=\"\">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>\n        <li v-if=\"page.hasPreviousPage\" _v-2e7864fb=\"\"><a @click=\"pageTo(page.pageNum-1)\" _v-2e7864fb=\"\">上一页</a></li>\n        <li v-for=\" index in paginationList\" :class=\"{active:index==page.pageNum}\" @click=\"pageTo(index)\" _v-2e7864fb=\"\"><a _v-2e7864fb=\"\">{{ index }}</a></li>\n        <li v-if=\"page.hasNextPage\" _v-2e7864fb=\"\"><a @click=\"pageTo(page.pageNum+1)\" _v-2e7864fb=\"\">下一页</a></li>\n    </ul>\n</div>\n";

/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"container-fluid index\"  >\n            <div class=\"row\" >\n                <div class=\"col-sm-8  col-md-9 left-con\">\n                    <!--<div class=\"left-con-header\">-->\n                        <!--&lt;!&ndash;<breadcrumb  ref=\"breadcrumb\" :product-params=\"productParams\"></breadcrumb>&ndash;&gt;-->\n                    <!--</div>-->\n                    <div class=\"left-con-content\">\n                        <Loading v-if=\"listLoading\"></Loading>\n                        <div class=\"item-box panel panel-primary\">\n                            <div class=\"panel-heading\" >\n                                <category :show-category=\"showCategory\" :product-categories=\"productCategories\" :product-params=\"productParams\"></category>\n                                <div class=\"row\">\n                                    <div class=\"col-xs-4 col-md-2 col-lg-2\">\n                                        <a class=\"btn btn-lightgreen shuaixuan\"  @click=\"showCategory=!showCategory\" ><span class=\"glyphicon glyphicon-th-list\"></span>分类筛选</a>\n                                    </div>\n                                    <div class=\"col-xs-6 col-md-3 col-xs-offset-2 col-md-offset-7 \">\n                                        <searchbar  :product-params=\"productParams\"></searchbar>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"panel-body\">\n                                <product-list :page=\"page\" :product-params=\"productParams\"  @open-detail=\"openDetail\" ></product-list>\n                            </div>\n                            <div class=\"panel-footer\">\n                                <Pagination :page=\"page\" :go-callback=\"goCallback\" ></Pagination>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n               \n                <div class=\"col-sm-4  col-md-3 right-con\" >\n                    <!-- 购物车 -->\n                    <cart @open-stock=\"openStock\" :cart-data=\"cartData\" :cart-item-index=\"cartItemIndex\"></cart>\n                    <!-- 计算器 -->\n                    <calc @trigger-build-order=\"buildOrder\" :cart-data=\"cartData\" :cart-item-index=\"cartItemIndex\"></calc>\n                </div>\n            </div>\n            <list-item :product-detail=\"productDetail\" :specifications=\"specifications\" :gift-index=\"giftIndex\" @close-detail=\"closeDetail\"></list-item>\n\n            <stock-item v-if=\"showStockItem\" :product-detail=\"productDetail\"  :app-repertories=\"appRepertories\" :need-quantity=\"needQuantity\" @close-stock=\"closeStock\"></stock-item>\n\n    </div>\n";

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(160)
	__vue_script__ = __webpack_require__(162)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\AppCenter.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(196)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2f5e9f5a/AppCenter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(161);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenter.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppCenter.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _AppCenterloading = __webpack_require__(163);
	
	var _AppCenterloading2 = _interopRequireDefault(_AppCenterloading);
	
	var _OrderMain = __webpack_require__(168);
	
	var _OrderMain2 = _interopRequireDefault(_OrderMain);
	
	var _PrintMain = __webpack_require__(191);
	
	var _PrintMain2 = _interopRequireDefault(_PrintMain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'appCenter',
	    computed: {
	        mode: function mode() {
	            return this.$store.state.currentPage.mode;
	        },
	
	        waiting: function waiting() {
	            return this.$store.state.currentPage.waiting;
	        }
	    },
	    components: {
	        OrderMain: _OrderMain2.default,
	        PrintMain: _PrintMain2.default,
	        AppCenterLoading: _AppCenterloading2.default
	    },
	    watch: {
	        'mode': "routerGo"
	    },
	    created: function created() {
	        this.routerGo();
	    },
	
	    methods: {
	        routerGo: function routerGo() {
	            if (this.mode == "index") {
	                this.$router.replace('/');
	            }
	        }
	    }
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(164)
	__vue_script__ = __webpack_require__(166)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\AppCenterloading.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(167)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7297bfb9/AppCenterloading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(165);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7297bfb9&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterloading.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7297bfb9&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterloading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.apploading[_v-7297bfb9]{width: 100%; height: 100%; position: fixed;\n    top:0; background: none;z-index:9999;}\n.apploadEffect[_v-7297bfb9] { width:100px; height: 100px;  position: fixed; padding: 18px;\n    top:50%; left: 50%; margin-left: -35px; margin-top:-35px; background: #ffffff; border-radius: 5px; }\n.loading-circle[_v-7297bfb9]{width: 100%; height: 100%; position: relative}\n.outer[_v-7297bfb9] { position: absolute; width: 100%; height: 100%; background: url('/images/icon-spin-s.png') no-repeat; -webkit-animation: spin 800ms infinite linear; animation: spin 800ms infinite linear; }\n.inner[_v-7297bfb9], .inner2[_v-7297bfb9] { position: absolute; width: 38px; height: 38px; border-radius: 40px; overflow: hidden; left: 13px; top: 13px; }\n.inner[_v-7297bfb9] { opacity: 1; background-color: #89abdd; -webkit-animation: second-half-hide 1.6s steps(1, end) infinite; animation: second-half-hide 1.6s steps(1, end) infinite; }\n.inner2[_v-7297bfb9] { opacity: 0; background-color: #4b86db; -webkit-animation: second-half-show 1.6s steps(1, end) infinite; animation: second-half-show 1.6s steps(1, end) infinite; }\n.spiner[_v-7297bfb9], .filler[_v-7297bfb9], .masker[_v-7297bfb9] { position: absolute; width: 50%; height: 100%; }\n.spiner[_v-7297bfb9] { border-radius: 40px 0 0 40px; background-color: #4b86db; -webkit-transform-origin: right center; transform-origin: right center; -webkit-animation: spin 800ms infinite linear; animation: spin 800ms infinite linear; left: 0; top: 0; }\n.filler[_v-7297bfb9] { border-radius: 0 40px 40px 0; background-color: #4b86db; -webkit-animation: second-half-hide 800ms steps(1, end) infinite; animation: second-half-hide 800ms steps(1, end) infinite; left: 50%; top: 0; opacity: 1; }\n.masker[_v-7297bfb9] { border-radius: 40px 0 0 40px; background-color: #89abdd; -webkit-animation: second-half-show 800ms steps(1, end) infinite; animation: second-half-show 800ms steps(1, end) infinite; left: 0; top: 0; opacity: 0; }\n\n.inner2 .spiner[_v-7297bfb9], .inner2 .filler[_v-7297bfb9] { background-color: #89abdd; }\n.inner2 .masker[_v-7297bfb9] { background-color: #4b86db; }\n\n@-webkit-keyframes spin {\n    0%   { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n    100% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n}\n\n@keyframes spin {\n    0%   { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n    100% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n}\n@-webkit-keyframes second-half-hide {\n    0%        { opacity: 1; }\n    50%, 100% { opacity: 0; }\n}\n@keyframes second-half-hide {\n    0%        { opacity: 1; }\n    50%, 100% { opacity: 0; }\n}\n@-webkit-keyframes second-half-show {\n    0%        { opacity: 0; }\n    50%, 100% { opacity: 1; }\n}\n@keyframes second-half-show {\n    0%        { opacity: 0; }\n    50%, 100% { opacity: 1; }\n}\n", "", {"version":3,"sources":["/./src/app/views/AppCenterloading.vue?3e26dcf4"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA6BA,yBAAA,YAAA,CAAA,aAAA,CAAA,gBAAA;IACA,MAAA,CAAA,iBAAA,aAAA,CAAA;AACA,8BAAA,YAAA,CAAA,cAAA,EAAA,gBAAA,CAAA,cAAA;IACA,QAAA,CAAA,UAAA,CAAA,mBAAA,CAAA,iBAAA,CAAA,oBAAA,CAAA,mBAAA,EAAA;AACA,6BAAA,YAAA,CAAA,aAAA,CAAA,kBAAA,CAAA;AACA,sBAAA,mBAAA,CAAA,YAAA,CAAA,aAAA,CAAA,qDAAA,CAAA,8CAAA,CAAA,sCAAA,EAAA;AACA,4CAAA,mBAAA,CAAA,YAAA,CAAA,aAAA,CAAA,oBAAA,CAAA,iBAAA,CAAA,WAAA,CAAA,UAAA,EAAA;AACA,sBAAA,WAAA,CAAA,0BAAA,CAAA,gEAAA,CAAA,wDAAA,EAAA;AACA,uBAAA,WAAA,CAAA,0BAAA,CAAA,gEAAA,CAAA,wDAAA,EAAA;AACA,mEAAA,mBAAA,CAAA,WAAA,CAAA,aAAA,EAAA;AACA,uBAAA,6BAAA,CAAA,0BAAA,CAAA,uCAAA,CAAA,+BAAA,CAAA,8CAAA,CAAA,sCAAA,CAAA,QAAA,CAAA,OAAA,EAAA;AACA,uBAAA,6BAAA,CAAA,0BAAA,CAAA,iEAAA,CAAA,yDAAA,CAAA,UAAA,CAAA,OAAA,CAAA,WAAA,EAAA;AACA,uBAAA,6BAAA,CAAA,0BAAA,CAAA,iEAAA,CAAA,yDAAA,CAAA,QAAA,CAAA,OAAA,CAAA,WAAA,EAAA;;AAEA,6DAAA,0BAAA,EAAA;AACA,+BAAA,0BAAA,EAAA;;AAEA;IACA,OAAA,kCAAA,CAAA,0BAAA,EAAA;IACA,OAAA,gCAAA,CAAA,wBAAA,EAAA;CACA;;AAHA;IACA,OAAA,kCAAA,CAAA,0BAAA,EAAA;IACA,OAAA,gCAAA,CAAA,wBAAA,EAAA;CACA;AACA;IACA,YAAA,WAAA,EAAA;IACA,YAAA,WAAA,EAAA;CACA;AAHA;IACA,YAAA,WAAA,EAAA;IACA,YAAA,WAAA,EAAA;CACA;AACA;IACA,YAAA,WAAA,EAAA;IACA,YAAA,WAAA,EAAA;CACA;AAHA;IACA,YAAA,WAAA,EAAA;IACA,YAAA,WAAA,EAAA;CACA","file":"AppCenterloading.vue","sourcesContent":["//加载中的效果组件\r\n\r\n<template>\r\n    <div class=\"apploading\">\r\n        <div class=\"apploadEffect\">\r\n            <div class=\"loading-circle\">\r\n                <div class=\"outer\"></div>\r\n            </div>\r\n            <!--<div class=\"inner\">-->\r\n                <!--<div class=\"spiner\"></div>-->\r\n                <!--<div class=\"filler\"></div>-->\r\n                <!--<div class=\"masker\"></div>-->\r\n            <!--</div>-->\r\n            <!--<div class=\"inner2\">-->\r\n                <!--<div class=\"spiner\"></div>-->\r\n                <!--<div class=\"filler\"></div>-->\r\n                <!--<div class=\"masker\"></div>-->\r\n            <!--</div>-->\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'AppCenterLoading',\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n    .apploading{width: 100%; height: 100%; position: fixed;\r\n        top:0; background: none;z-index:9999;}\r\n    .apploadEffect { width:100px; height: 100px;  position: fixed; padding: 18px;\r\n        top:50%; left: 50%; margin-left: -35px; margin-top:-35px; background: #ffffff; border-radius: 5px; }\r\n    .loading-circle{width: 100%; height: 100%; position: relative}\r\n    .outer { position: absolute; width: 100%; height: 100%; background: url('/images/icon-spin-s.png') no-repeat; animation: spin 800ms infinite linear; }\r\n    .inner, .inner2 { position: absolute; width: 38px; height: 38px; border-radius: 40px; overflow: hidden; left: 13px; top: 13px; }\r\n    .inner { opacity: 1; background-color: #89abdd; animation: second-half-hide 1.6s steps(1, end) infinite; }\r\n    .inner2 { opacity: 0; background-color: #4b86db; animation: second-half-show 1.6s steps(1, end) infinite; }\r\n    .spiner, .filler, .masker { position: absolute; width: 50%; height: 100%; }\r\n    .spiner { border-radius: 40px 0 0 40px; background-color: #4b86db; transform-origin: right center; animation: spin 800ms infinite linear; left: 0; top: 0; }\r\n    .filler { border-radius: 0 40px 40px 0; background-color: #4b86db; animation: second-half-hide 800ms steps(1, end) infinite; left: 50%; top: 0; opacity: 1; }\r\n    .masker { border-radius: 40px 0 0 40px; background-color: #89abdd; animation: second-half-show 800ms steps(1, end) infinite; left: 0; top: 0; opacity: 0; }\r\n\r\n    .inner2 .spiner, .inner2 .filler { background-color: #89abdd; }\r\n    .inner2 .masker { background-color: #4b86db; }\r\n\r\n    @keyframes spin {\r\n        0%   { transform: rotate(360deg); }\r\n        100% { transform: rotate(0deg); }\r\n    }\r\n    @keyframes second-half-hide {\r\n        0%        { opacity: 1; }\r\n        50%, 100% { opacity: 0; }\r\n    }\r\n    @keyframes second-half-show {\r\n        0%        { opacity: 0; }\r\n        50%, 100% { opacity: 1; }\r\n    }\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'AppCenterLoading'
	};

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "\n\n\n<div class=\"apploading\" _v-7297bfb9=\"\">\n    <div class=\"apploadEffect\" _v-7297bfb9=\"\">\n        <div class=\"loading-circle\" _v-7297bfb9=\"\">\n            <div class=\"outer\" _v-7297bfb9=\"\"></div>\n        </div>\n        <!--<div class=\"inner\">-->\n            <!--<div class=\"spiner\"></div>-->\n            <!--<div class=\"filler\"></div>-->\n            <!--<div class=\"masker\"></div>-->\n        <!--</div>-->\n        <!--<div class=\"inner2\">-->\n            <!--<div class=\"spiner\"></div>-->\n            <!--<div class=\"filler\"></div>-->\n            <!--<div class=\"masker\"></div>-->\n        <!--</div>-->\n    </div>\n</div>\n";

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(169)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\order\\OrderMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(190)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5d890f54/OrderMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _AppCenterHeader = __webpack_require__(170);
	
	var _AppCenterHeader2 = _interopRequireDefault(_AppCenterHeader);
	
	var _AppCenterCustom = __webpack_require__(175);
	
	var _AppCenterCustom2 = _interopRequireDefault(_AppCenterCustom);
	
	var _AppCenterMenu = __webpack_require__(185);
	
	var _AppCenterMenu2 = _interopRequireDefault(_AppCenterMenu);
	
	var _request = __webpack_require__(15);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            title: "结账",
	            back: { "label": "返回", "url": "index", "show": true },
	            next: { "label": "打印", "url": "print", "show": true, "cb": this.createOrder },
	            message: '请选择一个付款方式'
	        };
	    },
	
	    components: {
	        AppCenterHeader: _AppCenterHeader2.default,
	        AppCenterMenu: _AppCenterMenu2.default,
	        AppCenterCustom: _AppCenterCustom2.default
	    },
	    watch: {},
	    computed: {
	        customData: function customData() {
	            return this.$store.state.currentPage.customData;
	        },
	        cartData: function cartData() {
	            return this.$store.state.currentPage.cartData;
	        },
	        mode: function mode() {
	            return this.$store.state.currentPage.mode;
	        },
	        order: function order() {
	            return this.$store.state.currentPage.orderData;
	        },
	        amount: function amount() {
	            return this.order.totalAmountPayable;
	        },
	        orderParams: function orderParams() {
	
	            return this.$store.state.currentPage.orderParams;
	        }
	    },
	    methods: {
	        createOrder: function createOrder() {
	            var _this = this;
	
	            if (!this.orderParams.paymentMethodId) {
	                _layer2.default.msg("请选择一种付款方式", { icon: 2 });
	                return false;
	            }
	
	
	            if (this.orderParams.paymentMethodId == 11) {
	                this.$store.state.currentPage.orderParams.rmb = 0;
	                this.$store.state.currentPage.orderParams.cash = 0;
	
	                this.$store.dispatch("createOrder").then(function (res) {
	
	                    _this.$store.commit("setMode", "print");
	                    _this.$router.replace("print");
	                }).catch(function (res) {
	                    _layer2.default.alert("创建支付失败", { icon: 2 });
	                });
	            }if (this.orderParams.paymentMethodId == 12) {
	                this.$store.state.currentPage.orderParams.rmb = 0;
	                this.$store.state.currentPage.orderParams.cash = 0;
	
	                this.$store.dispatch("createOrder").then(function (res) {
	
	                    _this.$store.commit("setMode", "print");
	                    _this.$router.replace("print");
	                }).catch(function (res) {
	                    _layer2.default.alert("创建支付失败", { icon: 2 });
	                });
	            } else if (this.orderParams.paymentMethodId == 10) {
	
	                if (this.orderParams.rmb < 0) {
	                    _layer2.default.msg("现金支付付款不能为零", { icon: 2 });
	                    return false;
	                }
	                if (this.orderParams.rmb < this.amount) {
	                    _layer2.default.msg("现金支付付款不能小于付款数", { icon: 2 });
	                    return false;
	                }
	
	                this.$store.dispatch("createOrder").then(function (res) {
	
	                    _this.$store.commit("setMode", "print");
	                    _this.$router.replace("print");
	                }).catch(function (res) {
	                    _layer2.default.alert("创建支付失败", { icon: 2 });
	                });
	            } else if (this.orderParams.paymentMethodId == 14) {
	                var vm = this;
	                _layer2.default.confirm('将要扣除余额吗？', function (index) {
	                    _layer2.default.closeAll();
	                    vm.$store.dispatch("createOrder").then(function (res) {
	                        vm.$store.commit("setMode", "print");
	                        vm.$router.replace("print");
	                    }).catch(function (res) {
	                        _layer2.default.alert("创建支付失败", { icon: 2 });
	                    });
	                });
	            }
	        }
	    }
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(171)
	__vue_script__ = __webpack_require__(173)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\AppCenterHeader.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(174)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-32d4e840/AppCenterHeader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(172);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterHeader.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterHeader.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppCenterHeader.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'AppCenterHeader',
	    props: ["title", "back", "next", "mode"],
	    methods: {
	        toBack: function toBack() {
	            var msg = "确定" + this.back.label + "吗?";
	
	            var vm = this;
	
	            _layer2.default.confirm(msg, {
	                btn: ['确定'] }, function (index) {
	                if (vm.back.cb) {
	                    vm.back.cb();
	                } else {
	                    vm.$store.commit("setMode", vm.back.url);
	                    vm.$router.replace(vm.back.url);
	                }
	                _layer2.default.close(index);
	            });
	        },
	        toNext: function toNext() {
	            var msg = "确定" + this.next.label + "吗?";
	            var vm = this;
	
	            _layer2.default.confirm(msg, {
	                btn: ['确定'] }, function (index) {
	                if (vm.next.cb) {
	                    vm.next.cb();
	                } else {
	                    vm.$store.commit("setMode", vm.next.url);
	                    vm.$router.replace(vm.next.url);
	                }
	                _layer2.default.close(index);
	            });
	        }
	    }
	};

/***/ },
/* 174 */
/***/ function(module, exports) {

	module.exports = "\n\t   <div class=\"container order-header\">\n         <div class=\"row\">\n             <div class=\"col-sm-2 col-md-2 col-lg-2\">\n                 <a class=\"btn btn-default back-btn pull-left\" @click=\"toBack();\"  v-if=\"back.show\" >&laquo;{{back.label}} </a>\n             </div>\n             <div class=\"col-sm-8 col-md-8 col-lg-8 text-center\">\n                 <h3>{{title}}</h3>\n             </div>\n             <div class=\"col-sm-2 col-md-2 col-lg-2 pull-right\" >\n                 <a class=\"btn btn-default ok-btn pull-right\"  @click=\"toNext();\" v-if=\"next.show\"> {{next.label}}  &raquo;</a>\n             </div>\n         </div>\n     </div>\n";

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(176)
	__vue_script__ = __webpack_require__(178)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\AppCenterCustom.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(184)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5eaf7f24/AppCenterCustom.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(177);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterCustom.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterCustom.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppCenterCustom.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _InfoList = __webpack_require__(179);
	
	var _InfoList2 = _interopRequireDefault(_InfoList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'OrderHeader',
	    props: ["mode", "amount", "message", "order"],
	    computed: {
	        custom: function custom() {
	            var customs = this.$store.state.currentPage.customData;
	
	            return this.$store.state.currentPage.customData;
	        }
	    },
	    components: {
	        InfoList: _InfoList2.default
	    },
	    methods: {
	        showCustomModal: function showCustomModal() {
	            var vm = this;
	            this.$root.showCustomModal = true;
	            function centerModals() {
	                $(this).each(function (i) {
	                    var $clone = $(this).clone().css('display', 'block').appendTo('body');
	                    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                    top = top > 0 ? top : 0;
	                    $clone.remove();
	                    $(this).find('.modal-content').css("margin-top", top);
	                });
	            };
	            this.$nextTick(function () {
	                var modal = '#layer-custom';
	                $(modal).on('show.bs.modal', centerModals);
	                $(modal).on('hidden.bs.modal', function () {
	                    vm.$root.showCustomModal = false;
	                });
	
	                $(modal).modal({
	                    backdrop: 'static',
	                    keyboard: false,
	                    show: false
	                });
	
	                $(window).on('resize', function (modal) {
	                    return centerModals;
	                });
	
	                $(modal).modal('toggle');
	            });
	        }
	    }
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(180)
	__vue_script__ = __webpack_require__(182)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\order\\InfoList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(183)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6ae7d90d/InfoList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(181);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6ae7d90d&scoped=true!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./InfoList.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6ae7d90d&scoped=true!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./InfoList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".rechargelist-btn[_v-6ae7d90d] {\n  font-size: 18px;\n  padding: 25px;\n  border-color: #cccccc;\n  color: #666666;\n  padding: 10px;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn[_v-6ae7d90d]:hover {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn[_v-6ae7d90d]:active {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn.select[_v-6ae7d90d] {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn[_v-6ae7d90d]:active {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn.select[_v-6ae7d90d] {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.col-nn-15[_v-6ae7d90d] {\n  width: 15%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n}\n.col-nn-25[_v-6ae7d90d] {\n  width: 25%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n}\n.rechargelist[_v-6ae7d90d] {\n  float: left;\n  width: 70%;\n}\n.rechargelist .rechargelist-btn span[_v-6ae7d90d] {\n  display: block;\n  position: relative;\n}\n.rechargelist .rechargelist-btn em[_v-6ae7d90d] {\n  display: block;\n  color: #999999;\n  font-size: 14px;\n  line-height: 30px;\n}\n.rechargelist .rechargelist-btn.diy input[_v-6ae7d90d] {\n  width: 80%;\n  text-align: right;\n}\n.rechargelist .rechargelist-btn.diy span[_v-6ae7d90d]:after {\n  content: '';\n  display: block;\n  width: 100%;\n  background: #999999;\n  height: 1px;\n}\n.rechargelist .rechargelist-btn.select span[_v-6ae7d90d]:after {\n  background: #e84593;\n}\n", "", {"version":3,"sources":["/./src/app/views/order/InfoList.vue"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,cAAc;EACd,sBAAsB;EACtB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,WAAW;CACZ;AACD;EACE,eAAe;EACf,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB","file":"InfoList.vue","sourcesContent":[".rechargelist-btn {\n  font-size: 18px;\n  padding: 25px;\n  border-color: #cccccc;\n  color: #666666;\n  padding: 10px;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn:hover {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn:active {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn.select {\n  color: #666666;\n  padding: 25px;\n  border-color: #999999;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn:active {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist-btn.select {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.col-nn-15 {\n  width: 15%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n}\n.col-nn-25 {\n  width: 25%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n}\n.rechargelist {\n  float: left;\n  width: 70%;\n}\n.rechargelist .rechargelist-btn span {\n  display: block;\n  position: relative;\n}\n.rechargelist .rechargelist-btn em {\n  display: block;\n  color: #999999;\n  font-size: 14px;\n  line-height: 30px;\n}\n.rechargelist .rechargelist-btn.diy input {\n  width: 80%;\n  text-align: right;\n}\n.rechargelist .rechargelist-btn.diy span:after {\n  content: '';\n  display: block;\n  width: 100%;\n  background: #999999;\n  height: 1px;\n}\n.rechargelist .rechargelist-btn.select span:after {\n  background: #e84593;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	exports.default = {
	    name: 'CustomList',
	    props: ["custom", "order"],
	    computed: {
	        usePoint: function usePoint() {
	            return this.$store.state.currentPage.orderParams.usePoint;
	        },
	        useBalance: function useBalance() {
	            return this.$store.state.currentPage.orderParams.useBalance;
	        },
	        couponCodeId: function couponCodeId() {
	            return this.$store.state.currentPage.orderParams.couponCodeId;
	        }
	    },
	    created: function created() {},
	
	    filters: {
	        dikou: function dikou(value) {
	            if (value == 0) {
	                return '0.00';
	            }
	            return '可抵扣 ' + value + "元";
	        },
	        currency: function currency(value) {
	            if (!value) return '';
	            return '¥ ' + value;
	        }
	    },
	    methods: {
	        chooseCoupon: function chooseCoupon() {
	            if (this.order.canChooseCouponCodes.length == 0) {
	                return false;
	            }
	            var vm = this;
	            vm.$root.showCouponModal = true;
	            function centerModals() {
	                $(this).each(function (i) {
	                    var $clone = $(this).clone().css('display', 'block').appendTo('body');
	                    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                    top = top > 0 ? top : 0;
	                    $clone.remove();
	                    $(this).find('.modal-content').css("margin-top", top);
	                });
	            };
	            vm.$nextTick(function () {
	                var modal = '#layer-coupon';
	                $(modal).on('show.bs.modal', centerModals);
	                $(modal).on('hidden.bs.modal', function () {
	                    vm.$root.showCouponModal = false;
	                    vm.$store.dispatch("fetchOrder");
	                });
	
	                $(modal).modal({
	                    backdrop: 'static',
	                    keyboard: false,
	                    show: false
	                });
	
	                $(window).on('resize', function (modal) {
	                    return centerModals;
	                });
	
	                $(modal).modal('toggle');
	            });
	            this.refreshOrder();
	        },
	        choosePoint: function choosePoint() {
	            if (this.custom.point == 0) {
	                return false;
	            }
	            var usePoint = !this.usePoint;
	            this.$store.commit("setOrderParams", {
	                usePoint: usePoint
	            });
	            this.refreshOrder();
	        },
	        chooseBalance: function chooseBalance() {
	            if (this.custom.balance == 0) {
	                return false;
	            }
	            var useBalance = !this.useBalance;
	            this.$store.commit("setOrderParams", {
	                useBalance: useBalance,
	                paymentMethodId: 14
	            });
	            this.refreshOrder();
	        },
	        refreshOrder: function refreshOrder() {
	
	            this.$store.dispatch("fetchOrder");
	        }
	    }
	
	};

/***/ },
/* 183 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"infolist clearfix\" _v-6ae7d90d=\"\">\n    <div class=\"col-nn-23 \" _v-6ae7d90d=\"\">\n        <a class=\"btn btn-default  coupon-btn btn-block\" :class=\"{cur:order.couponCodeId}\" @click=\"chooseCoupon()\" _v-6ae7d90d=\"\">\n            <b _v-6ae7d90d=\"\">优惠券</b>\n            <span v-if=\"order.canChooseCouponCodes &amp;&amp; !order.couponCodeId\" _v-6ae7d90d=\"\">{{order.canChooseCouponCodes.length}}张</span>\n            <span v-else-if=\"order.couponCodeId\" _v-6ae7d90d=\"\">已选：{{order.couponName}}</span>\n        </a>\n    </div>\n    <div class=\"col-nn-23\" _v-6ae7d90d=\"\">\n        <a class=\"btn btn-default  point-btn btn-block\" :class=\"{cur:order.usePoint}\" @click=\"choosePoint()\" _v-6ae7d90d=\"\">\n            <b _v-6ae7d90d=\"\">{{custom.point}}积分</b><span _v-6ae7d90d=\"\">{{order.canPointDiscount | dikou }}</span>\n        </a>\n    </div>\n    <div class=\"col-nn-23\" _v-6ae7d90d=\"\">\n        <a class=\"btn btn-default  balance-btn btn-block\" :class=\"{cur:order.useBalance}\" @click=\"chooseBalance()\" _v-6ae7d90d=\"\">\n            <b _v-6ae7d90d=\"\">{{custom.balance}}余额</b><span _v-6ae7d90d=\"\">{{order.canUseBalance | dikou }}</span>\n        </a>\n    </div>\n</div>\n";

/***/ },
/* 184 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container order-custom\">\n        <div class=\"row\">\n            <div class=\"col-nn-30\">\n                <a class=\"btn btn-default custom-btn btn-block\" @click=\"showCustomModal()\">\n                    <span class=\"iconfont icon-guanliyuan\"></span> {{custom.nickname}}\n                </a>\n            </div>\n\n            <info-list v-if=\"mode=='order'\" :amount=\"amount\" :message=\"message\" :custom=\"custom\" :order=\"order\"></info-list>\n        </div>\n    </div>\n";

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(186)
	__vue_script__ = __webpack_require__(188)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\AppCenterMenu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(189)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-09e9e65c/AppCenterMenu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(187);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterMenu.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppCenterMenu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"AppCenterMenu.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 188 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'OrderMenu',
	    props: ["mode"],
	    data: function data() {
	        return {
	            menuIndex: 1,
	            recharge: false
	        };
	    },
	
	    computed: {
	        custom: function custom() {
	            return this.$store.state.currentPage.customData;
	        },
	        payMethod: function payMethod() {
	            return this.$store.state.currentPage.orderParams.paymentMethodId;
	        }
	    },
	    methods: {
	        payScan: function payScan() {
	            this.recharge = false;
	            this.$store.commit("setOrderParams", {
	                paymentMethodId: 12
	            });
	            this.$router.replace('/scan');
	        },
	        payMoney: function payMoney() {
	            this.recharge = false;
	            this.$store.commit("setOrderParams", {
	                paymentMethodId: 10
	            });
	            this.$router.replace('/money');
	        },
	        payCard: function payCard() {
	            this.recharge = false;
	            this.$store.commit("setOrderParams", {
	                paymentMethodId: 11
	            });
	            this.$router.replace('/card');
	        },
	        goRecharge: function goRecharge() {
	            var _this = this;
	
	            if (!this.custom.id) {
	                var _centerModals = function _centerModals() {
	                    $(this).each(function (i) {
	                        var $clone = $(this).clone().css('display', 'block').appendTo('body');
	                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                        top = top > 0 ? top : 0;
	                        $clone.remove();
	                        $(this).find('.modal-content').css("margin-top", top);
	                    });
	                };
	
	                this.$root.showCustomModal = true;
	                ;
	                this.$nextTick(function () {
	                    var vm = _this;
	                    var modal = '#layer-custom';
	                    $(modal).on('show.bs.modal', _centerModals);
	                    $(modal).on('hidden.bs.modal', function () {
	                        vm.$root.showRechargeModal = false;
	                        vm.recharge = false;
	                    });
	
	                    $(modal).modal({
	                        backdrop: 'static',
	                        keyboard: false,
	                        show: false
	                    });
	
	                    $(window).on('resize', function (modal) {
	                        return _centerModals;
	                    });
	
	                    $(modal).modal('toggle');
	                });
	
	                return false;
	            }
	
	            this.recharge = true;
	            this.$root.showRechargeModal = true;
	            function centerModals() {
	                $(this).each(function (i) {
	                    var $clone = $(this).clone().css('display', 'block').appendTo('body');
	                    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                    top = top > 0 ? top : 0;
	                    $clone.remove();
	                    $(this).find('.modal-content').css("margin-top", top);
	                });
	            };
	            this.$nextTick(function () {
	                var vm = _this;
	                var modal = '#layer-recharge';
	                $(modal).on('show.bs.modal', centerModals);
	                $(modal).on('hidden.bs.modal', function () {
	                    vm.$root.showRechargeModal = false;
	                    vm.recharge = false;
	                });
	
	                $(modal).modal({
	                    backdrop: 'static',
	                    keyboard: false,
	                    show: false
	                });
	
	                $(window).on('resize', function (modal) {
	                    return centerModals;
	                });
	
	                $(modal).modal('toggle');
	            });
	        }
	    }
	};

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = "\n\t    <div class=\"order-menu\">\n         <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==12}\" @click=\"payScan\"><span class=\"iconfont icon-qr2\" aria-hidden=\"true\"></span> 扫码</a>\n         <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==10}\" @click=\"payMoney\"><span class=\"iconfont icon-icon\" aria-hidden=\"true\"></span>现金</a>\n         <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==11}\" @click=\"payCard\" ><span class=\"iconfont icon-xinyongqiahuankuan\" aria-hidden=\"true\"></span>刷卡</a>\n         <a  :class=\"{on:recharge}\" class=\"btn btn-default recharge-btn btn-block\" @click=\"goRecharge\" ><span class=\"iconfont icon-jizhang\" aria-hidden=\"true\"></span>充值</a>\n     </div>\n";

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"order\">\n    <app-center-header :title=\"title\" :back=\"back\" :next=\"next\" mode=\"mode\"></app-center-header>\n    <app-center-custom :mode=\"mode\" :message=\"message\" :amount=\"amount\" :order=\"order\"></app-center-custom>\n    <div class=\"container order-body\">\n        <div class=\"row\">\n            <div class=\"col-nn-30  left-con\">\n                <app-center-menu :mode=\"mode\"></app-center-menu>\n            </div>\n            <div class=\"col-nn-70 right-con\">\n                <div class=\"content\">\n                    <transition name=\"slide\">\n                        <keep-alive>\n                           <router-view :message=\"message\" :amount=\"amount\"  :order=\"order\" :show-shop-admin-btn=\"true\"></router-view>\n                        </keep-alive>\n                    </transition>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(192)
	__vue_script__ = __webpack_require__(194)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\print\\PrintMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(195)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6a272dd4/PrintMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(193);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PrintMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PrintMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.payres-txt{color: #e84593; margin-top: 10px; font-size: 16px;}\n.payres-txt.success{  color: #6fc89c;}\n.print-box {width: 260px; padding:50px 15px 100px 15px; margin:0 auto; font-size: 14px;\n    display: block;\n    border: solid 1px #dddddd;\n    border-radius: 5px;\n}\n\n.print-box  h5{\n    font-size: 14px; line-height:20px;  display: block;\n}\n\n.print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'\\9ED1\\4F53' }\n.print-box  table.printtable tbody{display: block;}\n.print-box  table.printtable caption{display:block;}\n.print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}\n.print-box  table.printtable .split{ margin-top: 10px;   }\n.print-box  table.printtable tr{ display:block;clear: left;}\n.print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\n.print-box  table.printtable{*zoom:1;}\n.print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}\n.print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}\n.print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }\n.print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}\n.print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }\n.print-box  .text-center {text-align: center !important;}\n.print-box  .text-right {text-align: right !important;}\n.print-box  .text-left {text-align: left !important;}\n.print-box  p {margin-top:10px;}\n.print-box  #qrcCode{ margin-left:0px; margin-top:10px;  }\n\n", "", {"version":3,"sources":["/./src/app/views/print/PrintMain.vue?2bd041f5"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAuHA,YAAA,eAAA,CAAA,iBAAA,CAAA,gBAAA,CAAA;AACA,sBAAA,eAAA,CAAA;AACA,YAAA,aAAA,CAAA,6BAAA,CAAA,cAAA,CAAA,gBAAA;IACA,eAAA;IACA,0BAAA;IACA,mBAAA;CACA;;AAEA;IACA,gBAAA,CAAA,iBAAA,EAAA,eAAA;CACA;;AAEA,8BAAA,YAAA,CAAA,eAAA,mBAAA,CAAA,kBAAA,CAAA,wBAAA,EAAA;AACA,mCAAA,eAAA,CAAA;AACA,qCAAA,cAAA,CAAA;AACA,qCAAA,kBAAA,CAAA,gBAAA,CAAA;AACA,qCAAA,iBAAA,IAAA;AACA,iCAAA,cAAA,YAAA,CAAA;AACA,mCAAA,kBAAA,cAAA,YAAA,YAAA,WAAA,SAAA,CAAA;AACA,8BAAA,OAAA,CAAA;AACA,2CAAA,eAAA,CAAA,WAAA,YAAA,CAAA,mBAAA,CAAA,kBAAA,CAAA;AACA,4CAAA,eAAA,CAAA,WAAA,YAAA,CAAA,mBAAA,CAAA;AACA,6CAAA,sBAAA,CAAA,UAAA,CAAA,YAAA,GAAA;AACA,8CAAA,sBAAA,CAAA,UAAA,CAAA,YAAA,CAAA;AACA,sCAAA,sBAAA,GAAA,WAAA,CAAA,kBAAA,GAAA;AACA,0BAAA,8BAAA,CAAA;AACA,yBAAA,6BAAA,CAAA;AACA,wBAAA,4BAAA,CAAA;AACA,eAAA,gBAAA,CAAA;AACA,sBAAA,gBAAA,CAAA,gBAAA,GAAA","file":"PrintMain.vue","sourcesContent":["\r\n<template>\r\n    <div class=\"print\">\r\n        <app-center-header :title=\"title\" :back=\"back\" :next=\"next\" mode=\"mode\"></app-center-header>\r\n        <div class=\"container order-custom\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\">\r\n                    <a class=\"btn btn-default print-btn btn-block\" @click=\"printPage();\">\r\n                        <span class=\"iconfont icon-font29\" aria-hidden=\"true\"></span> 打印\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container print-body\" >\r\n            <div class=\"row\" v-if=\"printData.paymentSn\">\r\n                <div class=\"col-xs-12 text-center\">\r\n                    <p class=\"payres-txt\" >{{message}}</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-12\" id=\"printDiv\">\r\n                    <div class=\"print-box show\" >\r\n\r\n                        <table class=\"printtable\">\r\n                            <caption class=\"text-left\">\r\n                                <h5>{{printData.DateTime}}</h5>\r\n                                <h5>订单号 {{printData.sn}}</h5>\r\n                            </caption>\r\n                            <tbody >\r\n                            <tr>\r\n                                <td colspan=\"2\" class=\"text-left block\">{{printData.shopName}}</td>\r\n                            </tr>\r\n                            <tr v-show=\"printData.cashierName\">\r\n                                <td colspan=\"2\" class=\"text-left block\">营业员：{{printData.cashierName}}</td>\r\n                            </tr>\r\n                            <tr v-show=\"printData.customer\">\r\n                                <td colspan=\"2\" class=\"text-left block\">顾客：{{printData.customer}}</td>\r\n                            </tr>\r\n                            <tr v-show=\"printData.guiderName\">\r\n                                <td colspan=\"2\" class=\"text-left  block\">导购员：{{printData.guiderName}}</td>\r\n                            </tr>\r\n                            <tr class=\"split\" v-for=\"(item,index) in printData.appOrderItemConfirms\">\r\n                                <td><span>{{item.name}}</span><span>*{{item.quantity}}</span></td>\r\n                                <td>¥ {{item.price}}</td>\r\n                            </tr>\r\n                            <tr class=\"split\">\r\n                                <td>小计 </td>\r\n                                <td>¥ {{printData.totalPrice}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>优惠券 </td>\r\n                                <td>¥ {{printData.couponDiscount}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>积分支付</td>\r\n                                <td>¥ {{printData.pointDiscount}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>余额支付</td>\r\n                                <td>¥ {{printData.balanceAmount}}</td>\r\n                            </tr>\r\n                            <tr class=\"strong split\">\r\n                                <td>总计</td>\r\n                                <td>¥ {{order.totalAmountPayable}}</td>\r\n                            </tr>\r\n                            <tr class=\"split\">\r\n                                <td>付款方式</td>\r\n                                <td>{{printData.paymentName}}</td>\r\n                            </tr>\r\n                            <tr class=\"split\" v-if=\"orderParams.paymentMethodId == 10 \">\r\n                                <td>现金支付</td>\r\n                                <td>¥ {{printData.rmb}}</td>\r\n                            </tr>\r\n                            <tr class=\"split\"  v-if=\"orderParams.paymentMethodId == 10 \">\r\n                                <td>找零</td>\r\n                                <td>¥ {{printData.cash}}</td>\r\n                            </tr>\r\n\r\n                            </tbody>\r\n                        </table>\r\n                        <p class=\"text-center\" v-if=\"order.wechatCodeUrl\">请微信扫码付款</p>\r\n                        <div id=\"qrcCode\"></div>\r\n\r\n                    </div>\r\n\r\n                    <div style=\"display: none\" id=\"styles\">\r\n                        *{padding:0; margin:0;}\r\n                        body{width: 260px;}\r\n                        .print-box {width: 260px; padding:100px 15px; margin:0 auto; font-size: 12pt; }\r\n                        .print-box  h5{font-size: 14px; line-height:20px; display:block;  }\r\n                        .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }\r\n                        .print-box  table.printtable tbody{display: block;}\r\n                        .print-box  table.printtable caption{display:block;}\r\n                        .print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}\r\n                        .print-box  table.printtable .split{ margin-top:10px;   }\r\n                        .print-box  table.printtable tr{ display:block;clear: left;}\r\n                        .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\r\n                        .print-box  table.printtable{*zoom:1;}\r\n                        .print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}\r\n                        .print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}\r\n                        .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }\r\n                        .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}\r\n                        .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }\r\n                        .print-box  .text-center {text-align: center !important;}\r\n                        .print-box  .text-right {text-align: right !important;}\r\n                        .print-box  .text-left {text-align: left !important;}\r\n                        .print-box  p {margin-top:10px;}\r\n                        .print-box  #qrcCode{ margin-left:15px; margin-top:10px;  }\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<style >\r\n\r\n    .payres-txt{color: #e84593; margin-top: 10px; font-size: 16px;}\r\n    .payres-txt.success{  color: #6fc89c;}\r\n    .print-box {width: 260px; padding:50px 15px 100px 15px; margin:0 auto; font-size: 14px;\r\n        display: block;\r\n        border: solid 1px #dddddd;\r\n        border-radius: 5px;\r\n    }\r\n\r\n    .print-box  h5{\r\n        font-size: 14px; line-height:20px;  display: block;\r\n    }\r\n\r\n    .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }\r\n    .print-box  table.printtable tbody{display: block;}\r\n    .print-box  table.printtable caption{display:block;}\r\n    .print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}\r\n    .print-box  table.printtable .split{ margin-top: 10px;   }\r\n    .print-box  table.printtable tr{ display:block;clear: left;}\r\n    .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\r\n    .print-box  table.printtable{*zoom:1;}\r\n    .print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}\r\n    .print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}\r\n    .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }\r\n    .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}\r\n    .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }\r\n    .print-box  .text-center {text-align: center !important;}\r\n    .print-box  .text-right {text-align: right !important;}\r\n    .print-box  .text-left {text-align: left !important;}\r\n    .print-box  p {margin-top:10px;}\r\n    .print-box  #qrcCode{ margin-left:0px; margin-top:10px;  }\r\n\r\n</style>\r\n\r\n\r\n<script>\r\n    import AppCenterHeader from 'views/AppCenterHeader.vue';\r\n    import AppCenterCustom from 'views/AppCenterCustom.vue';\r\n    import AppCenterMenu from 'views/AppCenterMenu.vue';\r\n\r\n    import {request, API_URLS, HOST} from 'util/request.js';\r\n    import layer from 'layer';\r\n    import $ from 'jquery';\r\n\r\n    export default{\r\n        data() {\r\n            return {\r\n                title:\"打印\",\r\n                back:{\"label\":\"返回\",\"url\":\"order\",\"show\":false},\r\n                next:{\"label\":\"下个订单\",\"url\":\"index\",\"show\":true,\"cb\":this.clearOrder},\r\n                message: '等待付款',\r\n                amount:0,\r\n                payStatus:\"wait\",\r\n                timer:null\r\n\r\n            }\r\n        },\r\n        components:{\r\n            AppCenterHeader,\r\n            AppCenterMenu,\r\n            AppCenterCustom\r\n        },\r\n        computed: {\r\n            //数据来自全局\r\n            mode(){\r\n                return this.$store.state.currentPage.mode;\r\n            },\r\n            orderParams(){\r\n                return this.$store.state.currentPage.orderParams;\r\n            },\r\n            //数据来自全局\r\n            order () {\r\n                return this.$store.state.currentPage.orderData;\r\n            },\r\n            //打印数据\r\n            printData(){\r\n\r\n                var print=this.$store.state.currentPage.printData;\r\n                var nowDate = new Date();\r\n                var myDate=nowDate.toLocaleDateString();\r\n                var myTime=nowDate.toLocaleTimeString();     //获取当前时间\r\n\r\n                var paymentName={12:\"扫码支付\",10:\"现金支付\",11:\"刷卡支付\",14:\"余额支付\"};\r\n\r\n                print.paymentName=paymentName[this.orderParams.paymentMethodId];\r\n\r\n\r\n                print.cash=this.orderParams.cash ;\r\n                print.rmb=this.orderParams.rmb ;\r\n                print.DateTime=myDate+\" \"+myTime;\r\n                print.shopName=this.$store.state.shopData.name;\r\n                return  print;\r\n            }\r\n\r\n        },\r\n        created(){\r\n\r\n            this.$nextTick(function() {\r\n                $('#qrcCode').html(\"\");\r\n\r\n                console.log(this.printData);\r\n                //有链接就生成\r\n                if(this.printData.wechatCodeUrl) {\r\n                    $('#qrcCode').qrcode({\r\n                        render: \"table\",\r\n                        text: this.printData.wechatCodeUrl,\r\n                        width: 230,  //230内扫不出\r\n                        height: 230\r\n                    });\r\n\r\n                    this.scanResListen();\r\n                }\r\n            });\r\n\r\n        },\r\n        methods: {\r\n            clearOrder(){\r\n                this.payStatus=\"success\";\r\n                clearInterval(this.timer);\r\n                this.$store.dispatch(\"removePage\").then(res=> {\r\n                    this.$router.replace('/index');\r\n                });\r\n\r\n               // this.$store.dispatch('switchPage',curPage-1);\r\n               // this.$store.commit('switchPage', curPage);\r\n\r\n            },\r\n            printPage(){\r\n\r\n                var obj=document.getElementById('printDiv');\r\n                var docStr = obj.innerHTML;\r\n\r\n                var newWindow=window.open(\"/print.html\",\"_blank\");\r\n\r\n                var styles=document.getElementById(\"styles\").innerHTML;\r\n\r\n                var header='<!DOCTYPE html>'+\r\n                    '<html lang=\"en\">'+\r\n                    '<head>'+\r\n                    '<meta charset=\"UTF-8\">'+\r\n                    '<title>打印</title>'+\r\n                    '<style type=\"text/css\">'+\r\n                     styles+\r\n                    '</style>'+\r\n                    '</head>'+\r\n                    '<body>';\r\n                var footer='</body>'+\r\n                    '</html>';\r\n                docStr=header+docStr+footer;\r\n\r\n                newWindow.document.write(docStr);\r\n                newWindow.document.close();\r\n                newWindow.print();\r\n                newWindow.close();\r\n\r\n\r\n            },\r\n            scanResListen(){\r\n                    var apiObj={\r\n                        url:API_URLS.payments+\"/\"+this.order.paymentSn,\r\n                        data:{r:Math.random()}\r\n                    }\r\n\r\n                    request.fnGet(apiObj).then(res=>{\r\n                        console.log(this.payStatus);\r\n                        this.payStatus=res.status;\r\n                    });\r\n\r\n                    if(this.payStatus==\"wait\"){\r\n                        this.timer=setTimeout(()=> {              //每5秒一次请求\r\n                            this.scanResListen();\r\n                        },5000);\r\n                    }else{\r\n                        if(this.payStatus==\"success\"){\r\n                            this.message=\"付款成功\";\r\n                            $(\".payres-txt\").addClass(\"success\");\r\n                            layer.msg(this.message, {icon: 1});\r\n                        }else {\r\n                            this.message=\"付款失败\";\r\n                            $(\".payres-txt\").addClass(\"error\");\r\n                            layer.msg(this.message, {icon: 2});\r\n                        }\r\n                    }\r\n\r\n\r\n            }\r\n        }\r\n\r\n    }\r\n</script>\r\n\r\n\r\n</body>\r\n</html>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _AppCenterHeader = __webpack_require__(170);
	
	var _AppCenterHeader2 = _interopRequireDefault(_AppCenterHeader);
	
	var _AppCenterCustom = __webpack_require__(175);
	
	var _AppCenterCustom2 = _interopRequireDefault(_AppCenterCustom);
	
	var _AppCenterMenu = __webpack_require__(185);
	
	var _AppCenterMenu2 = _interopRequireDefault(_AppCenterMenu);
	
	var _request = __webpack_require__(15);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            title: "打印",
	            back: { "label": "返回", "url": "order", "show": false },
	            next: { "label": "下个订单", "url": "index", "show": true, "cb": this.clearOrder },
	            message: '等待付款',
	            amount: 0,
	            payStatus: "wait",
	            timer: null
	
	        };
	    },
	
	    components: {
	        AppCenterHeader: _AppCenterHeader2.default,
	        AppCenterMenu: _AppCenterMenu2.default,
	        AppCenterCustom: _AppCenterCustom2.default
	    },
	    computed: {
	        mode: function mode() {
	            return this.$store.state.currentPage.mode;
	        },
	        orderParams: function orderParams() {
	            return this.$store.state.currentPage.orderParams;
	        },
	        order: function order() {
	            return this.$store.state.currentPage.orderData;
	        },
	        printData: function printData() {
	
	            var print = this.$store.state.currentPage.printData;
	            var nowDate = new Date();
	            var myDate = nowDate.toLocaleDateString();
	            var myTime = nowDate.toLocaleTimeString();
	
	            var paymentName = { 12: "扫码支付", 10: "现金支付", 11: "刷卡支付", 14: "余额支付" };
	
	            print.paymentName = paymentName[this.orderParams.paymentMethodId];
	
	            print.cash = this.orderParams.cash;
	            print.rmb = this.orderParams.rmb;
	            print.DateTime = myDate + " " + myTime;
	            print.shopName = this.$store.state.shopData.name;
	            return print;
	        }
	    },
	    created: function created() {
	
	        this.$nextTick(function () {
	            (0, _jquery2.default)('#qrcCode').html("");
	
	            console.log(this.printData);
	
	            if (this.printData.wechatCodeUrl) {
	                (0, _jquery2.default)('#qrcCode').qrcode({
	                    render: "table",
	                    text: this.printData.wechatCodeUrl,
	                    width: 230,
	                    height: 230
	                });
	
	                this.scanResListen();
	            }
	        });
	    },
	
	    methods: {
	        clearOrder: function clearOrder() {
	            var _this = this;
	
	            this.payStatus = "success";
	            clearInterval(this.timer);
	            this.$store.dispatch("removePage").then(function (res) {
	                _this.$router.replace('/index');
	            });
	        },
	        printPage: function printPage() {
	
	            var obj = document.getElementById('printDiv');
	            var docStr = obj.innerHTML;
	
	            var newWindow = window.open("/print.html", "_blank");
	
	            var styles = document.getElementById("styles").innerHTML;
	
	            var header = '<!DOCTYPE html>' + '<html lang="en">' + '<head>' + '<meta charset="UTF-8">' + '<title>打印</title>' + '<style type="text/css">' + styles + '</style>' + '</head>' + '<body>';
	            var footer = '</body>' + '</html>';
	            docStr = header + docStr + footer;
	
	            newWindow.document.write(docStr);
	            newWindow.document.close();
	            newWindow.print();
	            newWindow.close();
	        },
	        scanResListen: function scanResListen() {
	            var _this2 = this;
	
	            var apiObj = {
	                url: _request.API_URLS.payments + "/" + this.order.paymentSn,
	                data: { r: Math.random() }
	            };
	
	            _request.request.fnGet(apiObj).then(function (res) {
	                console.log(_this2.payStatus);
	                _this2.payStatus = res.status;
	            });
	
	            if (this.payStatus == "wait") {
	                this.timer = setTimeout(function () {
	                    _this2.scanResListen();
	                }, 5000);
	            } else {
	                if (this.payStatus == "success") {
	                    this.message = "付款成功";
	                    (0, _jquery2.default)(".payres-txt").addClass("success");
	                    _layer2.default.msg(this.message, { icon: 1 });
	                } else {
	                    this.message = "付款失败";
	                    (0, _jquery2.default)(".payres-txt").addClass("error");
	                    _layer2.default.msg(this.message, { icon: 2 });
	                }
	            }
	        }
	    }
	
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"print\">\n    <app-center-header :title=\"title\" :back=\"back\" :next=\"next\" mode=\"mode\"></app-center-header>\n    <div class=\"container order-custom\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <a class=\"btn btn-default print-btn btn-block\" @click=\"printPage();\">\n                    <span class=\"iconfont icon-font29\" aria-hidden=\"true\"></span> 打印\n                </a>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container print-body\" >\n        <div class=\"row\" v-if=\"printData.paymentSn\">\n            <div class=\"col-xs-12 text-center\">\n                <p class=\"payres-txt\" >{{message}}</p>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12\" id=\"printDiv\">\n                <div class=\"print-box show\" >\n\n                    <table class=\"printtable\">\n                        <caption class=\"text-left\">\n                            <h5>{{printData.DateTime}}</h5>\n                            <h5>订单号 {{printData.sn}}</h5>\n                        </caption>\n                        <tbody >\n                        <tr>\n                            <td colspan=\"2\" class=\"text-left block\">{{printData.shopName}}</td>\n                        </tr>\n                        <tr v-show=\"printData.cashierName\">\n                            <td colspan=\"2\" class=\"text-left block\">营业员：{{printData.cashierName}}</td>\n                        </tr>\n                        <tr v-show=\"printData.customer\">\n                            <td colspan=\"2\" class=\"text-left block\">顾客：{{printData.customer}}</td>\n                        </tr>\n                        <tr v-show=\"printData.guiderName\">\n                            <td colspan=\"2\" class=\"text-left  block\">导购员：{{printData.guiderName}}</td>\n                        </tr>\n                        <tr class=\"split\" v-for=\"(item,index) in printData.appOrderItemConfirms\">\n                            <td><span>{{item.name}}</span><span>*{{item.quantity}}</span></td>\n                            <td>¥ {{item.price}}</td>\n                        </tr>\n                        <tr class=\"split\">\n                            <td>小计 </td>\n                            <td>¥ {{printData.totalPrice}}</td>\n                        </tr>\n                        <tr>\n                            <td>优惠券 </td>\n                            <td>¥ {{printData.couponDiscount}}</td>\n                        </tr>\n                        <tr>\n                            <td>积分支付</td>\n                            <td>¥ {{printData.pointDiscount}}</td>\n                        </tr>\n                        <tr>\n                            <td>余额支付</td>\n                            <td>¥ {{printData.balanceAmount}}</td>\n                        </tr>\n                        <tr class=\"strong split\">\n                            <td>总计</td>\n                            <td>¥ {{order.totalAmountPayable}}</td>\n                        </tr>\n                        <tr class=\"split\">\n                            <td>付款方式</td>\n                            <td>{{printData.paymentName}}</td>\n                        </tr>\n                        <tr class=\"split\" v-if=\"orderParams.paymentMethodId == 10 \">\n                            <td>现金支付</td>\n                            <td>¥ {{printData.rmb}}</td>\n                        </tr>\n                        <tr class=\"split\"  v-if=\"orderParams.paymentMethodId == 10 \">\n                            <td>找零</td>\n                            <td>¥ {{printData.cash}}</td>\n                        </tr>\n\n                        </tbody>\n                    </table>\n                    <p class=\"text-center\" v-if=\"order.wechatCodeUrl\">请微信扫码付款</p>\n                    <div id=\"qrcCode\"></div>\n\n                </div>\n\n                <div style=\"display: none\" id=\"styles\">\n                    *{padding:0; margin:0;}\n                    body{width: 260px;}\n                    .print-box {width: 260px; padding:100px 15px; margin:0 auto; font-size: 12pt; }\n                    .print-box  h5{font-size: 14px; line-height:20px; display:block;  }\n                    .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }\n                    .print-box  table.printtable tbody{display: block;}\n                    .print-box  table.printtable caption{display:block;}\n                    .print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}\n                    .print-box  table.printtable .split{ margin-top:10px;   }\n                    .print-box  table.printtable tr{ display:block;clear: left;}\n                    .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\n                    .print-box  table.printtable{*zoom:1;}\n                    .print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}\n                    .print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}\n                    .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }\n                    .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}\n                    .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }\n                    .print-box  .text-center {text-align: center !important;}\n                    .print-box  .text-right {text-align: right !important;}\n                    .print-box  .text-left {text-align: left !important;}\n                    .print-box  p {margin-top:10px;}\n                    .print-box  #qrcCode{ margin-left:15px; margin-top:10px;  }\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 196 */
/***/ function(module, exports) {

	module.exports = "\n <div class=\"appCenter\">\n\t <app-center-loading v-if=\"waiting\"></app-center-loading>\n\t <order-main v-if=\"mode=='order'\"></order-main>\n\t <print-main v-if=\"mode=='print'\"></print-main>\n </div>\n";

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(198)
	__vue_script__ = __webpack_require__(200)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\message\\MsgMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(201)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5ec91664/MsgMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(199);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MsgMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MsgMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".message {\n  background: #efefef;\n}\n.message .btn-normal {\n  background: #e84593;\n  color: #ffffff;\n}\n.message .layer-comfirm-box {\n  width: 400px;\n  padding: 12px;\n  z-index: 99;\n  display: none;\n}\n.message .layer-comfirm-box .t {\n  padding: 12px;\n  text-align: center;\n  font-size: 16px;\n}\n.message .layer-comfirm-box .c {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.message .layer-comfirm-box .f {\n  padding: 12px;\n  text-align: center;\n}\n.message .layer-comfirm-box .f .comfirm-ok {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.message .layer-comfirm-box .f .comfirm-ok:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok:hover,\n.message .layer-comfirm-box .f .comfirm-ok:active {\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.message .order-header {\n  padding: 15px;\n  position: relative;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.message .order-header h3 {\n  font-size: 18px;\n  line-height: 30px;\n  margin: 0;\n}\n.message .order-header .ok-btn,\n.message .order-header .back-btn {\n  color: #666666;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #f0eeef;\n}\n.message .order-header .ok-btn:hover,\n.message .order-header .back-btn:hover {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.message .order-header .ok-btn:active,\n.message .order-header .back-btn:active {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #3b8c64;\n}\n.message .order-header .ok-btn.select,\n.message .order-header .back-btn.select {\n  color: #ffffff;\n  padding: 25px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.message .page-con {\n  height: 588px;\n}\n.message .container {\n  background-color: #ffffff;\n  border-left: 1px dashed #e5e5e5;\n  border-right: 1px dashed #e5e5e5;\n}\n.message .btn {\n  position: relative;\n  display: inline-block;\n}\n.message .m-box {\n  height: auto;\n  background: #fff;\n  position: relative;\n  border: solid 1px #ddd;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.message .m-box .memo {\n  margin-top: 5px;\n  margin-bottom: 5px;\n  color: #808080;\n}\n.message .m-box .date {\n  color: #808080;\n  position: absolute;\n  z-index: 10;\n}\n.message .m-box .msg-pop-close {\n  right: 12px;\n  top: 12px;\n  position: absolute;\n}\n.message .m-box h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.message .m-box em {\n  position: absolute;\n  right: 24px;\n  top: 45px;\n}\n.message .m-box p {\n  width: 85%;\n  color: #333333;\n}\n.message .m-box .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.message .m-box .r {\n  text-align: right;\n}\n.message .m-box .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline-block;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.message .m-box .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  display: inline-block;\n  margin-left: 12px;\n  position: relative;\n  margin-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/message/MsgMain.vue"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,aAAa;EACb,cAAc;EACd,YAAY;EACZ,cAAc;CACf;AACD;EACE,cAAc;EACd,mBAAmB;EACnB,gBAAgB;CACjB;AACD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,mBAAmB;EACnB,kCAAkC;EAClC,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;CACX;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,gCAAgC;EAChC,iCAAiC;CAClC;AACD;EACE,mBAAmB;EACnB,sBAAsB;CACvB;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,cAAc;EACd,eAAe;CAChB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,eAAe;EACf,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,YAAY;EACZ,UAAU;EACV,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CACX;AACD;EACE,WAAW;EACX,eAAe;CAChB;AACD;EACE,aAAa;EACb,kBAAkB;EAClB,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;EACnB,mBAAmB;CACpB","file":"MsgMain.vue","sourcesContent":[".message {\n  background: #efefef;\n}\n.message .btn-normal {\n  background: #e84593;\n  color: #ffffff;\n}\n.message .layer-comfirm-box {\n  width: 400px;\n  padding: 12px;\n  z-index: 99;\n  display: none;\n}\n.message .layer-comfirm-box .t {\n  padding: 12px;\n  text-align: center;\n  font-size: 16px;\n}\n.message .layer-comfirm-box .c {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.message .layer-comfirm-box .f {\n  padding: 12px;\n  text-align: center;\n}\n.message .layer-comfirm-box .f .comfirm-ok {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.message .layer-comfirm-box .f .comfirm-ok:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.message .layer-comfirm-box .f .comfirm-ok:hover,\n.message .layer-comfirm-box .f .comfirm-ok:active {\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.message .order-header {\n  padding: 15px;\n  position: relative;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.message .order-header h3 {\n  font-size: 18px;\n  line-height: 30px;\n  margin: 0;\n}\n.message .order-header .ok-btn,\n.message .order-header .back-btn {\n  color: #666666;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #f0eeef;\n}\n.message .order-header .ok-btn:hover,\n.message .order-header .back-btn:hover {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.message .order-header .ok-btn:active,\n.message .order-header .back-btn:active {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #3b8c64;\n}\n.message .order-header .ok-btn.select,\n.message .order-header .back-btn.select {\n  color: #ffffff;\n  padding: 25px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.message .page-con {\n  height: 588px;\n}\n.message .container {\n  background-color: #ffffff;\n  border-left: 1px dashed #e5e5e5;\n  border-right: 1px dashed #e5e5e5;\n}\n.message .btn {\n  position: relative;\n  display: inline-block;\n}\n.message .m-box {\n  height: auto;\n  background: #fff;\n  position: relative;\n  border: solid 1px #ddd;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.message .m-box .memo {\n  margin-top: 5px;\n  margin-bottom: 5px;\n  color: #808080;\n}\n.message .m-box .date {\n  color: #808080;\n  position: absolute;\n  z-index: 10;\n}\n.message .m-box .msg-pop-close {\n  right: 12px;\n  top: 12px;\n  position: absolute;\n}\n.message .m-box h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.message .m-box em {\n  position: absolute;\n  right: 24px;\n  top: 45px;\n}\n.message .m-box p {\n  width: 85%;\n  color: #333333;\n}\n.message .m-box .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.message .m-box .r {\n  text-align: right;\n}\n.message .m-box .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline-block;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.message .m-box .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  display: inline-block;\n  margin-left: 12px;\n  position: relative;\n  margin-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _AppCenterHeader = __webpack_require__(170);
	
	var _AppCenterHeader2 = _interopRequireDefault(_AppCenterHeader);
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "searchbar",
	    data: function data() {
	        return {
	            title: "消息",
	            back: { "label": "返回", "url": "index", "show": true },
	            next: { "label": "打印", "url": "print", "show": false },
	            listData: {},
	            pageNum: 1,
	            comfirmTitle: "无标题",
	            memo: '',
	            allocationId: ''
	
	        };
	    },
	
	    components: {
	        Pagination: _Pagination2.default,
	        AppCenterHeader: _AppCenterHeader2.default
	    },
	    watch: {},
	    created: function created() {
	        this.fetchList();
	    },
	
	    computed: {},
	    methods: {
	        showComfirmBox: function showComfirmBox(id, type) {
	
	            this.allocationId = id;
	            if (type == "agree") {
	                this.comfirmTitle = "同意调货";
	                this.allocationStatus = "agreed";
	            } else {
	                this.comfirmTitle = "拒绝调货";
	                this.allocationStatus = "refused";
	            }
	            _layer2.default.open({
	                id: 'layui-layer-comfirm',
	                type: 1,
	                shade: 0.01,
	                anim: 0,
	                zIndex: 1000,
	                closeBtn: 2,
	                title: false,
	                area: ['auto', 'auto'],
	                content: $('#layer-comfirm-box'),
	                success: function success() {},
	                end: function end() {}
	            });
	        },
	        closeMsg: function closeMsg() {},
	        checkAllocation: function checkAllocation() {
	            var _this = this;
	
	            if (!this.allocationId) {
	                _layer2.default.alert("该批准号无效", { icon: 2 });
	                return false;
	            }
	            var params = {
	                'allocationId': this.allocationId,
	                'status': this.allocationStatus,
	                'memo': this.memo
	            };
	
	            this.$store.dispatch("approvalAllocation", params).then(function (res) {
	                _layer2.default.alert("操作成功", { icon: 1, closeBtn: false, yes: function yes(index) {
	                        _layer2.default.closeAll();
	                    } });
	                _this.memo = '';
	                _this.allocationId = '';
	                _this.fetchList();
	            }).catch(function (res) {
	                _layer2.default.alert("操作失败", { icon: 1, closeBtn: false, yes: function yes(index) {
	                        _layer2.default.closeAll();
	                    } });
	                _this.memo = '';
	                _this.allocationId = '';
	                _this.fetchList();
	            });
	        },
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	            window.scrollTo(0, 0);
	        },
	        fetchList: function fetchList() {
	            var _this2 = this;
	
	            this.$store.dispatch("fetchMsgList", { "pageNum": this.pageNum }).then(function (res) {
	                console.log(res);
	                _this2.listData = res.page;
	            }).catch(function (res) {});
	        }
	    }
	};

/***/ },
/* 201 */
/***/ function(module, exports) {

	module.exports = "\n\t  <div class=\"message\">\n\n         <app-center-header  :title=\"title\" :back=\"back\" :next=\"next\" mode=\"mode\"></app-center-header>\n\n         <div class=\"container message-body\" >\n             <div class=\"row page-con\">\n                 <div class=\"col-xs-6\" v-for=\"(item,index) in listData.list\">\n                     <div class=\"m-box\" >\n                         <a class=\"btn msg-pop-close\" @click=\"closeMsg\" style=\"display: none;\">&times;</a>\n                         <h3>{{item.shopName}}</h3>\n                         <div class=\"c\">\n                             <p>{{item.productName}}</p>\n                             <p class=\"memo\">申请者备注：{{item.applyMemo}}</p>\n                             <p class=\"memo\">接收者备注：{{item.approvalMemo}}</p>\n                         </div>\n                         <em>数量 {{item.num}}</em>\n                         <span class=\"date\">{{item.createDate}}</span>\n                         <div class=\"r\">\n                             <a class=\"btn btn-agree\"  v-if=\"item.agreeBtn\" @click=\"showComfirmBox(item.id,'agree')\">同意</a>\n                             <a class=\"btn btn-refuse\"  v-if=\"item.refuseBtn\" @click=\"showComfirmBox(item.id,'refuse')\">拒绝</a>\n                             <a class=\"btn\" :class=\"{'btn-success':true,'btn-danger':item.status=='refused'}\" v-if=\"!item.agreeBtn && !item.refuseBtn\" >{{item.statusStr}}</a>\n                         </div>\n                     </div>\n                 </div>\n\n             </div>\n             <div class=\"row\">\n                 <div class=\"col-xs-12\">\n                     <pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n                 </div>\n             </div>\n\n         </div>\n\n\n       <div id=\"layer-comfirm-box\" class=\"layer-comfirm-box\">\n           <div class=\"t\">\n                {{comfirmTitle}}\n           </div>\n           <div class=\"c form-horizontal\">\n               <textarea class=\"form-control\" rows=\"4\" v-model=\"memo\" placeholder=\"请填写备注\"></textarea>\n           </div>\n           <div class=\"f text-center\">\n               <a class=\"btn comfirm-ok\" @click=\"checkAllocation()\">确认</a>\n           </div>\n       </div>\n\n     </div>\n\n\n\n\n";

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(203)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\order\\OrderDefault.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(207)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-77c79c98/OrderDefault.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ShopAdminBtn = __webpack_require__(204);
	
	var _ShopAdminBtn2 = _interopRequireDefault(_ShopAdminBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "OrderDefault",
	    props: ['message', 'amount', 'showShopAdminBtn'],
	    components: {
	        shopAdminBtn: _ShopAdminBtn2.default
	    },
	    filters: {
	        currency: function currency(value) {
	            return '¥ ' + value;
	        }
	    }
	
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(205)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\shopAdmin\\ShopAdminBtn.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(206)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0e80f7d2/ShopAdminBtn.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'showAdminBtn',
	    computed: {
	        shopAdminData: function shopAdminData() {
	            return this.$store.state.currentPage.shopAdminData;
	        },
	        shopAdminName: function shopAdminName() {
	            if (this.$store.state.currentPage.shopAdminData.name) {
	                return this.$store.state.currentPage.shopAdminData.name;
	            } else {
	                return "选择导购员";
	            }
	        }
	    },
	    methods: {
	        showShopAdminModal: function showShopAdminModal() {
	            this.$root.showShopAdminModal = true;
	            function centerModals() {
	                (0, _jquery2.default)(this).each(function (i) {
	                    var $clone = (0, _jquery2.default)(this).clone().css('display', 'block').appendTo('body');
	                    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	                    top = top > 0 ? top : 0;
	                    $clone.remove();
	                    (0, _jquery2.default)(this).find('.modal-content').css("margin-top", top);
	                });
	            };
	            this.$nextTick(function () {
	                var modal = '#layer-showAdmin';
	                (0, _jquery2.default)(modal).on('show.bs.modal', centerModals);
	
	                (0, _jquery2.default)(modal).modal({
	                    backdrop: 'static',
	                    keyboard: false,
	                    show: false
	                });
	
	                (0, _jquery2.default)(window).on('resize', function (modal) {
	                    return centerModals;
	                });
	
	                (0, _jquery2.default)(modal).modal('toggle');
	            });
	        }
	    }
	};

/***/ },
/* 206 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"shopAdminBox\">\n    <a class=\"btn btn-block btn-default addShopAdmin-btn\" @click=\"showShopAdminModal\">\n    <span class=\"iconfont icon-gouwucheman\" aria-hidden=\"true\" > {{shopAdminName}}</span>\n    </a>\n</div>\n";

/***/ },
/* 207 */
/***/ function(module, exports) {

	module.exports = "\n<!--刷卡方式-->\n     <div class=\"tab-con tab-con-0 text-center tabShow\">\n         <h1 class=\"pay-amount \">{{amount | currency}}</h1>\n         <p class=\"pay-tips \"> {{ message }}</p>\n         <shop-admin-btn v-show=\"showShopAdminBtn\"></shop-admin-btn>\n     </div>\n";

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(209)
	__vue_script__ = __webpack_require__(211)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\pay\\PayScan.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(212)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-99bee064/PayScan.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(210);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayScan.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayScan.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PayScan.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ShopAdminBtn = __webpack_require__(204);
	
	var _ShopAdminBtn2 = _interopRequireDefault(_ShopAdminBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: ['message', 'amount', 'giftAmount', 'showShopAdminBtn'],
	    components: {
	        shopAdminBtn: _ShopAdminBtn2.default
	    }
	};

/***/ },
/* 212 */
/***/ function(module, exports) {

	module.exports = "\n\t  <!--默认无选择-->\n     <div class=\"tab-con tab-con-0 text-center tabShow\">\n         <h1 class=\"pay-amount \">￥ {{amount}}</h1>\n         <p class=\"pay-gift-amount\" v-if=\"giftAmount\" >{{giftAmount}}</p>\n         <p class=\"txt\">请打印收据后 扫描收据上的二维码</p>\n         <shop-admin-btn v-show=\"showShopAdminBtn\"></shop-admin-btn>\n     </div>\n";

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(214)
	__vue_script__ = __webpack_require__(216)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\pay\\PayCard.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(217)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-30927a3e/PayCard.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(215);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayCard.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayCard.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PayCard.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ShopAdminBtn = __webpack_require__(204);
	
	var _ShopAdminBtn2 = _interopRequireDefault(_ShopAdminBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: ['message', 'amount', 'giftAmount', 'showShopAdminBtn'],
	    components: {
	        shopAdminBtn: _ShopAdminBtn2.default
	    }
	
	};

/***/ },
/* 217 */
/***/ function(module, exports) {

	module.exports = "\n<!--刷卡方式-->\n<div class=\"tab-con tab-con-2 text-center tabShow\">\n    <h1 class=\"pay-amount \">￥ {{amount}}</h1>\n    <p class=\"pay-gift-amount\" v-if=\"giftAmount\" >{{giftAmount}}</p>\n    <p class=\"txt\">请对准POS机进行刷卡验证,成功后打印收据</p>\n    <shop-admin-btn v-show=\"showShopAdminBtn\"></shop-admin-btn>\n</div>\n";

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(219)
	__vue_script__ = __webpack_require__(221)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\pay\\PayMoney.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(222)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-8b8b0582/PayMoney.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(220);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayMoney.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PayMoney.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.rmb{background: #fff; color: #6fc89c;}\n", "", {"version":3,"sources":["/./src/app/views/pay/PayMoney.vue?50e75152"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAiDA,KAAA,iBAAA,CAAA,eAAA,CAAA","file":"PayMoney.vue","sourcesContent":["<template>\r\n                <!--现金方式-->\r\n                    <div class=\"tab-con tab-con-1 text-center tabShow\">\r\n                        <h1 class=\"pay-amount \">￥ {{amount}}</h1>\r\n                        <p class=\"pay-gift-amount\" v-if=\"giftAmount\">{{giftAmount}}</p>\r\n\r\n                        <div class=\"list-box \">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                <tr>\r\n                                    <th>价格</th>\r\n                                    <th>付款</th>\r\n                                    <th>找零</th>\r\n                                    <th>支付方式</th>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody class=\"text-left\">\r\n                                <tr>\r\n                                    <td>{{amount | currency }}</td>\r\n                                    <td><span class=\"rmb\">{{rmb | currency  }}</span></td>\r\n                                    <td>{{cash | currency  }}</td>\r\n                                    <td>现金</td>\r\n                                </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <div class=\"calc-box \">\r\n                            <ul class=\"clearfix\">\r\n                                <li @click=\"calc(1);\">1</li>\r\n                                <li @click=\"calc(2);\">2</li>\r\n                                <li @click=\"calc(3);\">3</li>\r\n                                <li @click=\"calc(4);\">4</li>\r\n                                <li @click=\"calc(5);\">5</li>\r\n                                <li @click=\"calc(6);\">6</li>\r\n                                <li @click=\"calc(7);\">7</li>\r\n                                <li @click=\"calc(8);\">8</li>\r\n                                <li @click=\"calc(9);\">9</li>\r\n                                <li @click=\"calc(0);\">0</li>\r\n                                <li @click=\"calc('.');\">.</li>\r\n                                <li @click=\"calc('x');\">X</li>\r\n\r\n                            </ul>\r\n                        </div>\r\n                        <shop-admin-btn v-show=\"showShopAdminBtn\"></shop-admin-btn>\r\n         </div>\r\n\r\n</template>\r\n\r\n<style>\r\n    .rmb{background: #fff; color: #6fc89c;}\r\n</style>\r\n<script>\r\n    import shopAdminBtn from 'components/shopAdmin/ShopAdminBtn.vue';\r\n    export default{\r\n        name:\"PayMoney\",\r\n        filters: {\r\n            currency: function (value) {\r\n                if (!value) return '0.00';\r\n                return '¥ ' + Number(value).toFixed(2);\r\n            },\r\n        },\r\n        props:['message','amount','giftAmount','showShopAdminBtn'],\r\n        data(){\r\n            return {\r\n                rmb:0\r\n            }\r\n        },\r\n        computed: {\r\n            //数据来自全局\r\n            mode(){\r\n                return this.$store.state.currentPage.mode;\r\n            },\r\n            cash(){\r\n                var b=this.rmb-this.amount;\r\n                if(b<0){b=0 ;}\r\n                this.$store.commit(\"setOrderParams\",{ rmb:this.rmb,cash:b});\r\n                return this.$store.state.currentPage.orderParams.cash;\r\n            }\r\n\r\n        },\r\n        components:{\r\n            shopAdminBtn\r\n        },\r\n        methods:{\r\n            calc:function(keycode){\r\n\r\n                var amount=this.rmb;\r\n\r\n                if(isNaN(keycode)){\r\n                    switch (keycode) {\r\n                        case 'x':   //close\r\n                            var str=this.rmb+\"\";\r\n                            this.rmb=str.substring(0,str.length-1);\r\n                            if(!this.rmb){\r\n                                this.rmb=0;\r\n                            }\r\n                            break;\r\n                        case '.':   //close\r\n                            var str=this.rmb+\".\";\r\n                            this.rmb=str;\r\n                            break;\r\n                    }\r\n                }else{\r\n                    if(amount){\r\n                        this.rmb+=keycode+'';\r\n                    }else{\r\n                        this.rmb=keycode;\r\n                    }\r\n\r\n\r\n                }\r\n            },\r\n        }\r\n    }\r\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ShopAdminBtn = __webpack_require__(204);
	
	var _ShopAdminBtn2 = _interopRequireDefault(_ShopAdminBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "PayMoney",
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    props: ['message', 'amount', 'giftAmount', 'showShopAdminBtn'],
	    data: function data() {
	        return {
	            rmb: 0
	        };
	    },
	
	    computed: {
	        mode: function mode() {
	            return this.$store.state.currentPage.mode;
	        },
	        cash: function cash() {
	            var b = this.rmb - this.amount;
	            if (b < 0) {
	                b = 0;
	            }
	            this.$store.commit("setOrderParams", { rmb: this.rmb, cash: b });
	            return this.$store.state.currentPage.orderParams.cash;
	        }
	    },
	    components: {
	        shopAdminBtn: _ShopAdminBtn2.default
	    },
	    methods: {
	        calc: function calc(keycode) {
	
	            var amount = this.rmb;
	
	            if (isNaN(keycode)) {
	                switch (keycode) {
	                    case 'x':
	                        var str = this.rmb + "";
	                        this.rmb = str.substring(0, str.length - 1);
	                        if (!this.rmb) {
	                            this.rmb = 0;
	                        }
	                        break;
	                    case '.':
	                        var str = this.rmb + ".";
	                        this.rmb = str;
	                        break;
	                }
	            } else {
	                if (amount) {
	                    this.rmb += keycode + '';
	                } else {
	                    this.rmb = keycode;
	                }
	            }
	        }
	    }
	};

/***/ },
/* 222 */
/***/ function(module, exports) {

	module.exports = "\n       <!--现金方式-->\n           <div class=\"tab-con tab-con-1 text-center tabShow\">\n               <h1 class=\"pay-amount \">￥ {{amount}}</h1>\n               <p class=\"pay-gift-amount\" v-if=\"giftAmount\">{{giftAmount}}</p>\n\n               <div class=\"list-box \">\n                   <table class=\"table\">\n                       <thead>\n                       <tr>\n                           <th>价格</th>\n                           <th>付款</th>\n                           <th>找零</th>\n                           <th>支付方式</th>\n                       </tr>\n                       </thead>\n                       <tbody class=\"text-left\">\n                       <tr>\n                           <td>{{amount | currency }}</td>\n                           <td><span class=\"rmb\">{{rmb | currency  }}</span></td>\n                           <td>{{cash | currency  }}</td>\n                           <td>现金</td>\n                       </tr>\n                       </tbody>\n                   </table>\n               </div>\n               <div class=\"calc-box \">\n                   <ul class=\"clearfix\">\n                       <li @click=\"calc(1);\">1</li>\n                       <li @click=\"calc(2);\">2</li>\n                       <li @click=\"calc(3);\">3</li>\n                       <li @click=\"calc(4);\">4</li>\n                       <li @click=\"calc(5);\">5</li>\n                       <li @click=\"calc(6);\">6</li>\n                       <li @click=\"calc(7);\">7</li>\n                       <li @click=\"calc(8);\">8</li>\n                       <li @click=\"calc(9);\">9</li>\n                       <li @click=\"calc(0);\">0</li>\n                       <li @click=\"calc('.');\">.</li>\n                       <li @click=\"calc('x');\">X</li>\n\n                   </ul>\n               </div>\n               <shop-admin-btn v-show=\"showShopAdminBtn\"></shop-admin-btn>\n</div>\n\n";

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(224)
	__vue_script__ = __webpack_require__(226)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\recharge\\RechargeDefault.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(227)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-537ba1d6/RechargeDefault.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(225);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeDefault.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeDefault.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"RechargeDefault.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 226 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: ['message', 'amount', 'giftAmount'],
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '';
	            return '¥ ' + value;
	        }
	    }
	};

/***/ },
/* 227 */
/***/ function(module, exports) {

	module.exports = "\n<!--刷卡方式-->\n     <div class=\"tab-con tab-con-0 text-center tabShow\">\n         <h1 class=\"pay-amount \">{{amount | currency}}</h1>\n         <p class=\"pay-gift-amount\" v-if=\"giftAmount\">{{giftAmount}}</p>\n         <p class=\"pay-tips \"> {{ message }}</p>\n     </div>\n";

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(229)
	__vue_script__ = __webpack_require__(231)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(257)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-34899a64/LogMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(230);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".log {\n  background: #efefef;\n}\n.log .order-header {\n  padding: 15px;\n  position: relative;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log .order-header h3 {\n  font-size: 18px;\n  line-height: 30px;\n  margin: 0;\n}\n.log .order-header .ok-btn,\n.log .order-header .back-btn {\n  color: #666666;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #f0eeef;\n}\n.log .order-header .ok-btn:hover,\n.log .order-header .back-btn:hover {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.log .order-header .ok-btn:active,\n.log .order-header .back-btn:active {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #3b8c64;\n}\n.log .order-header .ok-btn.select,\n.log .order-header .back-btn.select {\n  color: #ffffff;\n  padding: 25px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.log .page-con {\n  height: 588px;\n}\n.log .container {\n  background-color: #ffffff;\n  border-left: 1px dashed #e5e5e5;\n  border-right: 1px dashed #e5e5e5;\n}\n.log .btn {\n  position: relative;\n}\n.log .m-box {\n  height: auto;\n  background: #fff;\n  z-index: 9999;\n  border: solid 1px #ddd;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.log .m-box .msg-pop-close {\n  right: 12px;\n  top: 12px;\n  position: absolute;\n}\n.log .m-box h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.log .m-box em {\n  position: absolute;\n  right: 24px;\n  top: 45px;\n}\n.log .m-box p {\n  width: 85%;\n  color: #333333;\n}\n.log .m-box .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.log .m-box .r {\n  text-align: right;\n}\n.log .m-box .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.log .m-box .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogMain.vue"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,mBAAmB;EACnB,kCAAkC;EAClC,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;CACX;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,gCAAgC;EAChC,iCAAiC;CAClC;AACD;EACE,mBAAmB;CACpB;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,cAAc;EACd,uBAAuB;EACvB,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,cAAc;EACd,eAAe;CAChB;AACD;EACE,YAAY;EACZ,UAAU;EACV,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CACX;AACD;EACE,WAAW;EACX,eAAe;CAChB;AACD;EACE,aAAa;EACb,kBAAkB;EAClB,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;CACnB","file":"LogMain.vue","sourcesContent":[".log {\n  background: #efefef;\n}\n.log .order-header {\n  padding: 15px;\n  position: relative;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log .order-header h3 {\n  font-size: 18px;\n  line-height: 30px;\n  margin: 0;\n}\n.log .order-header .ok-btn,\n.log .order-header .back-btn {\n  color: #666666;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #f0eeef;\n}\n.log .order-header .ok-btn:hover,\n.log .order-header .back-btn:hover {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.log .order-header .ok-btn:active,\n.log .order-header .back-btn:active {\n  color: #ffffff;\n  padding: 10px 20px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #3b8c64;\n}\n.log .order-header .ok-btn.select,\n.log .order-header .back-btn.select {\n  color: #ffffff;\n  padding: 25px;\n  border-color: #cccccc;\n  border-radius: 5px;\n  background: #6fc89c;\n}\n.log .page-con {\n  height: 588px;\n}\n.log .container {\n  background-color: #ffffff;\n  border-left: 1px dashed #e5e5e5;\n  border-right: 1px dashed #e5e5e5;\n}\n.log .btn {\n  position: relative;\n}\n.log .m-box {\n  height: auto;\n  background: #fff;\n  z-index: 9999;\n  border: solid 1px #ddd;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.log .m-box .msg-pop-close {\n  right: 12px;\n  top: 12px;\n  position: absolute;\n}\n.log .m-box h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.log .m-box em {\n  position: absolute;\n  right: 24px;\n  top: 45px;\n}\n.log .m-box p {\n  width: 85%;\n  color: #333333;\n}\n.log .m-box .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.log .m-box .r {\n  text-align: right;\n}\n.log .m-box .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.log .m-box .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _AppCenterHeader = __webpack_require__(170);
	
	var _AppCenterHeader2 = _interopRequireDefault(_AppCenterHeader);
	
	var _LogCash = __webpack_require__(232);
	
	var _LogCash2 = _interopRequireDefault(_LogCash);
	
	var _LogRecharge = __webpack_require__(237);
	
	var _LogRecharge2 = _interopRequireDefault(_LogRecharge);
	
	var _LogProducts = __webpack_require__(242);
	
	var _LogProducts2 = _interopRequireDefault(_LogProducts);
	
	var _LogPromotion = __webpack_require__(247);
	
	var _LogPromotion2 = _interopRequireDefault(_LogPromotion);
	
	var _LogSales = __webpack_require__(252);
	
	var _LogSales2 = _interopRequireDefault(_LogSales);
	
	var _request = __webpack_require__(15);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "log",
	    data: function data() {
	        return {
	            title: "日记",
	            back: { "label": "返回", "url": "/index", "show": true },
	            next: { "label": "打印", "url": "/print", "show": false },
	            message: '',
	            listType: null
	        };
	    },
	
	    components: {
	        AppCenterHeader: _AppCenterHeader2.default,
	        LogCash: _LogCash2.default,
	        LogRecharge: _LogRecharge2.default,
	        LogSales: _LogSales2.default,
	        LogProducts: _LogProducts2.default,
	        LogPromotion: _LogPromotion2.default
	    },
	    watch: {
	        '$route': 'fetchType'
	    },
	    created: function created() {
	        this.fetchType();
	    },
	
	    methods: {
	        fetchType: function fetchType() {
	            this.listType = this.$route.params.type;
	
	            if (this.listType == "cash") {
	                this.title = "现金记录";
	            }
	
	            if (this.listType == "recharge") {
	                this.title = "充值记录";
	            }
	
	            if (this.listType == "sales") {
	                this.title = "销售记录";
	            }
	
	            if (this.listType == "promotion") {
	                this.title = "促销记录";
	            }
	
	            if (this.listType == "products") {
	
	                this.title = "销售商品报表";
	                this.back = { "label": "返回", "url": "/index", "show": true };
	                this.next = { "label": "导出", "url": "#export", "show": true, "cb": this.exportProducts };
	            }
	        },
	        exportProducts: function exportProducts() {
	
	            this.$store.dispatch("exportProducts").then(function (res) {
	                window.open(res);
	            });
	        }
	    }
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(233)
	__vue_script__ = __webpack_require__(235)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogCash.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(236)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3679c2de/LogCash.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(234);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogCash.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogCash.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".log-cash {\n  position: relative;\n}\n.log-cash .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-cash .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-cash .list-row span:first-child {\n  width: 40%;\n}\n.log-cash .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-cash .list-body {\n  height: 520px;\n}\n.log-cash .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-cash .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-cash .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #333333;\n}\n.log-cash .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-cash .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-cash .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-cash .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-cash .list-body .list-row .c .col:last-child {\n  color: #e84593;\n  font-size: 24px;\n}\n.log-cash .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-cash .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-cash .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogCash.vue"],"names":[],"mappings":"AAAA;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;GACZ,QAAS;CACV;AACD;EACE,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,YAAY;EACZ,iBAAiB;CAClB;AACD;EACE,aAAa;EACb,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;CACrB","file":"LogCash.vue","sourcesContent":[".log-cash {\n  position: relative;\n}\n.log-cash .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-cash .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-cash .list-row span:first-child {\n  width: 40%;\n}\n.log-cash .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-cash .list-body {\n  height: 520px;\n}\n.log-cash .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-cash .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-cash .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-cash .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #333333;\n}\n.log-cash .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-cash .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-cash .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-cash .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-cash .list-body .list-row .c .col:last-child {\n  color: #e84593;\n  font-size: 24px;\n}\n.log-cash .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-cash .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-cash .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-cash .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "logCash",
	    data: function data() {
	
	        return {
	            listData: {},
	            shiftInfo: {},
	            pageNum: 1 };
	    },
	
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    computed: {
	        totalCash: function totalCash() {
	            var sum = 0;
	            var arr = this.listData.list;
	            if (arr.length > 0) {
	                arr.forEach(function (ele, index) {
	
	                    sum += Number(ele.amountPaid);
	                });
	            } else {}
	            return sum;
	        }
	    },
	    components: {
	        Pagination: _Pagination2.default
	    },
	    created: function created() {
	
	        this.fetchList();
	    },
	
	    methods: {
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	        },
	        fetchList: function fetchList() {
	            var _this = this;
	
	            this.$store.dispatch('fetchLog', { "type": "cash", "pageNum": this.pageNum }).then(function (res) {
	
	                _this.listData = res.page;
	                _this.shiftInfo = res.appShiftInfo;
	                console.log(_this.shiftInfo);
	            });
	        }
	    }
	};

/***/ },
/* 236 */
/***/ function(module, exports) {

	module.exports = "\n   \t  <div class=\"log-cash container\">\n\t\t  <div class=\"row\">\n\t\t\t  <div class=\"col-xs-12\">\n\t\t\t\t  <div class=\"list-header\">\n\t\t\t\t\t  <div class=\"list-row\">\n\t\t\t\t\t\t  <span>订单信息</span>\n\t\t\t\t\t\t  <span>单价/数量</span>\n\t\t\t\t\t\t  <span>买家</span>\n\t\t\t\t\t\t  <span>实付金额</span>\n\t\t\t\t\t  </div>\n\t\t\t\t  </div>\n\t\t\t  </div>\n\t\t  </div>\n\t\t  <div class=\"row\">\n\t\t\t  <div class=\"col-xs-12\">\n\t\t\t\t  <div class=\"list-body\" v-if=\"!listData.list\">\n\t\t\t\t\t  加载中...\n                  </div>\n\t\t\t\t  <div class=\"list-body\" v-else-if=\"listData.list.length==0\">\n\t\t\t\t\t  <div class=\"no-list\"></div>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"list-body\" v-else>\n\t\t\t\t\t  <!--list-->\n\t\t\t\t\t  <div class=\"list-row\" v-for=\"(item,index) in listData.list\">\n\t\t\t\t\t\t  <div class=\"t\">\n\t\t\t\t\t\t\t  <span>订单号： {{item.sn}} x  {{item.paymentMethod}}</span><span>{{item.createDate}}</span>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t  <div class=\"c\">\n\t\t\t\t\t\t\t  <dl class=\"col\">\n\t\t\t\t\t\t\t\t  <dd  v-for=\"item2 in item.items\" :class=\"{'single':item.items.length==1}\">{{item2.name}}</dd>\n\t\t\t\t\t\t\t  </dl>\n\t\t\t\t\t\t\t  <dl class=\"col\">\n\t\t\t\t\t\t\t\t  <dd  v-for=\"item2 in item.items\" :class=\"{'single':item.items.length==1}\">\n\t\t\t\t\t\t\t\t\t  {{item2.price | currency}} x {{item2.quantity}}\n\t\t\t\t\t\t\t\t\t\t</dd>\n\t\t\t\t\t\t\t  </dl>\n\t\t\t\t\t\t\t  <span class=\"col\">{{item.username}}</span>\n\t\t\t\t\t\t\t  <span class=\"col\">{{item.amountPaid | currency}}</span>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t  </div>\n\n\t\t\t\t  </div>\n\t\t\t  </div>\n\t\t  </div>\n\t\t  <div class=\"row\">\n\t\t\t  <div class=\"col-xs-12\">\n\t\t\t\t  <pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n\t\t\t\t  <!--listData-->\n\t\t\t  </div>\n\t\t  </div>\n\t\t  <div class=\"row list-footer\">\n\t\t\t  <div class=\"col-xs-12\">\n\t\t\t\t  总现在收入<span>{{totalCash | currency }}</span>元\n\t\t\t\t</div>\n\t\t  </div>\n\n      </div>\n";

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(238)
	__vue_script__ = __webpack_require__(240)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogRecharge.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(241)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-54db6ad2/LogRecharge.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(239);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogRecharge.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogRecharge.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".log-recharge {\n  position: relative;\n}\n.log-recharge .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-recharge .list-row span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n}\n.log-recharge .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-recharge .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-recharge .list-body {\n  height: 520px;\n}\n.log-recharge .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  line-height: 100px;\n  font-size: 20px;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  color: #808080;\n  border-radius: 5px;\n  clear: both;\n}\n.log-recharge .list-body .list-row span:nth-child(3) {\n  color: #e84593;\n  font-size: 28px;\n}\n.log-recharge .list-body .list-row span:nth-child(4) {\n  color: #999999;\n}\n.log-recharge .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-recharge .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogRecharge.vue"],"names":[],"mappings":"AAAA;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,eAAe;CAChB;AACD;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;CACrB","file":"LogRecharge.vue","sourcesContent":[".log-recharge {\n  position: relative;\n}\n.log-recharge .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-recharge .list-row span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n}\n.log-recharge .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-recharge .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-recharge .list-body {\n  height: 520px;\n}\n.log-recharge .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  line-height: 100px;\n  font-size: 20px;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  color: #808080;\n  border-radius: 5px;\n  clear: both;\n}\n.log-recharge .list-body .list-row span:nth-child(3) {\n  color: #e84593;\n  font-size: 28px;\n}\n.log-recharge .list-body .list-row span:nth-child(4) {\n  color: #999999;\n}\n.log-recharge .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-recharge .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "log",
	    data: function data() {
	
	        return {
	            listData: {},
	            shiftInfo: {},
	            pageNum: 1 };
	    },
	
	    components: {
	        Pagination: _Pagination2.default
	    },
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    computed: {
	        totalCash: function totalCash() {
	            var sum = 0;
	            this.listData.list.forEach(function (ele, index) {
	
	                sum += Number(ele.amountPaid);
	            });
	            return sum;
	        }
	    },
	    created: function created() {
	        this.fetchList();
	    },
	
	    methods: {
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	            window.scrollTo(0, 0);
	        },
	        fetchList: function fetchList() {
	            var _this = this;
	
	            this.$store.dispatch('fetchLog', { "type": "recharge", "pageNum": this.pageNum }).then(function (res) {
	                _this.listData = res.page;
	                _this.shiftInfo = res.appShiftInfo;
	
	                console.log(_this.shiftInfo);
	            });
	        }
	    }
	};

/***/ },
/* 241 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"log-recharge container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t<div class=\"list-header\">\n\t\t\t\t\t<div class=\"list-row\">\n\t\t\t\t\t\t<span>会员</span>\n\t\t\t\t\t\t<span>支付方式</span>\n\t\t\t\t\t\t<span>充值金额</span>\n\t\t\t\t\t\t<span>充值时间</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t<div class=\"list-body\" v-if=\"!listData.list\">\n\t\t\t\t\t加载中...\n                </div>\n\t\t\t\t<div class=\"list-body\" v-else-if=\"listData.list.length==0\">\n\t\t\t\t\t<div class=\"no-list\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"list-body\" v-else>\n\t\t\t\t\t<!--list-->\n\t\t\t\t\t<div class=\"list-row\"  v-for=\"(item,index) in listData.list\">\n\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t<span>{{item.username}}</span>\n\t\t\t\t\t\t\t<span>{{item.paymentMethod}}</span>\n\t\t\t\t\t\t\t<span>{{item.amount | currency }}</span>\n\t\t\t\t\t\t\t<span>{{item.date}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t<pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n\t\t\t\t<!--listData-->\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row list-footer\" v-if=\"shiftInfo.totalRecharge\">\n\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t总充值<span>{{shiftInfo.totalRecharge | currency }}</span>元\n\t\t\t</div>\n\t\t</div>\n\t</div>\n";

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(243)
	__vue_script__ = __webpack_require__(245)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogProducts.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(246)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1283170f/LogProducts.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(244);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogProducts.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogProducts.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".no-list {\n  width: 100%;\n  height: 600px;\n  background: url(/images/no_list.jpg) no-repeat 50% 0%;\n}\n.log-products {\n  position: relative;\n}\n.log-products .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-products .list-row span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n}\n.log-products .list-row span:first-child {\n  width: 50%;\n}\n.log-products .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-products .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-products .list-body {\n  height: 520px;\n}\n.log-products .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-products .list-body .list-row .t {\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n}\n.log-products .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 100px;\n}\n.log-products .list-body .list-row .c span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n  color: #808080;\n}\n.log-products .list-body .list-row .c span:first-child {\n  width: 50%;\n  color: #333333;\n  text-align: left;\n}\n.log-products .list-body .list-row .c span:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-products .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-products .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-products .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-products .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogProducts.vue"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,cAAc;EACd,sDAAsD;CACvD;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,+BAA+B;EAC/B,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,WAAW;EACX,eAAe;EACf,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;CACrB","file":"LogProducts.vue","sourcesContent":[".no-list {\n  width: 100%;\n  height: 600px;\n  background: url(/images/no_list.jpg) no-repeat 50% 0%;\n}\n.log-products {\n  position: relative;\n}\n.log-products .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-products .list-row span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n}\n.log-products .list-row span:first-child {\n  width: 50%;\n}\n.log-products .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-products .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-products .list-body {\n  height: 520px;\n}\n.log-products .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-products .list-body .list-row .t {\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n}\n.log-products .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 100px;\n}\n.log-products .list-body .list-row .c span {\n  display: block;\n  width: 25%;\n  float: left;\n  text-align: center;\n  color: #808080;\n}\n.log-products .list-body .list-row .c span:first-child {\n  width: 50%;\n  color: #333333;\n  text-align: left;\n}\n.log-products .list-body .list-row .c span:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-products .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-products .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-products .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-products .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "logProducts",
	    data: function data() {
	        return {
	            listData: {},
	            pageNum: 1 };
	    },
	
	    components: {
	        Pagination: _Pagination2.default
	    },
	    created: function created() {
	        this.fetchList();
	    },
	
	    methods: {
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	            window.scrollTo(0, 0);
	        },
	        fetchList: function fetchList() {
	            var _this = this;
	
	            this.$store.dispatch('fetchShiftList', { "pageNum": this.pageNum }).then(function (res) {
	                _this.listData = res.page;
	            });
	        }
	    }
	};

/***/ },
/* 246 */
/***/ function(module, exports) {

	module.exports = "\n   \t  <div class=\"log-products container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<div class=\"list-header\">\n\t\t\t\t\t\t<div class=\"list-row\">\n\t\t\t\t\t\t\t<span>商品</span>\n\t\t\t\t\t\t\t<span>数量</span>\n\t\t\t\t\t\t\t<span>条码</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t  <div class=\"col-xs-12\">\n\t\t\t\t\t  <div class=\"list-body\" v-if=\"!listData.list\">\n\t\t\t\t\t\t  加载中...\n\t\t\t\t\t  </div>\n\t\t\t\t\t  <div class=\"list-body\" v-else-if=\"listData.list.length==0\">\n\t\t\t\t\t\t \t<div class=\"no-list\"></div>\n\t\t\t\t\t  </div>\n\t\t\t\t\t  <div class=\"list-body\" v-else>\n\t\t\t\t\t\t  <!--list-->\n\t\t\t\t\t\t  <div class=\"list-row\" v-for=\"(item,index) in listData.list\">\n\t\t\t\t\t\t\t  \t<div class=\"t\">\n\t\t\t\t\t\t\t\t\t订单号： {{item.sn}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t  \t<div class=\"c\">\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t<img :src=\"item.image\"/>\n\t\t\t\t\t\t\t\t\t\t<em>{{item.name}}</em>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>{{item.quantity}}件</span>\n\t\t\t\t\t\t\t\t\t<span>{{item.barcode}}</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t  </div>\n\n\t\t\t\t\t  </div>\n\t\t\t\t  </div>\n\t\t\t</div>\n\t\t  \t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t  <div class=\"row list-footer\">\n\n\t\t  </div>\n      </div>\n";

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(248)
	__vue_script__ = __webpack_require__(250)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogPromotion.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(251)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-110939f0/LogPromotion.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(249);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogPromotion.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogPromotion.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".log-promotion {\n  position: relative;\n}\n.log-promotion .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-promotion .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-promotion .list-row span:first-child {\n  width: 40%;\n}\n.log-promotion .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-promotion .list-body {\n  height: 520px;\n}\n.log-promotion .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-promotion .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-promotion .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #808080;\n}\n.log-promotion .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-promotion .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-promotion .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-promotion .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-promotion .list-body .list-row .c .col:last-child {\n  color: #808080;\n  font-size: 24px;\n  position: relative;\n  top: -10px;\n}\n.log-promotion .list-body .list-row .c .col:last-child em {\n  position: absolute;\n  top: 25px;\n  font-size: 16px;\n  left: 0px;\n  width: 100%;\n  text-align: center;\n}\n.log-promotion .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-promotion .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-promotion .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogPromotion.vue"],"names":[],"mappings":"AAAA;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;GACZ,QAAS;CACV;AACD;EACE,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,YAAY;EACZ,iBAAiB;CAClB;AACD;EACE,aAAa;EACb,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,UAAU;EACV,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;CACrB","file":"LogPromotion.vue","sourcesContent":[".log-promotion {\n  position: relative;\n}\n.log-promotion .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-promotion .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-promotion .list-row span:first-child {\n  width: 40%;\n}\n.log-promotion .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-promotion .list-body {\n  height: 520px;\n}\n.log-promotion .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-promotion .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-promotion .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-promotion .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #808080;\n}\n.log-promotion .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-promotion .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-promotion .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-promotion .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-promotion .list-body .list-row .c .col:last-child {\n  color: #808080;\n  font-size: 24px;\n  position: relative;\n  top: -10px;\n}\n.log-promotion .list-body .list-row .c .col:last-child em {\n  position: absolute;\n  top: 25px;\n  font-size: 16px;\n  left: 0px;\n  width: 100%;\n  text-align: center;\n}\n.log-promotion .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-promotion .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-promotion .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-promotion .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "logSales",
	    data: function data() {
	
	        return {
	            listData: {},
	            shiftInfo: {},
	            pageNum: 1 };
	    },
	
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    components: {
	        Pagination: _Pagination2.default
	    },
	    created: function created() {
	        this.fetchList();
	    },
	
	    methods: {
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	        },
	        fetchList: function fetchList() {
	            var _this = this;
	
	            this.$store.dispatch('fetchLog', { "type": "promotion", "pageNum": this.pageNum }).then(function (res) {
	
	                _this.listData = res.page;
	
	                _this.shiftInfo = res.appShiftInfo;
	            });
	        }
	    }
	};

/***/ },
/* 251 */
/***/ function(module, exports) {

	module.exports = "\n   \t  <div class=\"log-promotion container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<div class=\"list-header\">\n\t\t\t\t\t\t<div class=\"list-row\">\n\t\t\t\t\t\t\t<span>订单信息</span>\n\t\t\t\t\t\t\t<span>顾客</span>\n\t\t\t\t\t\t\t<span>优惠券</span>\n\t\t\t\t\t\t\t<span>积分</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<div class=\"list-body\" v-if=\"!listData.list\">\n\t\t\t\t\t\t加载中...\n                    </div>\n\t\t\t\t\t<div class=\"list-body\" v-else-if=\"listData.list.length==0\">\n\t\t\t\t\t\t<div class=\"no-list\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"list-body\" v-else>\n\t\t\t\t\t\t<!--list-->\n\t\t\t\t\t\t<div class=\"list-row\" v-for=\"(item,index) in listData.list\">\n\t\t\t\t\t\t\t<div class=\"t\">\n\t\t\t\t\t\t\t\t<span>订单号： {{item.sn}}</span><span>{{item.createDate}}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"c\">\n\t\t\t\t\t\t\t\t<dl class=\"col\">\n\t\t\t\t\t\t\t\t\t<dd  v-for=\"item2 in item.items\" :class=\"{'single':item.items.length==1}\">{{item2}}</dd>\n\t\t\t\t\t\t\t\t</dl>\n\t\t\t\t\t\t\t\t<span class=\"col\">{{item.username}}</span>\n\t\t\t\t\t\t\t\t<span class=\"col\">{{item.couponName}} {{item.couponDiscount}}</span>\n\t\t\t\t\t\t\t\t<span class=\"col\">{{item.point}} <em>( 抵扣 {{item.pointDiscount | currency}} 元 )</em></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t  \t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n\t\t\t\t<!--listData-->\n\t\t\t\t</div>\n\t\t\t</div>\n\n      </div>\n";

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(253)
	__vue_script__ = __webpack_require__(255)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogSales.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(256)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-69470171/LogSales.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(254);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogSales.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogSales.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".log-sales {\n  position: relative;\n}\n.log-sales .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-sales .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-sales .list-row span:first-child {\n  width: 40%;\n}\n.log-sales .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-sales .list-body {\n  height: 520px;\n}\n.log-sales .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-sales .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-sales .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #333333;\n}\n.log-sales .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-sales .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-sales .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-sales .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-sales .list-body .list-row .c .col:last-child {\n  color: #e84593;\n  font-size: 24px;\n}\n.log-sales .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-sales .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-sales .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogSales.vue"],"names":[],"mappings":"AAAA;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;GACZ,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;CACpB;AACD;EACE,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;GACZ,QAAS;CACV;AACD;EACE,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,YAAY;EACZ,iBAAiB;CAClB;AACD;EACE,aAAa;EACb,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;GAClB,QAAS;CACV;AACD;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,UAAU;CACX;AACD;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,+BAA+B;EAC/B,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;CACrB","file":"LogSales.vue","sourcesContent":[".log-sales {\n  position: relative;\n}\n.log-sales .list-row {\n  clear: both;\n  *zoom: 1;\n}\n.log-sales .list-row span {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n}\n.log-sales .list-row span:first-child {\n  width: 40%;\n}\n.log-sales .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-header .list-row {\n  line-height: 50px;\n  font-size: 18px;\n}\n.log-sales .list-body {\n  height: 520px;\n}\n.log-sales .list-body .list-row {\n  border: solid 1px #e5e5e5;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border-radius: 5px;\n  clear: both;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .t {\n  background: #f7f7f7;\n  color: #808080;\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  line-height: 40px;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .t span:first-child {\n  float: left;\n  text-align: left;\n}\n.log-sales .list-body .list-row .t span:last-child {\n  float: right;\n  text-align: right;\n}\n.log-sales .list-body .list-row .t:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-body .list-row .c {\n  padding-left: 12px;\n  padding-right: 12px;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  line-height: 60px;\n  *zoom: 1;\n}\n.log-sales .list-body .list-row .c .col {\n  display: block;\n  width: 20%;\n  float: left;\n  text-align: center;\n  color: #333333;\n}\n.log-sales .list-body .list-row .c .col dd {\n  line-height: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-sales .list-body .list-row .c .col dd.single {\n  line-height: 60px;\n}\n.log-sales .list-body .list-row .c .col:first-child {\n  width: 40%;\n  text-align: left;\n}\n.log-sales .list-body .list-row .c .col:first-child em {\n  margin-left: 12px;\n  display: inline-block;\n  width: 75%;\n  height: 60px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.log-sales .list-body .list-row .c .col:last-child {\n  color: #e84593;\n  font-size: 24px;\n}\n.log-sales .list-body .list-row .c img {\n  width: 60px;\n  height: 60px;\n  display: inline-block;\n}\n.log-sales .list-body .list-row .c:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-body .list-row:after {\n  visibility: hidden;\n  display: block;\n  font-size: 0;\n  content: \" \";\n  clear: both;\n  height: 0;\n}\n.log-sales .list-footer {\n  height: 90px;\n  width: 100%;\n  line-height: 90px;\n  text-align: center;\n  color: #e84593;\n  font-size: 16px;\n  border-top: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.log-sales .list-footer span {\n  font-size: 36px;\n  padding-left: 12px;\n  padding-right: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Pagination = __webpack_require__(153);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "logSales",
	    data: function data() {
	
	        return {
	            listData: {},
	            shiftInfo: {},
	            pageNum: 1 };
	    },
	
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    components: {
	        Pagination: _Pagination2.default
	    },
	    created: function created() {
	        this.fetchList();
	    },
	
	    methods: {
	        goCallback: function goCallback(pageIndex) {
	            this.pageNum = pageIndex;
	            this.fetchList();
	        },
	        fetchList: function fetchList() {
	            var _this = this;
	
	            this.$store.dispatch('fetchLog', { "type": "sales", "pageNum": this.pageNum }).then(function (res) {
	                _this.listData = res.page;
	                _this.shiftInfo = res.appShiftInfo;
	            });
	        }
	    }
	};

/***/ },
/* 256 */
/***/ function(module, exports) {

	module.exports = "\n   \t  <div class=\"log-sales container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<div class=\"list-header\">\n\t\t\t\t\t\t<div class=\"list-row\">\n\t\t\t\t\t\t\t<span>订单信息</span>\n\t\t\t\t\t\t\t<span>单价/数量</span>\n\t\t\t\t\t\t\t<span>买家</span>\n\t\t\t\t\t\t\t<span>实付金额</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<div class=\"list-body\" v-if=\"!listData.list\">\n\t\t\t\t\t\t加载中...\n                    </div>\n\t\t\t\t\t<div class=\"list-body\" v-else-if=\"listData.list.length==0\">\n\t\t\t\t\t\t<div class=\"no-list\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"list-body\" v-else>\n\t\t\t\t\t\t<!--list-->\n\t\t\t\t\t\t<div class=\"list-row\" v-for=\"(item,index) in listData.list\">\n\t\t\t\t\t\t\t<div class=\"t\">\n\t\t\t\t\t\t\t\t<span>订单号： {{item.sn}} x  {{item.paymentMethod}}</span><span>{{item.createDate}}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"c\">\n\t\t\t\t\t\t\t\t\t<dl class=\"col\">\n\t\t\t\t\t\t\t\t\t\t<dd  v-for=\"item2 in item.items\" :class=\"{'single':item.items.length==1}\">{{item2.name}}</dd>\n\t\t\t\t\t\t\t\t\t</dl>\n\t\t\t\t\t\t\t\t\t<dl class=\"col\">\n\t\t\t\t\t\t\t\t\t\t<dd  v-for=\"item2 in item.items\" :class=\"{'single':item.items.length==1}\">\n\t\t\t\t\t\t\t\t\t\t\t{{item2.price}} x {{item2.quantity}}\n\t\t\t\t\t\t\t\t\t\t</dd>\n\t\t\t\t\t\t\t\t\t</dl>\n\t\t\t\t\t\t\t\t\t<span class=\"col\">{{item.username}}</span>\n\t\t\t\t\t\t\t\t\t<span class=\"col\">{{item.amountPaid}}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t  \t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t<pagination :page=\"listData\" :go-callback=\"goCallback\"></pagination>\n\t\t\t\t<!--listData-->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t  <div class=\"row list-footer\" v-if=\"shiftInfo.totalSales\">\n\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t总销售额<span>{{shiftInfo.totalSales | currency }}</span>元\n\t\t\t\t</div>\n\t\t  </div>\n      </div>\n";

/***/ },
/* 257 */
/***/ function(module, exports) {

	module.exports = "\n\t  <div class=\"log\">\n     <app-center-header  :title=\"title\" :back=\"back\" :next=\"next\" mode=\"mode\"></app-center-header>\n     <div class=\"log-body\">\n\n           <div v-if=\"!listType\">没有记录</div>\n           <log-cash v-if=\"listType=='cash'\"></log-cash>\n           <log-sales v-if=\"listType=='sales'\"></log-sales>\n           <log-recharge v-if=\"listType=='recharge'\"></log-recharge>\n           <log-products v-if=\"listType=='products'\"></log-products>\n           <log-promotion v-if=\"listType=='promotion'\"></log-promotion>\n\n     </div>\n </div>\n\n";

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(259)
	__vue_script__ = __webpack_require__(261)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\views\\NoPage.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(262)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1d5d45c3/NoPage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(260);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./NoPage.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js!../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./NoPage.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"NoPage.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 261 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    compiled: function compiled() {},
	    ready: function ready() {},
	
	    computed: {
	        listData: function listData() {
	            return [];
	        }
	    },
	    methods: {
	        filterList: function filterList(id) {
	
	            this.cartData.index = index;
	        }
	    }
	};

/***/ },
/* 262 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"content\">\n        404\n</div>\n";

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(16);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _assign = __webpack_require__(99);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(264);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _request = __webpack_require__(15);
	
	var _rsa = __webpack_require__(90);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _router = __webpack_require__(82);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	//vue 定义全局变量
	var store = new _vuex2.default.Store({
	    //共有数据
	    state: {
	        login: false, //=>accessToken
	        waiting: false,
	        shopCount: 1,
	        headIndex: 0,
	        shopData: {
	            "name": "",
	            "adminName": ""
	        },
	        msgTimer: null, //监听消息
	        msgData: {
	            appUnconfirmList: [],
	            msgNum: 0
	        },
	        member: {
	            shopName: ''
	        },
	        itemData: {
	            appProductDetail: {},
	            appSpecifications: []
	        },
	        localList: [], //本地数据集合
	        pageList: [], //内存数据集合
	
	        //子类数据
	        currentPage: { //当前数据节点
	            index: 0,
	            mode: "index"
	        }
	    },
	    // 变量赋值
	    mutations: {
	        setLoading: function setLoading(state, data) {
	            state.loading = data;
	        },
	        setShopData: function setShopData(state, data) {
	            (0, _assign2.default)(state.shopData, data);
	        },
	        setMsgData: function setMsgData(state, data) {
	            state.msgData.appUnconfirmList = state.msgData.appUnconfirmList.concat(data.appUnconfirmList);
	            state.msgData.msgNum = data.msgNum;
	        },
	        setMode: function setMode(state, data) {
	            state.currentPage.mode = data;
	        },
	        setPageData: function setPageData(state, data) {
	            state.currentPage.pageData = data; //存在内存
	        },
	        setItemData: function setItemData(state, data) {
	            state.itemData = data;
	        },
	        setCategoryData: function setCategoryData(state, data) {
	            state.categoryData = data;
	        },
	        setProductParams: function setProductParams(state, data) {
	            (0, _assign2.default)(state.currentPage.list, data);
	        },
	        setOrderParams: function setOrderParams(state, data) {
	            (0, _assign2.default)(state.currentPage.orderParams, data);
	        },
	        setOrderData: function setOrderData(state, data) {
	            state.currentPage.orderData = data;
	        },
	        setPrintData: function setPrintData(state, data) {
	            state.currentPage.printData = data;
	        },
	        setCustomData: function setCustomData(state, data) {
	            state.currentPage.customData = data;
	            state.currentPage.orderParams.memberId = data.id;
	        },
	        setShopAdminData: function setShopAdminData(state, data) {
	            state.currentPage.shopAdminData = data;
	        },
	        setLogData: function setLogData(state, data) {
	            state.currentPage.logData = data;
	        },
	        setPageList: function setPageList(state, data) {
	            state.pageList = data;
	            state.currentPage = state.pageList[state.pageList.length - 1];
	        },
	
	        // 全局waiting
	        show_waiting: function show_waiting(state) {
	            state.waiting = true;
	        },
	        hide_waiting: function hide_waiting(state) {
	            state.waiting = false;
	        },
	
	        // 列表waiting
	        set_list_waiting: function set_list_waiting(state, value) {
	            state.currentPage.listLoading = value;
	        },
	        getLocalList: function getLocalList(state) {
	            var lastData = _util2.default.pullLocal('lastData');
	            if (lastData) {
	                state.localList = lastData.list;
	                state.headIndex = lastData.index;
	                state.shopCount = lastData.count;
	            }
	        },
	        setLocalList: function setLocalList(state, value) {
	            state.localList = value;
	            var data = {
	                'index': state.headIndex,
	                'count': state.shopCount,
	                'list': state.localList
	            };
	            _util2.default.pushLocal('lastData', data);
	        }
	    },
	    actions: {
	        //获得公有秘钥
	        getPublicKey: function getPublicKey(_ref) {
	            var commit = _ref.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.public_key
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    if (res.code == "20000") {
	                        resolve(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res); //这里可以尝试扩展备用接口
	                });
	            });
	        },
	        addSpareCash: function addSpareCash(_ref2, value) {
	            var dispatch = _ref2.dispatch,
	                commit = _ref2.commit;
	
	            return dispatch('getPublicKey').then(function (res) {
	                var publicKey = res.data;
	                var rsaKey = new _rsa.RSAKey();
	                rsaKey.setPublic((0, _rsa.b64tohex)(publicKey.modulus), (0, _rsa.b64tohex)(publicKey.exponent));
	                var enPwd = (0, _rsa.hex2b64)(rsaKey.encrypt(value.password));
	
	                var apiObj = {
	                    url: _request.API_URLS.cashier_shift,
	                    data: {
	                        'enPasswd': enPwd,
	                        'tmpKey': publicKey.tmpKey,
	                        'spareCash': value.spareCash
	                    }
	                };
	
	                return new _promise2.default(function (resolve, reject) {
	
	                    _request.request.fnPost2(apiObj).then(function (res) {
	                        //成功
	                        if (res.code == "20000") {
	                            commit("hide_waiting");
	
	                            resolve(res);
	                        } else {
	                            commit("hide_waiting");
	                            reject(res);
	                        }
	                    }).catch(function (res) {
	                        //失败
	                        commit("hide_waiting");
	                        reject(res); //这里可以尝试扩展备用接口
	                    });
	                });
	            });
	        },
	
	        //退出
	        logout: function logout(_ref3, value) {
	            var commit = _ref3.commit,
	                state = _ref3.state;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.log_out
	            };
	            return new _promise2.default(function (resolve, reject) {
	                window.localStorage.setItem('currentShiftId', value);
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    if (res.code == "20000") {
	                        state.login = false; //清除accesstoken;
	                        clearInterval(state.msgTimer);
	                        _router2.default.replace('/login');
	                        state.headIndex = 1;
	                        state.currentPage = {}, state.pageList = [];
	                        //state.localList=[];
	                        commit("setLocalList", []);
	                        commit('setShopData', {});
	
	                        _util2.default.delLocal("accessToken");
	                        _util2.default.delLocal("shopData");
	                        commit("hide_waiting");
	                        resolve(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	        loadLastData: function loadLastData(_ref4) {
	            var commit = _ref4.commit,
	                state = _ref4.state,
	                dispatch = _ref4.dispatch;
	
	            commit("show_waiting");
	            //先获取本地商品记录
	            commit("getLocalList");
	            if (state.localList && state.localList.length) {
	                commit("setPageList", state.localList);
	            }
	            //如果本地没有
	            if (!state.pageList || !state.pageList.length) {
	                dispatch('initPage');
	            }
	            commit("hide_waiting");
	        },
	
	        //头部添加
	        initPage: function initPage(_ref5) {
	            var state = _ref5.state,
	                dispatch = _ref5.dispatch;
	
	            state.pageList = [];
	            state.shopCount = 0;
	            state.headIndex = 0;
	            dispatch("addPage");
	        },
	        addPage: function addPage(_ref6, value) {
	            var state = _ref6.state,
	                commit = _ref6.commit,
	                dispatch = _ref6.dispatch;
	
	            commit("show_waiting");
	            state.shopCount++;
	            state.pageList.push(defaultPage(state.shopCount));
	            state.headIndex = state.pageList.length - 1;
	            state.currentPage = state.pageList[state.headIndex];
	            dispatch("fetchList");
	            commit('setLocalList', state.pageList); //存储本地
	            commit("hide_waiting");
	        },
	        switchPage: function switchPage(_ref7, index) {
	            var state = _ref7.state,
	                commit = _ref7.commit;
	
	            console.log("switch");
	            if (state.headIndex == index) {
	                return;
	            }
	            state.headIndex = index;
	            state.currentPage = state.pageList[index];
	
	            commit('setLocalList', state.pageList); //存储本地
	        },
	        removePage: function removePage(_ref8, value) {
	            var state = _ref8.state,
	                commit = _ref8.commit,
	                dispatch = _ref8.dispatch;
	
	            commit("show_waiting");
	            if (state.pageList.length == 1) {
	                state.pageList.splice(state.headIndex, 1);
	                dispatch("addPage");
	                commit("hide_waiting");
	            } else {
	                //console.log(state.pageList);
	                state.pageList.splice(state.headIndex, 1);
	                var tempIndex = state.headIndex - 1 > 0 ? state.headIndex - 1 : 0;
	                state.headIndex = tempIndex;
	                state.currentPage = state.pageList[state.headIndex];
	                commit("hide_waiting");
	            }
	            commit('setLocalList', state.pageList); //存储本地
	        },
	
	        //刷新订单
	        fetchOrder: function fetchOrder(_ref9) {
	            var state = _ref9.state,
	                commit = _ref9.commit,
	                dispatch = _ref9.dispatch;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.b2b_orders + "/build",
	                data: state.currentPage.orderParams
	            };
	            var oldOrderData = state.currentPage.orderData;
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnPost2(apiObj).then(function (res) {
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        //新数据
	                        commit("setOrderData", res.appOrderConfirmBean);
	                        resolve(res);
	                    } else {
	                        //旧数据
	                        commit("setOrderData", oldOrderData);
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //获取商品列表
	        fetchList: function fetchList(_ref10, value) {
	            var commit = _ref10.commit,
	                state = _ref10.state;
	
	            if (value) {
	                var oldPageData = state.currentPage.pageData;
	                commit("setProductParams", value);
	                commit("setPageData", {});
	            }
	
	            var apiObj = {
	                url: _request.API_URLS.products,
	                data: {
	                    'categoryId': state.currentPage.list.categoryId,
	                    'brandId': state.currentPage.list.brandId,
	                    'pageNum': state.currentPage.list.pageNum,
	                    'keyword': state.currentPage.list.searchStr
	                }
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                commit("set_list_waiting", true);
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("set_list_waiting", false);
	                    if (res.code == "20000") {
	                        //新数据
	                        commit("setPageData", res.page);
	                        resolve(res);
	                    } else {
	                        //旧数据
	                        commit("setPageData", oldPageData);
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("set_list_waiting", false);
	                    reject(res);
	                });
	            });
	        },
	
	        //获取商品详情
	        fetchItem: function fetchItem(_ref11, pid) {
	            var commit = _ref11.commit,
	                state = _ref11.state;
	
	            commit("set_list_waiting", true);
	            var apiObj = {
	                url: _request.API_URLS.products + "/" + pid
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("set_list_waiting", false);
	                    if (res.code == "20000") {
	                        commit("setItemData", res);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("set_list_waiting", false);
	                    reject(res);
	                });
	            });
	        },
	        //获取分类
	        fetchCategory: function fetchCategory(_ref12, value) {
	            var commit = _ref12.commit,
	                state = _ref12.state;
	
	            commit("set_list_waiting", true);
	            var apiObj = {
	                url: _request.API_URLS.category,
	                data: { "productCategoryId": value }
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("set_list_waiting", false);
	                    if (res.code == "20000") {
	                        commit("setCategoryData", res.appProductCategories);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("set_list_waiting", false);
	                    reject(res);
	                });
	            });
	        },
	
	        //获取会员信息
	        fetchCustom: function fetchCustom(_ref13, value) {
	            var commit = _ref13.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.customers,
	                data: { username: value }
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res); //这里可以尝试扩展备用接口
	                });
	            });
	        },
	
	        //获取班次信息
	        fetchLog: function fetchLog(_ref14, value) {
	            var commit = _ref14.commit;
	
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.cashier_shift,
	                data: value
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        commit("setLogData", res.appShiftInfo);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //获取零售列表
	        fetchShiftList: function fetchShiftList(_ref15, value) {
	            var commit = _ref15.commit,
	                state = _ref15.state;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.cashier_shift + '/products',
	                data: value
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                commit("hide_waiting");
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    if (res.code == "20000") {
	                        commit("setLogData", res.page);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	        exportProducts: function exportProducts(_ref16, value) {
	            var commit = _ref16.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.HOST + _request.API_URLS.cashier_shift + '/products_export'
	            };
	            var accessToken = window.localStorage.getItem('accessToken');
	
	            return new _promise2.default(function (resolve, reject) {
	
	                var link = apiObj.url + "?accessToken=" + accessToken;
	
	                commit("hide_waiting");
	
	                if (link) {
	                    resolve(link);
	                }
	            });
	        },
	
	        //获取调拨门店列表
	        fetchAllocationList: function fetchAllocationList(_ref17, value) {
	            var commit = _ref17.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.products + '/allocation',
	                data: value
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //检测调拨信息()
	        addListenAllocation: function addListenAllocation(_ref18, value) {
	            var commit = _ref18.commit;
	
	            var apiObj = {
	                url: _request.API_URLS.products + '/allocation/unconfirm_list',
	                data: ''
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnPost2(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        commit("setMsgData", res);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //申请调拨
	        applyAllocation: function applyAllocation(_ref19, value) {
	            var commit = _ref19.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.products + '/' + value.id + '/allocation',
	                data: value
	            };
	
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnPost2(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	        createOrder: function createOrder(_ref20, value) {
	            var commit = _ref20.commit,
	                state = _ref20.state;
	
	
	            var apiObj = {
	                url: _request.API_URLS.b2b_orders + "/create",
	                data: state.currentPage.orderParams
	            };
	
	            commit("show_waiting");
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnPost2(apiObj).then(function (res) {
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        commit("setOrderData", res.appOrderConfirmBean);
	                        commit("setPrintData", res.appOrderConfirmBean);
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //批准调拨
	        approvalAllocation: function approvalAllocation(_ref21, value) {
	            var commit = _ref21.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.products + '/allocation',
	                data: value
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnPost2(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        },
	
	        //获取消息
	        fetchMsgList: function fetchMsgList(_ref22, value) {
	            var commit = _ref22.commit;
	
	            commit("show_waiting");
	            var apiObj = {
	                url: _request.API_URLS.products + '/allocation/msg',
	                data: value
	            };
	            return new _promise2.default(function (resolve, reject) {
	                _request.request.fnGet(apiObj).then(function (res) {
	                    //成功
	                    commit("hide_waiting");
	                    if (res.code == "20000") {
	                        resolve(res);
	                    } else {
	                        reject(res);
	                    }
	                }).catch(function (res) {
	                    //失败
	                    commit("hide_waiting");
	                    reject(res);
	                });
	            });
	        }
	    }
	});
	
	function defaultPage(title) {
	    //备注 这里的所有数据为临时状态 会存放本地存储 然后让头部选项卡切换时数据不丢失
	    return {
	        mode: "index", //状态模式
	        pageData: {}, //商品数据
	        itemData: { //商品详情数据
	            appProductDetail: {},
	            appSpecifications: []
	        },
	        orderParams: { //订单页面参数
	            cartParam: "",
	            couponCodeId: null,
	            usePoint: false,
	            useBalance: false,
	            memberId: null,
	            guiderId: null,
	            paymentMethodId: null, //支付方式
	            cash: 0, //找零
	            rmb: 0 //现金
	        },
	        orderData: {}, //订单数据
	        printData: {}, //打印数据
	        categoryData: [], //分类数据
	        list: { //商品列表参数
	            categoryId: "",
	            brandId: "",
	            searchStr: "",
	            pageNum: 1,
	            categoryName: "",
	            brandName: ""
	        },
	        listLoading: false, //等待
	        logData: { //日记数据
	            list: [],
	            pageNUm: 1
	        },
	        cartData: [], //购物车数据
	        customData: { //顾客数据
	            id: null,
	            nickname: '顾客',
	            username: null,
	            point: 0,
	            balance: 0,
	            appCoupons: [],
	            headPortrait: "http://aoupprod.oss-cn-beijing.aliyuncs.com/adminhead.png"
	        },
	        shopAdminData: {}, //导购员数据
	        pageIndex: 0, //头部索引
	        title: title, //头部名称
	        time: getTimeData() //时间戳
	    };
	}
	function getTimeData() {
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
	}
	
	function findNode(arr, index) {
	    var res = null;
	
	    if (index > 0) {
	        for (var i = index - 1; i >= 0; i--) {
	
	            if (arr[i]) {
	                res = arr[i];
	                break;
	            }
	        }
	    }
	
	    if (!res) {
	        if (index < arr.length - 1) {
	            for (var k = index + 1; k < arr.length; k++) {
	                if (arr[k]) {
	                    res = arr[k];
	                    break;
	                }
	            }
	        }
	    }
	    return res;
	}
	
	exports.default = store;

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vuex v2.2.1
	 * (c) 2017 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vuex = factory());
	}(this, (function () { 'use strict';
	
	var applyMixin = function (Vue) {
	  var version = Number(Vue.version.split('.')[0]);
	
	  if (version >= 2) {
	    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
	    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};
	
	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit;
	      _init.call(this, options);
	    };
	  }
	
	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */
	
	  function vuexInit () {
	    var options = this.$options;
	    // store injection
	    if (options.store) {
	      this.$store = options.store;
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store;
	    }
	  }
	};
	
	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }
	
	  store._devtoolHook = devtoolHook;
	
	  devtoolHook.emit('vuex:init', store);
	
	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState);
	  });
	
	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state);
	  });
	}
	
	/**
	 * Get the first item that pass the test
	 * by second argument function
	 *
	 * @param {Array} list
	 * @param {Function} f
	 * @return {*}
	 */
	/**
	 * Deep copy the given object considering circular structure.
	 * This function caches all nested objects and its copies.
	 * If it detects circular structure, use cached copy to avoid infinite loop.
	 *
	 * @param {*} obj
	 * @param {Array<Object>} cache
	 * @return {*}
	 */
	
	
	/**
	 * forEach for object
	 */
	function forEachValue (obj, fn) {
	  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
	}
	
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}
	
	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}
	
	var Module = function Module (rawModule, runtime) {
	  this.runtime = runtime;
	  this._children = Object.create(null);
	  this._rawModule = rawModule;
	};
	
	var prototypeAccessors$1 = { state: {},namespaced: {} };
	
	prototypeAccessors$1.state.get = function () {
	  return this._rawModule.state || {}
	};
	
	prototypeAccessors$1.namespaced.get = function () {
	  return !!this._rawModule.namespaced
	};
	
	Module.prototype.addChild = function addChild (key, module) {
	  this._children[key] = module;
	};
	
	Module.prototype.removeChild = function removeChild (key) {
	  delete this._children[key];
	};
	
	Module.prototype.getChild = function getChild (key) {
	  return this._children[key]
	};
	
	Module.prototype.update = function update (rawModule) {
	  this._rawModule.namespaced = rawModule.namespaced;
	  if (rawModule.actions) {
	    this._rawModule.actions = rawModule.actions;
	  }
	  if (rawModule.mutations) {
	    this._rawModule.mutations = rawModule.mutations;
	  }
	  if (rawModule.getters) {
	    this._rawModule.getters = rawModule.getters;
	  }
	};
	
	Module.prototype.forEachChild = function forEachChild (fn) {
	  forEachValue(this._children, fn);
	};
	
	Module.prototype.forEachGetter = function forEachGetter (fn) {
	  if (this._rawModule.getters) {
	    forEachValue(this._rawModule.getters, fn);
	  }
	};
	
	Module.prototype.forEachAction = function forEachAction (fn) {
	  if (this._rawModule.actions) {
	    forEachValue(this._rawModule.actions, fn);
	  }
	};
	
	Module.prototype.forEachMutation = function forEachMutation (fn) {
	  if (this._rawModule.mutations) {
	    forEachValue(this._rawModule.mutations, fn);
	  }
	};
	
	Object.defineProperties( Module.prototype, prototypeAccessors$1 );
	
	var ModuleCollection = function ModuleCollection (rawRootModule) {
	  var this$1 = this;
	
	  // register root module (Vuex.Store options)
	  this.root = new Module(rawRootModule, false);
	
	  // register all nested modules
	  if (rawRootModule.modules) {
	    forEachValue(rawRootModule.modules, function (rawModule, key) {
	      this$1.register([key], rawModule, false);
	    });
	  }
	};
	
	ModuleCollection.prototype.get = function get (path) {
	  return path.reduce(function (module, key) {
	    return module.getChild(key)
	  }, this.root)
	};
	
	ModuleCollection.prototype.getNamespace = function getNamespace (path) {
	  var module = this.root;
	  return path.reduce(function (namespace, key) {
	    module = module.getChild(key);
	    return namespace + (module.namespaced ? key + '/' : '')
	  }, '')
	};
	
	ModuleCollection.prototype.update = function update$1 (rawRootModule) {
	  update(this.root, rawRootModule);
	};
	
	ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
	    var this$1 = this;
	    if ( runtime === void 0 ) runtime = true;
	
	  var parent = this.get(path.slice(0, -1));
	  var newModule = new Module(rawModule, runtime);
	  parent.addChild(path[path.length - 1], newModule);
	
	  // register nested modules
	  if (rawModule.modules) {
	    forEachValue(rawModule.modules, function (rawChildModule, key) {
	      this$1.register(path.concat(key), rawChildModule, runtime);
	    });
	  }
	};
	
	ModuleCollection.prototype.unregister = function unregister (path) {
	  var parent = this.get(path.slice(0, -1));
	  var key = path[path.length - 1];
	  if (!parent.getChild(key).runtime) { return }
	
	  parent.removeChild(key);
	};
	
	function update (targetModule, newModule) {
	  // update target module
	  targetModule.update(newModule);
	
	  // update nested modules
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!targetModule.getChild(key)) {
	        console.warn(
	          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	          'manual reload is needed'
	        );
	        return
	      }
	      update(targetModule.getChild(key), newModule.modules[key]);
	    }
	  }
	}
	
	var Vue; // bind on install
	
	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};
	
	  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
	  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
	
	  var state = options.state; if ( state === void 0 ) state = {};
	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;
	
	  // store internal state
	  this._committing = false;
	  this._actions = Object.create(null);
	  this._mutations = Object.create(null);
	  this._wrappedGetters = Object.create(null);
	  this._modules = new ModuleCollection(options);
	  this._modulesNamespaceMap = Object.create(null);
	  this._subscribers = [];
	  this._watcherVM = new Vue();
	
	  // bind commit and dispatch to self
	  var store = this;
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	  };
	  this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	  };
	
	  // strict mode
	  this.strict = strict;
	
	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], this._modules.root);
	
	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state);
	
	  // apply plugins
	  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
	};
	
	var prototypeAccessors = { state: {} };
	
	prototypeAccessors.state.get = function () {
	  return this._vm._data.$$state
	};
	
	prototypeAccessors.state.set = function (v) {
	  assert(false, "Use store.replaceState() to explicit replace store state.");
	};
	
	Store.prototype.commit = function commit (_type, _payload, _options) {
	    var this$1 = this;
	
	  // check object-style commit
	  var ref = unifyObjectStyle(_type, _payload, _options);
	    var type = ref.type;
	    var payload = ref.payload;
	    var options = ref.options;
	
	  var mutation = { type: type, payload: payload };
	  var entry = this._mutations[type];
	  if (!entry) {
	    console.error(("[vuex] unknown mutation type: " + type));
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload);
	    });
	  });
	  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });
	
	  if (options && options.silent) {
	    console.warn(
	      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
	      'Use the filter functionality in the vue-devtools'
	    );
	  }
	};
	
	Store.prototype.dispatch = function dispatch (_type, _payload) {
	  // check object-style dispatch
	  var ref = unifyObjectStyle(_type, _payload);
	    var type = ref.type;
	    var payload = ref.payload;
	
	  var entry = this._actions[type];
	  if (!entry) {
	    console.error(("[vuex] unknown action type: " + type));
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};
	
	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers;
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn);
	  }
	  return function () {
	    var i = subs.indexOf(fn);
	    if (i > -1) {
	      subs.splice(i, 1);
	    }
	  }
	};
	
	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;
	
	  assert(typeof getter === 'function', "store.watch only accepts a function.");
	  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
	};
	
	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;
	
	  this._withCommit(function () {
	    this$1._vm._data.$$state = state;
	  });
	};
	
	Store.prototype.registerModule = function registerModule (path, rawModule) {
	  if (typeof path === 'string') { path = [path]; }
	  assert(Array.isArray(path), "module path must be a string or an Array.");
	  this._modules.register(path, rawModule);
	  installModule(this, this.state, path, this._modules.get(path));
	  // reset store to update getters...
	  resetStoreVM(this, this.state);
	};
	
	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;
	
	  if (typeof path === 'string') { path = [path]; }
	  assert(Array.isArray(path), "module path must be a string or an Array.");
	  this._modules.unregister(path);
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1));
	    Vue.delete(parentState, path[path.length - 1]);
	  });
	  resetStore(this);
	};
	
	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  this._modules.update(newOptions);
	  resetStore(this, true);
	};
	
	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing;
	  this._committing = true;
	  fn();
	  this._committing = committing;
	};
	
	Object.defineProperties( Store.prototype, prototypeAccessors );
	
	function resetStore (store, hot) {
	  store._actions = Object.create(null);
	  store._mutations = Object.create(null);
	  store._wrappedGetters = Object.create(null);
	  store._modulesNamespaceMap = Object.create(null);
	  var state = store.state;
	  // init all modules
	  installModule(store, state, [], store._modules.root, true);
	  // reset vm
	  resetStoreVM(store, state, hot);
	}
	
	function resetStoreVM (store, state, hot) {
	  var oldVm = store._vm;
	
	  // bind store public getters
	  store.getters = {};
	  var wrappedGetters = store._wrappedGetters;
	  var computed = {};
	  forEachValue(wrappedGetters, function (fn, key) {
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); };
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; },
	      enumerable: true // for local getters
	    });
	  });
	
	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent;
	  Vue.config.silent = true;
	  store._vm = new Vue({
	    data: {
	      $$state: state
	    },
	    computed: computed
	  });
	  Vue.config.silent = silent;
	
	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store);
	  }
	
	  if (oldVm) {
	    if (hot) {
	      // dispatch changes in all subscribed watchers
	      // to force getter re-evaluation for hot reloading.
	      store._withCommit(function () {
	        oldVm._data.$$state = null;
	      });
	    }
	    Vue.nextTick(function () { return oldVm.$destroy(); });
	  }
	}
	
	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length;
	  var namespace = store._modules.getNamespace(path);
	
	  // register in namespace map
	  if (namespace) {
	    store._modulesNamespaceMap[namespace] = module;
	  }
	
	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1));
	    var moduleName = path[path.length - 1];
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, module.state);
	    });
	  }
	
	  var local = module.context = makeLocalContext(store, namespace, path);
	
	  module.forEachMutation(function (mutation, key) {
	    var namespacedType = namespace + key;
	    registerMutation(store, namespacedType, mutation, local);
	  });
	
	  module.forEachAction(function (action, key) {
	    var namespacedType = namespace + key;
	    registerAction(store, namespacedType, action, local);
	  });
	
	  module.forEachGetter(function (getter, key) {
	    var namespacedType = namespace + key;
	    registerGetter(store, namespacedType, getter, local);
	  });
	
	  module.forEachChild(function (child, key) {
	    installModule(store, rootState, path.concat(key), child, hot);
	  });
	}
	
	/**
	 * make localized dispatch, commit, getters and state
	 * if there is no namespace, just use root ones
	 */
	function makeLocalContext (store, namespace, path) {
	  var noNamespace = namespace === '';
	
	  var local = {
	    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (!store._actions[type]) {
	          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }
	
	      return store.dispatch(type, payload)
	    },
	
	    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (!store._mutations[type]) {
	          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }
	
	      store.commit(type, payload, options);
	    }
	  };
	
	  // getters and state object must be gotten lazily
	  // because they will be changed by vm update
	  Object.defineProperties(local, {
	    getters: {
	      get: noNamespace
	        ? function () { return store.getters; }
	        : function () { return makeLocalGetters(store, namespace); }
	    },
	    state: {
	      get: function () { return getNestedState(store.state, path); }
	    }
	  });
	
	  return local
	}
	
	function makeLocalGetters (store, namespace) {
	  var gettersProxy = {};
	
	  var splitPos = namespace.length;
	  Object.keys(store.getters).forEach(function (type) {
	    // skip if the target getter is not match this namespace
	    if (type.slice(0, splitPos) !== namespace) { return }
	
	    // extract local getter type
	    var localType = type.slice(splitPos);
	
	    // Add a port to the getters proxy.
	    // Define as getter property because
	    // we do not want to evaluate the getters in this time.
	    Object.defineProperty(gettersProxy, localType, {
	      get: function () { return store.getters[type]; },
	      enumerable: true
	    });
	  });
	
	  return gettersProxy
	}
	
	function registerMutation (store, type, handler, local) {
	  var entry = store._mutations[type] || (store._mutations[type] = []);
	  entry.push(function wrappedMutationHandler (payload) {
	    handler(local.state, payload);
	  });
	}
	
	function registerAction (store, type, handler, local) {
	  var entry = store._actions[type] || (store._actions[type] = []);
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler({
	      dispatch: local.dispatch,
	      commit: local.commit,
	      getters: local.getters,
	      state: local.state,
	      rootGetters: store.getters,
	      rootState: store.state
	    }, payload, cb);
	    if (!isPromise(res)) {
	      res = Promise.resolve(res);
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err);
	        throw err
	      })
	    } else {
	      return res
	    }
	  });
	}
	
	function registerGetter (store, type, rawGetter, local) {
	  if (store._wrappedGetters[type]) {
	    console.error(("[vuex] duplicate getter key: " + type));
	    return
	  }
	  store._wrappedGetters[type] = function wrappedGetter (store) {
	    return rawGetter(
	      local.state, // local state
	      local.getters, // local getters
	      store.state, // root state
	      store.getters // root getters
	    )
	  };
	}
	
	function enableStrictMode (store) {
	  store._vm.$watch(function () { return this._data.$$state }, function () {
	    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
	  }, { deep: true, sync: true });
	}
	
	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}
	
	function unifyObjectStyle (type, payload, options) {
	  if (isObject(type) && type.type) {
	    options = payload;
	    payload = type;
	    type = type.type;
	  }
	
	  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
	
	  return { type: type, payload: payload, options: options }
	}
	
	function install (_Vue) {
	  if (Vue) {
	    console.error(
	      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	    );
	    return
	  }
	  Vue = _Vue;
	  applyMixin(Vue);
	}
	
	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	}
	
	var mapState = normalizeNamespace(function (namespace, states) {
	  var res = {};
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedState () {
	      var state = this.$store.state;
	      var getters = this.$store.getters;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
	        if (!module) {
	          return
	        }
	        state = module.context.state;
	        getters = module.context.getters;
	      }
	      return typeof val === 'function'
	        ? val.call(this, state, getters)
	        : state[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});
	
	var mapMutations = normalizeNamespace(function (namespace, mutations) {
	  var res = {};
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
	        return
	      }
	      return this.$store.commit.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});
	
	var mapGetters = normalizeNamespace(function (namespace, getters) {
	  var res = {};
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedGetter () {
	      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
	        return
	      }
	      if (!(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val));
	        return
	      }
	      return this.$store.getters[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});
	
	var mapActions = normalizeNamespace(function (namespace, actions) {
	  var res = {};
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
	        return
	      }
	      return this.$store.dispatch.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});
	
	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}
	
	function normalizeNamespace (fn) {
	  return function (namespace, map) {
	    if (typeof namespace !== 'string') {
	      map = namespace;
	      namespace = '';
	    } else if (namespace.charAt(namespace.length - 1) !== '/') {
	      namespace += '/';
	    }
	    return fn(namespace, map)
	  }
	}
	
	function getModuleByNamespace (store, helper, namespace) {
	  var module = store._modulesNamespaceMap[namespace];
	  if (!module) {
	    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
	  }
	  return module
	}
	
	var index = {
	  Store: Store,
	  install: install,
	  version: '2.2.1',
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions
	};
	
	return index;
	
	})));


/***/ },
/* 265 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"header\">\n    <div class=\"container-fluid \">\n        <div class=\"logo\">\n            <a class=\"navbar-brand\"><img src=\"/images/logo.jpg\" alt=\"Brand\"></a>\n        </div>\n\n        <div class=\"header-nav navbar \" id=\"header-nav\">\n            <div class=\"staff\">{{shopData.adminName}}</div>\n            <div class=\"navbar-header\">\n                <button class=\"navbar-toggle collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n            </div>\n            <div class=\"navbar-collapse collapse\" role=\"navigation\">\n                <ul class=\"nav navbar-nav\">\n\n                        <li v-for=\"(item,index) in pageList\" ><a class=\"custom\"   :class=\"{cur: currentPage && (headIndex == index)}\" @click=\"switchPage(index)\"><span class=\"num\">{{item.title}}</span><span class=\"time\">{{item.time}}</span></a></li>\n\n                </ul>\n                <a class=\"custom-add\" @click=\"addPage()\">+</a>\n                <a class=\"custom-remove\" @click=\"removePage()\">-</a>\n                <div class=\"menu-box\">\n                    <a class=\"msg-btn\"  @click=\"msg()\">\n                        消息\n                        <span class=\"badge\">{{msgData.msgNum}}</span>\n                    </a>\n                    <a class=\"cash-btn\"  @click=\"cash()\">\n                        <i class=\"icon icon-cash\"></i>\n                        备用金\n                    </a>\n                    <a class=\"log-btn\"  @click=\"log()\">\n                        <i class=\"icon icon-log\"></i>\n                        营业状态\n                    </a>\n                    <a class=\"exit-btn\" @click=\"exit()\">\n                        <i class=\"icon icon-exit\"></i>\n                        退出\n                    </a>\n                </div>\n            </div>\n        </div>\n\n\n    </div>\n</div>\n";

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(267)
	__vue_script__ = __webpack_require__(269)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\custom\\CustomMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(285)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c47f6e18/CustomMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(268);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!custom modale*/\n.custom-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.custom-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.custom-layer .modal-header .close {\n  margin-top: -20px;\n}\n.custom-layer .modal-body {\n  padding: 30px 30px;\n}\n.custom-layer .custom-table-header {\n  width: 100%;\n  height: auto;\n}\n.custom-layer .custom-table-body {\n  height: auto;\n  margin-top: 10px;\n  padding: 20px 30px;\n  border: 1px dashed #999;\n  border-radius: 5px;\n}\n.custom-layer .custom-table-body .normal {\n  height: 250px;\n  background: url('/images/awyp.jpg') 50% 50% no-repeat;\n}\n.custom-layer .custom-table-foot {\n  margin-top: 10px;\n}\n.custom-layer .custom-table-foot .btn-default {\n  padding: 5px 20px;\n}\n.custom-layer .add-custom {\n  width: 72px;\n  height: 36px;\n  display: inline-block;\n  background: url('/images/add_custom.png') no-repeat;\n  cursor: pointer;\n  border-radius: 0;\n}\n.custom-layer .cancel-custom,\n.custom-layer .select-ticket {\n  width: 72px;\n  height: 36px;\n  cursor: pointer;\n  text-align: center;\n  border-radius: 20px;\n  display: inline-block;\n}\n.custom-layer .cancel-custom {\n  background: #999;\n  color: #fff;\n}\n.custom-layer .searchCustom button {\n  border-top-left-radius: 30px!important;\n  border-bottom-left-radius: 30px !important;\n}\n.custom-layer .searchCustom input {\n  border-top-right-radius: 30px!important;\n  border-bottom-right-radius: 30px !important;\n}\n.custom-layer .registration .custom-sex {\n  padding: 10px 20px;\n}\n.custom-layer .registration .custom-sex .radio {\n  position: relative;\n  margin: 0 20px;\n  display: inline-block;\n}\n.custom-layer .registration .custom-sex .radio > input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  margin-left: 0;\n}\n.custom-layer .registration .custom-sex .radio > label {\n  margin-left: 0;\n  padding-left: 0;\n  width: 90px;\n  height: 90px;\n}\n.custom-layer .registration .man-radio.radio label {\n  background: url('/images/man.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .women-radio.radio label {\n  background: url('/images/women.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .man-radio.radio input:checked + label {\n  background: url('/images/man_check.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .women-radio.radio input:checked + label {\n  background: url('/images/women_check.png') 50% 50% no-repeat;\n}\n.custom-layer .custom-member {\n  color: #999;\n  margin-top: -20px;\n}\n.custom-layer .custom-member .custom-name,\n.custom-layer .custom-member .custom-phone {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.custom-layer .custom-member .custom-name .input-group-addon,\n.custom-layer .custom-member .custom-layer .custom-phone .input-group-addon {\n  background: 0 0;\n}\n.custom-layer .custom-member .row {\n  margin-top: 20px;\n}\n.custom-layer .custom-member .sex-photo {\n  width: 70px;\n  height: 70px;\n  display: block;\n  float: left;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.custom-layer .custom-member .sex-photo.male {\n  background: url('/images/man_check.png') 50% 50% no-repeat;\n  background-size: 100%;\n}\n.custom-layer .custom-member .sex-photo.female {\n  background: url('/images/women_check.png') 50% 50% no-repeat;\n  background-size: 100%;\n}\n.custom-layer .custom-member .col-xs-12 {\n  padding-left: 30px;\n}\n.custom-layer .custom-member .nickname {\n  line-height: 70px;\n  font-size: 1.5rem;\n  display: block;\n  float: left;\n}\n.custom-layer .custom-member span {\n  padding-left: 30px;\n}\n.custom-layer .custom-ticket {\n  height: auto;\n  color: #333333;\n}\n.custom-layer .custom-ticket .custom-ticket-header {\n  padding-bottom: 20px;\n  padding-left: 60px;\n}\n.custom-layer .custom-ticket .custom-ticket-body {\n  height: 300px;\n  overflow-x: hidden;\n}\n.custom-layer .custom-ticket .custom-ticket-body ul {\n  list-style: none;\n  padding: 0;\n}\n.custom-layer .custom-ticket .custom-ticket-body li {\n  width: 80%;\n  height: 90px;\n  display: block;\n  border: 2px solid #e8e9f1;\n  border-radius: 5px;\n  margin: 10px auto 0;\n  font-size: 0.8rem;\n}\n.custom-layer .custom-ticket .custom-ticket-body li:first-child {\n  margin-top: 0;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left {\n  width: 33%;\n  height: 100%;\n  background: #e8e9f1;\n  position: relative;\n  float: left;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right {\n  width: 66%;\n  height: 100%;\n  position: relative;\n  float: left;\n  background: #fff;\n  padding: 10px 20px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .m {\n  position: absolute;\n  font-size: 2rem;\n  left: 20px;\n  top: 10px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .u {\n  position: absolute;\n  left: 30px;\n  top: 60px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .m:before {\n  content: \"\\A5\";\n  font-size: 1rem;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right span {\n  margin-top: 5px;\n  display: block;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right em {\n  font-style: normal;\n}\n.custom-layer .line {\n  width: 113%;\n  background: #e84593;\n  height: 1px;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  margin-left: -30px;\n  position: relative;\n}\n.custom-layer .line > span {\n  font-size: 2rem;\n  display: block;\n  position: absolute;\n  left: 20px;\n  top: -5px;\n}\n.custom-layer .custom-group {\n  margin: 10px 0;\n}\n", "", {"version":3,"sources":["/./src/app/components/custom/CustomMain.vue"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;EACE,iCAAiC;EACjC,mBAAmB;CACpB;AACD;EACE,iCAAiC;CAClC;AACD;EACE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,wBAAwB;EACxB,mBAAmB;CACpB;AACD;EACE,cAAc;EACd,sDAAsD;CACvD;AACD;EACE,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,oDAAoD;EACpD,gBAAgB;EAChB,iBAAiB;CAClB;AACD;;EAEE,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;EACpB,sBAAsB;CACvB;AACD;EACE,iBAAiB;EACjB,YAAY;CACb;AACD;EACE,uCAAuC;EACvC,2CAA2C;CAC5C;AACD;EACE,wCAAwC;EACxC,4CAA4C;CAC7C;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,sBAAsB;CACvB;AACD;EACE,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,WAAW;EACX,eAAe;CAChB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,aAAa;CACd;AACD;EACE,qDAAqD;CACtD;AACD;EACE,uDAAuD;CACxD;AACD;EACE,2DAA2D;CAC5D;AACD;EACE,6DAA6D;CAC9D;AACD;EACE,YAAY;EACZ,kBAAkB;CACnB;AACD;;EAEE,iBAAiB;EACjB,oBAAoB;CACrB;AACD;;EAEE,gBAAgB;CACjB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;CAClB;AACD;EACE,2DAA2D;EAC3D,sBAAsB;CACvB;AACD;EACE,6DAA6D;EAC7D,sBAAsB;CACvB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,YAAY;CACb;AACD;EACE,mBAAmB;CACpB;AACD;EACE,aAAa;EACb,eAAe;CAChB;AACD;EACE,qBAAqB;EACrB,mBAAmB;CACpB;AACD;EACE,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,WAAW;CACZ;AACD;EACE,WAAW;EACX,aAAa;EACb,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,cAAc;CACf;AACD;EACE,WAAW;EACX,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,gBAAgB;EAChB,WAAW;EACX,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,UAAU;CACX;AACD;EACE,eAAa;EACb,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,oBAAoB;EACpB,YAAY;EACZ,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,WAAW;EACX,UAAU;CACX;AACD;EACE,eAAe;CAChB","file":"CustomMain.vue","sourcesContent":["/*!custom modale*/\n.custom-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.custom-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.custom-layer .modal-header .close {\n  margin-top: -20px;\n}\n.custom-layer .modal-body {\n  padding: 30px 30px;\n}\n.custom-layer .custom-table-header {\n  width: 100%;\n  height: auto;\n}\n.custom-layer .custom-table-body {\n  height: auto;\n  margin-top: 10px;\n  padding: 20px 30px;\n  border: 1px dashed #999;\n  border-radius: 5px;\n}\n.custom-layer .custom-table-body .normal {\n  height: 250px;\n  background: url('/images/awyp.jpg') 50% 50% no-repeat;\n}\n.custom-layer .custom-table-foot {\n  margin-top: 10px;\n}\n.custom-layer .custom-table-foot .btn-default {\n  padding: 5px 20px;\n}\n.custom-layer .add-custom {\n  width: 72px;\n  height: 36px;\n  display: inline-block;\n  background: url('/images/add_custom.png') no-repeat;\n  cursor: pointer;\n  border-radius: 0;\n}\n.custom-layer .cancel-custom,\n.custom-layer .select-ticket {\n  width: 72px;\n  height: 36px;\n  cursor: pointer;\n  text-align: center;\n  border-radius: 20px;\n  display: inline-block;\n}\n.custom-layer .cancel-custom {\n  background: #999;\n  color: #fff;\n}\n.custom-layer .searchCustom button {\n  border-top-left-radius: 30px!important;\n  border-bottom-left-radius: 30px !important;\n}\n.custom-layer .searchCustom input {\n  border-top-right-radius: 30px!important;\n  border-bottom-right-radius: 30px !important;\n}\n.custom-layer .registration .custom-sex {\n  padding: 10px 20px;\n}\n.custom-layer .registration .custom-sex .radio {\n  position: relative;\n  margin: 0 20px;\n  display: inline-block;\n}\n.custom-layer .registration .custom-sex .radio > input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  margin-left: 0;\n}\n.custom-layer .registration .custom-sex .radio > label {\n  margin-left: 0;\n  padding-left: 0;\n  width: 90px;\n  height: 90px;\n}\n.custom-layer .registration .man-radio.radio label {\n  background: url('/images/man.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .women-radio.radio label {\n  background: url('/images/women.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .man-radio.radio input:checked + label {\n  background: url('/images/man_check.png') 50% 50% no-repeat;\n}\n.custom-layer .registration .women-radio.radio input:checked + label {\n  background: url('/images/women_check.png') 50% 50% no-repeat;\n}\n.custom-layer .custom-member {\n  color: #999;\n  margin-top: -20px;\n}\n.custom-layer .custom-member .custom-name,\n.custom-layer .custom-member .custom-phone {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.custom-layer .custom-member .custom-name .input-group-addon,\n.custom-layer .custom-member .custom-layer .custom-phone .input-group-addon {\n  background: 0 0;\n}\n.custom-layer .custom-member .row {\n  margin-top: 20px;\n}\n.custom-layer .custom-member .sex-photo {\n  width: 70px;\n  height: 70px;\n  display: block;\n  float: left;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.custom-layer .custom-member .sex-photo.male {\n  background: url('/images/man_check.png') 50% 50% no-repeat;\n  background-size: 100%;\n}\n.custom-layer .custom-member .sex-photo.female {\n  background: url('/images/women_check.png') 50% 50% no-repeat;\n  background-size: 100%;\n}\n.custom-layer .custom-member .col-xs-12 {\n  padding-left: 30px;\n}\n.custom-layer .custom-member .nickname {\n  line-height: 70px;\n  font-size: 1.5rem;\n  display: block;\n  float: left;\n}\n.custom-layer .custom-member span {\n  padding-left: 30px;\n}\n.custom-layer .custom-ticket {\n  height: auto;\n  color: #333333;\n}\n.custom-layer .custom-ticket .custom-ticket-header {\n  padding-bottom: 20px;\n  padding-left: 60px;\n}\n.custom-layer .custom-ticket .custom-ticket-body {\n  height: 300px;\n  overflow-x: hidden;\n}\n.custom-layer .custom-ticket .custom-ticket-body ul {\n  list-style: none;\n  padding: 0;\n}\n.custom-layer .custom-ticket .custom-ticket-body li {\n  width: 80%;\n  height: 90px;\n  display: block;\n  border: 2px solid #e8e9f1;\n  border-radius: 5px;\n  margin: 10px auto 0;\n  font-size: 0.8rem;\n}\n.custom-layer .custom-ticket .custom-ticket-body li:first-child {\n  margin-top: 0;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left {\n  width: 33%;\n  height: 100%;\n  background: #e8e9f1;\n  position: relative;\n  float: left;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right {\n  width: 66%;\n  height: 100%;\n  position: relative;\n  float: left;\n  background: #fff;\n  padding: 10px 20px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .m {\n  position: absolute;\n  font-size: 2rem;\n  left: 20px;\n  top: 10px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .u {\n  position: absolute;\n  left: 30px;\n  top: 60px;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .left .m:before {\n  content: \"¥\";\n  font-size: 1rem;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right span {\n  margin-top: 5px;\n  display: block;\n}\n.custom-layer .custom-ticket .custom-ticket-body li .right em {\n  font-style: normal;\n}\n.custom-layer .line {\n  width: 113%;\n  background: #e84593;\n  height: 1px;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  margin-left: -30px;\n  position: relative;\n}\n.custom-layer .line > span {\n  font-size: 2rem;\n  display: block;\n  position: absolute;\n  left: 20px;\n  top: -5px;\n}\n.custom-layer .custom-group {\n  margin: 10px 0;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _CustomSearch = __webpack_require__(270);
	
	var _CustomSearch2 = _interopRequireDefault(_CustomSearch);
	
	var _CustomRegister = __webpack_require__(280);
	
	var _CustomRegister2 = _interopRequireDefault(_CustomRegister);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _request = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            searching: false,
	            registerShow: false,
	            searchShow: true,
	            infoShow: false,
	            username: '',
	            tempcustom: null,
	            tips: ''
	        };
	    },
	
	    computed: {
	        custom: function custom() {
	            return this.$store.state.currentPage.customData;
	        }
	    },
	    components: {
	        CustomSearch: _CustomSearch2.default,
	        CustomRegister: _CustomRegister2.default },
	    created: function created() {
	        if (this.custom.id) {
	            this.searching = false;
	            this.infoShow = true;
	            this.searchShow = false;
	            this.registerShow = false;
	            this.tempcustom = { "appMember": this.custom };
	        } else {}
	    },
	
	    methods: {
	        cancelView: function cancelView() {
	
	            this.registerShow = false;
	            this.infoShow = false;
	            this.searchShow = true;
	            this.username = '';
	        },
	        registerView: function registerView() {
	
	            this.registerShow = !this.registerShow;
	            this.infoShow = false;
	            this.searchShow = false;
	        },
	        doSearch: function doSearch() {
	            var _this = this;
	
	            var vm = this;
	
	            if (!vm.username) {
	
	                _layer2.default.msg('请输入手机号码');
	                return false;
	            }
	            this.searchShow = true;
	            this.registerShow = false;
	            this.infoShow = false;
	            this.searching = true;
	            this.tips = "正在查找...";
	            this.$store.dispatch("fetchCustom", vm.username).then(function (res) {
	                vm.tempcustom = res;
	                vm.searching = false;
	                vm.searchShow = false;
	                vm.infoShow = true;
	                _this.tips = "";
	            }).catch(function (res) {
	                vm.searching = true;
	                _this.tips = "没有找到此会员";
	                setTimeout(function () {
	                    return vm.searching = false;
	                }, 3000);
	            });
	        },
	        chooseThis: function chooseThis() {
	            var vm = this;
	
	            vm.$store.commit('setCustomData', vm.tempcustom.appMember);
	            if (vm.$store.state.currentPage.mode == "order") {
	                vm.$store.dispatch('fetchOrder');
	            }
	
	            (0, _jquery2.default)('#layer-custom').modal('hide');
	        }
	    }
	};

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(271)
	__vue_script__ = __webpack_require__(273)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\custom\\CustomSearch.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(279)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-27b75ca3/CustomSearch.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(272);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomSearch.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomSearch.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CustomSearch.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _CustomInfo = __webpack_require__(274);
	
	var _CustomInfo2 = _interopRequireDefault(_CustomInfo);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "CustomSearch",
	    data: function data() {
	        return {
	            msg: ''
	        };
	    },
	
	    components: {
	        CustomInfo: _CustomInfo2.default },
	    computed: {},
	    created: function created() {},
	
	    props: ["custom", "infoShow", "searchShow", 'tips'],
	    methods: {}
	};

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(275)
	__vue_script__ = __webpack_require__(277)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\custom\\CustomInfo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(278)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-ae47b52e/CustomInfo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(276);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomInfo.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomInfo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".yxq {\n  color: #e5e5e5;\n}\n", "", {"version":3,"sources":["/./src/app/components/custom/CustomInfo.vue"],"names":[],"mappings":"AAAA;EACE,eAAe;CAChB","file":"CustomInfo.vue","sourcesContent":[".yxq {\n  color: #e5e5e5;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 277 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: "CustomInfo",
	    props: ['member'],
	    data: function data() {
	        return {
	            msg: ''
	        };
	    },
	
	    computed: {},
	    filters: {
	        couponType: function couponType(val) {
	            if (val === 'fullReduce') {
	                return '满减劵';
	            } else if (val === 'fullBack') {
	                return '满返劵';
	            } else {
	                return '';
	            }
	        }
	    }
	};

/***/ },
/* 278 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"info\" >\n        <div class=\"custom-member\">\n            <div class=\"row\">\n            <div class=\"col-xs-12 col-sm-12 clearfix\">\n                <!--{{customData.curCustom.sex | sex}}-->\n                <em class=\"sex-photo\"><img v-show=\"member.headPortrait\" :src=\"member.headPortrait\"/></em>\n                <span class=\"nickname\">{{member.nickname}}</span>\n            </div>\n            </div>\n            <div class=\"row\">\n            <div class=\"col-xs-12 col-sm-6\">手机号<span>{{member.username}}</span></div>\n            <div class=\"col-xs-12 col-sm-6\">积分<span>{{member.point}}</span></div>\n            </div>\n            <div class=\"row\">\n            <div class=\"col-xs-12 col-sm-6\">余额 <span>{{member.balance}}</span></div>\n            </div>\n        </div>\n        <div class=\"line\"><span class=\"primary glyphicon glyphicon-tag\"></span></div>\n        <div class=\"custom-ticket\">\n            <div class=\"custom-ticket-header\">优惠券</div>\n            <div class=\"custom-ticket-body\">\n            <div class=\"text-center\" v-if=\"!member.appCoupons || !member.appCoupons.length\">暂无优惠券</div>\n                <ul>\n                    <li v-for=\"coupon in member.appCoupons\">\n                        <div class=\"left\">\n                        <span class=\"m\">{{coupon.amount}}</span>\n                        <span class=\"u\">满{{coupon.conditionLine}}可用</span>\n                        </div>\n                        <div class=\"right\">\n                        <span class=\"yxq\" >有效期\n                        <em class=\"primary\">{{coupon.endDate}}</em>\n                        </span>\n                        <span class=\"l2\">{{coupon.toSbName}}</span>\n                        <span class=\"l3 primary\">{{coupon.type | couponType}}</span>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n</div>\n";

/***/ },
/* 279 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"custom-search\">\n    <div class=\"custom-table-header\">\n        <div class=\"row\">\n            <div class=\"col-xs-5 col-xs-offset-3\">\n                <div class=\"input-group searchCustom\">\n                        <span class=\"input-group-btn\"><button class=\"btn btn-default\" @click=\"$parent.doSearch\" ><span class=\"glyphicon glyphicon-search\" ></span></button>\n                        </span>\n                    <input type=\"text\" v-model=\"$parent.username\" class=\"form-control\" @keyup.enter=\"$parent.doSearch\" placeholder=\"搜索顾客\">\n                </div>\n            </div>\n            <div class=\"col-xs-4\">\n                <a v-if=\"searchShow\" class=\"btn add-custom\" @click=\"$parent.registerView\"></a>\n                <a v-else class=\"btn cancel-custom\" @click=\"$parent.cancelView\">取消</a>\n                <a class=\"btn select-ticket btn-lightgreen\" v-show=\"infoShow && custom && custom.appMember && custom.appMember.id\" @click=\"$parent.chooseThis\">选择</a>\n            </div>\n         </div>\n    </div>\n    <div class=\"custom-table-body\" v-if=\"searchShow\">\n        <div class=\"normal\" >\n            <transition name=\"fade\">\n                <p class=\"text-center bg-warning\" v-if=\"$parent.searching\" >{{tips}}</p>\n            </transition>\n        </div>\n    </div>\n    <div class=\"custom-table-body\" v-if=\"infoShow\">\n         <custom-info  :member=\"custom.appMember\"></custom-info>\n    </div>\n</div>\n";

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(281)
	__vue_script__ = __webpack_require__(283)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\custom\\CustomRegister.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(284)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2d5cb944/CustomRegister.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(282);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomRegister.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CustomRegister.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CustomRegister.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "CustomRegister",
	    data: function data() {
	        return {
	            searchName: "",
	            newCustom: {
	                'phone': '',
	                'name': '',
	                'sex': ''
	            }
	        };
	    },
	    created: function created() {},
	
	    methods: {
	        doRegister: function doRegister() {
	            var vm = this;
	            if (!this.newCustom.name) {
	                _layer2.default.tips('姓名不能为空', '#name');
	                return;
	            }
	            if (!this.newCustom.phone) {
	                _layer2.default.tips('手机号码不能为空', '#phone');
	                return;
	            }
	            if (!this.newCustom.sex) {
	                _layer2.default.msg("请选择性别");
	                return;
	            }
	            if (!/\d{11}/.test(this.newCustom.phone)) {
	                _layer2.default.tips('手机号码不正确', '#phone');
	                return;
	            }
	            var apiObj = {
	                url: _request.API_URLS.customers,
	                data: this.newCustom
	            };
	            _request.request.fnPost(this, apiObj, function (res) {
	                _layer2.default.msg("保存成功");
	
	                vm.$store.commit('setCustomData', res.appMember);
	                if (vm.$store.state.currentPage.mode == "order") {
	                    vm.$store.dispatch('fetchOrder');
	                }
	
	                (0, _jquery2.default)('#layer-custom').modal('hide');
	            }, function (err) {
	                _layer2.default.msg(err.msg);
	            });
	        }
	    }
	};

/***/ },
/* 284 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"custom-register\">\n    <div class=\"custom-table-body\">\n         <!--registration -->\n         <div class=\"registration\">\n                <div class=\"row\">\n                    <div class=\"col-xs-8 col-xs-offset-2\">\n                        <div class=\"custom-sex clearfix text-center\">\n                            <div class=\"man-radio radio\">\n                                <input type=\"radio\"  name=\"sex\" value=\"male\" id=\"custom-man\" v-model=\"newCustom.sex\"  />\n                                <label for=\"custom-man\"></label>\n                            </div>\n                            <div class=\"women-radio radio\">\n                                <input type=\"radio\" name=\"sex\" id=\"custom-women\" value=\"female\" v-model=\"newCustom.sex\">\n                                <label for=\"custom-women\"></label>\n                            </div>\n                        </div>\n                        <div class=\"input-group custom-name custom-group\">\n                            <span class=\"input-group-addon \"><i class=\"iconfont icon-guanliyuan\"></i></span>\n                            <input type=\"text\" class=\"form-control\" placeholder=\"姓名\" id=\"name\" v-model=\"newCustom.name\"  >\n                        </div>\n                        <div class=\"input-group custom-phone custom-group\">\n                            <span class=\"input-group-addon\"><i  class=\"iconfont icon-mobilefill\"></i></span>\n                            <input type=\"num\" class=\"form-control\" placeholder=\"手机号\" maxlength=\"11\" id=\"phone\" v-model=\"newCustom.phone\" @keyup.enter=\"doRegister\" >\n                        </div>\n                        <a class=\"btn btn-lightgreen btn-block\" @click=\"doRegister\">保存</a>\n                    </div>\n                </div>\n         </div>\n    </div>\n</div>\n";

/***/ },
/* 285 */
/***/ function(module, exports) {

	module.exports = "\n<div role=\"dialog\" class=\"modal fade custom-layer\" id=\"layer-custom\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">顾客</h4>\n                <a class=\"close\" data-dismiss=\"modal\">&times;</span></a>\n            </div>\n            <div class=\"modal-body\">\n                <custom-search :tips=\"tips\" :custom=\"tempcustom\" :info-show=\"infoShow\" :search-show=\"searchShow\"></custom-search>\n                <custom-register v-show=\"registerShow\"></custom-register>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(287)
	__vue_script__ = __webpack_require__(289)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\shopAdmin\\ShopAdminMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(290)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b8b711e4/ShopAdminMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(288);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ShopAdminMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ShopAdminMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!showAdmin modale*/\n.showAdmin-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.showAdmin-layer .modal-dialog {\n  width: 400px;\n}\n.showAdmin-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.showAdmin-layer .modal-header .close {\n  margin-top: -20px;\n}\n.showAdmin-layer .modal-body {\n  padding: 30px 30px;\n}\n.showAdmin-layer .modal-body .shop-admin-list {\n  clear: both;\n}\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin {\n  padding: 10px  30px;\n  border: solid #999999 1px;\n  color: #999999;\n}\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin.cur,\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin:hover {\n  background: #6fc89c;\n  color: #ffffff;\n}\n.showAdmin-layer .modal-body .shop-admin-list ul {\n  height: 160px;\n  overflow-x: hidden;\n  padding: 0;\n  margin: 0;\n}\n.showAdmin-layer .modal-body .shop-admin-list li {\n  width: 40%;\n  float: left;\n  margin: 15px 15px;\n}\n.showAdmin-layer .modal-foot {\n  border-top: 1px dashed #e5e5e5;\n  padding: 10px 0px;\n  text-align: center;\n}\n.showAdmin-layer .modal-foot .showAdmin-layer-close {\n  display: inline-block;\n  background: #6fc89c;\n  color: #ffffff;\n  padding: 10px 50px;\n}\n", "", {"version":3,"sources":["/./src/app/components/shopAdmin/ShopAdminMain.vue"],"names":[],"mappings":"AAAA,qBAAqB;AACrB;EACE,iCAAiC;EACjC,mBAAmB;CACpB;AACD;EACE,aAAa;CACd;AACD;EACE,iCAAiC;CAClC;AACD;EACE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;CACb;AACD;EACE,oBAAoB;EACpB,0BAA0B;EAC1B,eAAe;CAChB;AACD;;EAEE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,cAAc;EACd,mBAAmB;EACnB,WAAW;EACX,UAAU;CACX;AACD;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;CACnB;AACD;EACE,+BAA+B;EAC/B,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;CACpB","file":"ShopAdminMain.vue","sourcesContent":["/*!showAdmin modale*/\n.showAdmin-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.showAdmin-layer .modal-dialog {\n  width: 400px;\n}\n.showAdmin-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.showAdmin-layer .modal-header .close {\n  margin-top: -20px;\n}\n.showAdmin-layer .modal-body {\n  padding: 30px 30px;\n}\n.showAdmin-layer .modal-body .shop-admin-list {\n  clear: both;\n}\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin {\n  padding: 10px  30px;\n  border: solid #999999 1px;\n  color: #999999;\n}\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin.cur,\n.showAdmin-layer .modal-body .shop-admin-list .btn-shopadmin:hover {\n  background: #6fc89c;\n  color: #ffffff;\n}\n.showAdmin-layer .modal-body .shop-admin-list ul {\n  height: 160px;\n  overflow-x: hidden;\n  padding: 0;\n  margin: 0;\n}\n.showAdmin-layer .modal-body .shop-admin-list li {\n  width: 40%;\n  float: left;\n  margin: 15px 15px;\n}\n.showAdmin-layer .modal-foot {\n  border-top: 1px dashed #e5e5e5;\n  padding: 10px 0px;\n  text-align: center;\n}\n.showAdmin-layer .modal-foot .showAdmin-layer-close {\n  display: inline-block;\n  background: #6fc89c;\n  color: #ffffff;\n  padding: 10px 50px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: 'showAdminWin',
	    data: function data() {
	        return {
	            shopAdminIndex: null,
	            type: "GUIDER",
	            keyword: "",
	            listData: null
	        };
	    },
	    created: function created() {
	        this.fetchData();
	    },
	
	    methods: {
	        fetchData: function fetchData() {
	            var _this = this;
	
	            var apiobj = {
	                url: _request.API_URLS.shop_admins + '/' + this.type,
	                data: { keyword: this.keyword }
	            };
	            _request.request.fnGet(apiobj).then(function (res) {
	                _this.listData = res.list;
	            }).catch(function (res) {
	                alert("获取失败");
	            });
	        },
	        checkShopAdmin: function checkShopAdmin() {
	            if (!this.shopAdminIndex) {
	                return false;
	            }
	            var shopAdmin = this.listData[this.shopAdminIndex];
	            this.$store.commit("setShopAdminData", shopAdmin);
	            this.$store.commit("setOrderParams", {
	                guiderId: shopAdmin.id
	            });
	            var modal = '#layer-showAdmin';
	            (0, _jquery2.default)(modal).modal('hide');
	        }
	    }
	};

/***/ },
/* 290 */
/***/ function(module, exports) {

	module.exports = "\n<div role=\"dialog\" class=\"modal fade showAdmin-layer\" id=\"layer-showAdmin\">\n       <div class=\"modal-dialog \">\n\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <h4 class=\"modal-title text-center\">选择导购员</h4>\n                   <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n               </div>\n               <div class=\"modal-body\">\n                   <div class=\"shop-admin-list\">\n                       <p class=\"text-center\" v-if=\"!listData\">加载中</p>\n                       <p class=\"text-center\" v-else-if=\"listData.length==0\">没有相关数据</p>\n                       <ul class=\"cleafix\" v-else>\n                           <li v-for=\"(item,index) in listData\" >\n                               <a class=\"btn btn-shopadmin\" :class=\"{'cur':shopAdminIndex==index}\" @click=\"shopAdminIndex=index\">{{item.name}}</a>\n                           </li>\n\n                       </ul>\n                   </div>\n               </div>\n               <div class=\"modal-foot\">\n                   <a class=\"btn btn-default showAdmin-layer-close\" @click=\"checkShopAdmin\" >确认</a>\n               </div>\n           </div>\n       </div>\n   </div>\n";

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(292)
	__vue_script__ = __webpack_require__(294)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\coupon\\CouponMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(295)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-53972354/CouponMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(293);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CouponMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CouponMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!Coupon modale*/\n.coupon-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.coupon-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.coupon-layer .modal-header .close {\n  margin-top: -20px;\n}\n.coupon-layer .modal-body {\n  padding: 30px 30px;\n}\n.coupon-layer .custom-ticket-body {\n  height: 300px;\n  overflow-x: hidden;\n}\n.coupon-layer .custom-ticket-body ul {\n  list-style: none;\n  padding: 0;\n}\n.coupon-layer .custom-ticket-body li {\n  width: 80%;\n  height: 90px;\n  display: block;\n  border: 2px solid #e8e9f1;\n  border-radius: 5px;\n  margin: 10px auto 0;\n  font-size: 0.8rem;\n}\n.coupon-layer .custom-ticket-body li:first-child {\n  margin-top: 0;\n}\n.coupon-layer .custom-ticket-body li .left {\n  width: 33%;\n  height: 100%;\n  background: #e8e9f1;\n  position: relative;\n  float: left;\n}\n.coupon-layer .custom-ticket-body li .right {\n  width: 66%;\n  height: 100%;\n  position: relative;\n  float: left;\n  background: #fff;\n  padding: 10px 20px;\n}\n.coupon-layer .custom-ticket-body li .left .m {\n  position: absolute;\n  font-size: 2rem;\n  left: 20px;\n  top: 10px;\n}\n.coupon-layer .custom-ticket-body li .left .u {\n  position: absolute;\n  left: 30px;\n  top: 60px;\n}\n.coupon-layer .custom-ticket-body li .left .m:before {\n  content: \"\\A5\";\n  font-size: 1rem;\n}\n.coupon-layer .custom-ticket-body li .right span {\n  margin-top: 5px;\n  display: block;\n}\n.coupon-layer .custom-ticket-body li .right em {\n  font-style: normal;\n}\n.coupon-layer .custom-ticket-body li.on {\n  border: 1px solid red;\n}\n", "", {"version":3,"sources":["/./src/app/components/coupon/CouponMain.vue"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;EACE,iCAAiC;EACjC,mBAAmB;CACpB;AACD;EACE,iCAAiC;CAClC;AACD;EACE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,WAAW;CACZ;AACD;EACE,WAAW;EACX,aAAa;EACb,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,cAAc;CACf;AACD;EACE,WAAW;EACX,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,gBAAgB;EAChB,WAAW;EACX,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,UAAU;CACX;AACD;EACE,eAAa;EACb,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,sBAAsB;CACvB","file":"CouponMain.vue","sourcesContent":["/*!Coupon modale*/\n.coupon-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.coupon-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n}\n.coupon-layer .modal-header .close {\n  margin-top: -20px;\n}\n.coupon-layer .modal-body {\n  padding: 30px 30px;\n}\n.coupon-layer .custom-ticket-body {\n  height: 300px;\n  overflow-x: hidden;\n}\n.coupon-layer .custom-ticket-body ul {\n  list-style: none;\n  padding: 0;\n}\n.coupon-layer .custom-ticket-body li {\n  width: 80%;\n  height: 90px;\n  display: block;\n  border: 2px solid #e8e9f1;\n  border-radius: 5px;\n  margin: 10px auto 0;\n  font-size: 0.8rem;\n}\n.coupon-layer .custom-ticket-body li:first-child {\n  margin-top: 0;\n}\n.coupon-layer .custom-ticket-body li .left {\n  width: 33%;\n  height: 100%;\n  background: #e8e9f1;\n  position: relative;\n  float: left;\n}\n.coupon-layer .custom-ticket-body li .right {\n  width: 66%;\n  height: 100%;\n  position: relative;\n  float: left;\n  background: #fff;\n  padding: 10px 20px;\n}\n.coupon-layer .custom-ticket-body li .left .m {\n  position: absolute;\n  font-size: 2rem;\n  left: 20px;\n  top: 10px;\n}\n.coupon-layer .custom-ticket-body li .left .u {\n  position: absolute;\n  left: 30px;\n  top: 60px;\n}\n.coupon-layer .custom-ticket-body li .left .m:before {\n  content: \"¥\";\n  font-size: 1rem;\n}\n.coupon-layer .custom-ticket-body li .right span {\n  margin-top: 5px;\n  display: block;\n}\n.coupon-layer .custom-ticket-body li .right em {\n  font-style: normal;\n}\n.coupon-layer .custom-ticket-body li.on {\n  border: 1px solid red;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _request = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    mounted: function mounted() {},
	    data: function data() {
	        return {
	            chooseId: null,
	            list: []
	        };
	    },
	
	    computed: {
	        couponList: function couponList() {
	            return this.$store.state.currentPage.orderData.canChooseCouponCodes;
	        },
	        currentId: function currentId() {
	            return this.$store.state.currentPage.orderData.couponCodeId;
	        }
	    },
	    methods: {
	        chooseThis: function chooseThis(id) {
	
	            if (id == this.currentId) {
	                this.$store.state.currentPage.orderData.couponCodeId = 10;
	                this.$store.commit("setOrderParams", {
	                    couponCodeId: null
	                });
	            } else {
	                this.$store.state.currentPage.orderData.couponCodeId = id;
	                this.$store.commit("setOrderParams", {
	                    couponCodeId: id
	                });
	            }
	        }
	    },
	    filters: {
	        couponType: function couponType(val) {
	            if (val === 'fullReduce') {
	                return '满减劵';
	            } else if (val === 'fullBack') {
	                return '满返劵';
	            } else {
	                return '';
	            }
	        }
	    }
	};

/***/ },
/* 295 */
/***/ function(module, exports) {

	module.exports = "\n<div role=\"dialog\" class=\"modal fade coupon-layer\" id=\"layer-coupon\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">优惠券</h4>\n                <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n            </div>\n            <div class=\"modal-body\" @click=\"chooseThis()\">\n            \t选择优惠券\n               <!--  <custom-search :custom=\"custom\" :info-show=\"infoShow\"></custom-search>\n                <custom-register v-show=\"registerShow\"></custom-register> -->\n            </div>\n            <div class=\"custom-ticket-body\">\n                <div class=\"text-center\" v-if=\"!couponList || !couponList.length\">暂无优惠券</div>\n                <ul>\n                    <template v-for=\"coupon in couponList\">\n                    <li :class=\"currentId == coupon.id ? 'on' : ''\" @click=\"chooseThis(coupon.id)\">\n                        <div class=\"left\">\n                            <span class=\"m\">{{coupon.amount}}</span>\n                            <span class=\"u\">满{{coupon.conditionLine}}可用</span>\n                        </div>\n                        <div class=\"right\">\n                        <span style=\"color: @border-color\">有效期\n                        <em class=\"primary\">{{coupon.endDate}}</em>\n                        </span>\n                            <span class=\"l2\">{{coupon.toSbName}}</span>\n                            <span class=\"l3 primary\">{{coupon.type | couponType}}</span>\n                        </div>\n                    </li>\n                    </template>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(297)
	__vue_script__ = __webpack_require__(299)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\recharge\\RechargeMain.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(305)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-b1f66918/RechargeMain.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(298);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeMain.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeMain.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!Recharge modale*/\n.recharge-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.recharge-layer .modal-dialog {\n  width: 768px;\n}\n.recharge-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n  text-align: center;\n}\n.recharge-layer .modal-header .close {\n  margin-top: -20px;\n}\n.recharge-layer .modal-body {\n  padding: 30px 30px;\n}\n.recharge-layer .modal-body .recharge-menu .btn {\n  color: #666;\n  padding: 15px;\n  position: relative;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #f0eeef;\n  margin-top: 15px;\n  margin-bottom: 30px;\n  font-size: 14px;\n}\n.recharge-layer .modal-body .recharge-menu .btn span {\n  margin-right: 20px;\n}\n.recharge-layer .modal-body .recharge-menu .btn:hover,\n.recharge-layer .modal-body .recharge-menu .btn.on {\n  background-color: #6fc89c;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .tab-con {\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n  min-height: 260px;\n  display: none;\n  position: relative;\n}\n.recharge-layer .modal-body .tab-con.tabShow {\n  display: block;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-amount {\n  color: #e84593;\n  font-size: 30px;\n  line-height: 40px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-gift-amount {\n  color: #e84593;\n  margin-top: 10px;\n  font-size: 16px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-tips {\n  color: #e84593;\n  margin-top: 10px;\n  font-size: 16px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .txt {\n  color: #999999;\n  line-height: 20px;\n}\n.recharge-layer .modal-body .list-box {\n  padding-bottom: 0px;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.recharge-layer .modal-body .list-box table {\n  border: none;\n}\n.recharge-layer .modal-body .list-box table td,\n.recharge-layer .modal-body .list-box table th {\n  width: 25%;\n  text-align: center;\n  border: none;\n  font-size: 14px;\n  padding: 4px;\n  line-height: 30px;\n}\n.recharge-layer .modal-body .list-box table tbody tr {\n  background: #6fc89c;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .list-box table tbody tr td:nth-child(2) span {\n  background: #ffffff;\n  color: #6fc89c;\n  width: 90%;\n  display: inline-block;\n  border-radius: 4px;\n}\n.recharge-layer .modal-body .list-box table tbody tr td:nth-child(3) {\n  background: #b998cd;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .calc-box {\n  padding-top: 15px;\n  padding-bottom: 30px;\n}\n.recharge-layer .modal-body .calc-box ul {\n  width: 180px;\n  background: #ffffff;\n  border-left: solid 1px #e5e5e5;\n  border-top: solid 1px #e5e5e5;\n  margin: 0;\n  padding: 0;\n}\n.recharge-layer .modal-body .calc-box ul li {\n  box-sizing: border-box;\n  border-right: solid 1px #e5e5e5;\n  border-bottom: solid 1px #e5e5e5;\n  width: 33%;\n  height: 60px;\n  line-height: 60px;\n  font-size: 16px;\n  float: left;\n}\n.recharge-layer .modal-foot {\n  border-top: 1px dashed #e5e5e5;\n  padding: 10px 0px;\n  text-align: center;\n}\n.recharge-layer .modal-foot .recharge-layer-ok {\n  display: inline-block;\n  background: #6fc89c;\n  color: #ffffff;\n  padding: 10px 50px;\n  margin: 0 20px;\n}\n.recharge-layer .modal-foot .recharge-layer-cancel {\n  display: inline-block;\n  padding: 10px 50px;\n  margin: 0 20px;\n}\n", "", {"version":3,"sources":["/./src/app/components/recharge/RechargeMain.vue"],"names":[],"mappings":"AAAA,oBAAoB;AACpB;EACE,iCAAiC;EACjC,mBAAmB;CACpB;AACD;EACE,aAAa;CACd;AACD;EACE,iCAAiC;EACjC,mBAAmB;CACpB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,cAAc;EACd,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,gBAAgB;CACjB;AACD;EACE,mBAAmB;CACpB;AACD;;EAEE,0BAA0B;EAC1B,eAAe;CAChB;AACD;EACE,kCAAkC;EAClC,kBAAkB;EAClB,kBAAkB;EAClB,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,oBAAoB;EACpB,kCAAkC;EAClC,kBAAkB;CACnB;AACD;EACE,aAAa;CACd;AACD;;EAEE,WAAW;EACX,mBAAmB;EACnB,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,kBAAkB;CACnB;AACD;EACE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,oBAAoB;EACpB,eAAe;EACf,WAAW;EACX,sBAAsB;EACtB,mBAAmB;CACpB;AACD;EACE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,kBAAkB;EAClB,qBAAqB;CACtB;AACD;EACE,aAAa;EACb,oBAAoB;EACpB,+BAA+B;EAC/B,8BAA8B;EAC9B,UAAU;EACV,WAAW;CACZ;AACD;EACE,uBAAuB;EACvB,gCAAgC;EAChC,iCAAiC;EACjC,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,YAAY;CACb;AACD;EACE,+BAA+B;EAC/B,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;CAChB","file":"RechargeMain.vue","sourcesContent":["/*!Recharge modale*/\n.recharge-layer {\n  border-bottom: solid 3px #93d6b3;\n  padding: 10px 30px;\n}\n.recharge-layer .modal-dialog {\n  width: 768px;\n}\n.recharge-layer .modal-header {\n  border-bottom: solid 3px #6fc89c;\n  text-align: center;\n}\n.recharge-layer .modal-header .close {\n  margin-top: -20px;\n}\n.recharge-layer .modal-body {\n  padding: 30px 30px;\n}\n.recharge-layer .modal-body .recharge-menu .btn {\n  color: #666;\n  padding: 15px;\n  position: relative;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #f0eeef;\n  margin-top: 15px;\n  margin-bottom: 30px;\n  font-size: 14px;\n}\n.recharge-layer .modal-body .recharge-menu .btn span {\n  margin-right: 20px;\n}\n.recharge-layer .modal-body .recharge-menu .btn:hover,\n.recharge-layer .modal-body .recharge-menu .btn.on {\n  background-color: #6fc89c;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .tab-con {\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n  min-height: 260px;\n  display: none;\n  position: relative;\n}\n.recharge-layer .modal-body .tab-con.tabShow {\n  display: block;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-amount {\n  color: #e84593;\n  font-size: 30px;\n  line-height: 40px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-gift-amount {\n  color: #e84593;\n  margin-top: 10px;\n  font-size: 16px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .pay-tips {\n  color: #e84593;\n  margin-top: 10px;\n  font-size: 16px;\n}\n.recharge-layer .modal-body .tab-con.tabShow .txt {\n  color: #999999;\n  line-height: 20px;\n}\n.recharge-layer .modal-body .list-box {\n  padding-bottom: 0px;\n  border-bottom: 1px dashed #e5e5e5;\n  border-width: 2px;\n}\n.recharge-layer .modal-body .list-box table {\n  border: none;\n}\n.recharge-layer .modal-body .list-box table td,\n.recharge-layer .modal-body .list-box table th {\n  width: 25%;\n  text-align: center;\n  border: none;\n  font-size: 14px;\n  padding: 4px;\n  line-height: 30px;\n}\n.recharge-layer .modal-body .list-box table tbody tr {\n  background: #6fc89c;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .list-box table tbody tr td:nth-child(2) span {\n  background: #ffffff;\n  color: #6fc89c;\n  width: 90%;\n  display: inline-block;\n  border-radius: 4px;\n}\n.recharge-layer .modal-body .list-box table tbody tr td:nth-child(3) {\n  background: #b998cd;\n  color: #ffffff;\n}\n.recharge-layer .modal-body .calc-box {\n  padding-top: 15px;\n  padding-bottom: 30px;\n}\n.recharge-layer .modal-body .calc-box ul {\n  width: 180px;\n  background: #ffffff;\n  border-left: solid 1px #e5e5e5;\n  border-top: solid 1px #e5e5e5;\n  margin: 0;\n  padding: 0;\n}\n.recharge-layer .modal-body .calc-box ul li {\n  box-sizing: border-box;\n  border-right: solid 1px #e5e5e5;\n  border-bottom: solid 1px #e5e5e5;\n  width: 33%;\n  height: 60px;\n  line-height: 60px;\n  font-size: 16px;\n  float: left;\n}\n.recharge-layer .modal-foot {\n  border-top: 1px dashed #e5e5e5;\n  padding: 10px 0px;\n  text-align: center;\n}\n.recharge-layer .modal-foot .recharge-layer-ok {\n  display: inline-block;\n  background: #6fc89c;\n  color: #ffffff;\n  padding: 10px 50px;\n  margin: 0 20px;\n}\n.recharge-layer .modal-foot .recharge-layer-cancel {\n  display: inline-block;\n  padding: 10px 50px;\n  margin: 0 20px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _RechargeList = __webpack_require__(300);
	
	var _RechargeList2 = _interopRequireDefault(_RechargeList);
	
	var _PayCard = __webpack_require__(213);
	
	var _PayCard2 = _interopRequireDefault(_PayCard);
	
	var _PayMoney = __webpack_require__(218);
	
	var _PayMoney2 = _interopRequireDefault(_PayMoney);
	
	var _PayScan = __webpack_require__(208);
	
	var _PayScan2 = _interopRequireDefault(_PayScan);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _jquery = __webpack_require__(124);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _request = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    mounted: function mounted() {},
	    data: function data() {
	        return {
	            title: "充值",
	            message: '请选择一个充值方式',
	            amount: 0,
	            giftAmount: 0,
	            diySeleted: false,
	            payMethod: null
	        };
	    },
	
	    computed: {
	        custom: function custom() {
	            return this.$store.state.currentPage.customData;
	        },
	        order: function order() {
	            return this.$store.state.currentPage.orderData;
	        },
	        shopAdminData: function shopAdminData() {
	            return this.$store.state.currentPage.shopAdminData;
	        },
	        printData: function printData() {
	
	            var print = this.$store.state.currentPage.printData;
	
	            var nowDate = new Date();
	            var myDate = nowDate.toLocaleDateString();
	            var myTime = nowDate.toLocaleTimeString();
	
	            print.cashierName = this.order.cashierName;
	            print.guiderName = this.shopAdminData.cashierName;
	            print.DateTime = myDate + " " + myTime;
	
	            return print;
	        }
	    },
	    components: {
	        RechargeList: _RechargeList2.default,
	        PayCard: _PayCard2.default,
	        PayMoney: _PayMoney2.default,
	        PayScan: _PayScan2.default
	    },
	    methods: {
	        choseAmount: function choseAmount() {
	            this.payMethod = null;
	        },
	        payScan: function payScan() {
	            this.payMethod = 12;
	        },
	        payMoney: function payMoney() {
	            this.payMethod = 10;
	        },
	        payCard: function payCard() {
	            this.payMethod = 11;
	        },
	        closeRechargeModal: function closeRechargeModal() {
	            var modal = '#layer-recharge';
	            (0, _jquery2.default)(modal).modal('hide');
	        },
	        toPrint: function toPrint() {
	            var apiObj = {
	                url: _request.API_URLS.recharge,
	                data: {
	                    phone: this.custom.username,
	                    amount: this.amount,
	                    paymentMethodId: this.payMethod
	
	                }
	            };
	            var vm = this;
	
	            _request.request.fnPost(this, apiObj, function (res) {
	                vm.$store.commit("setPrintData", res.appOrderPayment);
	                vm.$nextTick(function () {
	
	                    (0, _jquery2.default)('#qrcCode').html("");
	
	                    if (res.appOrderPayment.wechatCodeUrl) {
	                        (0, _jquery2.default)('#qrcCode').qrcode({
	                            render: "table",
	                            text: res.appOrderPayment.wechatCodeUrl,
	                            width: 260,
	                            height: 260
	                        });
	                    }
	                    vm.printPage();
	                });
	            });
	        },
	        rechargePrint: function rechargePrint() {
	            if (this.payMethod == null) {
	                _layer2.default.msg("请选择充值方式", { icon: 2 });return false;
	            }
	            if (this.amount <= 0) {
	                _layer2.default.msg("请选择充值金额", { icon: 2 });return false;
	            }
	
	            var vm = this;
	
	            _layer2.default.confirm("确认打印吗？", {
	                btn: ['确定'] }, function (index) {
	                vm.toPrint();
	                _layer2.default.close(index);
	            });
	        },
	        printPage: function printPage() {
	            var obj = document.getElementById('printDiv');
	            var docStr = obj.innerHTML;
	
	            var newWindow = window.open("./print.html", "_blank");
	
	            var styles = document.getElementById("styles").innerHTML;
	
	            var header = '<!DOCTYPE html>' + '<html lang="en">' + '<head>' + '<meta charset="UTF-8">' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">' + '<title>打印</title>' + '<style type="text/css">' + styles + '</style>' + '</head>' + '<body>';
	
	            var footer = '</body>' + '</html>';
	            docStr = header + docStr + footer;
	
	            newWindow.document.write(docStr);
	
	            newWindow.print();
	            newWindow.document.close();
	            newWindow.close();
	        }
	    }
	};

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(301)
	__vue_script__ = __webpack_require__(303)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\recharge\\RechargeList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(304)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-108b084e/RechargeList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(302);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-108b084e&scoped=true!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeList.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-108b084e&scoped=true!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./RechargeList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".col-nn-15[_v-108b084e] {\n  width: 33%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n  margin: 10px 0;\n}\n.col-nn-25[_v-108b084e] {\n  width: 50%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n  margin: 10px 0;\n}\n.rechargelist[_v-108b084e] {\n  float: left;\n  width: 100%;\n}\n.rechargelist .rechargelist-btn[_v-108b084e] {\n  font-size: 18px;\n  color: #666666;\n  padding: 10px;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn[_v-108b084e]:active {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn.select[_v-108b084e] {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn span[_v-108b084e] {\n  display: block;\n  position: relative;\n}\n.rechargelist .rechargelist-btn em[_v-108b084e] {\n  display: block;\n  color: #e84593;\n  font-size: 14px;\n  line-height: 30px;\n}\n.rechargelist .rechargelist-btn em.dis[_v-108b084e] {\n  opacity: 0.5;\n}\n.rechargelist .rechargelist-btn.diy input[_v-108b084e] {\n  width: 80%;\n  text-align: right;\n}\n.rechargelist .rechargelist-btn.diy span[_v-108b084e]:after {\n  content: '';\n  display: block;\n  width: 100%;\n  background: #999999;\n  height: 1px;\n}\n.rechargelist .rechargelist-btn.select span[_v-108b084e]:after {\n  background: #e84593;\n}\n", "", {"version":3,"sources":["/./src/app/components/recharge/RechargeList.vue"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,YAAY;EACZ,YAAY;CACb;AACD;EACE,gBAAgB;EAChB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,aAAa;CACd;AACD;EACE,WAAW;EACX,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB","file":"RechargeList.vue","sourcesContent":[".col-nn-15 {\n  width: 33%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n  margin: 10px 0;\n}\n.col-nn-25 {\n  width: 50%;\n  float: left;\n  padding-left: 8px;\n  padding-right: 7px;\n  margin: 10px 0;\n}\n.rechargelist {\n  float: left;\n  width: 100%;\n}\n.rechargelist .rechargelist-btn {\n  font-size: 18px;\n  color: #666666;\n  padding: 10px;\n  border-color: #e5e5e5;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn:active {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn.select {\n  color: #666666;\n  padding: 10px;\n  border-color: #e84593;\n  border-radius: 5px;\n  background: #ffffff;\n}\n.rechargelist .rechargelist-btn span {\n  display: block;\n  position: relative;\n}\n.rechargelist .rechargelist-btn em {\n  display: block;\n  color: #e84593;\n  font-size: 14px;\n  line-height: 30px;\n}\n.rechargelist .rechargelist-btn em.dis {\n  opacity: 0.5;\n}\n.rechargelist .rechargelist-btn.diy input {\n  width: 80%;\n  text-align: right;\n}\n.rechargelist .rechargelist-btn.diy span:after {\n  content: '';\n  display: block;\n  width: 100%;\n  background: #999999;\n  height: 1px;\n}\n.rechargelist .rechargelist-btn.select span:after {\n  background: #e84593;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	exports.default = {
	    name: 'RechargeList',
	
	    props: ["amount", "message", "giftAmount", "diySeleted"],
	    data: function data() {
	        return {
	            activityList: [{ baseline: null }, { baseline: null }, { baseline: null }, { baseline: null }, { baseline: null }],
	            selectAmount: '',
	            diyamountSeleted: false,
	            diyamount: "",
	            diyamountGift: {}
	        };
	    },
	
	    computed: {
	        rechargeMain: function rechargeMain() {
	            return this.$parent;
	        }
	    },
	    created: function created() {
	
	        this.selectAmount = this.amount;
	        this.diyamount = this.amount;
	
	        this.amountActivityList();
	    },
	
	    methods: {
	        chooseAmount: function chooseAmount(a) {
	            if (a) {
	                this.selectAmount = a.baseline;
	                this.diyamountSeleted = false;
	
	                this.rechargeMain.amount = this.selectAmount;
	
	                if (a.amount) {
	                    this.rechargeMain.giftAmount = "赠送 ¥ " + a.amount;
	                } else {
	                    this.rechargeMain.giftAmount = "无赠送活动";
	                }
	            } else if (this.diyamount) {
	                this.selectAmount = '';
	                this.diyamountSeleted = true;
	            }
	        },
	        amountActivityList: function amountActivityList() {
	
	            var vm = this;
	            var diy = vm.diyamountSeleted;
	            var apiObj = {
	                url: _request.API_URLS.recharge,
	                data: {
	                    amount: diy ? vm.diyamount : ''
	                }
	            };
	
	            _request.request.fnGet(apiObj).then(function (res) {
	                console.log(res);
	                if (diy && res.list && res.list.length) {
	                    vm.diyamountGift = res.list[0];
	                    vm.rechargeMain.amount = vm.diyamount;
	                    vm.rechargeMain.giftAmount = "赠送 ¥" + vm.diyamountGift.amount;
	                } else {
	                    vm.activityList = res.list;
	                }
	            });
	        },
	        changeDiy: function changeDiy() {
	            this.selectAmount = 0;
	            this.diyamountSeleted = true;
	            this.amountActivityList();
	        }
	    }
	};

/***/ },
/* 304 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"rechargelist clearfix\" _v-108b084e=\"\">\n    <div class=\"row\" _v-108b084e=\"\">\n         <p v-if=\"!activityList\" _v-108b084e=\"\">加载中...</p>\n         <p v-else-if=\"activityList.length==0\" _v-108b084e=\"\">没有活动</p>\n         <div v-else=\"\" class=\"col-nn-15\" v-for=\"activity in activityList\" _v-108b084e=\"\">\n                 <a class=\"btn btn-default btn-block rechargelist-btn\" :class=\"{select:selectAmount == activity.baseline}\" @click=\"chooseAmount(activity)\" _v-108b084e=\"\">\n                     <span _v-108b084e=\"\">¥ {{activity.baseline}}</span>\n                     <em v-if=\"activity.amount\" _v-108b084e=\"\">赠 ¥{{activity.amount}}</em>\n                     <em v-else=\"\" class=\"dis\" _v-108b084e=\"\">无赠送活动</em>\n                 </a>\n         </div>\n    </div>\n</div>\n";

/***/ },
/* 305 */
/***/ function(module, exports) {

	module.exports = "\n<div role=\"dialog\" class=\"modal fade recharge-layer\" id=\"layer-recharge\">\n    <div class=\"modal-dialog \">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">充值</h4>\n                <a class=\"close\" data-dismiss=\"modal\">&times;</span></a>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-nn-30  left-con\">\n                        <div class=\"recharge-menu\">\n                            <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==12}\"  @click=\"payScan\"><span class=\"iconfont icon-qr2\" aria-hidden=\"true\"></span> 扫码</a>\n                            <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==10}\"  @click=\"payMoney\"><span class=\"iconfont icon-icon\" aria-hidden=\"true\"></span>现金</a>\n                            <a  class=\"btn btn-default scan-btn btn-block\" :class=\"{on:payMethod==11}\"  @click=\"payCard\" ><span class=\"iconfont icon-xinyongqiahuankuan\" aria-hidden=\"true\"></span>刷卡</a>\n                        </div>\n                    </div>\n                    <div class=\"col-nn-70 right-con\">\n                            <recharge-list  :amount=\"amount\" :gift-amount=\"giftAmount\" :message=\"message\" ></recharge-list>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-foot\">\n                <a class=\"btn btn-default recharge-layer-ok\" @click=\"rechargePrint\">确定</a>\n                <a class=\"btn btn-default recharge-layer-cancel\" @click=\"closeRechargeModal\" >取消</a>\n            </div>\n\n\n        </div>\n    </div>\n    <div class=\"printDiv\" id=\"printDiv\" style=\"position:absolute; display: none;  pointer-events: none; width: 320px; font-size:12px;   z-index:9999; left: 0; top:0; background: #ffffff\">\n        <div class=\"print-box show\" >\n\n            <table class=\"printtable\">\n                <caption class=\"text-left\">\n                    <h5>{{printData.DateTime}}</h5>\n                    <h5>订单号 {{printData.sn}}</h5>\n                </caption>\n                <tbody >\n                <tr>\n                    <td colspan=\"2\" class=\"text-left block\">阿喔优品公司</td>\n                </tr>\n                <tr v-show=\"printData.cashierName\">\n                    <td colspan=\"2\" class=\"text-left block\">营业员：{{printData.cashierName}}</td>\n                </tr>\n                <tr v-show=\"printData.customer\">\n                    <td colspan=\"2\" class=\"text-left block\">顾客：{{printData.customer}}</td>\n                </tr>\n                <tr v-show=\"printData.guiderName\">\n                    <td colspan=\"2\" class=\"text-left  block\">导购员：{{printData.guiderName}}</td>\n                </tr>\n                <tr class=\"split\">\n                    <td>充值</td>\n                    <td>¥ {{printData.amount}}</td>\n                </tr>\n                <tr class=\"split\">\n                    <td>返利</td>\n                    <td>¥ {{printData.giftAmount}}</td>\n                </tr>\n                <tr class=\"split\">\n                    <td>付款方式</td>\n                    <td>{{printData.paymentName}}</td>\n                </tr>\n                </tbody>\n            </table>\n\n            <p class=\"text-center\" v-if=\"printData.wechatCodeUrl\">请微信扫码付款</p>\n            <div id=\"qrcCode\"></div>\n\n        </div>\n    </div>\n\n    <div style=\"display: none\" id=\"styles\">\n        *{padding:0; margin:0;}\n        .print-box {width: 260px; padding:100px 15px; margin:0 auto; font-size: 16px; }\n        .print-box  h5{font-size: 18px; line-height:30px;}\n        .print-box  table.printtable{ width: 100%; display: block;position: relative; line-height: 24px; font-family:'黑体' }\n        .print-box  table.printtable tbody,.print-box  table.printtable caption{display: block; font-size: 18px;}\n        .print-box  table.printtable .strong{font-weight: bold; font-size: 16px;}\n        .print-box  table.printtable .split{   }\n        .print-box  table.printtable tr{ display:block;clear: left;}\n        .print-box  table.printtable:after{visibility:hidden;display:block;font-size:0;content:\" \";clear:both;height:0;}\n        .print-box  table.printtable{*zoom:1;}\n        .print-box  table.printtable td:last-child{display: block; width: 40%;float: left; position: relative; text-align: right;}\n        .print-box  table.printtable td:first-child{display: block; width: 60%;float: left; position: relative;}\n        .print-box  table.printtable span:last-child{display: inline-block; width:20%; float:right;  }\n        .print-box  table.printtable span:first-child{display: inline-block; width:80%; float: left;}\n        .print-box  table.printtable td.block{width:100% !important;   clear:both; text-align:center;  }\n        .print-box  .text-center {text-align: center !important;}\n        .print-box  .text-right {text-align: right !important;}\n        .print-box  .text-left {text-align: left !important;}\n        .print-box  p {margin-top:10px;}\n        .print-box  #qrcCode{ margin-left:0px; margin-top:10px; }\n    </div>\n</div>\n";

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(307)
	__webpack_require__(309)
	__vue_script__ = __webpack_require__(311)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\message\\MsgModal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(312)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0d44fe92/MsgModal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(308);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MsgModal.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MsgModal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"MsgModal.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(310);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./MsgModal.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./MsgModal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".msg-pop {\n  position: absolute;\n  top: 40px;\n  right: 4%;\n  width: 424px;\n  height: auto;\n  background: #fff;\n  z-index: 9999;\n  border: solid 1px #ddd;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.msg-pop .msg-pop-close {\n  right: 0px;\n  top: 0;\n  position: absolute;\n}\n.msg-pop h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.msg-pop em {\n  position: absolute;\n  right: 20px;\n  top: 45px;\n}\n.msg-pop p {\n  width: 85%;\n  color: #333333;\n}\n.msg-pop span {\n  display: block;\n  color: #999999;\n  margin-top: 5px;\n}\n.msg-pop .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.msg-pop .r {\n  text-align: right;\n}\n.msg-pop .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.msg-pop .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n", "", {"version":3,"sources":["/./src/app/components/message/MsgModal.vue"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,UAAU;EACV,UAAU;EACV,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,cAAc;EACd,uBAAuB;EACvB,mBAAmB;EACnB,cAAc;EACd,eAAe;CAChB;AACD;EACE,WAAW;EACX,OAAO;EACP,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;CACZ;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CACX;AACD;EACE,WAAW;EACX,eAAe;CAChB;AACD;EACE,eAAe;EACf,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,aAAa;EACb,kBAAkB;EAClB,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,0BAA0B;EAC1B,eAAe;EACf,mBAAmB;EACnB,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;CACnB","file":"MsgModal.vue","sourcesContent":[".msg-pop {\n  position: absolute;\n  top: 40px;\n  right: 4%;\n  width: 424px;\n  height: auto;\n  background: #fff;\n  z-index: 9999;\n  border: solid 1px #ddd;\n  border-radius: 3px;\n  padding: 12px;\n  color: #333333;\n}\n.msg-pop .msg-pop-close {\n  right: 0px;\n  top: 0;\n  position: absolute;\n}\n.msg-pop h3 {\n  color: #e84593;\n  margin: 0;\n  font-size: 18px;\n  line-height: 30px;\n  width: 85%;\n}\n.msg-pop em {\n  position: absolute;\n  right: 20px;\n  top: 45px;\n}\n.msg-pop p {\n  width: 85%;\n  color: #333333;\n}\n.msg-pop span {\n  display: block;\n  color: #999999;\n  margin-top: 5px;\n}\n.msg-pop .c {\n  height: 80px;\n  line-height: 20px;\n  overflow: hidden;\n}\n.msg-pop .r {\n  text-align: right;\n}\n.msg-pop .btn-agree {\n  border: solid 1px #6fc89c;\n  color: #6fc89c;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n.msg-pop .btn-refuse {\n  border: solid 1px #e84593;\n  color: #e84593;\n  position: relative;\n  display: inline;\n  margin-right: 12px;\n  margin-left: 12px;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "MsgPop",
	    data: function data() {
	        return {};
	    },
	    created: function created() {},
	
	    computed: {
	        msgList: function msgList() {
	            console.log(this.$store.state.msgData.appUnconfirmList);
	            return this.$store.state.msgData.appUnconfirmList;
	        }
	    },
	    methods: {
	        fetchList: function fetchList() {
	            if (!this.searchItem.keyword) {
	                return;
	            }
	            var vm = this;
	
	            var apiObj = {
	                url: API_URLS.products,
	                data: {
	                    'categoryId': vm.productParams.categoryId,
	                    'brandId': vm.productParams.brandId,
	                    'pageNum': 1,
	                    'keyword': vm.searchItem.keyword
	                }
	            };
	
	            request.fnGet(vm, apiObj, function (res) {
	                vm.$store.commit("setProductParams", { "searchStr": vm.searchItem.keyword, "pageNum": 1 });
	                vm.$store.commit("setPageData", res.page);
	            });
	        },
	        checkAllocation: function checkAllocation(allocationId, status, mindex) {
	            var _this = this;
	
	            if (!allocationId) {
	                _layer2.default.alert("该批准号无效", { icon: 2 });
	                return false;
	            }
	            var params = {
	                'allocationId': allocationId,
	                'status': status,
	                'memo': ''
	            };
	
	            this.$store.dispatch("approvalAllocation", params).then(function (res) {
	                _layer2.default.alert("操作成功", { icon: 1, closeBtn: false, yes: function yes(index) {
	                        _layer2.default.closeAll();
	                    } });
	                _this.memo = '';
	                _this.msgList.splice(mindex, 1);
	            }).catch(function (res) {
	                _layer2.default.alert("操作失败", { icon: 1, closeBtn: false, yes: function yes(index) {
	                        _layer2.default.closeAll();
	                    } });
	                _this.memo = '';
	            });
	        },
	        closeMsg: function closeMsg() {
	
	            this.$root.showMsgModal = false;
	            this.$root.$refs.addMsglistener();
	        }
	    }
	};

/***/ },
/* 312 */
/***/ function(module, exports) {

	module.exports = "\n\t    <div class=\"msg-pop\" v-if=\"msgList.length>0\">\n          <div v-for=\"(item,index) in msgList\">\n             <a class=\"btn msg-pop-close\" @click=\"closeMsg\">&times;</a>\n             <h3>{{item.shopName}}的申请调拨</h3>\n             <div class=\"c\">\n                 <p>{{item.productName}}</p>\n                 <p>备注：{{item.applyMemo}}</p>\n                 <span>数量 {{item.num}}</span>\n                 <span>{{item.createDate}}</span>\n             </div>\n             <div class=\"r\">\n                 <a class=\"btn btn-agree\" @click=\"checkAllocation(item.id,'agreed',index)\">同意</a>\n                 <a class=\"btn btn-refuse\" @click=\"checkAllocation(item.id,'refused',index)\">拒绝</a>\n             </div>\n          </div>\n     </div>\n";

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(314)
	__vue_script__ = __webpack_require__(316)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\log\\LogModal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(317)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-20d60adc/LogModal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(315);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogModal.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./LogModal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!item modale*/\n.layer-log {\n  width: 640px;\n  height: 360px;\n  padding: 15px;\n  position: relative;\n  display: none;\n  overflow: hidden;\n  background: #f7f7f7;\n}\n.layer-log .grid {\n  height: 120px;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border: solid 1px #e5e5e5;\n  border-radius: 3px;\n  background: #ffffff;\n}\n.layer-log .grid .t {\n  padding: 6px;\n  color: #808080;\n  line-height: 20px;\n  position: relative;\n}\n.layer-log .grid .t span {\n  color: #e84593;\n  float: right;\n}\n.layer-log .grid .c {\n  border-top: solid 1px #e5e5e5;\n  position: relative;\n  line-height: 20px;\n  height: 80px;\n  padding: 5px;\n  clear: both;\n}\n.layer-log .grid .c p {\n  color: #e84593;\n}\n.layer-log .grid .c .more {\n  position: absolute;\n  right: 6px;\n  bottom: 6px;\n  color: #808080;\n}\n.layer-log .log-table {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n}\n.layer-log .log-table:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-table:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-table.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out {\n  left: 160px;\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 120px;\n  padding-right: 120px;\n}\n.layer-log .log-out:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out:hover,\n.layer-log .log-out:active {\n  padding-left: 120px;\n  padding-right: 120px;\n}\n.norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n", "", {"version":3,"sources":["/./src/app/components/log/LogModal.vue"],"names":[],"mappings":"AAAA,gBAAgB;AAChB;EACE,aAAa;EACb,cAAc;EACd,cAAc;EACd,mBAAmB;EACnB,cAAc;EACd,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,iBAAiB;EACjB,oBAAoB;EACpB,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,aAAa;CACd;AACD;EACE,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,aAAa;EACb,aAAa;EACb,YAAY;CACb;AACD;EACE,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,eAAe;CAChB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,YAAY;EACZ,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;CACtB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,oBAAoB;EACpB,qBAAqB;CACtB;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB","file":"LogModal.vue","sourcesContent":["/*!item modale*/\n.layer-log {\n  width: 640px;\n  height: 360px;\n  padding: 15px;\n  position: relative;\n  display: none;\n  overflow: hidden;\n  background: #f7f7f7;\n}\n.layer-log .grid {\n  height: 120px;\n  margin-top: 12px;\n  margin-bottom: 12px;\n  border: solid 1px #e5e5e5;\n  border-radius: 3px;\n  background: #ffffff;\n}\n.layer-log .grid .t {\n  padding: 6px;\n  color: #808080;\n  line-height: 20px;\n  position: relative;\n}\n.layer-log .grid .t span {\n  color: #e84593;\n  float: right;\n}\n.layer-log .grid .c {\n  border-top: solid 1px #e5e5e5;\n  position: relative;\n  line-height: 20px;\n  height: 80px;\n  padding: 5px;\n  clear: both;\n}\n.layer-log .grid .c p {\n  color: #e84593;\n}\n.layer-log .grid .c .more {\n  position: absolute;\n  right: 6px;\n  bottom: 6px;\n  color: #808080;\n}\n.layer-log .log-table {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n}\n.layer-log .log-table:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-table:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-table.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out {\n  left: 160px;\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 120px;\n  padding-right: 120px;\n}\n.layer-log .log-out:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-log .log-out:hover,\n.layer-log .log-out:active {\n  padding-left: 120px;\n  padding-right: 120px;\n}\n.norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    name: "LogModal",
	    computed: {
	        shopData: function shopData() {
	            return this.$store.state.shopData;
	        }
	    },
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    data: function data() {
	        return {
	            logData: {}
	
	        };
	    },
	    created: function created() {
	        this.fetchLog();
	    },
	
	    methods: {
	        logTo: function logTo(type) {
	            _layer2.default.closeAll();
	            this.$store.commit("setMode", 'log/' + type);
	            this.$router.replace('/log/' + type);
	        },
	        fetchLog: function fetchLog() {
	            var _this = this;
	
	            this.$store.dispatch('fetchLog', { "type": "all" }).then(function (res) {
	                _this.logData = res.appShiftInfo;
	                console.log(res);
	            });
	        },
	        logOut: function logOut() {
	            this.$root.$refs.header.exit();
	        }
	    }
	};

/***/ },
/* 317 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"layer-log-box\" class=\"layer-log\">\n    <div class=\"row\">\n        <div class=\"col-xs-6\">\n            <div class=\"grid\">\n                <div class=\"t\">应有现金 <span>{{logData.endSpareCash | currency}}</span></div>\n                <div class=\"c\">\n                    <p>店内订单现金收款： {{logData.orderCashPay | currency}}</p>\n                    <a class=\"more\" @click=\"logTo('cash')\">查看详细 ></a>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-xs-6\">\n            <div class=\"grid\">\n                <div class=\"t\">总销售额 <span>{{logData.totalSales | currency}}</span></div>\n                <div class=\"c\">\n                    <p>收银端销售额： {{logData.totalSales | currency}}</p>\n                    <a class=\"more\" @click=\"logTo('sales')\">查看详细 ></a>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-xs-6\">\n            <div class=\"grid\">\n                <div class=\"t\">充值 <span>{{logData.totalRecharge | currency}}</span></div>\n                <div class=\"c\">\n                    <p>现金充值： {{logData.rechargeCashPay | currency}}</p>\n                    <a class=\"more\" @click=\"logTo('recharge')\">查看详细 ></a>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-xs-6\">\n            <div class=\"grid\">\n                <div class=\"t\">促销统计 <span>{{logData.promotion | currency}}</span></div>\n                <div class=\"c\">\n                    <a class=\"more\" @click=\"logTo('promotion')\">查看详细 ></a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <a class=\"btn log-table\" @click=\"logTo('products')\">销售商品报表</a>\n            <a class=\"btn log-out\" @click=\"logOut()\">交接班并退出</a>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(319)
	__vue_script__ = __webpack_require__(321)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src\\app\\components\\cash\\CashModal.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(326)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3d65da82/CashModal.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(320);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CashModal.vue", function() {
				var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js!../../../../node_modules/less-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CashModal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!item modale*/\n.layer-cash {\n  width: 400px;\n  height: 300px;\n  padding: 12px;\n  display: none;\n  overflow: hidden;\n  background: #f7f7f7;\n}\n.layer-cash .t {\n  line-height: 20px;\n}\n.layer-cash .c {\n  height: 200px;\n  padding: 12px;\n  color: #e84593;\n}\n.layer-cash .c .form-title {\n  text-align: center;\n  height: 60px;\n}\n.layer-cash .c p {\n  font-size: 16px;\n  line-height: 40px;\n}\n.layer-cash .c small {\n  color: #808080;\n  top: -20px;\n  line-height: 20px;\n  position: relative;\n}\n.layer-cash .c span {\n  margin-left: 12px;\n  font-size: 24px;\n  line-height: 40px;\n}\n.layer-cash .c .btn-text {\n  padding-right: 0px;\n  position: relative;\n}\n.layer-cash .c .btn-text:after {\n  content: '\\A5';\n  position: absolute;\n  left: 24px;\n  top: 12px;\n}\n.layer-cash .c .btn-text .form-control {\n  padding-left: 24px;\n  color: #e84593;\n}\n.layer-cash .c .btn {\n  position: relative;\n  display: inline-block;\n  color: #e84593;\n  outline: none;\n  width: 35px;\n  height: 45px;\n  text-align: center;\n  font-size: 20px;\n  line-height: 45px;\n  padding: 0;\n}\n.layer-cash .f {\n  height: 80px;\n}\n.layer-cash .f .cash-ok {\n  position: relative;\n  display: inline-block;\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.layer-cash .f .cash-ok:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok:hover,\n.layer-cash .f .cash-ok:active {\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n", "", {"version":3,"sources":["/./src/app/components/cash/CashModal.vue"],"names":[],"mappings":"AAAA,gBAAgB;AAChB;EACE,aAAa;EACb,cAAc;EACd,cAAc;EACd,cAAc;EACd,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,cAAc;EACd,cAAc;EACd,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,eAAa;EACb,mBAAmB;EACnB,WAAW;EACX,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,sBAAsB;EACtB,eAAe;EACf,cAAc;EACd,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;CACZ;AACD;EACE,aAAa;CACd;AACD;EACE,mBAAmB;EACnB,sBAAsB;EACtB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;;EAEE,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB","file":"CashModal.vue","sourcesContent":["/*!item modale*/\n.layer-cash {\n  width: 400px;\n  height: 300px;\n  padding: 12px;\n  display: none;\n  overflow: hidden;\n  background: #f7f7f7;\n}\n.layer-cash .t {\n  line-height: 20px;\n}\n.layer-cash .c {\n  height: 200px;\n  padding: 12px;\n  color: #e84593;\n}\n.layer-cash .c .form-title {\n  text-align: center;\n  height: 60px;\n}\n.layer-cash .c p {\n  font-size: 16px;\n  line-height: 40px;\n}\n.layer-cash .c small {\n  color: #808080;\n  top: -20px;\n  line-height: 20px;\n  position: relative;\n}\n.layer-cash .c span {\n  margin-left: 12px;\n  font-size: 24px;\n  line-height: 40px;\n}\n.layer-cash .c .btn-text {\n  padding-right: 0px;\n  position: relative;\n}\n.layer-cash .c .btn-text:after {\n  content: '¥';\n  position: absolute;\n  left: 24px;\n  top: 12px;\n}\n.layer-cash .c .btn-text .form-control {\n  padding-left: 24px;\n  color: #e84593;\n}\n.layer-cash .c .btn {\n  position: relative;\n  display: inline-block;\n  color: #e84593;\n  outline: none;\n  width: 35px;\n  height: 45px;\n  text-align: center;\n  font-size: 20px;\n  line-height: 45px;\n  padding: 0;\n}\n.layer-cash .f {\n  height: 80px;\n}\n.layer-cash .f .cash-ok {\n  position: relative;\n  display: inline-block;\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #6fc89c;\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.layer-cash .f .cash-ok:hover {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok:active {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok.select {\n  color: #ffffff;\n  padding: 12px;\n  border-color: #cccccc;\n  border-radius: 3px;\n  background: #3a9769;\n}\n.layer-cash .f .cash-ok:hover,\n.layer-cash .f .cash-ok:active {\n  padding-left: 60px;\n  padding-right: 60px;\n}\n.norow {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _defineProperty2 = __webpack_require__(322);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _name$computed$filter;
	
	var _request = __webpack_require__(15);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _layer = __webpack_require__(89);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (_name$computed$filter = {
	    name: "CashModal",
	    computed: {
	        shopData: function shopData() {
	            return this.$store.state.shopData;
	        }
	    },
	    filters: {
	        currency: function currency(value) {
	            if (!value) return '0.00';
	            return '¥ ' + Number(value).toFixed(2);
	        }
	    },
	    data: function data() {
	        return {
	            password: "",
	            spareCash: 0
	        };
	    },
	    created: function created() {
	        var _this = this;
	
	        this.$store.dispatch('fetchLog', { "type": "all" }).then(function (res) {
	
	            _this.$store.state.shopData.spareCash = Number(res.appShiftInfo.endSpareCash);;
	        });
	    }
	}, (0, _defineProperty3.default)(_name$computed$filter, 'filters', {
	    currency: function currency(value) {
	        if (!value) return '';
	        return '¥ ' + value;
	    }
	}), (0, _defineProperty3.default)(_name$computed$filter, 'methods', {
	    add: function add(val) {
	        var tmp = Number(this.spareCash);
	        tmp += Number(val);
	        this.spareCash = tmp;
	    },
	    minus: function minus(val) {
	        var tmp = Number(this.spareCash);
	        tmp -= Number(val);
	        if (tmp < 0) {
	            tmp = 0;
	        }
	        this.spareCash = tmp;
	    },
	    addCash: function addCash() {
	        var _this2 = this;
	
	        if (this.spareCash == 0) {
	            _layer2.default.alert("请输入备用金", { icon: 2 });
	            return false;
	        }
	        if (!this.password) {
	            _layer2.default.alert("请输入密码", { icon: 2 });
	            return false;
	        }
	        this.$store.dispatch("addSpareCash", { password: this.password, spareCash: this.spareCash }).then(function (res) {
	
	            _layer2.default.alert("成功", { icon: 1, closeBtn: false, yes: function yes(index) {
	                    _layer2.default.closeAll();
	                } });
	            _this2.password = "";
	            _this2.spareCash = 0;
	            var needSpareCash = false;
	            if (res.spareCash <= 0) {
	                needSpareCash = true;
	            }
	
	            _this2.$store.commit('setShopData', { 'spareCash': Number(res.spareCash), 'needSpareCash': needSpareCash });
	
	            _util2.default.pushLocal('shopData', _this2.shopData);
	        }).catch(function (res) {
	            var msg = res.errmsg || res.msg;
	            _layer2.default.alert(msg, { icon: 2, closeBtn: false, yes: function yes(index) {
	                    _layer2.default.closeAll();
	                } });
	        });
	    }
	}), _name$computed$filter);

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(323);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(324), __esModule: true };

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(325);
	var $Object = __webpack_require__(14).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(25);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(34), 'Object', {defineProperty: __webpack_require__(30).f});

/***/ },
/* 326 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"layer-cash-box\" class=\"layer-cash\">\n\n    <div class=\"t text-center\">\n        备用金\n    </div>\n    <div class=\"c form-horizontal\">\n            <div class=\"col-xs-12 form-title\">\n                <p>当前备用金 <span>{{shopData.spareCash }}</span></p>\n                <small>注意：备用金为0时无法现金支付找零</small>\n            </div>\n            <div class=\"form-group \">\n                <div class=\"col-xs-9 btn-text\">\n                    <input type=\"tel\" class=\"form-control text-right input-lg\"  autocomplete=\"off\" v-model=\"spareCash\" >\n                </div>\n                <div class=\"col-xs-3 btn-group\">\n                    <input class=\"btn btn-default btn-lg\" type=\"button\" value=\"+\" @click=\"add(100)\" >\n                    <input class=\"btn btn-default btn-lg\" type=\"button\" value=\"-\" @click=\"minus(100)\">\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-12\">\n                    <input type=\"password\" class=\"form-control input-lg\" v-model=\"password\" placeholder=\"请输入店长密码\" autocomplete=\"off\"  @keyup.enter=\"addCash()\" >\n                </div>\n            </div>\n    </div>\n    <div class=\"f text-center\">\n        <a class=\"btn cash-ok\" @click=\"addCash()\">确认</a>\n    </div>\n</div>\n";

/***/ }
]);
//# sourceMappingURL=index.js.map