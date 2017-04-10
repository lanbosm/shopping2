


import Vue from 'vue';
import Vuex from 'vuex'
import {request, API_URLS, HOST} from 'util/request.js';
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js';

Vue.use(Vuex)


//vue 定义全局变量
const store = new Vuex.Store({

  //共有数据
  state: {
    loading:false,
    appLoading:false,
    shopData:{
        "name":"",
        "adminName":""
    },
      //消息数据
    msgData:{
        appUnconfirmList:[],
        msgNum:0
    },
    member:{
        shopName:''
    },
    itemData:{
        appProductDetail:{},
        appSpecifications:[]
    },
      //子类数据
    pageList:[],  //头部数组
    currentPage:{   //当前节点
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
      setPageData (state,data){

          state.currentPage.pageData=data;
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
      setPageList(state, data){
          state.pageList = data;
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      initPage(state, data){
         // console.log(state.pageList);
          state.pageList = [];
          state.pageList.push(defaultPage(0));
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      addPage(state, data){
           // console.log("add");
          state.pageList.push(defaultPage(state.pageList.length));
          state.currentPage = state.pageList[state.pageList.length - 1];
          console.log(state.pageList);
      },
      removePage(state, data){ //data =>index
          console.log("remove");

          if( state.pageList.length<2){

              state.pageList[state.currentPage.pageIndex]=state.currentPage=defaultPage(0);
          }else{
             var  tempIndex=state.currentPage.pageIndex;
             state.pageList[tempIndex]=null;


            //  console.log(tempIndex);
             state.currentPage=findNode(state.pageList,tempIndex);
             // console.log( state.currentPage);
             if(!state.currentPage){
                 state.pageList[tempIndex]=state.currentPage=defaultPage(0);
                 state.pageList[tempIndex].pageIndex=tempIndex;
                 state.pageList[tempIndex].title=tempIndex+1;
             }
             //console.log(state.currentPage);
             return false;
          }

         // console.log(state.pageList);
          //state.pageList[]

          // if(state.pageList.length === 1){
          //    // state.pageList = [];
          //     state.pageList.push(defaultPage(0));
          //     state.currentPage = state.pageList[state.pageList.length - 1];
          //   //  console.log(state.currentPage);
          //     return;
          // }
          // let index = state.currentPage.pageIndex;
          // let preIndex = index;
          //
          // let isDel = false;
          //
          // for(let i in state.pageList) {
          //     if (state.pageList[i].index === index) {
          //         state.pageList.splice(i, 1);
          //         preIndex = i;
          //         isDel = true;
          //        // state.currentPage = state.pageList[i-1];
          //     }
          //     if (isDel && state.pageList[i]) { //更换数组下标
          //         //state.pageList[i].index = state.currentPage.pageIndex + n++ ;
          //     }
          // }
          //
          //
          // //如果删完了
          // if(!state.pageList.length){
          //     state.pageList.push(defaultPage(1));
          //     state.currentPage = state.pageList[state.pageList.length - 1];
          // }else{ //切回
          //     var newIndex=preIndex;
          //     if(newIndex >= state.pageList.length) newIndex = state.pageList.length - 1;
          //     if(newIndex<0){newIndex=0;}
          //     state.currentPage = state.pageList[newIndex];
          //
          // }
      },
      switchPage(state, index){


          var tempPageIndex=index;

          console.log("switch");
          if(state.currentPage.pageIndex ==tempPageIndex){
              return;
          }


          for(var i=0; i<state.pageList.length; i++){
              if(state.pageList[i]) {

                  if (i === tempPageIndex) {

                      state.currentPage = state.pageList[i];
                      console.log(state.currentPage);
                  }
              }
          }
      },
      // 显示和隐藏waiting
      show_waiting(state){
          state.currentPage.waiting = true;
      },
      hide_waiting(state){
          state.currentPage.waiting = false;
      },

      // 显示和隐藏waiting
      set_list_waiting(state,value){
          state.loading = value;
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
        //退出
        logout({commit},value){
            commit("show_waiting");
            var apiObj={
                url: API_URLS.log_out
            }
            return new Promise((resolve, reject) => {
                window.localStorage.setItem('currentShiftId',value);
                request.fnGet(apiObj).then(res => { //成功
                    if(res.code=="20000"){
                        commit("hide_waiting");
                        resolve(res);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    reject(res);
                })
            });
        },
        //重建订单
        rebulid({commit}, value){
            commit("show_waiting");
            return new Promise((resolve, reject) => {
               // console.log(value);
                commit("setProductParams",value);
                setTimeout(function() {
                       commit("hide_waiting");
                       resolve()
                }, 50)
            })
        },
        //获取商品列表
        fetchList({commit,state},value){
            commit("set_list_waiting",true);
            if(value){
                commit("setProductParams",value);
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
                request.fnGet(apiObj).then(res => { //成功
                    //console.log(response)
                    commit("set_list_waiting",false);
                    if(res.code=="20000"){
                        commit("setPageData",res.page);
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
        //获取会员信息
        fetchCustom({commit},value){
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

function defaultPage(len){
    //备注 这里的所有数据为临时状态 会存放本地存储 然后让头部选项卡切换时数据不丢失
    return {
        waiting: false,            //等待
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
        pageIndex:len,              //头部索引
        title:len+1,                //头部名称
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
// 对象深拷贝
function deepCopy (origin, _copy) {
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
};
export default store