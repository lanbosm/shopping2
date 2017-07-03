<template>

        <div class="dropdown-menu menu" :class="{'show':showCategory}" @mouseleave="outcheck"  >
            <li class="sub all" :class="{cur:!productParams.categoryId}"><a   href="javascript:void(0)"  @click="fetchAllBrand()">全部分类</a></li>
            <li class="sub" v-for="(item,index) in productCategories" :class="{cur:item.id==productParams.categoryId}">
                <a href="javascript:void(0)"  @click="fetchCategory(item.id,item.name,$event)" >{{item.name}}</a>
            </li>
            <!--<li><a href="#">Action</a></li>-->
            <!--<li><a href="#">Another action</a></li>-->
            <!--<li><a href="#">Something else here</a></li>-->
            <!--<li role="separator" class="divider"></li>-->
            <!--<li><a href="#">Separated link</a></li>-->
            <div class="sub-menu" v-if="showSubMenu" >
                <div v-show="!subCategory || !subCategory.length"><p> 数据加载中...</p></div>
                <div class="l" v-for="(item,index) in subCategory">
                    <div class="l-t">{{item.name}}</div>
                    <div class="l-c">
                        <a  class="btn btn-default sub-menu-category"  :class="{cur:item2.id==productParams.brandId}" v-for="(item2,index2) in item.appBrands"  @click="fetchBrand(item2.id,item2.name,subCategory.id,subCategory.name)">{{item2.name}}</a>
                    </div>
                </div>
            </div>
        </div>

    <!--<div class="categroy row" v-if="showCategory">-->
        <!--<div class="col-xs-12 category-list clearfix" @mouseleave="outcheck" >-->
        <!--<div class="menu"  >-->
            <!---->
            <!--<a  class="sub" href="javascript:void(0)"-->
                <!--:class="{cur:item.id==productParams.categoryId}"-->
                <!--v-for="(item,index) in productCategories"-->
                <!--@click="fetchCategory(item.id,item.name)">{{item.name}}</a>-->
        <!--</div>-->
        <!--<div class="sub-menu" v-if="showSubMenu">-->
                     <!--<div v-show="!subCategory || !subCategory.length"><p> 数据加载中...</p></div>-->
                     <!--<div class="l" v-for="(item,index) in subCategory">-->
                        <!--<div class="l-t">{{item.name}}</div>-->
                        <!--<div class="l-c">-->
                            <!--<a  class="btn btn-primary sub-menu-category"  :class="{cur:item2.id==productParams.brandId}" v-for="(item2,index2) in item.appBrands"  @click="fetchBrand(item2.id,item2.name,subCategory.id,subCategory.name)">{{item2.name}}</a>-->
                        <!--</div>-->
                    <!--</div>-->
        <!--</div>-->

        <!--</div>-->
    <!--</div>-->
</template>

<style lang="less">


</style>
<script>

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
        created(){
            console.log(this.productParams.categoryId);
        },
        mounted(){


        },
        methods:{
            outcheck(){


                var out=true;
                if(document.querySelector('.category-list')) {
                    document.querySelector('.category-list').addEventListener('mouseover', function(){
                        out=false;
                    }, false);

                    setTimeout(() => {

                        if (out ) {
                            document.querySelector('.category-list').addEventListener('mouseover', function(){
                                out=false;
                            }, false);
                            $(".category-list").removeClass('open').trigger($.Event('hidden.bs.dropdown'));
                            this.$parent.showCategory = false;
                        }
                    }, 500);
                }
            },
            fetchCategory(cid,cname,e){


                if(cid){this.showSubMenu=true;}
                this.$store.dispatch('fetchCategory',cid).then(res=>{
                         this.$store.commit("setProductParams", {"categoryId": cid, "categoryName": cname,"brandId":null,"brandName":null});
                });

            },
            fetchAllBrand(){

                var params={
                    'categoryId': null,
                    'brandId': null,
                    'pageNum':  1,
                    'searchStr': null,
                    "categoryName": null,
                    "brandName":null
                }


                this.$store.commit("setProductParams",params);
                this.$parent.switchNavBar('product');
                this.showSubMenu=false;
                setTimeout(()=> {
                    this.$parent.showCategory = false;
                },300);

            },
            fetchBrand(bid,bname){


                var params={ "brandId":bid,"brandName":bname,"pageNum":1};

                this.$store.commit("setProductParams",params);
                this.$parent.switchNavBar('product');
                this.showSubMenu=false;
                setTimeout(()=> {
                        this.$parent.showCategory = false;
               },300);


            },
        }
    }
</script>

