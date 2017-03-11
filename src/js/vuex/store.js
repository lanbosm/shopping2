


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
    customData: {
            "id":6282,
            "headPortrait":"http://wx.qlogo.cn/mmopen/0nn3FBrD9a3NichacG5w0ic23TUfNCuOHP7IuSN0uSrfwNnZxlcFwJTVFaicr070Id03Ne8bzlCz04IstCQN07cgKXZ76GGb9tM/0",
            "username":"15616268045",
            "nickname":"aoop",
            "sex":"male",
            "point":0,
            "balance":0,
            "phone":13555777222,
            "appCoupons":[
            ]
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