//分页器
<template>
    <div class="page-bar">
        <ul class="pagination">
            <li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>
            <router-link tag="li" v-if="page.hasPreviousPage"><a>上一页</a></router-link>
            <router-link tag="li" v-for=" index in page.pages"  :to="{path:'/',query: {page:index}}"><a>{{ index }}</a></router-link>
            <li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>
        </ul>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'Pagination',
        props:["page"],
        methods:{
            //页码点击事件
            pageTo: function(page){

                if(page !=  this.page.pageNum){
                    alert(111)
                   // this.productParams.pageNum=page;
                    //this.getItemList();
                }
            }
        }
    }
</script>

<style scoped>


</style>


