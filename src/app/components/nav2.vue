<template>
    <div class="row">
        <div class="col-xs-12">
           我是导航二
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductList',
        props:["pageSize","itemData"],
        computed:{

        },
        methods:{
            //页数改变后的回调，参数为改变后的页码
                mmmm(index){
                let ts = this;

                //使当前页变为改变后的页码
                ts.currentPage = index;
            }
        }
    }
</script>

<style scoped>


</style>