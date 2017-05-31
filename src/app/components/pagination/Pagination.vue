//分页器
<template>
    <el-pagination
            @current-change="pageTo"
            :current-page="page.pageNum"
            :page-size=page.pageSize
            layout="total, prev, pager, next"
            :total="listTotal">
    </el-pagination>
    <!--<div class="page-bar">-->
        <!--<ul class="pagination">-->
            <!--<li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>-->
            <!--<li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>-->
            <!--<li v-for=" index in paginationList" :class="{active:index==page.pageNum}"  @click="pageTo(index)"><a>{{ index }}</a></li>-->
            <!--<li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>-->
        <!--</ul>-->
    <!--</div>-->
</template>

<script>
    import simpScroller from 'lib/simpScroller'

    export default {
        name: 'Pagination',
        props:["page","goCallback"],
        computed: {
            listTotal(){
                var pages=this.page.pages;
                var pageSize=this.page.pageSize;

                return pages*pageSize;
            }
        },
        methods:{
            //页码点击事件
            pageTo: function(index){

                    //this.productParams.pageNum=index;
                    this.goCallback(index)

            },
            prePage () {
                // 上一页
//                if(this.currentPage<=1) return false;
//                this.currentPage--
//                this.goCallback(this.currentPage)
            },
            nextPage () {
                // 下一页
//                if(this.currentPage>=this.totalPage) return false;
//                this.currentPage++;
//                this.goCallback(this.currentPage)
            }
        },
        mounted(){

            //console.log(this.page);
        }
    }
</script>

<style scoped>


</style>


