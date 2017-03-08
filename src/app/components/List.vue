//列表组件
<template>
    <div class="row"  v-if="!itemData">
        <div class="col-xs-12">
            数据加载中..
        </div>
    </div>
    <div class="row"  v-else-if="itemData.length!=0">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 item" v-for="(item,index) in itemData ">
             <div class="thumbnail" @click="openItem(item.id);">
                 <a  class="list-btn" role="button"  v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                 <div class="prcie primary">{{item.price | currency }}元</div>
                 <div class="photo"  >
                 <img class="img-responsive" :src="item.image" :alt="item.title" :title="item.title" >
             </div>
             <div class="caption"><p>{{item.name}}</p></div>
                <a  class="buy-btn" role="button"   v-show="item.giftType!='none'"><span class="iconfont icon-baobei"></span></a>
             </div>
        </div>
    </div>
    <div class="row"  v-else="itemData.length==0">
        <div class="col-xs-12">
            没有相关数据....
        </div>
    </div>

</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'ProductList',
        props:["pageSize","itemData"],
        computed:{

        },
        created(){

            //this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            //页数改变后的回调，参数为改变后的页码
            goToCallback(index){
                let ts = this;

                //使当前页变为改变后的页码
                ts.currentPage = index;
            },
            fetchData:function () {
                alert(111);
//                this.error = this.post = null;
//                this.loading = true;
//                getPost(this.$route.params.id,(err,post) => {
//                    this.loading = false;
//                    if(err) {
//                        this.error = err.toString();
//                    }else {
//                        this.post = post
//                    }
//                })
            },
            back: function() {
                router.go(-1);
            }
        }
    }
</script>

<style scoped>


</style>