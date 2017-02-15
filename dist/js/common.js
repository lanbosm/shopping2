/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		3:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"bill","1":"header","2":"index"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/js/";
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
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

/***/ }

/******/ });
//# sourceMappingURL=common.js.map