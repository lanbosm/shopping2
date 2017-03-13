<template>
    <div class="categroy row" v-if="showCategory">
        <div class="col-xs-12 category-list clearfix"  @mouseleave="outcheck" >
        <div class="menu"  >
            <a  class="sub" href="javascript:void(0)":class="{cur:item.id==productList.categoryId}"  v-for="(item,index) in productCategories" @click="fetchCategory(item.id,item.name)" >{{item.name}}</a>
        </div>
        <div class="sub-menu" >
                    <div v-show="subCategory.length==0"><p> 数据加载中...</p></div>

                     <div class="l" v-for="(item,index) in subCategory">
                        <div class="l-t">{{item.name}}</div>
                        <div class="l-c">
                            <a  class="btn btn-default sub-menu-category"  :class="{cur:item2.id==productList.brandId}" v-for="(item2,index2) in item.appBrands"  @click="fetchBrand(item2.id,item2.name,subCategory.id,subCategory.name)">{{item2.name}}</a>
                        </div>
                    </div>
        </div>

        </div>
    </div>
</template>

<style lang="less">


</style>
<script>
    "use strict";
    import {request, API_URLS, HOST} from 'util/request.js';

    export default{
        name:"category",
        props:['showCategory','productCategories','productList'],
        data(){
          return {
              cacheload:false
          }
        },
        computed: {

            subCategory(){
                if(this.productCategories.length>0){
                   let list= this.productCategories.filter((arr)=>{
                       return arr.appTags!=null;
                   });
                   return list[0].appTags;
                }else{
                    return [];
                }
            }
        },
        watch: {
            'showCategory'(val){
                if(val && !this.cacheload){
                    this.cacheload=true;
                    this.fetchCategory(this.productList.categoryId,"全部分类");
                }
            }
        },
        methods:{
            outcheck:function(){
                var out=true;
                var lock=function(){
                    out=false;
                }
                document.querySelector('.category-list').addEventListener('mouseover',lock,false)
                setTimeout(()=> {
                    if(out){
                        document.querySelector('.category-list').addEventListener('mouseover',lock,false)
                        this.$parent.showCategory = false;
                    }
                },500);
            },
            fetchCategory:function(cid,cname){

                var apiobj={
                    url:API_URLS.category,
                    data:{"productCategoryId":cid}
                };
                request.fnGet(this,apiobj,(res)=>{
                    if(!cid){cid=res.appProductCategories[0].id}
                    this.$store.commit("setCategoryData",res.appProductCategories);
                    this.$store.commit("setList",{"categoryId":cid,"categoryName":cname});
                    this.productList.brandId=null;
                    this.productList.brandName=null;
                })
            },
            fetchBrand:function(bid,bname){
                var apiobj={
                    url:API_URLS.products,
                    data:{
                        'categoryId': this.productList.categoryId,
                        'brandId': this.productList.brandId,
                        'pageNum': this.productList.pageNum,
                        'searchStr': this.productList.searchStr
                    }
                };
                request.fnGet(this,apiobj,(res)=>{
                    this.$store.commit("setList",{"brandId":bid,"brandName":bname});
                    this.$parent.showCategory=false;
                })
            },
        }
    }
</script>

