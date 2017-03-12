


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
    itemData:{
        appProductDetail:{},
        appSpecifications:[]
    },
    cartData:[

    ],
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
      },
      setItemData (state,data){
          state.itemData=data;
      },
      setCartData (state,data){
          state.cartData=data;
      }

  }
})


export default store