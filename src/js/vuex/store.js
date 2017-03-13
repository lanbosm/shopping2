


import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

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


//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    author: 'lanbo',
    loading:false,
    mode:"order",  //模式
    headData:null,
    pageData:{},
    pageList:[],
    currentPage:{
        index:1
    },
    member:{
        shopName:''
    },
    itemData:{
        appProductDetail:{},
        appSpecifications:[]
    },
    categoryData:[],
    list:{
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
          state.mode=data;
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
      setCustomData(state, data){
          state.currentPage.customData = data;
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
          console.log("add");
          state.pageList.push(defaultPage(state.pageList.length));
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      removePage(state, data){
          console.log("remove");
          let index = state.currentPage.index;
          let isDel = false;
          let n = 0;
          for(let i in state.pageList) {
              if (state.pageList[i].index === index) {
                  state.pageList.splice(i, 1);
                  isDel = true;
              }
              if (isDel) {
                  state.pageList[i].index = state.currentPage.index + n++ ;
              }
          }

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
              }
          }
      }
  }
});

function defaultPage(len){
    return {
        pageData:{},
        itemData:{
            appProductDetail:{},
            appSpecifications:[]
        },
        categoryData:[],
            list:{
            categoryId:"",
            brandId:"",
            searchStr:"",
            pageNum:1,
            categoryName:"",
            brandName:""
        },
        cartData:[],
        customData: {},
        index:len + 1,
        time:getTimeData()
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

export default store