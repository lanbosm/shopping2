import {request, API_URLS, HOST} from 'util/request.js';
import {RSAKey,hex2b64,b64tohex} from 'util/rsa.js'
const action ={
    //dispatch 调整调用,commit 提交更新mutations你们的方法
    dddd({commit,dispatch,state}){
        commit("show_waiting");


    },
    demo({commit,dispatch,state}){

        var res="sss"
        return new Promise((resolve,reject) => {
            if(2>1) {
                res=[];
                commit('setPageData',res);
                // state.currentPage.pageData=res;
                resolve(res);
            }else{
                reject(res);
            }
        });

    },
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

};

export default action;