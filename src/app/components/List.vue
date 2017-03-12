//列表组件
<template>
    <div class="row"  v-if="!itemData">
        <div class="col-xs-12">
            数据加载中..
        </div>
    </div>
    <div class="row"  v-else-if="itemData.length!=0">
        <div class="col-lg-50 col-md-50 col-sm-33 col-xs-12 item" v-for="(item,index) in itemData ">
             <div class="thumbnail" @click="fetchItem(item.id);">
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
        props:["pageSize"],
        computed: {
            itemData () {
                return this.$store.state.pageData.list;
            }
        },
        created(){
            this.fetchList();
        },
        watch: {
            '$route': 'fetchList'
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            //获取物品详情
            fetchItem:function(pid){

                var apiobj={
                    url:API_URLS.products50,
                    data:{
                        'id':pid
                    }
                };

                request.fnGet(this,apiobj,(res)=>{
                    console.log(res);
                    this.$store.commit("setItemData",res);
                    this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据
                })
            },
            //请求列表
            fetchList() {
                    var vm=this;
                    var page=this.$route.query.page||1;
                    var apiObj={
                        url: API_URLS.products,
                        data:{'pageNum':page}
                    };


                    request.fnGet(vm,apiObj,(res)=>{
                        this.$store.commit("setPageData",res.page);
                    })

            }
        }
    }
</script>

<style scoped>


</style>