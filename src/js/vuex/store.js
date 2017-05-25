


import Vue from 'vue'
import Vuex from 'vuex'
import {request, API_URLS, HOST} from 'util/request.js'
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js'
import util from 'util/util.js'
import router from '../router'

// import actions from './action.js'

Vue.use(Vuex)


//vue 定义全局变量
const store = new Vuex.Store({
   // actions,
  //共有数据
  state: {
    login:false, //=>accessToken
    waiting:false,
    shopCount:1,
    headIndex:0,
    activeId:{
        number:1
    },
    flag:{
        addflag:true
    },
    shopData:{
        "name":"",
        "adminName":""
    },
    msgTimer:null, //监听消息
    msgData:{
        appUnconfirmList:[],
        msgNum:0
    },
    member:{
        shopName:''
    },
    itemData:{
        appProductDetail:{},
        appSpecifications:[],
    },
    itemRepertory:{
          needQuantity:0,
          appRepertories:[]
    },
    localList:[], //本地数据集合
    pageList:[],  //内存数据集合

    //子类数据
    currentPage:{   //当前数据节点
          index:0,
          mode:"index",
    },
  },
   // 变量赋值
  mutations:{
      setLoading(state,data){
         state.loading=data;
      },
      setShopData(state,data){
          Object.assign(state.shopData,data);
      },
      setMsgData(state,data){
          state.msgData.appUnconfirmList=state.msgData.appUnconfirmList.concat(data.appUnconfirmList);
          state.msgData.msgNum=data.msgNum;
      },
      setMode(state,data){
          state.currentPage.mode=data;
      },
      setActive(state,data){
         state.activeId=data;
      },
      setaddflag(state,data){
          state.flag=data;
      },
      setPageData (state,data){
          state.currentPage.pageData=data; //存在内存
      },
      setItemData (state,data){
          state.itemData=data;
      },
      setCategoryData (state,data){
          state.categoryData=data;
      },
      setProductParams (state,data){
          Object.assign(state.currentPage.list,data);
      },
      setOrderParams(state,data){
          Object.assign(state.currentPage.orderParams,data);
      },
      setOrderData(state, data){
          state.currentPage.orderData = data;
      },
      setPrintData(state, data){
          state.currentPage.printData = data;
      },
      setCustomData(state, data){
          state.currentPage.customData = data;
          state.currentPage.orderParams.memberId = data.id;
      },
      setShopAdminData(state, data){
          state.currentPage.shopAdminData = data;
      },
      setLogData(state,data){
          state.currentPage.logData = data;
      },
      setpersonalData(state,data){
         state.currentPage.personalData=data;
      },
      setstockData(state,data){
          state.currentPage.stockData=data;
      },
      setTakeData(state,data){
         state.currentPage.takeData=data;
      },
      setPageList(state, data){
          state.pageList = data;
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      // 全局waiting
      show_waiting(state){
          state.waiting = true;
      },
      hide_waiting(state){
          state.waiting = false;
      },
      // 列表waiting
      set_list_waiting(state,value){
          state.currentPage.listLoading = value;
      },
      getLocalList(state){
          var lastData=util.pullLocal('lastData');
          if(lastData) {
              state.localList = lastData.list;
              state.headIndex = lastData.index;
              state.shopCount = lastData.count;
          }
      },
      setLocalList(state,value){
          state.localList=value;
          var data={
              'index':state.headIndex,
              'count':state.shopCount,
              'list':state.localList,
          }
          util.pushLocal('lastData',data);
      }
    },
    actions: {

        //获得公有秘钥
        getPublicKey({commit}){
            commit("show_waiting");
            var  apiObj={
                url:API_URLS.public_key,
            };
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    if(res.code=="20000"){
                        resolve(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res); //这里可以尝试扩展备用接口
                })
            });
        },
        addSpareCash({dispatch,commit},value){
            return dispatch('getPublicKey').then(res => {
                  var  publicKey=res.data;
                  var  rsaKey = new RSAKey();
                  rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                  var  enPwd = hex2b64(rsaKey.encrypt(value.password));

                  var  apiObj={
                        url:API_URLS.cashier_shift,
                        data:{
                            'enPasswd':enPwd,
                            'tmpKey':publicKey.tmpKey,
                            'spareCash':value.spareCash
                        }
                  };

                return new Promise((resolve, reject) => {

                    request.fnPost2(apiObj).then(res => { //成功
                        if(res.code=="20000"){
                            commit("hide_waiting");

                            resolve(res);
                        }else{
                            commit("hide_waiting");
                            reject(res);
                        }
                    }).catch( res=> { //失败
                        commit("hide_waiting");
                        reject(res); //这里可以尝试扩展备用接口
                    })
                });

            })
        },
        //重置密码
        reset({dispatch,commit},value){
            return dispatch('getPublicKey').then(res => {
                var  publicKey=res.data;
                var  rsaKey = new RSAKey();
                rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                var  enPwd = hex2b64(rsaKey.encrypt(value.enPassword));

                var  apiObj={
                    url:API_URLS.customers+'/reset',
                    data:{
                        'enPassword':enPwd,
                        'tmpKey':publicKey.tmpKey,
                        'verifCode':value.verifCode,
                        'phone':value.phone
                    }
                };

                return new Promise((resolve, reject) => {

                    request.fnPost2(apiObj).then(res => { //成功
                        if(res.code=="20000"){
                            commit("hide_waiting");

                            resolve(res);
                        }else{
                            commit("hide_waiting");
                            reject(res);
                        }
                    }).catch( res=> { //失败
                        commit("hide_waiting");
                        reject(res); //这里可以尝试扩展备用接口
                    })
                });

            })
        },
        //退出
        logout({commit,state},value){
            commit("show_waiting");
            var apiObj={
                url: API_URLS.log_out
            }
            return new Promise((resolve, reject) => {
                window.localStorage.setItem('currentShiftId',value);
                request.fnGet(apiObj).then(res => { //成功
                    if(res.code=="20000"){
                        state.login=false; //清除accesstoken;
                        clearInterval(state.msgTimer);
                        router.replace('/login');
                        state.headIndex=1;
                        state.currentPage={},
                        state.pageList=[];
                        //state.localList=[];
                        commit("setLocalList",[]);
                        commit('setShopData', {});

                        util.delLocal("accessToken");
                        util.delLocal("shopData");
                        commit("hide_waiting");
                        resolve(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });
        },

        loadLastData({commit,state,dispatch}){
            commit("show_waiting");
            //先获取本地商品记录
            commit("getLocalList");
            if(state.localList && state.localList.length){
                commit("setPageList", state.localList);
            }
            //如果本地没有
            if(!state.pageList || !state.pageList.length){
                dispatch('initPage');
            }
            commit("hide_waiting");
        },
        //头部添加
        initPage({state,dispatch}){
            state.pageList = [];
            state.shopCount=0;
            state.headIndex=0;
            dispatch("addPage");

        },
        addPage({state,commit,dispatch}, value){
            commit("show_waiting");
            state.shopCount++;
            state.pageList.push(defaultPage(state.shopCount));
            state.headIndex =state.pageList.length - 1;
            state.currentPage = state.pageList[state.headIndex];
            dispatch("fetchList");
            commit('setLocalList',state.pageList);    //存储本地
            commit("hide_waiting");

        },
        switchPage({state,commit}, index){
            console.log("switch");
            if(state.headIndex ==index){
                return;
            }
            state.headIndex = index;
            state.currentPage=state.pageList[index];


            commit('setLocalList',state.pageList);    //存储本地
        },
        removePage({state,commit,dispatch},value){
            commit("show_waiting");
            if( state.pageList.length==1){
                state.pageList.splice(state.headIndex,1);
                dispatch("addPage");
                commit("hide_waiting");
            }else{
                //console.log(state.pageList);
                state.pageList.splice(state.headIndex,1);
                var tempIndex=state.headIndex-1>0?state.headIndex-1:0;
                state.headIndex=tempIndex;
                state.currentPage=state.pageList[state.headIndex];
                commit("hide_waiting");
            }
            commit('setLocalList',state.pageList);    //存储本地
        },
        //刷新订单
        fetchOrder({state,commit,dispatch}){
            commit("show_waiting");
            var apiObj={
                url:API_URLS.b2b_orders+"/build",
                data:state.currentPage.orderParams
            }
            var oldOrderData=state.currentPage.orderData;
            return new Promise((resolve, reject) => {
                    request.fnPost2(apiObj).then(res=>{
                        commit("hide_waiting");
                        if(res.code=="20000"){                //新数据
                            commit("setOrderData",res.appOrderConfirmBean);
                            resolve(res);
                        }else{                                //旧数据
                            commit("setOrderData",oldOrderData);
                            reject(res);
                        }
                    })
                    .catch(res=> { //失败
                            commit("hide_waiting");
                            reject(res);
                     })
            });
        },
        //获取商品列表
        fetchList({commit,state},value){
            if(value){
                var oldPageData=state.currentPage.pageData;
                commit("setProductParams",value);
                commit("setPageData",{});
            }

            let apiObj={
                url: API_URLS.products,
                data:{
                    'categoryId': state.currentPage.list.categoryId,
                    'brandId': state.currentPage.list.brandId,
                    'pageNum': state.currentPage.list.pageNum,
                    'keyword': state.currentPage.list.searchStr
                }
            };

            return new Promise((resolve, reject) => {
                commit("set_list_waiting",true);
                request.fnGet(apiObj).then(res => { //成功
                    commit("set_list_waiting",false);
                    if(res.code=="20000"){                //新数据
                        commit("setPageData",res.page);
                        resolve(res);
                    }else{                                //旧数据
                        commit("setPageData",oldPageData);
                        reject(res);
                    }

                })
                .catch(res=> { //失败
                    commit("set_list_waiting",false);
                    reject(res);
                 })
            });
        },
        //获取商品详情
        fetchItem:function({commit,state},pid){
            commit("set_list_waiting",true);
            let apiObj={
                url:API_URLS.products+"/"+pid,
            };
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("set_list_waiting",false);
                    if(res.code=="20000"){
                        commit("setItemData",res);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                })
                 .catch(res=> { //失败
                        commit("set_list_waiting",false);
                        reject(res);
                    })
            });
        },
        //获取分类
        fetchCategory({commit,state},value){
            commit("set_list_waiting",true);
            let apiObj={
                url:API_URLS.category,
                data:{"productCategoryId":value}
            };

            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("set_list_waiting",false);
                    if(res.code=="20000"){
                        commit("setCategoryData",res.appProductCategories);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                })
                .catch( res=> { //失败
                        commit("set_list_waiting",false);
                        reject(res);
                })
            });
        },

        fetchCustom({commit},value){
            commit("show_waiting");

            let apiObj = {
                url : '/testapi/',
                data:{username:value}
            };

            return new Promise((resolve, reject) => {
                commit("hide_waiting");
                request.fnGet_dev(apiObj).then(res=> {
                    if (res.data.code=="20000") {
                         resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                }).catch(res=>{
                        reject(res.data);
                });

            });
        },
        //获取会员详情信息
        fetchCustomDetail({commit},value){
            commit("show_waiting");
            let apiObj = {
                url : API_URLS.customers,
                data:{username:value}
            };
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch(res=> { //失败
                        commit("hide_waiting");
                        reject(res); //这里可以尝试扩展备用接口
                })
            });
        },

        //获取会员信息
        fetchCustom2({commit},value){
            commit("show_waiting");
            let apiObj = {
                url : '/testapi',
                data:{username:value}
            };
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch(res=> { //失败
                    commit("hide_waiting");
                    reject(res); //这里可以尝试扩展备用接口
                })
            });

        },

        //获取班次信息
        fetchLog({commit},value){

            commit("show_waiting");
            let apiObj={
                url: API_URLS.cashier_shift,
                data:value
            };

            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        commit("setLogData",res.appShiftInfo);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                })
                .catch( res=> { //失败
                        commit("hide_waiting");
                        reject(res);
                    })

            });

        },

        //获取零售列表
        fetchShiftList({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url: API_URLS.cashier_shift+'/products',
                data:value
            };

            return new Promise((resolve, reject) => {
                commit("hide_waiting");
                request.fnGet(apiObj).then(res => { //成功
                    if(res.code=="20000"){
                        commit("setLogData",res.page);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                })
                 .catch( res=> { //失败
                        commit("hide_waiting");
                        reject(res);
                 })
            });
        },

        // //获取个人购买商品列表
        // personalList({commit,state},value){
        //       commit("show_waiting");
        //       let apiObj={
        //           url: API_URLS.cashier_shift+'/products',
        //           data:value
        //       };
        //       return new Promise((resolve,reject)=>{
        //            commit("hide_waiting");
        //            request.fnGet(apiObj).then(res=>{
        //                if(res.code=="20000"){
        //                    commit("setpersonalData",res.page);
        //                    resolve(res);
        //                }else {
        //                    reject(res);
        //                }
        //            }).catch( res=> { //失败
        //                commit("hide_waiting");
        //                reject(res);
        //            })
        //       })
        //
        // },

        //点击存货发送的请求取数据
        stockGoods({commit,state},value){
                commit("show_waiting");
            let apiObj={
                url:API_URLS.b2b_orders+'/findAppConsigns',
                data:value
            };
            return new Promise((resolve,reject)=>{
                commit("hide_waiting");
                request.fnGet(apiObj).then(res=>{
                    if(res.code=="20000"){
                        commit("setstockData",res.appConsigns);
                        resolve(res);
                    }else {
                        reject(res)
                    }
                })
            })
        },

        //点击查看存货信息获取提货列表
        fetchPickList({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url: API_URLS.take_goods, //请求提货地址
                data:value
            };
            return new Promise((resolve,reject)=>{
                commit("hide_waiting");
                request.fnGet(apiObj).then(res=>{
                    if(res.code=="20000"){
                        commit("setTakeData",res.appConsigns);
                        resolve(res);
                    }else {
                        reject(res)
                    }
                })
            })
        },
        exportProducts({commit},value){
            commit("show_waiting");
            var apiObj={
                url: HOST+API_URLS.cashier_shift+'/products_export',
            }
            var accessToken=window.localStorage.getItem('accessToken');

            return new Promise((resolve, reject) => {

                var link=apiObj.url+"?accessToken="+accessToken;

                commit("hide_waiting");

                if(link) {
                    resolve(link);
                }
            });
        },
        //获取调拨门店列表
        fetchAllocationList({commit},value){
            commit("show_waiting");
            var apiObj= {
                url: API_URLS.products + '/allocation',
                data: value
            }
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
                        commit("hide_waiting");
                        reject(res);
                 })
            });

        },
        //检测调拨信息()
        addListenAllocation({commit},value){
            var apiObj = {
                url: API_URLS.products + '/allocation/unconfirm_list',
                data: ''
            }


            return new Promise((resolve, reject) => {
                request.fnPost2(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        commit("setMsgData",res);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });


        },
        //申请调拨
        applyAllocation({commit},value){
            commit("show_waiting");
            var apiObj= {
                url: API_URLS.products +'/'+value.id+ '/allocation',
                data: value
            }

            return new Promise((resolve, reject) => {
                request.fnPost2(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });
        },
        createOrder({commit,state},value){

            var apiObj = {
                url: API_URLS.b2b_orders + "/create",
                data: state.currentPage.orderParams
            }

            commit("show_waiting");
            return new Promise((resolve, reject) => {
                request.fnPost2(apiObj).then(res => {
                    commit("hide_waiting");
                    if (res.code == "20000") {
                        commit("setOrderData", res.appOrderConfirmBean);
                        commit("setPrintData", res.appOrderConfirmBean);
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }).catch(res => {
                    commit("hide_waiting");
                    reject(res);
                });
            });
        } ,
        //批准调拨
        approvalAllocation({commit},value){
            commit("show_waiting");
            var apiObj= {
                url: API_URLS.products +'/allocation',
                data: value
            }
            return new Promise((resolve, reject) => {
                request.fnPost2(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });
        },
        //获取消息
        fetchMsgList({commit},value){
            commit("show_waiting");
            var apiObj= {
                url: API_URLS.products +'/allocation/msg',
                data: value
            }
            return new Promise((resolve, reject) => {
                request.fnGet(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });
        },

    }
});


function defaultPage(title){
    //备注 这里的所有数据为临时状态 会存放本地存储 然后让头部选项卡切换时数据不丢失
    return {
        mode:"index",               //状态模式
        pageData:{},                //商品数据
        itemData:{                  //商品详情数据
            appProductDetail:{},
            appSpecifications:[]
        },
        orderParams: {              //订单页面参数
            cartParam:"",
            couponCodeId:null,
            usePoint:false,
            useBalance:false,
            memberId:null,
            guiderId:null,
            paymentMethodId:null,   //支付方式
            cash:0,                 //找零
            rmb:0                   //现金
        },
        stockData:{},               //存货数据
        takeData:{},                //提货数据
        orderData:{},               //订单数据
        printData:{},               //打印数据
        categoryData:[],            //分类数据
        list:{                      //商品列表参数
            categoryId:"",
            brandId:"",
            searchStr:"",
            pageNum:1,
            categoryName:"",
            brandName:""
        },
        listLoading: false, //等待
        personalData:{      //个人购买商品数据
          list:[],
          pageNum:1
        },
        logData:{                   //日记数据
            list:[],
            pageNUm:1
        },
        cartData:[],                //购物车数据
        customData: {                //顾客数据
            id:null,
            nickname:'顾客',
            username: null,
            point: 0,
            balance:0,
            appCoupons: [],
            headPortrait: "http://aoupprod.oss-cn-beijing.aliyuncs.com/adminhead.png",
        },
        shopAdminData:{},           //导购员数据
        pageIndex:0,              //头部索引
        title:title,                //头部名称
        time:getTimeData()          //时间戳
    }
}
function getTimeData(){
    function nz(n){
        if(n<10){
            n="0"+n;
        }else{
            n=n+"";
        }
        return n;
    }

    var time=new Date();
    var timestr=nz(time.getHours())+":"+nz(time.getMinutes());

    return timestr;
}

function findNode(arr,index){
        var res=null;

        if(index>0) {
            for (var i = index - 1; i >= 0; i--) {

                if (arr[i]) {
                    res = arr[i];
                    break;
                }
            }
        }

        if(!res) {
            if(index<arr.length-1) {
                for (var k = index + 1; k < arr.length; k++) {
                    if (arr[k]) {
                        res = arr[k];
                        break;
                    }
                }
            }
        }
    return  res
}

export default store