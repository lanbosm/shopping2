<template>
    <div id="layer-stock-box" class="item-layer" style="display: none;">
        <!--商品详情	-->
        <div class="item-detail">
            <div class="item-detail-con">
                <div class="price primary">{{productDetail.price | currency }}元</div>

                <div class="product">
                    <img class="img-responsive  center-block" :src="productDetail.image" :alt="productDetail.title" :title="productDetail.title">
                    <p class="name">{{productDetail.name}} {{productDetail.specDesc}}</p>
                    <p class="gift primary" v-if="productDetail.appGiftActivity">{{productDetail.appGiftActivity.name}}</p>
                    <p class="stock">库存：{{productDetail.stock}}件</p>
                </div>
                <div class="txt-box">
                    <p v-if="!shopRepository.name">请选择调度仓库</p>
                    <p class="tips" v-else>申请调拨： {{shopRepository.name}}
                        <br/>调拨量： {{stockQuantity}}
                    </p>
                </div>
            </div>

        </div>
        <!--库存详情-->
        <div class="stock-detail" >
            <div class="stock-detail-con">
                <div class="stock-list-box">
                    <ul>
                        <p v-if="!shopRepositoryList">加载中...</p>
                        <p v-else-if="shopRepositoryList.length==0">暂时没有仓库提供</p>
                        <li v-else v-for="(item,index) in shopRepositoryList" :class="{selected:item.id==shopRepository.id}">
                            <a class="btn btn-block stock-btn"  @click="chooseRepository(item)">{{item.name}}</a><span>库存：{{item.stock}}件</span>
                        </li>
                    </ul>
                </div>
                <div class="stock-row">
                    <p>申请调拨数量</p>
                    <input v-model="needStock" :class="{enable:shopRepository.stock}" :disabled="!shopRepository.stock" type="tel" placeholder="请输入调拨数量"  number />
                </div>
                <div class="item-detail-bom">
                    <a class="btn btn-lightgreen btn-block specs-ok"  @click="checkRepository" >确定</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../css/util/skin.less";

    /*!item modale*/
    .item-layer {
        width: auto;
        display: none;
        overflow: hidden;
    .item-detail{
        width:320px; float: left; height: 360px;
        padding: 15px;
        position: relative;
        .item-detail-con {
            position: relative; width: 100%;  height:360px;
            overflow:auto;
            .price { position: relative;   }
                .product {  position: relative;  left: 0;right: 0;
                    img{width: 80%; margin: 0 auto; max-height: 160px; }
                    .name{margin-top: 10px; overflow: hidden;}
                }
                .stock{color:#999999;}
                .specs-box{
                    position: relative;
                    .specs-btn{ position: relative; margin:5px 12px; float: left; color: #999999; border:solid 1px #999999;
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
       .item-detail-bom{
                position: relative; width: 100%;
            .specs-ok{ position: relative;   }
       }

     }

    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    .stock-detail{width:320px; float: left; height: 360px;
            padding: 15px;
            position: relative; display: ~none;
        &:after{content: ''; display: block; position: absolute; width: 0px; height: 360px;
             border:solid 1px #f5f5f5; top: 40px; left: -1px;}
        .stock-detail-con {
            position: relative; width: 100%;  height:100%;

            .stock-list-box{ width: 100%; height: 180px; padding-bottom: 15px; overflow: auto; border-bottom: solid 1px @border-color;}
            .stock-list-box p{  text-align: center; margin-top: 30px;}
            .stock-list-box ul{ padding: 0; margin: 0;}
            .stock-list-box li{ margin: 15px 0px ; color: #999999;
                .stock-btn{ width: 60%; position: relative; display:inline-block;   color: #999999; border:solid 1px #999999;
                    .norow;
                }
                 span{display:inline-block; width: 40%; text-align: center;  }
                &:hover,&.selected{
                    color: @themeColor;
                    .stock-btn{border-color: @themeColor; color: @themeColor;}
                }
            }
            .stock-row{ padding-top: 15px; padding-bottom: 15px;
                p{color: #999999;}
                input {padding: 7px 20px;  text-align: right; color:999999;  border:solid 1px #999999; display: block; width: 100%; border-radius:5px;
                    &.enable{ border-color:@themeColor;
                        color: @themeColor;}
                }
            }


        }
        .image { position: absolute; width: 50%; margin: 0 auto; left: 0;right: 0; top: 100px;}
        }


    }








</style>




<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';



    export default{
        name:"ListItem",
        props:['productDetail','specifications','giftIndex'],
        computed: {

            needStock:{
                get:function(){

                    return this.stockQuantity;
                },
                set:function(newValue){

                    if(isNaN(newValue)){
                        //只能输入数字

                    }else{
                        this.stockQuantity=newValue;
                        if(this.stockQuantity>2000){

                            this.stockQuantity=this.shopRepository.stock;
                        }

                    }

                }
            }

        },
        data(){
            return {
                stockQuantity:0,
                shopRepository:{},
                shopRepositoryList:null

            }

        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        created(){
            alert(111);
            this.fetchData();
        },
        methods:{

            fetchData:function(pid){


               this.shopRepositoryList= [
                    {id:100,name:"商家1商家1商家1商家1商家1商家1商家1商家1商家1",stock:1000},
                    {id:101,name:"商家2商家2",stock:100},
                    {id:102,name:"商家1",stock:200}
               ];

//                var apiobj={
//                    url:API_URLS.products,
//                    data:{
//                        'id':pid
//                    }
//                };
//
//                request.fnGet(this,apiobj,(res)=>{
//                    console.log(res);
//                    this.$store.commit("setItemData",res);
//                })
            },
            //选择仓库
            chooseRepository:function(respository){
                this.shopRepository=respository;
                this.stockQuantity=0;

            },

            //确认仓库
            checkRepository: function () {
                this.shopRepository.stockQuantity=this.needStock;
                this.$emit('close-stock',this.respository); //主动触发upup方法，'hehe'为向父组件传递的数据
            },

        }
    }
</script>
