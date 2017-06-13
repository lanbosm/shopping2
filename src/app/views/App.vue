<template>
	<div class="container-fluid index"  >
            <div class="row" >
                <div class="col-xs-9 left-con">
                    <!--<div class="left-con-header">-->
                        <!--&lt;!&ndash;<breadcrumb  ref="breadcrumb" :product-params="productParams"></breadcrumb>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="left-con-content">
                        <Loading v-if="listLoading"></Loading>
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading" >
                                <category :show-category="showCategory" :product-categories="productCategories" :product-params="productParams"></category>
                                <div class="row">
                                    <div class="col-xs-2">
                                        <a class="btn btn-gray shuaixuan" :class="{activeOn:true}" @click="openCategory()"><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                    </div>
                                    <!---->
                                    <!--<div class="col-xs-2 activity">-->
                                        <!--<a class="btn btn-gray shuaixuan" @click="activeTab()"  :class="{activeOn:activty==true}" ><span class="glyphicon glyphicon-fire"></span>活动专区</a>-->
                                    <!--</div>-->
                                    <div class="col-xs-3  col-xs-offset-7">
                                        <searchbar  :product-params="productParams"></searchbar>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <active-head v-show="activty" :flag="flag"></active-head>
                                <product-list :page="page" :product-params="productParams"  @open-detail="openDetail" v-show="flag"></product-list>
                                <add-price :page="page" :product-params="productParams" @open-detail="openDetail" v-show="!flag"></add-price>
                            </div>
                            <div class="panel-footer">
                                <pagination :page="page" :go-callback="goCallback" ></pagination>
                            </div>

                        </div>
                    </div>
                </div>
               
                <div class="col-xs-3 right-con" >
                    <!-- 购物车 -->
                    <cart ref="cart" @open-stock="openStock" @open-price="openPrice" :cart-data="cartData" :cart-item-index="cartItemIndex"></cart>
                    <!-- 计算器 -->
                    <calc ref="calc" @trigger-build-order="buildOrder" @trigger-edit-price="editPrice" :cart-data="cartData" :cart-item-index="cartItemIndex"></calc>
                </div>
            </div>
            <!--改价-->
            <dialog-edit v-if="showEditDialog" :edit-item="editItem"  ></dialog-edit>
    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'views/products/breadcrumb.vue';
    import searchbar from 'views/products/searchbar.vue';
    import category from 'views/products/category.vue';

    import AppCart from 'views/products/cart.vue';
    import AppCalc from 'views/products/calc.vue';
    import Loading from 'views/products/Loading.vue';


    import ProductList from 'views/products/List.vue';
    import addPrice from 'views/products/addPrice.vue';
    import activeHead from 'views/products/activeHead.vue';


    import layer from 'layer';
    import util from 'util/util.js';
    import {request, API_URLS} from 'util/request.js';

    export default{
        name: 'app',
        data() {
            return {
                showCategory:false,
                showEditDialog:false,
                editItem:{},
                cartItemIndex:0,
                pageNum:1,
                activty:false,
                flag:true

            }
        },
        computed: {
            //数据来自全局
            listLoading () {
                return this.$store.state.currentPage.listLoading;
            },
            productParams(){
                return this.$store.state.currentPage.list;
            },
            page () {
                return this.$store.state.currentPage.pageData;
            },
            productDetail (){
                    return this.$store.state.itemData.appProductDetail;
            },
            itemRepertory (){
                    return this.$store.state.itemRepertory;
            },
            specifications (){
                    return this.$store.state.itemData.appSpecifications;
            },
            productCategories (){
                     return this.$store.state.categoryData;
            },
            cartData () {
                return this.$store.state.currentPage.cartData
            },
            //数据来自全局
            customData () {
                return this.$store.state.currentPage.customData;
            },

        },
        components: {
             cart:AppCart,              //购物车
             calc:AppCalc,              //计算器
             breadcrumb,                  //面包屑
             category,                    //分类
             ProductList,                 //商品列表
             searchbar,
             Loading,
             addPrice,
             activeHead
        },
        created(){
            this.fetchList();
        },
        methods:{
            activeTab(){
                this.activty=true;
                this.showCategory=false;
                if(this.$store.state.activeId.number==3){
                    this.flag=false;
                }
//                this.$store.dispatch("demo").then(res=>{
//
//                }).catch(res=>{
//
//                })
            },
            activeTabt(){
                this.activty=false;
                this.showCategory=true;
                this.flag=true;

            },
            openCategory(){
                this.showCategory=!this.showCategory;
                if(this.showCategory){
                   console.log('load');
                }
            },
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchList',{"pageNum":this.pageNum});
            },
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.$store.dispatch('fetchList',{"pageNum":this.pageNum});
            },
            //创建订单
            buildOrder:function(cart){
                //alert(this.mode);

                console.log(cart);
                var cartParam={itemParams:[]};

                cart.forEach(function(ele,index){

                    cartParam.itemParams.push(
                        {"productId":ele.id,"quantity":ele.amount,'discountPrice':ele.discountPrice}
                    )
                });


                var giftParam={giftIds:[]};

                cart.forEach(function(ele,index){

                    if(ele.appGiftItem) {
                        giftParam.giftIds.push(
                            {"productId": ele.appGiftItem.id, "quantity": ele.appGiftItem.amount}
                        )
                    }
                });


                this.$store.commit("setOrderParams",{
                        cartParam:JSON.stringify(cartParam),
                        giftIds:JSON.stringify(giftParam),
                        couponCodeId:null,
                        usePoint:false,
                        useBalance:false,
                        memberId:this.customData.id,
                        guiderId:null
                })



                var apiObj={
                    url:API_URLS.b2b_orders+"/build",
                    data:this.$store.state.currentPage.orderParams
                }

                request.fnPost(this,apiObj,(res)=>{
                     this.$store.commit("setOrderData",res.appOrderConfirmBean);
                     this.$store.state.currentPage.cartData=[];
                     var pageList=this.$store.state.pageList;
                     this.$store.commit('setLocalList',pageList);    //存储本地
                     this.$router.push('/order');
                })


            },
            //改价
            editPrice(){
                var item=this.cartData[this.cartItemIndex];
                this.openPrice(item);
            },
            //打开详情
            openDetail() {
                //是否存在赠品
                let vm=this;
                let item=this.$store.state.itemData.appProductDetail;
                let itemGift = !!item.appGiftActivity;
                let itemSpec = item.appSpecificationValues;
                let itemswiper = '';


                //如果该商品没有规格和赠品 直接加入购物车    appGiftActivity appSpecificationValue
                if(!itemGift && itemSpec.length==0){

                    var newitem = {};
                    Object.assign(newitem, item);
                    newitem.selectDate = util.getSelectDate(); //自动获取选择日期
                    newitem.amount = 1; //数量默认为1
                    this.pushCart(newitem);
                    return false;
                }
                this.$root.showListItem=true;

                vm.$nextTick(() => {

                    //弹出页面层
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
                                    initialSlide :0,
                                    pagination: '.gift-detail-item-pagination',
                                    paginationClickable: true,
                                    spaceBetween: 10,
                                    onInit:function(swiper){
                                        vm.giftIndex=swiper.activeIndex;
                                    }
                                });


                                itemswiper.on('onSlideChangeEnd', function (swiper) {
                                    //some code
                                    $(".gift-detail-tab").find('a').removeClass('selected');
                                    $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
                                    vm.productDetail.giftIndex=swiper.activeIndex;
                                });
                                $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                                $(".gift-detail-tab").find('a').on('click',function(){
                                    $(".gift-detail-tab").find('a').removeClass('selected');
                                    itemswiper.slideTo($(this).index());//
                                    vm.productDetail.giftIndex=$(this).index();
                                    //  $(".gift-detail-tab").find('a').eq(vm.giftIndex).addClass('selected');
                                })
                            }
                        },
                        end: function () {

                            if(itemGift){
                                itemswiper.destroy(true,true);
                                itemswiper=null;
                            }
                            vm.$root.showListItem=false;

                        }
                    });

                })
            },
            closeDetail(item){

                layer.closeAll();
                this.pushCart(item);
            },
            //打开仓库详情
            openStock(item) {


                let vm=this;
                var params={
                    barcode:item.barCode,
                    quantity:item.amount-item.availableStock
                }



                this.itemRepertory.needQuantity=item.amount-item.availableStock;

                this.$store.dispatch("fetchAllocationList",params).then(res=>{
                    this.itemRepertory.appRepertories=res.appRepertories||[];
                    this.$root.showStockItem=true;

                    vm.$nextTick(() => {
                        //弹出页面层
                        layer.open({
                            id: 'layui-layer-stock',
                            type: 1,            //1 普通层
                            shade: 0.01,  //遮罩
                            anim: 0,
                            zIndex: 1000,
                            closeBtn: 2,
                            title: false,
                            area: ['auto', 'auto'], //宽高
                            content: $('#layer-stock-box'),
                            success: function () {

                            },
                            end: function () {
                                vm.itemRepertory.appRepertories=[];
                                vm.itemRepertory.needQuantity=0;
                                vm.$root.showStockItem=false;
                            }
                        });

                    })
                }).catch(res=>{
                    layer.alert("获取仓库信息失败",{"icon":2})
                })
                return false;
            },
            //关闭仓库详情
            closeStock(params){

                if(!params.shopRepertoryId){
                    //layer.closeAll();  //没有仓库
                    layer.alert("请选择调拨门店",{icon:2});
                }else{
                    this.$store.dispatch("applyAllocation",params).then(res=> {
                        layer.alert("调拨申请成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    }).catch(res=> {
                        layer.alert("调拨申请失败",{icon:2 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    });
                }


            },
            //打开改价
            openPrice(item){


                this.$set(item,'isDiscount',true);
                this.editItem=item;
                this.showEditDialog=true;

            },
            //判断如何加入购物车
            pushCart(item){

                var find=false;

                if(this.cartData.length>0){
                    for (var i in this.cartData) {

                        if (this.cartData[i].id == item.id) {

                            //如果没赠品直接找到
                            if(!this.cartData[i].appGiftItem){
                                this.cartData[i].amount++;
                                find=true;
                            }

                            else if (this.cartData[i].appGiftItem.id== item.appGiftItem.id) {
                                this.cartData[i].amount++;
                                find=true;
                                //break;
                            }
                        }
                    }
                }

                if(!find){
                    this.cartData.push(item);
                    this.cartItemIndex=this.cartData.length-1;
                    this.$refs.calc.calcmode="qty";
                    //在存下
                    var pageList=this.$store.state.pageList;
                    this.$store.commit('setLocalList',pageList);    //存储本地
                }

            }
        }
    }
</script>

