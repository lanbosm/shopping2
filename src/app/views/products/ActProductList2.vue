//列表组件
<template>
    <div>
        <div class="row"  v-if="!listData.list">
            <div class="col-xs-12">
                加载中...
            </div>
        </div>
        <div class="row"  v-else-if="listData.list.length == 0">
            <div class="col-xs-12 no-list"></div>
        </div>
        <div  v-else>
            <ul id="actProductList">
                <div class="row product-row"  v-for="(row,rowindex) in listData.list">
                    <div class="act-ul">
                    <div class="col-xs-6 col-sm-3 col-md-2 col-lg-1 act-col" v-for="(item,index) in row.appProducts "  @click="fetchItem(item,row,rowindex);">
                        <div class="item" :class="{'picked':inPick(item.id,row.pickItems)}">
                            <!--图片盒子-->
                            <div class="cc">
                                <div class="photo" :style="{'background-image':'url('+item.image+')'}">

                                    <div class="txt">
                                        <a  class="item-icon-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
                                        <a  class="item-icon-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                        <span class="info">
                                                  <span class="price">{{item.price | currency }}</span><span class="stock">{{item.availableStock}}</span>
                                          </span>
                                    </div>
                                </div>
                            </div>
                            <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
                            <!--文本盒子-->
                            <div class="tt">
                                {{item.name}} {{item.barCode}}
                             </div>
                        </div>
                    </div>
                    </div >
                    <dl class="act-box" :class="{overline:row.overline}" >
                        <dt class="dd0">{{row.name}}</dt>
                        <dd class="dd1">满{{row.meetPrice}}</dd>
                        <dd class="dd2" v-if="!row.overline">加{{row.additionalPrice}}元</dd>
                        <dd class="dd3" @click="handleGfit(row.overline,row.id);">
                            <em v-if="row.overline">选择赠品</em>
                            <em v-else>查看赠品</em>
                            <small>当前金额{{row.nowPrice | currency}}</small>
                        </dd>
                        <dd class="dd4" @click="wait(row.overline);">
                            <!--<em v-if="row.overline" >参与活动</em>-->
                            <!--<em v-else>查看全部</em>-->
                        </dd>
                    </dl>
                </div>
            </ul>
            <div class="actProductList-footer" >


            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'ProductList',
        data() {
            return {
                    orginData:[  ]
            }
        },
        computed: {

            addData () {
                return this.$store.state.currentPage.addData
            },
            listData () {
                var list= this.orginData;

                list.forEach((ele,index)=>{
                    ele.overline=false;
                    ele.nowPrice=0;
                    ele.pickItems.forEach((ele2,index2)=>{

                        ele.nowPrice+=Number(ele2.price)*Number(ele2.amount);

                    });

                    if(ele.nowPrice>=ele.meetPrice){
                        ele.overline=true;
                        ele.needPrice=0;
                    }else{
                        ele.needPrice=ele.meetPrice-ele.nowPrice;
                    }

                })
              //  console.log(list);
                //list.push(productRow);
                return {'list':list};
            },

        },
        created(){
            this.fetchList();

        },
        watch:{
            

        },
        methods:{
            inPick(id,items){

                var res=false;

                items.forEach((ele,index)=>{
                    if(ele.id==id){
                        res=true;
                    }

                })

                return res;
            },
            handleGfit(over,id){


                this.$root.showGiftDialog=true;

                this.$nextTick(_=> {
                   // console.log(this.$root.$refs.gift.overline)
                    this.$root.$refs.gift.overline = over;
                    this.$root.$refs.gift.id = id;
                   // console.log(this.$root.$refs.gift);
                });

            },
            //获取物品详情
            wait(over){
                var msg=""
                if(over){
                    msg="此功能未开放,参与活动";
                }else{
                    msg="此功能未开放,查看活动"
                }
                this.$alert(msg,{
                    type:'warning'
                })
                    .then(_ => {

                    })

            },
            //请求列表
            fetchList() {

                    if(this.addData.length>0){
                        this.orginData=this.addData;
                        this.$nextTick(_=> {
                            this.$root.$refs.header.resetHeight('#actProductList');
                            //this.$simpleScroll('#actProductList');
                        });


                    }else{
                        this.$store.dispatch('fetchAdditionalsList').then(res=>{
                            console.log(res);
                           if(res.appAdditionalActivities.length>0) {
                                this.orginData=res.appAdditionalActivities;
                                this.$store.commit("setAddData",this.orginData);

                               this.$nextTick(_=> {
                                   this.$root.$refs.header.resetHeight('#actProductList');
                                   //this.$simpleScroll('#actProductList');
                               });

                           }
                        }).catch(res=>{
                            this.$alert(res.msg, {
                                type: 'error',
                            });
                        });
                    }


            },
            goCallback(pageIndex){
                this.$store.commit("setProductParams",{pageNum:pageIndex})
                this.fetchList();
            },
            //获取物品详情
            fetchItem:function(item,row,rowIndex){
                this.$store.dispatch('fetchItem',item.id).then(res=>{

                    var newitem = {};
                    Object.assign(newitem, item);


                    this.orginData[rowIndex].pickItems=this.pushRow(newitem,row.pickItems);
                    this.$root.$refs.app.$refs.cart.checkCartItem(newitem,row.name,row.pickItems);

                    var itemIndex=0;
                    this.orginData[rowIndex].pickItems.forEach((ele,index)=>{

                            if(ele.id==item.id){

                                itemIndex=index;
                            }

                    })

                    this.$root.$refs.app.cartSelectItem= this.orginData[rowIndex].pickItems[itemIndex];

                    this.$store.commit("setAddData",this.orginData);


                    console.log(this.orginData[rowIndex].pickItems);
                    //在存下
                    this.$store.commit('setLocalList');    //存储本地

                    // this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据  父级传过来的方法  用$emit方法去触发
                }).catch(res=>{
                    console.log(res);
                    this.$alert(res.msg, {
                        type: 'error',
                    });
                });
            },
            //判断如何加入购物车
            pushRow(item,pickItems){

                var find=false;

                if(pickItems.length>0){
                    for (var i in pickItems) {

                        if (pickItems[i].id == item.id) {

                            //如果没赠品直接找到
                            if(!pickItems[i].appGiftItem){
                                var cartitem=pickItems[i];
                                cartitem.amount++;
                                //this.$set(pickItems,i,cartitem)
                                pickItems[i]=cartitem;
                                find=true;
                            }

                            else if (pickItems[i].appGiftItem.id== item.appGiftItem.id) {

                                var cartitem=pickItems[i];
                                cartitem.amount++;

                                pickItems[i]=cartitem;
                                find=true;
                                //break;
                            }
                        }
                    }
                }

                if(!find){
                    item.amount=1;
                    pickItems.push(item);


                }
                return pickItems;
            }

        }
    }
</script>

