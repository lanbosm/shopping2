//列表组件
<template>
    <div>
        <div class="row"  v-show="!listData.list">
            <div class="col-xs-12">
                加载中...
            </div>
        </div>
        <div class="row"  v-show="listData.list.length == 0">
            <div class="col-xs-12">
                没有数据
            </div>
        </div>
        <div  id="actProductList"  v-show="listData.list.length > 0">
            <ul>
                <div class="row product-row"  v-for="(row,rowindex) in listData.list">
                    <div class="col-xs-6 col-sm-4 col-sm-2 act-col" v-for="(item,index) in row.rowData "  @click="fetchItem(item,rowindex);">
                        <div class="item" :class="{'picked':inPick(item.id,row.pickItems)}">
                            <!--图片盒子-->
                            <div class="cc">
                                <div class="photo" :style="{'background-image':'url('+item.image+')'}">

                                    <div class="txt">
                                        <a  class="item-icon-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
                                        <a  class="item-icon-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                        <span class="info">
                                                             <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
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

                    <dl class="act-box" :class="{overline:row.overline}" >
                        <dt class="dd1">满{{row.overlinePrice}}</dt>
                        <dd class="dd2" v-if="!row.overline">加{{row.addPrice}}元</dd>
                        <dd class="dd3" @click="wait(row.overline);">
                            <em v-if="row.overline" >选择赠品</em>
                            <em v-else>查看赠品</em>
                            <small>当前金额{{row.nowPrice | currency}}</small>
                        </dd>
                        <dd class="dd4" @click="wait(row.overline);">
                            <em v-if="row.overline" >参与活动</em>
                            <em v-else>查看全部</em>

                        </dd>
                    </dl>
                </div>

            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProductList',
        data() {
            return {
                    orginData:[

                        {
                            'pickItems':[], //选中的物品
                            'addPrice':10,  //加
                            'overlinePrice':10, //满
                            'rowData':this.$store.state.currentPage.pageData.list //每行数据
                         }
                    ]
            }
        },
        computed: {
            productParams(){
                return this.$store.state.currentPage.list;
            },
            listData () {
                var list= this.orginData;
                list.forEach((ele,index)=>{
                    ele.overline=false;
                    ele.nowPrice=0;
                    ele.pickItems.forEach((ele2,index2)=>{

                        ele.nowPrice+=Number(ele2.price);

                    });

                    if(ele.nowPrice>=ele.overlinePrice){
                        ele.overline=true;
                        ele.needPrice=0;
                    }else{
                        ele.needPrice=ele.overlinePrice-ele.nowPrice;
                    }

                })
                console.log(list);
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

                    this.$store.dispatch('fetchList',this.productParams).then(res=>{
                       if(res.page.list.length>0) {
                            this.$nextTick(_ => {

                                this.$simpleScroll('#actProductList');
                            })
                       }
                    }).catch(res=>{
                        this.$alert(res.msg, {
                            type: 'error',
                        });
                    });


            },
            goCallback(pageIndex){
                this.$store.commit("setProductParams",{pageNum:pageIndex})
                this.fetchList();
            },
            //获取物品详情
            fetchItem:function(item,rowIndex){
                this.$store.dispatch('fetchItem',item.id).then(res=>{

                    this.$store.state.currentPage.pageData.list=[];

                    this.orginData[rowIndex].pickItems.push(item);


                    // this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据  父级传过来的方法  用$emit方法去触发
                }).catch(res=>{
                    this.$alert(res.msg, {
                        type: 'error',
                    });
                });
            }

        }
    }
</script>

<style scoped>


</style>