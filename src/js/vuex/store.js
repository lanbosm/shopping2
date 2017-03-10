


import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)
//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    author: 'lanbo',
    loading:false,
    mode:"order",  //模式
    headData:{
          index:0,
          staff:"李科兴",
          list:[

          ]
    },
    pageData:{},
    cartData:{
          index:0,
          list:[
              {
                  'title':'测试商品',
                  'name':'测试商品的名称',
                  'selectDate':"2016-03-07",
                  'amount':'1',
                  'price':12
              },
              {
                  'title':'测试商品2',
                  'name':'测试商品的名称2',
                  'selectDate':"2016-03-07",
                  'amount':'1',
                  'price':12
              }
          ],
    },
    vipData: {
        "appMember": {
            "id": 6429,
            "headPortrait": "http://aoupprod.oss-cn-beijing.aliyuncs.com/adminhead.png",
            "username": "13636555444",
            "nickname": "222",
            "point": 0,
            "balance": 0,
            "appCoupons": []
        }
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
      }

  }
})


export default store