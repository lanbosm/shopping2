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
            <div class="list-body" v-else>
                <!--list-->
                <div class="list-row" v-for="(item,index) in listData.list">
                    <dl class="col">
                        <dd class="photo"><img :src="item.headPortrait"/></dd>
                        <dd class="name">{{item.name}}</dd>

                        <dd class="phone">{{item.phone}}</dd>
					</dl>
                    <span class="col">
                        <a class="stock-btn" @click="handleStock(item)">查看存货</a>
                        <a class="detail-btn" @click="handleDetail(item)">查看详情</a>
                    </span>
                </div>
            </div>
            <div class="list-footer" slot="list-footer">
                    <div class="footer-left">
                        <Pagination :page="listData" :go-callback="handleCurrentChange" ></Pagination>
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

                .stock-btn,.detail-btn{
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
    import Pagination from 'components/pagination/Pagination.vue';

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
        mounted(){
            this.fetchList();
        },
        components: {
            Pagination,                 //分页器
        },
        computed: {
            totalCash (){
                return  0;
            }
        },
        methods:{
            handleCurrentChange(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            handleStock(item){
                this.$alert('此功能未开放', '存货');
            },
            handleDetail(item){
                this.$store.state.currentPage.customData=item;
                this.$root.showCustomDialog=true;
                //this.$alert('此功能未开放', '详情');
            },
            //请求列表
            fetchList() {
                    var data={searchStr:'',pageNum:1};
                    this.$store.dispatch('fetchCustomList',data).then(res=>{

                        this.listData=res.page;
                        console.log(res);
                    }).catch(res=>{
                        console.log('err');
                    });

            }
        }

    }
</script>

