


import Vue from 'vue'
import Vuex from 'vuex'
import util from 'util/util.js'
import actions from './action.js'

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
    actions
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