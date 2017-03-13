//分页器
<template>
    <div class="page-bar">
        <ul class="pagination">
            <li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>
            <li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>
            <li v-for=" index in page.pages" :class="{active:index==productList.pageNum}"  @click="pageTo(index)"><a>{{ index }}</a></li>
            <li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>
        </ul>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'Pagination',
        props:["page",'productList'],
        computed: {
              showPrev(){
                  if(this.page===1){
                      return false;
                  }else{
                      return true;
                  }
              },
              prev(){
                  return this.page-1
              }

        },
        methods:{
            //页码点击事件
            pageTo: function(index){
                if(index !=  this.page.pageNum){
                    this.productList.pageNum=index;
                    this.fetchList();
                }
            },
            //请求列表
            fetchList() {
                var apiObj={
                    url: API_URLS.products,
                    data:{
                        'categoryId': this.productList.categoryId,
                        'brandId': this.productList.brandId,
                        'pageNum': this.productList.pageNum,
                        'searchStr': this.productList.searchStr
                    }
                };

                request.fnGet(this,apiObj,(res)=>{
                    this.$store.commit("setPageData",res.page);
                })
            }
        },
        mounted(){
            //console.log(this.page);
        }
    }
</script>

<style scoped>


</style>


