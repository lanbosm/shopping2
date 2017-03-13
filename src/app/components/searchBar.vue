<template>
   	    <div class="searchbar">
            <div class="input-group">
                <input type="text" class="form-control" v-model="searchItem.keyword" @keyup.enter="fetchList" placeholder="条码/商品名称">
                <span class="input-group-btn">
                    <button class="btn btn-default" @click="fetchList"><span class="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
       </div>
</template>

<style>
</style>
<script>
    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        name:"searchbar",
        props:['productParams'],
        data(){
          return {
              searchItem:{
                  searching:false,
                  keyword:""
              }
          }
        },
       watch:{
        },
        methods:{
            //请求列表
            fetchList() {
                if(!this.searchItem.keyword){
                    return;
                }
                let vm=this;

                let apiObj={
                    url: API_URLS.products,
                    data:{
                        'categoryId': vm.productParams.categoryId,
                        'brandId': vm.productParams.brandId,
                        'pageNum': 1,
                        'keyword': vm.searchItem.keyword
                    }
                };

                request.fnGet(vm,apiObj,(res)=>{
                    vm.$store.commit("setProductParams",{"searchStr":vm.searchItem.keyword,"pageNum":1});
                    vm.$store.commit("setPageData", res.page);
                })
            }
        }
    }
</script>

