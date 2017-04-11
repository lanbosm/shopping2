<template>
    <div id="layer-stock-box" class="stock-layer" style="display: none;">
        <!--商品详情	-->
        <div class="item-detail">
            <div class="item-detail-con">
                <div class="price">{{productDetail.price | currency}} </div>

                <div class="product">
                    <img class="img-responsive  center-block" :src="productDetail.image" :alt="productDetail.title" :title="productDetail.title">
                    <p class="name">{{productDetail.name}} {{productDetail.specDesc}}</p>
                    <p class="gift primary" v-if="productDetail.appGiftActivity">{{productDetail.appGiftActivity.name}}</p>
                    <p class="stock">现有库存：{{productDetail.availableStock}}件</p>
                </div>
                <div class="txt-box">
                    <p class="tips" v-if="!shopRepository.shopName">请选择调拨门店</p>
                    <div v-else>
                        <p class="tips" >申请调拨： {{shopRepository.shopName}} </p>
                        <p class="tips" >申请数量： {{stockQuantity}} </p>
                        <p class="tips" >申请备注： {{memo}} </p>
                    </div>
                </div>
            </div>

        </div>
        <!--库存详情-->
        <div class="stock-detail" >
            <div class="stock-detail-con">
                <div class="stock-list-box">
                    <p v-if="!shopRepositoryList">加载中...</p>
                    <p v-else-if="shopRepositoryList.length==0">暂时没有仓库可调拨</p>
                        <ul v-else>
                            <li v-for="(item,index) in shopRepositoryList" :class="{selected:item.shopId==shopRepository.shopId,dis:item.dis}">
                            <a class="btn btn-block stock-btn"   @click="chooseRepository(item)">{{item.shopName}}</a><span>库存：{{item.availableStock}}件</span>
                        </li>

                    </ul>
                </div>
                <div class="stock-row">
                    <p>申请调拨数量</p>
                    <input v-model="needStock"  :disabled="!shopRepository.availableStock" type="tel" placeholder="请输入调拨数量"  number />
                </div>
                <div class="stock-row">
                    <p>备注</p>
                    <input v-model="memo" type="text" :disabled="!shopRepository.availableStock" placeholder="请输入备注"   />
                </div>
                <div class="item-stock-bom">
                    <a class="btn btn-lightgreen btn-block specs-ok"  @click="checkRepository" >确定</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    /*!item modale*/
    .stock-layer {
        width: auto;
        display: none;
        overflow: hidden;
        .dis{opacity: 0.5; pointer-events: none;};
    .item-detail{
        width:320px; float: left; height: 400px;
        padding: @gutter;
        padding-left: @gutter*2;
        padding-right: @gutter*2;
        position: relative;

        .item-detail-con {
            position: relative; width: 100%;  height:400px;
            overflow:auto;
            .price { position: relative; color: @themeColor; margin-bottom: @gutter; }
                .product {  position: relative;  left: 0;right: 0;
                    img{width: 80%; margin: 0 auto; max-height: 160px; }
                    .name{margin-top: 10px; overflow: hidden;}
                }
                .stock{color:#999999;}
                .specs-box{
                    position: relative;
                    .specs-btn{ position: relative; margin:5px 12px; float: left; color: #999999; border:solid 1px @border-color;
                        &:hover,&.selected{ color: @themeColor; border-color: @themeColor;}
                    }
                 }
                .txt-box{

                    position: relative;
                    p {
                        color: #999;
                        &.tips {
                            color: @themeColor;
                        }
                    }

                }
        }


     }

    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    .stock-detail{width:320px; float: left; height: 400px;
            padding: @gutter;
            padding-left: @gutter*2;
            padding-right: @gutter*2;
            position: relative;
        &:after{content: ''; display: block; position: absolute; width: 0px; height: 400px;
             border:solid 1px #f5f5f5; top: 40px; left: -1px; }
        .stock-detail-con {
            position: relative; width: 100%;  height:100%;

            .stock-list-box{ width: 100%; height: 160px; padding-top: @gutter*1.5; padding-bottom: @gutter; overflow: auto; border-bottom: solid 1px @border-color;}
            .stock-list-box p{  text-align: center; margin-top: 30px; color:@thinColor;}
            .stock-list-box ul{ padding: 0; margin: 0;}
            .stock-list-box li{ margin: @gutter 0px ; color: #999999;
                .stock-btn{ width: 60%; position: relative; display:inline-block;   color: #999999; border:solid 1px @border-color;
                    .norow;
                }
                 span{display:inline-block; width: 40%; text-align: center;  }
                &:hover,&.selected{
                    color: @themeColor;
                    .stock-btn{border-color: @themeColor; color: @themeColor;}
                }
            }
            .stock-row{ padding-top: 5px; padding-bottom: 5px;
                p{color: #999999;}
                input {padding: 7px 20px;  text-align: right; color:#999999;  border:solid 1px @border-color; display: block; width: 100%; border-radius:5px;
                    &:focus
                    {
                        border-color:@themeColor; color: @themeColor;
                    }
                }
            }


        }
        .image { position: absolute; width: 50%; margin: 0 auto; left: 0;right: 0; top: 100px;}

        .item-stock-bom{
            margin-top: @gutter;
            position: relative; width: 100%;
            .specs-ok{ position: relative;   }
        }
    }
}



</style>




<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';



    export default{
        name:"ListItem",
        props:['productDetail','appRepertories','needQuantity'],
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
        computed: {
            shopRepositoryList(){

                var arr=[];

                this.appRepertories.forEach((ele,index)=>{
                    if(this.needStock>ele.availableStock){
                        ele.dis=true;
                    }else{
                        ele.dis=false;
                    }
                    arr.push(ele);

                });
                return arr;

            },
            needStock:{
                get:function(res){
                    return this.stockQuantity;
                },
                set:function(newValue){

                    if(!isNaN(newValue)){
                        this.stockQuantity=newValue;
                    }

                }
            }

        },
        data(){
            return {
                stockQuantity:0,
                shopRepository:{},
                memo:"",
                allocationParams:{
                    id:null,
                    shopRepertoryId:null,
                    quantity:0,
                    memo:""
                }
            }

        },
        created(){


           this.stockQuantity=this.needQuantity;
        },
        methods:{
            //选择仓库
            chooseRepository:function(respository){
                this.shopRepository=respository;
            },

            //确认仓库
            checkRepository: function () {

                this.allocationParams.id=this.productDetail.id;
                this.allocationParams.shopRepertoryId=this.shopRepository.shopRepertoryId;
                this.allocationParams.quantity=this.needStock;
                this.allocationParams.memo=this.memo;

                this.$emit('close-stock',this.allocationParams); //主动触发upup方法，'hehe'为向父组件传递的数据
            },

        }
    }
</script>
