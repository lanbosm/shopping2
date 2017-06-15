<template>
    <div class="content">
        <commom-header  :title="title" :back="back"  ></commom-header>
        <commom-list>
            <div class="list-body" v-if="!listData.list">
                加载中...
            </div>
            <div class="list-body" v-else-if="listData.list.length==0">
                <div class="no-list"></div>
            </div>
            <div class="list-body" id="custom-list-main-list" v-else >
                <!--list-->
                <div class="list-row" v-for="(item,index) in listData.list">
                    <dl class="col">
                        <dd class="photo"><img :src="item.headPortrait"/></dd>
                        <dd class="name">{{item.nickname}}</dd>

                        <dd class="phone">{{item.username}}</dd>
					</dl>
                    <span class="col">
                        <a class="recharge-btn" @click="handleRecharge(item)">充值</a>
                        <a class="stock-btn" @click="handleStock(item)">查看存货</a>
                        <a class="detail-btn" @click="handleDetail(item)">查看详情</a>
                    </span>
                </div>
            </div>
            <div class="list-footer" slot="list-footer">
                    <div class="footer-left">
                        <pagination :page="listData" :go-callback="handleCurrentChange" ></pagination>
                    </div>
            </div>
        </commom-list>
    </div>
</template>

<style lang="less" scoped>

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .list-row{
        clear: both;
        .col{
            display: block; width: 50%; float: left; text-align: center;
            &:nth-child(1){
                text-align: left;
            }
            &:nth-child(2){
                text-align: right;
            }
        }
        .clearfix;
    }

    .list-body{

            height: @listHeight;
            overflow: hidden;

            .list-row{
                border: solid 1px  @border-color;
                margin-top: @gutter;
                margin-bottom: @gutter;
                border-radius: 5px;
                position: relative;
                height: 80px;
                dd{
                    float: left;
                }
                .photo{
                     width: 64px;
                     height:64px;
                     top:8px;
                     left: 30px;
                     position: absolute;
                     overflow: hidden;
                     border-radius: 50%;
                     background: #cccccc;
                 }

                .name{
                    position: absolute;
                    top:10px;
                    left: 130px;
                    font-size: 14px;
                    line-height: 20px;
                }
                .phone{
                    position: absolute;
                    top:40px;
                    left: 130px;
                    font-size: 14px;
                    line-height: 20px;
                }

                .recharge-btn,.stock-btn,.detail-btn{
                    margin-top: 20px;
                    margin-right: 20px;
                    .green-btn(@radius:30px,@padding:12px 30px);
                }

            }
    }
    .list-footer{

        .footer-left{
            position: absolute;
            top:@gutter;
            left:@gutter;
        }

    }




</style>
<script>


    export default{
    	name: 'CustomList',
        data(){
            return {
                title:"会员",
                back:{"label":"返回","url":"index","show":true},
                listData:{},
                pageNum:1,                 //一页显示多少
            }
        },
        created(){
            this.pageNum=this.$route.query.p||1;

            this.fetchList();

        },
        computed: {
            totalCash (){
                return  0;
            }
        },
        methods:{
            handleCurrentChange(pageIndex){
                this.pageNum=pageIndex;
                this.$router.replace({path:'/customList',query:{p:this.pageNum}});
                this.fetchList();
                window.scrollTo(0,0);
            },
            handleStock(item){
                this.$store.dispatch("fetchPickList",{"memberId":item.id,"pageNum":1}).then(res=>{
                    this.$router.push({path:'/membercargo',query:{mid:item.id,p:this.pageNum}});
                });
            },
            handleDetail(item){
                this.$root.showCustomDialog=true;


                this.$nextTick(_=> {
                    this.$root.$refs.custom.customData = item;
                })
                //this.$alert('此功能未开放', '详情');
            },
            handleRecharge(item){
                this.$root.showRechargeModal=true;
                function centerModals() {
                    $(this).each(function(i) {
                        var $clone = $(this).clone().css('display','block').appendTo('body');
                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                        top = top > 0 ? top : 0;
                        $clone.remove();
                        $(this).find('.modal-content').css("margin-top", top);
                    });
                };
                this.$nextTick(()=>{

                    var vm=this;
                    vm.$root.$refs.recharge.customName=item.username;
                    var modal='#layer-recharge';
                    $(modal).on('show.bs.modal', centerModals);
                    $(modal).on('hidden.bs.modal',function(){
                        vm.$root.showRechargeModal=false;
                        vm.recharge=false;
                    });
                    //禁用空白处点击关闭
                    $(modal).modal({
                        backdrop: 'static',
                        keyboard: false,//禁止键盘
                        show:false
                    });
                    //页面大小变化是仍然保证模态框水平垂直居中
                    $(window).on('resize',(modal)=>centerModals);
                    //shop_admins
                    $(modal).modal('toggle');
                })

            },
            //请求列表
            fetchList() {
                    var data={searchStr:'',pageNum:this.pageNum};
                    this.$store.dispatch('fetchCustomList',data).then(res=>{
                        this.listData=res.page;
                        this.$nextTick(_=>{
                            this.$simpleScroll('#custom-list-main-list');
                        })
                        console.log(res);
                    }).catch(res=>{
                        console.log(res);
                        console.log('err');
                    });

            }
        }

    }
</script>

