<template>
 <div role="dialog" class="modal fade showAdmin-layer" id="layer-showAdmin">
        <div class="modal-dialog ">

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title text-center">选择导购员</h4>
                    <a class="close" data-dismiss="modal">&times;</a>
                </div>
                <div class="modal-body">
                    <div class="shop-admin-list">
                        <p class="text-center" v-if="!listData">加载中</p>
                        <p class="text-center" v-else-if="listData.length==0">没有相关数据</p>
                        <ul class="cleafix" v-else>
                            <li v-for="(item,index) in listData" >
                                <a class="btn btn-shopadmin" :class="{'cur':shopAdminIndex==index}" @click="shopAdminIndex=index">{{item.name}}</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="modal-foot">
                    <a class="btn btn-default showAdmin-layer-close" @click="checkShopAdmin" >确认</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";


    /*!showAdmin modale*/
    .showAdmin-layer {
        .modal-dialog{width: 400px;}
        border-bottom:solid 3px #93d6b3;padding:10px 30px;
        .modal-header{
            border-bottom: solid 3px @green;
            .close{margin-top:-20px}
        }
        .modal-body {
            padding: 30px 30px;
            .shop-admin-list{
                .btn-shopadmin{
                    padding: 10px  30px;
                    border: solid #999999 1px;
                    color: #999999;
                    &.cur,&:hover{
                        background:@green; color: #ffffff; ;
                    }
                }
                clear: both;
                ul{height: 160px; overflow-x: hidden; padding: 0; margin: 0;}
                li{
                    width: 40%;
                    float: left;
                    margin: 15px 15px;

                }
            }

        }
        .modal-foot{
            border-top:1px dashed @border-color;
            padding:10px 0px; text-align: center;
            .showAdmin-layer-close{display: inline-block;
                background:@green; color: #ffffff; padding:10px 50px;
            }
        }
    }
</style>

<script>
    import {request, API_URLS} from 'util/request.js';
    import $ from 'jquery';
    export default{
        name: 'showAdminWin',
        data(){
            return {
                shopAdminIndex:null,
                type:"GUIDER",
                keyword:"",
                listData:null
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                    var apiobj = {
                        url : API_URLS.shop_admins+'/'+this.type,
                        data:{keyword:this.keyword}
                    };
                    request.fnGet(apiobj).then(res=>{
                            this.listData=res.list
                    }).catch(res=>{
                       alert("获取失败")
                    })
            },
            checkShopAdmin(){
                if(!this.shopAdminIndex){return false;}
                var shopAdmin=this.listData[this.shopAdminIndex];
                this.$store.commit("setShopAdminData",shopAdmin);
                this.$store.commit("setOrderParams",{
                    guiderId:shopAdmin.id,
                })
                var modal='#layer-showAdmin';
                $(modal).modal('hide');
                //this.$root.showShopAdminModal=false; 如果要每次刷新
            }
        }
    }
</script>

