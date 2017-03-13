


import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)
//vue 定义全局变量
const store = new Vuex.Store({
  state: {
    author: 'lanbo',
    loading:false,
    mode:"order",  //模式
    headData:null,
    //默认数据
    defaultData:{
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
        cartData:[

        ],
        customData: {}
    },
    queueData:[

    ],
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
      setCategoryData (state,data){
          state.categoryData=data;
      },
      setList (state,data){   //尝试新写法

          Object.assign(state.list,data); //大概就是下面的意思
          // var type=Object.keys(data)[0]
          //
          // switch (type){
          //     case "cartgoryId":
          //         state.list.cartgoryId=data.value;
          //     case "brandId":
          //         state.list.brandId=data.value;
          //     case "searchstr":
          //         state.list.searchstr=data.value;
          //     case "pageNum":
          //         state.list.pageNum=data.value;
          // }

      },
      addQueue (state,data){

          var obj={
              index:data,
              pageData:state.pageData,
              itemData:state.itemData,
              list:state.list,
              cartData:state.cartData,
              customData:state.customData
          }

          state.queueData.push(obj);

          state.pageData=state.defaultData.pageData;
          state.itemData=state.defaultData.itemData;
          state.list=state.defaultData.list;
          state.cartData=state.defaultData.cartData;
          state.customData=state.defaultData.customData;

      },
      clearData (state,data){

          alert(1111);

      }

  }
})


export default store