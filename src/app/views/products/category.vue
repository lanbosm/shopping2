<template>
    <div class="categroy row" v-if="showCategory">
        <div class="col-xs-12 category-list clearfix" @mouseleave="outcheck" >
        <div class="menu"  >
            <a class="sub all"  :class="{cur:!productParams.categoryId}" href="javascript:void(0)"  @click="fetchAllBrand()">全部分类</a>
            <a  class="sub" href="javascript:void(0)"
                :class="{cur:item.id==productParams.categoryId}"
                v-for="(item,index) in productCategories"
                @click="fetchCategory(item.id,item.name)">{{item.name}}</a>
        </div>
        <div class="sub-menu" v-if="showSubMenu">
                     <div v-show="!subCategory || !subCategory.length"><p> 数据加载中...</p></div>
                     <div class="l" v-for="(item,index) in subCategory">
                        <div class="l-t">{{item.name}}</div>
                        <div class="l-c">
                            <a  class="btn btn-default sub-menu-category"  :class="{cur:item2.id==productParams.brandId}" v-for="(item2,index2) in item.appBrands"  @click="fetchBrand(item2.id,item2.name,subCategory.id,subCategory.name)">{{item2.name}}</a>
                        </div>
                    </div>
        </div>

        </div>
    </div>
</template>

<style lang="less">


</style>
<script>
    import {request, API_URLS} from 'util/request.js';

    export default{
        name:"category",
        props:['showCategory','productCategories','productParams'],
        data(){
          return {
              cacheload:false,
              showSubMenu:false
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
                    this.fetchCategory(null);

                }
            }
        },
        methods:{
            outcheck(){
                let out=true;
                let lock=function(){
                    out=false;
                };
                if(document.querySelector('.category-list')) {
                    document.querySelector('.category-list').addEventListener('mouseover', lock, false);
                    setTimeout(() => {
                        if (out && document.querySelector('.category-list')) {
                            document.querySelector('.category-list').addEventListener('mouseover', lock, false);
                            this.$parent.showCategory = false;
                        }
                    }, 500);
                }
            },
            fetchCategory(cid,cname){
                if(cid){this.showSubMenu=true;}

                let apiobj={
                    url:API_URLS.category,
                    data:{"productCategoryId":cid}
                };
                request.fnGet(this,apiobj,(res)=>{
                    if(!cid){
                      //  cid=res.appProductCategories[0].id;
                       // cname=res.appProductCategories[0].name;
                    }
                    this.$store.commit("setProductParams", {"categoryId": cid, "categoryName": cname,"brandId":null,"brandName":null});
                    this.$store.commit("setCategoryData",res.appProductCategories);
                })
            },
            fetchAllBrand(){
                let vm = this;
                let apiobj={
                    url:API_URLS.products,
                    data:{
                        'categoryId': null,
                        'brandId': null,
                        'pageNum':  1,
                        'searchStr': null
                    }
                };
                request.fnGet(this,apiobj,(res)=>{
                    this.$store.commit("setProductParams", {"categoryId": null, "categoryName": null,"brandId":null,"brandName":null});
                    this.$store.commit("setPageData",res.page);
                    this.showSubMenu=false;
                    setTimeout(()=> {
                        this.$parent.showCategory = false;
                    },300);
                })

            },
            fetchBrand(bid,bname){

                let vm = this;
                this.$store.commit("setProductParams",{"categoryId": vm.productParams.categoryId, "categoryName": vm.productParams.categoryName, "brandId":bid,"brandName":bname,"pageNum":1})
                this.$store.dispatch('fetchList',this)
                this.$parent.showCategory=false;


            },
        }
    }
</script>

