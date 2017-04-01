


import Vue from 'vue';
import Vuex from 'vuex'
import {request, API_URLS} from 'util/request.js';

Vue.use(Vuex)


//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    loading:false,
    appLoading:false,
    shopData:{
        "name":"",
        "adminName":""
    },
    pageData:{},
    pageList:[],  //头部数组
    currentPage:{   //当前节点
        index:0,
        mode:"index",
    },
    member:{
        shopName:''
    },
    itemData:{
        appProductDetail:{},
        appSpecifications:[]
    },
    categoryData:[],
    productParams:{
        categoryId:"",
        brandId:"",
        searchStr:"",
        pageNum:1,
        categoryName:"",
        brandName:""
    }
  },
   // 变量赋值
  mutations:{
      setLoading(state,data){
         state.loading=data;
      },
      setShopData(state,data){
          state.shopData=data;
      },
      setMode(state,data){
          state.currentPage.mode=data;
      },
      setPageData (state,data){
          state.pageData=data;
      },
      setItemData (state,data){
          state.itemData=data;
      },
      setCategoryData (state,data){
          state.categoryData=data;
      },
      setProductParams (state,data){
          Object.assign(state.productParams,data);
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
        fetchList({commit,state},value){
            commit("set_list_waiting",true);
            let apiObj={
                url: API_URLS.products,
                data:{
                    'categoryId': state.productParams.categoryId,
                    'brandId': state.productParams.brandId,
                    'pageNum': state.productParams.pageNum,
                    'keyword': state.productParams.searchStr
                }
            };
            request.fnGet(value,apiObj,(res)=>{
                console.log(res);
                commit("set_list_waiting",false);
                commit("setPageData",res.page);
            })
        }
    }
});

function defaultPage(len){

    return {
        mode:"index",               //默认首页
        pageData:{},                //商品数据
        itemData:{                  //商品详情数据
            appProductDetail:{},
            appSpecifications:[]
        },
        waiting: false,            //等待
        orderParams: {
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
        list:{
            categoryId:"",          //分类Id
            brandId:"",             //品牌Id
            searchStr:"",           //关键字
            pageNum:1,              //页码
            categoryName:"",        //分类名称
            brandName:""            //品牌名称
        },
        logData:{                   //日记数据

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
        title:len+1,
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