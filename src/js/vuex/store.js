


import Vuex from 'vuex'


//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    author: 'lanbo',
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
      }

  }
})


export default store