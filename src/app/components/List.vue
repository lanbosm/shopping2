//列表组件
<template>
    <div class="row"  v-if="!itemData || !itemData.length">
        <div class="col-xs-12">
            没有数据
        </div>
    </div>
    <div class="row"  v-else>
        <div class="col-lg-50 col-md-50 col-sm-33 col-xs-12 item" v-for="(item,index) in itemData ">
             <div class="thumbnail" @click="fetchItem(item.id);">
                 <a  class="list-btn" role="button"  v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                 <div class="prcie primary">{{item.price | currency }}元 <span class="stock">库存：{{item.stock}}件</span> </div>
                 <div class="photo"  >
                 <img class="img-responsive" :src="item.image" :alt="item.title" :title="item.title" />
             </div>
             <div class="caption"><p>{{item.name}}{{item.specDesc}}</p></div>
                <a  class="buy-btn" role="button"   v-show="item.giftType!='none'"><span class="iconfont icon-baobei"></span></a>
             </div>
        </div>
    </div>
</template>

<script>

    import {request, API_URLS} from '../../js/util/request.js';

    export default {
        name: 'ProductList',
        props:["pageSize","productParams","showList"],
        computed: {
            itemData () {
                return this.$store.state.pageData.list;
            }
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
                let apiobj={
                    url:API_URLS.products+"/"+pid,
                     //url:API_URLS.products50,
                };
                request.fnGet(this,apiobj,(res)=>{
                    this.$store.commit("setItemData",res);
                    this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据
                })
            }
        }
    }
</script>

<style scoped>


</style>