<template>
   	<ol class="breadcrumb">
        <li><span  class="glyphicon glyphicon-home"> </span><a @click="goMap(0)">首页</a></li>
        <li v-if="productList.categoryName"> <a @click="goMap(productList.categoryId)"> {{productList.categoryName}}</a></li>
        <li v-if="productList.brandName"> <a @click="goMap(brand.categoryId)">{{productList.brandName}}</a></li>
    </ol>
</template>

<style>
</style>
<script>
    "use strict";
    import {request, API_URLS, HOST} from 'util/request.js';

    export default{
        name:"category",
        props:['productList'],
        created(){

        },
        methods:{
            goMap(id){

            },
            fetchCategory(cid){

                this.productList.categoryId=cid;
                var apiobj={
                    url:API_URLS.category,
                    data:this.productList
                };

                request.fnGet(this,apiobj,(res)=>{
                    //console.log(res);
                    this.$store.commit("setCategoryData",res.appProductCategories);
                    this.$store.commit("setList",{"categoryId":cid});
                })
            }
        }
    }
</script>

