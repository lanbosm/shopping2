<template>
   	<ol class="breadcrumb">
        <li>
            <span  class="glyphicon glyphicon-home"></span>
            <a @click="fetchCategory(null)">首页</a>
        </li>
        <li v-show="productParams.categoryName">
            <a @click="fetchCategory(productParams.categoryId)"> {{productParams.categoryName}}</a>
        </li>
        <li v-show="productParams.brandName">
            <a>{{productParams.brandName}}</a>
        </li>
    </ol>
</template>

<style>
</style>
<script>
    import {request, API_URLS} from 'util/request.js';

    export default{
        name:"breadcrumb",
        props:['productParams'],
        created(){
        },
        methods:{
            fetchCategory(cid){

//                let vm = this;
//                vm.$parent.productParams.categoryId=cid;
//                vm.$parent.productParams.brandId='';
//                vm.$parent.fetchList();
            }
        }
    }
</script>

