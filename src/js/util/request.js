/**
 * Created by Administrator on 2017/2/6.
 * wiki http://www.cnblogs.com/keepfool/p/5625583.html
 */
//wiki es6  http://blog.csdn.net/lihongxun945/article/details/49031383
//vue-resource https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
//then http://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/
import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../vuex/store'
import { Message } from 'element-ui';



//import * as data from '../util/mock';
//http请求
Vue.use(VueResource);

/**
 * 接口签名
 * @type {string}
 */
const apiSecrect = "2a97eede0fd2de9791859f61ea6c98dd";


//export const HOST = "http://localhost:3000"; //http://192.168.1.199:82/
//export const HOST = "http://192.168.1.99:82"; //http://192.168.1.199:82/
//export const HOST = "http://zgq2017-xwbz.tunnel.qydev.com"; //http://192.168.1.199:82/
// export const HOST = "http://cs.awo123.cn"; //http://192.168.1.199:82/
const HOST_main="http://101.201.68.160:9898";              //主服务器

//const HOST_main="http://192.168.1.122:9898";
//const HOST_main="http://192.168.1.122:82";              //主服务器
//const HOST_main="http://cs.awo123.cn";              //主服务器
//const HOST_main="http://lucxx.tunnel.qydev.com:80";              //主服务器
//const HOST_back="http://cs.awo123.cn";                 //备服务
let switchBack=false;


export const HOST=HOST_main;

//export const HOST="";
export const API_URLS = {
    public_key:"/cashier/common/public_key",
    login:"/cashier/login",
    login_out:"/cashier/common/log_out",
    products: "/cashier/member/products",
    customers:"/cashier/member/customers",               //会员模块
    category:"/cashier/member/products/categories",               //分类
    recharge:"/cashier/member/recharge",//充值
    shop_admins:'/cashier/member/shop_admins',       //员工
    b2c_orders:'/cashier/member/b2c_orders',                   //订单模块
    b2b_orders:'/cashier/member/b2b_orders',                   //订单模块
    payments:'/cashier/member/payments',                        //验证支付
    log_out:'/cashier/common/log_out',
    cashier_shift:'/cashier/member/cashier_shift' ,                    //零售订单
    consigns:'/cashier/member/consigns',   //提取货接口
    send:'/cashier/common/send_code',
    shop_setting:'/cashier/member/shop_setting',
    ads:'/cashier/member/ads',
    takepost:'/cashier/member/consigns/take',
    activity:'/cashier/member/activity',
    areas:'/cashier/member/common/areas'

};

//Vue.http.options.emulateJSON = true; //json模式
Vue.http.options.timeout = 3000;  //500超时
/**
 * 四大金刚
 * @type {{fnGet: request.fnGet, fnPost: request.fnPost, fnPut: request.fnPut, fnDelete: request.fnDelete}}
 */

export const request = {

    //通信错误方法
    fnError(response){
        store.commit('hide_waiting');

        switch (response.data.code) {

            case 49001:
                store.dispatch('logoutUnexpected');
                response.data.msg= "身份授权已过期，请重新登录";
                Message({
                    message: response.data.msg,
                    type: 'warning'
                });
                break;
            default:
                console.log("Server error");
                response.data={"msg": "网络中断，请检查网络连接，确保网络畅通"};

        }

        return response;
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

                    return this.fnError(response);
               })
        });
    },

    //开发的get方法
    fnGet_dev(apiObj,host) {

        if(!host){host=HOST_main;}
        console.log('get:'+host+apiObj.url);
        return  Vue.http.get(host+apiObj.url, {
                params: apiObj.data,
                headers: {'Content-Type': 'application/json'},
            }).catch(response=> { //失败
                if( !switchBack || host==HOST_back){
                    return this.fnError(response);
                }else {
                    return this.fnGet_dev(apiObj, HOST_back);
                }
            })

    },
    //开发的post方法
    fnPost_dev (apiObj,host) {

        if(!host){host=HOST_main;}
        console.log('post:'+host+apiObj.url);
        return  Vue.http.post(host+apiObj.url, apiObj.data, {
            params: apiObj.data,
            headers: {'Content-Type': 'application/json'}
        }).catch(response=> { //失败
            if(!switchBack || host==HOST_back){
                return this.fnError(response);
            }else {
                return this.fnPost_dev(apiObj, HOST_back);
            }
        })
    },
    //开发的post方法
    fnPost_form_dev(apiObj,host) {

        if(!host){host=HOST_main;}
        console.log('post:'+host+apiObj.url);
        return  Vue.http.post(host+apiObj.url, apiObj.data, {
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            params: apiObj.data,
        }).then(res=>{

        }).catch(response=> { //失败
            if(!switchBack || host==HOST_back){
                return this.fnError(response);
            }else {
                return this.fnPost_form_dev(apiObj, HOST_back);
            }
        })
    },

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
                MessageBox.alert("服务器连接失败",{ type: 'error'});
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
                MessageBox.alert("服务器连接失败",{ type: 'error'});
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
                MessageBox.alert("服务器连接失败",{ type: 'error'});
            })
    }
};



/**
 * 全局Vue拦截器
 */
Vue.http.interceptors.push(function (req, next) {

    let accessToken = window.localStorage.getItem("accessToken");
    if (req && accessToken  ) {
        if (!req.params) {
            req.params = {};
        }
        if(typeof req.params.oAuth == 'undefined'){
            req.params.oAuth=true;
        }
        req.params['accessToken'] =accessToken + '';

    }


    next(function (res) {

        if (res.data && res.data.code == 49001 && req.params.oAuth && store.state.login) {

            return  request.fnError(res);
        }
        else {
            return res;
        }
    });
});


