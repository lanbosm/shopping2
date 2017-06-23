import {request, API_URLS, HOST} from 'util/request.js';
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js'
import util from 'util/util.js'
import router from '../router'


const actions= {
        //获得公有秘钥
        getPublicKey({commit}){
            var  apiObj={
                url:API_URLS.public_key,
            };

            return new Promise((resolve, reject) => {
                request.fnGet_dev(apiObj).then(res => { //成功
                    if(res.data.code=="20000"){
                        resolve(res.data);
                    }
                }).catch( res=> { //失败
                    reject(res.data);
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

        //注册
        registerCustom({dispatch,commit,state},value){
            commit("show_waiting");

            return dispatch('getPublicKey')
                .then(res => {
                    let publicKey=res.data;

                    let  rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                    let  enPwd = hex2b64(rsaKey.encrypt(value.password));

                    return {publicKey:publicKey,enPwd:enPwd};
                })
                .then(res=>{
                    if(res.publicKey && res.enPwd) {

                        let apiobj = {
                            url:API_URLS.customers,
                            data: {
                                phone: value.phone,
                                name: value.name,
                                sex: value.sex,
                                membeCard: value.membeCard,
                                enPasswd: res.enPwd,
                                tmpKey: res.publicKey.tmpKey
                            }
                        };

                        return  request.fnPost_dev(apiobj).then(res=> {
                            commit("hide_waiting");
                            if (res.data.code=="20000") {
                                commit('setCustomData', res.data.appMember );
                                return  Promise.resolve(res.data);
                            } else {
                                return  Promise.reject(res.data);
                            }
                        }).catch(res=>{
                            return  Promise.reject(res);
                        });
                    }
                })
            // let apiObj = {
            //     url:API_URLS.customers,
            //     data:value
            // };
            // return new Promise((resolve, reject) => {
            //         request.fnPost_dev(apiObj).then(res=> {
            //             commit("hide_waiting");
            //             if (res.data.code=="20000") {
            //                 commit('setCustomData', res.data.appMember );
            //                 resolve(res.data);
            //             } else {
            //                 reject(res.data);
            //             }
            //         }).catch(res=>{
            //             commit("hide_waiting");
            //             reject(res.data);
            //         });
            // });
        },
        //登陆
        loginIn({dispatch,commit,state},value){

            return dispatch('getPublicKey')
                .then(res => {
                    let publicKey=res.data;

                    let  rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(publicKey.modulus), b64tohex(publicKey.exponent));
                    let  enPwd = hex2b64(rsaKey.encrypt(value.password));

                    return {publicKey:publicKey,enPwd:enPwd};
                })
                .then(res=>{
                    if(res.publicKey && res.enPwd) {
                        let cid = localStorage.getItem("currentShiftId");
                        let apiobj = {
                            url: API_URLS.login,
                            data: {
                                currentShiftId: cid,
                                username: value.username,
                                enPasswd: res.enPwd,
                                tmpKey: res.publicKey.tmpKey
                            }
                        };
                
                       return  request.fnPost_dev(apiobj).then(res=> {
                                if (res.data.code=="20000") {
                                    commit('setAccessToken', res.data.accessToken);
                                   return  Promise.resolve(res.data);
                                } else {
                                   return  Promise.reject(res.data);
                                }
                            }).catch(res=>{
                                commit("hide_waiting");
                                return  Promise.reject(res);
                            });
                    }
            })

        },
        //退出
        logout({commit,state},value){

            var apiObj={
                url: API_URLS.log_out
            }

            commit("show_waiting");
            window.localStorage.setItem('currentShiftId',value);
            return   request.fnGet_dev(apiObj).then(res => { //成功
                    commit("hide_waiting");
                    if(res.data.code=="20000"){
                        clearInterval(state.msgTimer);
                        router.replace('/login');
                        state.headIndex=1;
                        state.currentPage={},
                        state.pageList=[];
                        commit('clearAccessToken');
                        commit("setLocalList",[]);
                        commit('setShopData', {});
                        util.delLocal("accessToken");
                        util.delLocal("shopData");
                      
                       return Promise.resolve(res.data);
                    }
                }).catch( res=> { //失败
                    commit("hide_waiting");
                    return Promise.reject(res.data);
            });
        },
        //意外退出
        logoutUnexpected({commit,state,dispatch}){

            commit("hide_waiting");


                clearInterval(state.msgTimer);
                router.replace('/login');
                state.headIndex = 1;
                state.currentPage = {};
                state.pageList = [];
                commit('clearAccessToken');
                commit("setLocalList", []);
                commit('setShopData', {});
                util.delLocal("accessToken");
                util.delLocal("shopData");



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
        fetchOrderList({commit},value){
            let apiObj = {
                url : API_URLS.b2b_orders+'/wechat',
                data:value
            };
            commit("show_waiting");
            return  request.fnGet_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return   Promise.reject(res.data);
                }
            }).catch(res=>{
                return    Promise.reject(res.data);
            });
        },
        refundOrder({commit,state},value){

            commit("show_waiting");
            let apiObj={
                url: API_URLS.b2b_orders+'/refunds',
                data:value
            };
            // console.log(value);
            return  request.fnPost_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
            });

        },
        fetchList({commit,state},value){
            if(value){
                var oldPageData=state.currentPage.pageData;
                commit("setProductParams",value);
               // commit("setPageData",{});
            }

            let apiObj={
                url: API_URLS.products,
                data:{
                    'categoryId': state.currentPage.list.categoryId,
                    'brandId': state.currentPage.list.brandId,
                    'pageNum': state.currentPage.list.pageNum,
                    'keyword': state.currentPage.list.searchStr,
                    'type': state.currentPage.list.type
                }
            };
            commit("set_list_waiting",true);
            return  request.fnGet_dev(apiObj).then(res=> {
                commit("set_list_waiting",false);

                if (res.data.code=="20000") {
                    commit("setPageData",res.data.page);
                    return  Promise.resolve(res.data);
                } else {
                    commit("setPageData",oldPageData);
                    return   Promise.reject(res.data);
                }
            }).catch(res=>{
                return    Promise.reject(res.data);
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

            return  request.fnGet_dev(apiObj).then(res => { //成功
                    commit("set_list_waiting",false);
                    if(res.data.code=="20000"){
                        commit("setCategoryData",res.data.appProductCategories);
                        Promise.resolve(res.data);
                    }else{
                        Promise.reject(res.data);
                    }
                })
                .catch( res=> { //失败
                        commit("set_list_waiting",false);
                         Promise.reject(res.data);
            })

        },
       //获取会员
        fetchCustomList({commit},value){
            let apiObj = {
                url : API_URLS.customers+'/list',
                data:value
            };
            commit("show_waiting");
            return  request.fnGet_dev(apiObj).then(res=> {
                 commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return   Promise.reject(res.data);
                }
            }).catch(res=>{
                return    Promise.reject(res.data);
            });
        },
        //获取会员列表
        fetchCustom({commit},value){
            let apiObj = {
                url : API_URLS.customers,
                data:value
            };
          //  commit("show_waiting");
            return  request.fnGet_dev(apiObj).then(res=> {
                   // commit("hide_waiting");
                    if (res.data.code=="20000") {
                        return  Promise.resolve(res.data);
                    } else {
                        return  reject(res.data);
                    }
                }).catch(res=>{
                        return   reject(res.data);
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

        //获取门店信息
        fetchShopData({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url: API_URLS.shop_setting
            };
            return  request.fnGet_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
            });

        },
        //提交门店信息
        saveShopData({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url: API_URLS.shop_setting,
                data:value
            };
           // console.log(value);
            return  request.fnPost_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
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

        //获取广告列表
        fetchAdList({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url:API_URLS.ads+'/list',
                data:value
            };
            return  request.fnGet_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
            });
        },

        //上传广告图片
         uploadAdList({commit,state},value){

             commit("show_waiting");

             console.log(value);
             let apiObj={
                 url:API_URLS.ads+'/add_image'+'?accessToken='+state.login,
                 data:value
             };

         },
         //删除广告图片
         removeAdList({commit,state},value){

             commit("show_waiting");
             console.log(value);
             let apiObj={
                 url:API_URLS.ads+'/delete',
                 data:value
             };
             // console.log(value);
             return  request.fnPost_dev(apiObj).then(res=> {
                 commit("hide_waiting");
                 if (res.data.code=="20000") {
                     return  Promise.resolve(res.data);
                 } else {
                     return  Promise.reject(res.data);
                 }
             }).catch(res=>{
                 commit("hide_waiting");
                 return  Promise.reject(res);
             });
         },


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
        savePickList({commit,state},value){

            var apiObj = {
                url:API_URLS.consigns,
                data:value
            };
            console.log( apiObj);
            return  request.fnPost_dev(apiObj).then(res=> {
                if (res.data.code=="20000") {
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
            });

//                           alert(vm.$store.state.currentPage.customData.id);

        },
        //点击查看存货信息获取提货列表
        fetchPickList({commit,state},value){
            commit("show_waiting");
            let apiObj={
                url: API_URLS.consigns, //请求提货地址
                data:value
            };

            return  request.fnGet_dev(apiObj).then(res=> {
                commit("hide_waiting");
                if (res.data.code=="20000") {
                    commit("setTakeData",res.data.page);
                    return  Promise.resolve(res.data);
                } else {
                    return  Promise.reject(res.data);
                }
            }).catch(res=>{
                commit("hide_waiting");
                return  Promise.reject(res);
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
                    if(res.code=="20000"){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch( res=> { //失败
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


function defaultPage(title){
    //备注 这里的所有数据为临时状态 会存放本地存储 然后让头部选项卡切换时数据不丢失
    return {
        history:"/",               //状态模式
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
export default actions;