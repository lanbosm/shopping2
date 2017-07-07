<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogShow"
            top="10%"
            custom-class="dialog-gift"
            :close-on-click-modal=false
            :modal=true
            @close="closeWin();"
            >
                <div class="dialog-gift-con">
                    <div class="act-type">
                        <a class="btn act-type-btn" :class="{selected:tabIndex==index}"  v-for="(item,index) in listData.list" @click="changeTab(item.id,index)">+{{item.additionalPrice}}</a>
                    </div>
                    <div class="row" v-if="!listData.list">
                        <div class="col-xs-12">
                            加载中...
                       </div>
                    </div>
                    <div class="row" v-else-if="listData.list.length == 0">
                        <div class="col-xs-12 no-list"></div>
                    </div>
                    <div class="row product"   id="giftProductList"  v-else>
                        <ul class="clearfix">
                            <li class="col-xs-6 col-sm-4 col-md-3 col-lg-3  " v-for="(item,index) in listData.list[tabIndex].appProducts"  @click="checkItem(item,index);">
                                <div class="item" :class="{selected:index==listIndex}">
                                    <!--图片盒子-->
                                    <div class="cc">
                                        <div class="photo" :style="{'background-image':'url('+item.image+')'}">
                                            <div class="txt">
                                                <a  class="item-icon-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                                <span class="info">
										 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
								</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!--文本盒子-->
                                    <div class="tt">
                                        {{item.name}} {{item.barCode}}
					                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                   <div class="">



                   </div>
                </div>
          <div slot="footer" class="dialog-footer">

               <a class="btn btn-primary save-btn" :class="{dis:!overline}"  @click="handleSave()" >确认换购</a>

          </div>

    </el-dialog>

</template>

<style lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .dialog-gift{
        .dialog();
        width: 60% !important;
        input:focus{
            border-color: @themeColor;
        }
        .el-dialog__header{
            padding-bottom: 10px;
            border-bottom: 1px solid @green;
        }
        .el-dialog__body{
            padding: @gutter 20px;
            min-height: 450px !important;
            .product{
                height: 450px !important; overflow: hidden;
            }
        }
        .el-dialog__footer{
            text-align: left;
        }
        .dialog-gift-con{
            width: 100%;
            li {
                margin-top: @gutter;
                .item.selected {
                    border: solid 1px @themeColor;
                }
            }
        }
        .dialog-footer{
            text-align: center;
            .save-btn{
                font-size: 18px;
            }
            .save-btn.dis{
                 pointer-events: none;
                 opacity: 0.5;
            }

        }

    }
</style>
<script>
    export default {
        name:"GiftDialog",
        data() {
            return {
                overline:false,
                dialogShow: true,
                title:"查看赠品",
                id:null,
                listIndex:null,
                tabIndex:0,
                addiPurchaseId:null,
                addProuct:null,
                listData:{ }


            }

        },
        created(){
            this.$nextTick(_=>{

                //alert(this.id);
                if (this.overline) {
                    this.title="选择赠品";
                }
                this.fetchList();

            })

        },
        computed: {
            addData () {
                return this.$store.state.currentPage.addData
            },
        },
        mounted(){

        },
        methods: {
            fetchList(){
                this.$store.dispatch('fetchPurchaseList', this.id).then(res => {
                    console.log(res);

                        this.listData ={list:res.appAdditionalPurchases};

                        if (this.listData.list.length > 0) {
                            this.addiPurchaseId=res.appAdditionalPurchases[0].id;
                            this.$nextTick(_ => {
                                this.$simpleScroll('#giftProductList');
                            })
                        }
                }).catch(res => {
                    this.$alert(res.msg, {
                        type: 'error',
                    });
                });



            },
            closeWin(){
                this.dialogShow = false;

                setTimeout(_ => {
                    this.$root.showGiftDialog = false;
                }, 300);
            },
            //
            changeTab(id,index){
                this.addiPurchaseId=id;
                this.tabIndex=index;
                this.listIndex=null;
            },
            //修改
            checkItem(item,index){
                if(!this.overline){
                    return false;
                }
                this.addProuct=item;
                this.listIndex=index;

            },
            //保存
            handleSave(){
                if(!this.addProuct) {
                    this.$message({
                        message: '请选择加价购商品',
                        type: 'warning'
                    });
                    return false;
                }

                this.addData.forEach((ele,index)=>{

                        if(ele.id==this.id){
                            ele.addiPurchaseId= this.addiPurchaseId;
                            this.$set(ele,'addiPurchaseId',this.addiPurchaseId);
                            this.$set(ele,'addProuct',this.addProuct);
                        }
                })

                this.closeWin();
                console.log(this.addData);
                //alert( this.addiPurchaseId+","+this.addProuctId)
            },


        }
    };
</script>
