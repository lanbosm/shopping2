


import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)
//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    author: 'lanbo',
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
    vipData:{
        index:0,
        list:[

        ]
    }
  },
   // 变量赋值
  mutations:{
      author (state,msg){
         state.author=msg;
      },
      setPageData (state,data){
          state.pageData=data;
      }

  }
})


export default store