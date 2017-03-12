<template>
	<div class="container-fluid index" >
            <div class="row" >
                <div class="col-sm-8  col-md-9 left-con">
                    <div class="left-con-header">
                        <breadcrumb></breadcrumb>
                    </div>
                    <div class="left-con-content">
                        <Loading v-if="loading"></Loading>
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading" style="color: red;">
                                <category></category>
                                <!--<div class="row" v-show="navData.show" >-->
                                    <!--<div class="col-xs-12 category-list clearfix" @mouseleave="navData.show=false">-->
                                        <!--<div class="menu">-->
                                            <!--<a :href="nav.id" class="sub btn-lightgreen" v-on:mouseenter="navData.index=index" v-for="(index,nav) in navData.list" @click="getItemList(nav.id)" >{{nav.name}}</a>-->
                                        <!--</div>-->
                                        <!--<div class="sub-menu" >-->
                                            <!--<template v-if="!navData.list[navData.index]">-->
                                                <!--<p> 数据加载中...</p>-->
                                                <!--<template v-if="1<2">-->
                                                    <!--<p> 没有分类</p>-->
                                                <!--</template>-->
                                            <!--</template>-->
                                            <!--<template v-else>-->
                                                <!--<a  class="btn btn-default sub-menu-category" :href="nav.id" v-for="(index,nav) in navData.list[navData.index].children" @click="getItemList(nav.id)">{{nav.name}}</a>-->
                                            <!--</template>-->

                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->
                                <div class="row">
                                    <div class="col-xs-6 col-md-3 col-lg-2">
                                        <a class="btn btn-lightgreen shuaixuan"  @click="categoryShow=!categoryShow" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                    </div>
                                    <!--<div class="searchbar  col-xs-6 col-md-3 col-md-offset-6 col-lg-offset-7  ">-->
                                        <!--<div class="input-group">-->
                                            <!--<input type="text" class="form-control" v-model="searchItem.input" v-on:keyup.enter="searchItem.text=searchItem.input;" placeholder="搜索商品">-->
                                            <!--<span class="input-group-btn">-->
                                                                    <!--<button class="btn btn-default" @click="searchItem.text=searchItem.input;"><span class="glyphicon glyphicon-search"></span></button>-->
                                                                  <!--</span>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                </div>
                            </div>
                            <div class="panel-body">
                                <router-view :page-size="pageSize" @open-detail="openDetail" ></router-view>
                            </div>
                            <div class="panel-footer">
                                <Pagination :page-size="pageSize" ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="col-sm-4  col-md-3 right-con" >
                    <!-- 购物车 -->
                    <cart></cart>
                    <!-- 计算器 -->
                    <calc @trigger-build-order="buildOrder"></calc>
                </div>
            </div>
            <list-item :product-detail="productDetail" :specifications="specifications" :gift-index="giftIndex" @close-detail="closeDetail"></list-item>
    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'components/breadcrumb.vue';
    import category from 'components/category.vue';
    import Pagination  from 'components/Pagination.vue';
    import AppCart from 'components/cart.vue';
    import AppCalc from 'components/calc.vue';
    import Loading from 'components/Loading.vue';
    import ListItem from 'components/ListItem.vue';
    import layer from 'layer';

    export default{
        name: 'app',
        data() {
            return {
                pageSize:8,                 //一页显示多少个
                page:{},
                categoryShow:false,
                giftIndex:0
            }
        },
        computed: {
            //数据来自全局
            loading () {
                    return this.$store.state.loading;
            }, //
            productDetail (){
                    return this.$store.state.itemData.appProductDetail;
            },
            specifications (){

                    return this.$store.state.itemData.appSpecifications;
            }

        },
        components: {
            'cart':AppCart,              //购物车
            'calc':AppCalc,              //计算器
             Pagination,                 //分页器
             breadcrumb,                  //面包屑
             category,                    //分类
             ListItem,                    //商品详情
             Loading
        },
        methods:{
            //创建订单
            buildOrder:function(cart){
                alert("创建订单");
                console.log(cart);
            },
            openDetail() {
                var itemGift = false;
                var itemswiper = '';
                //是否存在赠品
                // alert(this.$store.state.itemData.appProductDetail.appGiftActivity.name);
                this.$store.state.itemData.appProductDetail.appGiftActivity.name ? itemGift : itemGift = true;
                itemGift = true;
                this.$nextTick(() => {
                    //弹出页面层
                    var vm=this;
                    layer.open({
                        id: 'layui-layer-item',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-item-box'),
                        success: function () {
                            if (itemGift){  //如果存在赠品

                                itemswiper = new Swiper('.gift-detail-item', {
                                     pagination: '.gift-detail-item-pagination',
                                    paginationClickable: true,
                                    spaceBetween: 10

                                });

                              itemswiper.on('onSlideChangeEnd', function (swiper) {
                                   //some code
                                  $(".gift-detail-tab").find('a').removeClass('selected');
                                  $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
                                  vm.giftIndex=swiper.activeIndex;

                              })

                              $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                              $(".gift-detail-tab").find('a').on('click',function(){

                                     itemswiper.slideTo($(this).index());//
                                     vm.giftIndex=$(this).index();
                               })

                            }
                        },
                        end: function () {
                            // alert("销毁了");
                            if(itemGift){
                                itemswiper.destroy();
                                $(".gift-detail-tab").find('a').off().removeClass('selected');
                            }
                        }
                    });

                })
            },
            closeDetail(item){
                    layer.closeAll();
                    this.pushCart(item);

            },
            pushCart(item){
                    var cartData=this.$store.state.cartData;
                    cartData.push(item);
                    this.$store.commit("setMode",cartData);
            }
        },
        created(){

            var id = this.$route.query.id;
           // alert(id);
        },
        mounted(){

            //组件开始挂载时获取用户信息
            //alert(66);
        },
    }
</script>

