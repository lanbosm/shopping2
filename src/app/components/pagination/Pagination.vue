//分页器
<template>
    <el-pagination
            @current-change="pageTo"
            :current-page="page.pageNum"
            :page-size=page.pageSize
            layout="total, prev, pager, next"
            :total="page.total">
    </el-pagination>
</template>

<script>
    export default {
        name: 'Pagination',
        props:["page","goCallback"],
        computed: {

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


