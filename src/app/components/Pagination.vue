//分页器
<template>
    <div class="page-bar">
        <ul class="pagination">
            <li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>
            <li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>
            <li v-for=" index in page.pages"  :class="{ 'active': page.pageNum == index}">
            <router-link  @click="pageTo(index)" :to="{path:'/',query: {page:index}}">{{ index }}</router-link></li>
            <li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>
        </ul>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'ProductList',
        props:["pageSize"],
        computed:{
            page () {
                return this.$store.state.pageData
            }
        },
        methods:{
            //页码点击事件
            pageTo: function(page){
                console.log("page");
                if(page !=  this.page.pageNum){

                   // this.productParams.pageNum=page;
                    //this.getItemList();
                }
            }
        }
    }
</script>

<style scoped>


</style>


