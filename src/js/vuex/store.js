


import Vue from 'vue';
import Vuex from 'vuex'
import {request, API_URLS, HOST} from 'util/request.js';
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js';
import util from 'util/util.js';

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
    localList:[], //本地数据集合
    pageList:[],  //内存数据集合

    //子类数据
    currentPage:{   //当前数据节点
          index:0,
          mode:"index"
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
      setPageList(state, data){
          state.pageList = data;
          state.currentPage = state.pageList[state.pageList.length - 1];
      },

      initPage(state){
          state.pageList = [];
          state.pageList.push(defaultPage(0));
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      removePage(state, data){ //data =>index
          console.log("remove");



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
      // 全局waiting
      show_waiting(state){
          state.currentPage.waiting = true;
      },
      hide_waiting(state){
          state.currentPage.waiting = false;
      },
      // 列表waiting
      set_list_waiting(state,value){
          state.loading = value;
      },
      getLocalList(state){
          state.localList=[{
              "waiting": false,
              "mode": "index",
              "pageData": {
                  "pageNum": 1,
                  "pageSize": 10,
                  "size": 10,
                  "orderBy": null,
                  "startRow": 1,
                  "endRow": 10,
                  "total": 14,
                  "pages": 2,
                  "list": [{
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-02-22/c45e8dca-2108-4d7f-91c2-96ac77bf90ec.png",
                      "name": "测试商品",
                      "barCode": "111321312",
                      "price": "0.01",
                      "id": 71,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 7,
                      "availableStock": 6
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png",
                      "name": "小包子",
                      "barCode": "1111111111111111111111",
                      "price": "1.00",
                      "id": 329,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 11,
                      "availableStock": 11
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/8e139603-acc7-4cd7-a625-9be5aa7dc396.png",
                      "name": "中包子",
                      "barCode": "1111111111111111111111",
                      "price": "1.00",
                      "id": 330,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 11,
                      "availableStock": 11
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/91f95e92-290c-4c75-8055-cd6b319bf2e3.png",
                      "name": "测试商品1",
                      "barCode": "1111111111111111111111",
                      "price": "1.00",
                      "id": 331,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 1
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/6ba6bc36-15fd-4012-a410-0f79c87f32e4.png",
                      "name": "测试商品2",
                      "barCode": "1",
                      "price": "1.00",
                      "id": 332,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 1
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/b65cb7bf-6b3f-443b-a3fd-51034f4972f2.png",
                      "name": "测试商品3",
                      "barCode": "1",
                      "price": "1.00",
                      "id": 333,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 1
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/9defe8af-b775-472f-88e4-d46a8d723580.png",
                      "name": "测试商品4",
                      "barCode": "1",
                      "price": "1.00",
                      "id": 334,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 1
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/65540691-d72f-4880-bc28-30f333fdefee.png",
                      "name": "测试商品5",
                      "barCode": "1",
                      "price": "1.00",
                      "id": 335,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 1
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/7fd5d91b-1bb0-49e3-a421-be55f7891284.png",
                      "name": "测试商品6",
                      "barCode": "1",
                      "price": "1.00",
                      "id": 336,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 10,
                      "availableStock": 10
                  }, {
                      "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/ed725141-dae8-497c-a478-6916d2159aa9.png",
                      "name": "测试商品7",
                      "barCode": "222",
                      "price": "10000.00",
                      "id": 337,
                      "giftType": "none",
                      "brandName": "合生元奶粉",
                      "textTagStr": null,
                      "specDesc": null,
                      "stock": 1,
                      "availableStock": 0
                  }],
                  "firstPage": 1,
                  "prePage": 0,
                  "nextPage": 2,
                  "lastPage": 2,
                  "isFirstPage": true,
                  "isLastPage": false,
                  "hasPreviousPage": false,
                  "hasNextPage": true,
                  "navigatePages": 8,
                  "navigatepageNums": [1, 2]
              },
              "itemData": {
                  "appProductDetail": {},
                  "appSpecifications": []
              },
              "orderParams": {
                  "cartParam": "",
                  "couponCodeId": null,
                  "usePoint": false,
                  "useBalance": false,
                  "memberId": null,
                  "guiderId": null,
                  "paymentMethodId": null,
                  "cash": 0,
                  "rmb": 0
              },
              "orderData": {},
              "printData": {},
              "categoryData": [],
              "list": {
                  "categoryId": "",
                  "brandId": "",
                  "searchStr": "",
                  "pageNum": 1,
                  "categoryName": "",
                  "brandName": ""
              },
              "logData": {
                  "list": [],
                  "pageNUm": 1
              },
              "cartData": [],
              "customData": {
                  "id": null,
                  "nickname": "顾客",
                  "username": null,
                  "point": 0,
                  "balance": 0,
                  "appCoupons": [],
                  "headPortrait": "http://aoupprod.oss-cn-beijing.aliyuncs.com/adminhead.png"
              },
              "shopAdminData": {},
              "pageIndex": 0,
              "title": 1,
              "time": "18:38"
          },null];

      },
      setLocalList(state,value){
          state.localList=value;
          util.pushLocal('pageList',value);
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

        loadLastData({commit,state}){
            commit("show_waiting");
            //先获取本地商品记录
            commit("getLocalList");
            if(state.localList && state.localList.length){
                commit("setPageList", state.localList);
            }
            //如果本地没有
            if(!state.pageList || !state.pageList.length){
                commit('initPage');
            }
            commit("hide_waiting");
        },
        //头部添加
        addPage({state,commit,dispatch}, value){
            commit("show_waiting");
            state.pageList.push(defaultPage(state.pageList.length));
            state.currentPage = state.pageList[state.pageList.length - 1];
            dispatch("fetchList");
            commit('setLocalList',state.pageList);    //存储本地
            commit("hide_waiting");
        },
        removePage({state,commit,dispatch},value){
            commit("show_waiting");

            if( state.pageList.length<2){

                state.pageList[state.currentPage.pageIndex]=state.currentPage=defaultPage(0);
                commit("hide_waiting");
                commit('setLocalList',state.pageList);    //存储本地
            }else{
                var  tempIndex=state.currentPage.pageIndex;
                state.pageList[tempIndex]=null;

                //  console.log(tempIndex);
                state.currentPage=findNode(state.pageList,tempIndex); //这里找要有点时间
                // console.log( state.currentPage);
                if(!state.currentPage){
                    state.pageList[tempIndex]=state.currentPage=defaultPage(0);
                    state.pageList[tempIndex].pageIndex=tempIndex;
                    state.pageList[tempIndex].title=tempIndex+1;
                }
                //console.log(state.currentPage);
                commit("hide_waiting");
                commit('setLocalList',state.pageList);    //存储本地
                return false;
            }

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
                request.fnGet(apiObj).then(res => { //成功
                    //console.log(response)
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