


import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)


//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    loading:false,
    appLoading:false,
    headData:null,
    pageData:{},
    pageList:[],
    currentPage:{
        index:1,
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
          state.productParams=data;
      },
      setOrderParams(state,data){
          Object.assign(state.currentPage.orderParams,data);
      },
      setOrderData(state, data){
          state.currentPage.orderData = data;
      },
      setCustomData(state, data){
          state.currentPage.customData = data;
      },
      setShopAdminData(state, data){
          state.currentPage.shopAdminData = data;
      },
      setPageList(state, data){
          state.pageList = data;
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      initPage(state, data){
          console.log(state.pageList);
          state.pageList = [];
          state.pageList.push(defaultPage(0));
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      addPage(state, data){
         // console.log("add");
          state.pageList.push(defaultPage(state.pageList.length));
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      removePage(state, data){
          console.log("remove");
          if(state.pageList.length === 1){
              state.pageList = [];
              state.pageList.push(defaultPage(0));
              state.currentPage = state.pageList[state.pageList.length - 1];
              return;
          }
          let index = state.currentPage.index;
          let isDel = false;
          let n = 0;
          for(let i in state.pageList) {
              if (state.pageList[i].index === index) {
                  state.pageList.splice(i, 1);
                  isDel = true;
              }
              if (isDel && state.pageList[i]) { //更换数组下标
                  state.pageList[i].index = state.currentPage.index + n++ ;
              }
          }

          //如果删完了
          if(!state.pageList.length){
              state.pageList.push(defaultPage(1));
              state.currentPage = state.pageList[state.pageList.length - 1];
          }else{
              state.currentPage = state.pageList[0];
          }
      },
      switchPage(state, index){
          console.log("switch");
          if(state.currentPage.index == index){
              return;
          }
          for(let i in state.pageList){
              if(state.pageList[i].index === index){
                  state.currentPage = state.pageList[i];
                  console.log(state.currentPage);
              }
          }
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
        orderParams: {
            cartParam:"",
            couponCodeId:null,
            usePoint:false,
            useBalance:false,
            memberId:null,
            guiderId:null,
            paymentMethodId:null
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
        cartData:[],                //购物车数据
        customData: {},             //顾客数据
        shopAdminData:{},           //导购员数据
        index:len + 1,              //头部索引
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