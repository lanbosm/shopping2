<template>
    <div id="layer-item-box" class="item-layer" style="display: none;">
        <!--商品详情	-->
        <div class="item-detail">
            <div class="item-detail-con">
                <div class="product" style="margin-top:15px;">
                    <img class="img-responsive  center-block" :src="productDetail.image" :alt="productDetail.title" :title="productDetail.title">
                    <p class="name">{{productDetail.name}} {{productDetail.specDesc}}</p>
                    <p class="price primary">{{productDetail.price | currency }}元</p>
                    <p class="gift primary" v-if="productDetail.appGiftActivity">{{productDetail.appGiftActivity.name}}</p>
                    <p class="stock">库存：{{productDetail.availableStock}}件</p>
                </div>
                <div class="specs-box">
                    <div class="clearfix" v-for="(item,index ) in specifications" >
                        <p class="span-label">{{item.name}}</p>
                        <a class="btn specs specs-btn"  :class="{selected:true}"
                           v-for="(item2,index2) in item.appSpecificationValues" @click="fetchItem(item2.id)" >{{item2.name}}</a>
                    </div>
                </div>
            </div>
            <div class="item-detail-bom">
                 <a class="btn btn-lightgreen btn-block specs-ok"  @click="checkItem(cartItem)" >确定</a>
            </div>

        </div>
        <!--赠品详情-->
        <div class="gift-detail" v-if="productDetail.giftType!='none' && productDetail.appGiftActivity" :data-gift="productDetail.giftType">
            <div class="gift-detail-con">
                <div class="price primary">
                    赠{{productDetail.appGiftActivity.name}} ¥ 0 /
                    <del v-for="(item,index) in productDetail.appGiftActivity.appGifts"><span v-show="productDetail.giftIndex==index">{{item.price}}</span></del>
                </div>
                <!-- Swiper -->
                <div class="gift-detail-item">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"  v-for="(item,index) in productDetail.appGiftActivity.appGifts" ><img :src="item.image"/></div>
                    </div>
                </div>
                <div class="gift-detail-tab">
                    <a class="btn btn-block gift gift-btn" v-for="(item,index) in productDetail.appGiftActivity.appGifts">{{item.name}}</a>
                </div>
                <!-- Add Pagination -->
                <div class="gift-detail-item-pagination"></div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';


    export default{
        name:"ListItem",
        computed: {
            specifications (){
                return this.$store.state.itemData.appSpecifications;
            },
            productDetail (){
                return this.$store.state.itemData.appProductDetail;
            },
            cartItem(){
                 var newitem = {};
                 Object.assign(newitem, this.productDetail);
                 newitem.selectDate = util.getSelectDate(); //自动获取选择日期
                 newitem.amount = 1; //数量默认为1
                 if(this.productDetail.giftType!='none') {
                    newitem.appGiftItem = this.productDetail.appGiftActivity.appGifts[this.productDetail.giftIndex]     //选择的赠品id

                 }

                return newitem;
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            fetchItem:function(pid){



                var apiobj={
                    url:API_URLS.products,
                    data:{
                        'id':pid
                    }
                };

                request.fnGet(this,apiobj,(res)=>{
                    console.log(res);
                    this.$store.commit("setItemData",res);
                })
            },
            //选择物品
            checkItem: function (item) {
                this.$root.$refs.app.closeDetail(item);
            }
        }
    }
</script>
