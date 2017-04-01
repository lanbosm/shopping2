//分页器
<template>
    <div class="page-bar">
        <ul class="pagination">
            <li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>
            <li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>
            <li v-for=" index in paginationList" :class="{active:index==productParams.pageNum}"  @click="pageTo(index)"><a>{{ index }}</a></li>
            <li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>
        </ul>
    </div>
</template>

<script>
    import {request, API_URLS} from 'util/request.js';

    export default {
        name: 'Pagination',
        props:["page",'productParams'],
        computed: {
            paginationList: function(){
                    var left = 1;
                    var right = this.page.pages;
                    var ar = [];
                    var disNum=10;
                    if(this.page.pages>= disNum){
                        if(this.page.pageNum > disNum/2 && this.page.pageNum < this.page.pages-disNum/2){
                            left = this.page.pageNum - disNum/2
                            right = this.page.pageNum + disNum/2
                        }else{
                            if(this.page.pageNum<=5){
                                left = 1
                                right = 10
                            }
                            else if(this.page.pageNum){
                                //alert(this.page.pageNum);
                                right =  this.page.pages
                                left =  this.page.pages -10;

                            }
                        }
                    }
                    while (left <= right){
                        ar.push(left)
                        left ++
                    }
                    //console.log(ar);
                    return ar
                }



        },
        methods:{
            //页码点击事件
            pageTo: function(index){
                if(index !=  this.page.pageNum){
                    this.productParams.pageNum=index;
                    this.fetchList();
                }
            },
            //请求列表
            fetchList() {

                this.$store.dispatch('fetchList',this)

            }
        },
        mounted(){
            //console.log(this.page);
        }
    }
</script>

<style scoped>


</style>


