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
        props:["pageSize"],
        computed: {
            itemData () {

                return this.$store.state.pageData.list;
            }
        },
        created(){
            this.fetchData();
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

                    var vm=this;
                    var page=this.$route.query.page;
                    var apiObj={
                        url: API_URLS.products_json,
                        data:{'page':page}
                    };

                 setTimeout(() => {
                     var sss={
                         "pageNum": 1,
                         "pageSize": 10,
                         "size": 5,
                         "orderBy": null,
                         "startRow": 1,
                         "endRow": 5,
                         "total": 5,
                         "pages": 1,
                         "list": [
                             {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                                 "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                                 "barCode": "201701230953",
                                 "price": "400.00",
                                 "id": 49,
                                 "giftType": "none",
                                 "brandName": "test",
                                 "textTagStr": "",
                                 "specDesc": "[黄色 ]",
                                 "marketable": true,
                                 "stock": 12,
                                 "allocatedStock": 0
                             },
                             {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                                 "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                                 "barCode": "201701230953",
                                 "price": "400.00",
                                 "id": 50,
                                 "giftType": "none",
                                 "brandName": "test",
                                 "textTagStr": "",
                                 "specDesc": "[蓝色 ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             },
                             {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                                 "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                                 "barCode": "201701230953",
                                 "price": "400.00",
                                 "id": 51,
                                 "giftType": "none",
                                 "brandName": "test",
                                 "textTagStr": "",
                                 "specDesc": "[粉色 ]",
                                 "marketable": true,
                                 "stock": 0,
                                 "allocatedStock": 0
                             },
                             {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/d2ff87eb-44d6-4b9a-a173-c647f8d5d106.png",
                                 "name": "多嘉爱有机营养米粉四种口味350g+50g",
                                 "barCode": "201701230932",
                                 "price": "120.00",
                                 "id": 52,
                                 "giftType": "none",
                                 "brandName": "test",
                                 "textTagStr": "",
                                 "specDesc": "[香草味 2016-5 400g ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             },
                             {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                                 "name": "酱心曲奇NO.1",
                                 "barCode": "201701231106",
                                 "price": "0.01",
                                 "id": 53,
                                 "giftType": "none",
                                 "brandName": "测试商品，用户勿拍",
                                 "textTagStr": "",
                                 "specDesc": "[草莓 2016-5 ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             }, {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                                 "name": "酱心曲奇NO.1",
                                 "barCode": "201701231106",
                                 "price": "0.01",
                                 "id": 53,
                                 "giftType": "none",
                                 "brandName": "测试商品，用户勿拍",
                                 "textTagStr": "",
                                 "specDesc": "[草莓 2016-5 ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             }, {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                                 "name": "酱心曲奇NO.1",
                                 "barCode": "201701231106",
                                 "price": "0.01",
                                 "id": 53,
                                 "giftType": "none",
                                 "brandName": "测试商品，用户勿拍",
                                 "textTagStr": "",
                                 "specDesc": "[草莓 2016-5 ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             }, {
                                 "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                                 "name": "酱心曲奇NO.1",
                                 "barCode": "201701231106",
                                 "price": "0.01",
                                 "id": 53,
                                 "giftType": "none",
                                 "brandName": "测试商品，用户勿拍",
                                 "textTagStr": "",
                                 "specDesc": "[草莓 2016-5 ]",
                                 "marketable": true,
                                 "stock": 1,
                                 "allocatedStock": 0
                             }
                         ],
                         "firstPage": 1,
                         "prePage": 0,
                         "nextPage": 0,
                         "lastPage": 1,
                         "isFirstPage": true,
                         "isLastPage": true,
                         "hasPreviousPage": false,
                         "hasNextPage": false,
                         "navigatePages": 8,
                         "navigatepageNums": [
                             1
                         ]
                     };
                     vm.$store.commit("setPageData",sss);


                 }, 300);

                //请求数据
                request.fnGet(vm,apiObj,function(){

                    vm.$store.commit("setPageData",sss);
                })

            }
        }
    }
</script>

<style scoped>


</style>