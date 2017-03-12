<template>
   	    <div class="searchbar">
               <div class="input-group">
                         <input type="text" class="form-control" v-model="searchItem.input" v-on:keyup.enter="searchItem.text=searchItem.input;" placeholder="搜索商品">
                          <span class="input-group-btn">
                                         <button class="btn btn-default" @click="searchItem.text=searchItem.input;"><span class="glyphicon glyphicon-search"></span></button>
                           </span>
                 </div>
       </div>
</template>

<style>
</style>
<script>
    "use strict";
    import {request, API_URLS, HOST} from 'util/request.js';

    export default{
        name:"searchbar",
        props:['productList'],
        data(){
          return {
              searchItem:{
                  searching:false,
                  input:"",
                  text:""
              }
          }
        },
       watch:{
           'searchItem.text' (val) {
               if(val){
                   this.fetchList();
               }
           },
        },
        methods:{
            //请求列表
            fetchList() {
                var vm=this;
                var str=this.searchItem.text;

                this.$store.commit("setList",{"searchStr":str});

                var apiObj={
                    url: API_URLS.products,
                    data:{
                        'categoryId': this.productList.categoryId,
                        'brandId': this.productList.brandId,
                        'pageNum': this.productList.pageNum,
                        'searchStr': this.productList.searchStr
                    }
                };

                request.fnGet(vm,apiObj,(res)=>{
                    this.$store.commit("setPageData",res.page);
                })

            }
        }
    }
</script>

