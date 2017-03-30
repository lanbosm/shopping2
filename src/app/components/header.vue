<template>
    <div class="header">
        <div class="container-fluid ">
            <div class="logo">
                <a class="navbar-brand"><img src="/images/logo.jpg" alt="Brand"></a>
            </div>

            <div class="header-nav navbar " id="header-nav">
                <div class="staff">{{shopData.adminName}}</div>
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="navbar-collapse collapse" role="navigation">
                    <ul class="nav navbar-nav">
                        <template v-if="item" v-for="item in pageList">
                            <li ><a class="custom"  :class="{cur: currentPage && (currentPage.pageIndex == item.pageIndex)}" @click="switchPage(item.pageIndex)"><span class="num">{{item.title}}</span><span class="time">{{item.time}}</span></a></li>
                        </template>
                    </ul>
                    <a class="custom-add" @click="addPage()">+</a>
                    <a class="custom-remove" @click="removePage()">-</a>
                    <div class="menu-box">
                        <a class="msg-btn"  @click="msg()">
                            消息
                        </a>
                        <a class="exit-btn" @click="exit()">
                            <i class="icon icon-exit"></i>
                            退出
                        </a>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style>
</style>
<script>

    import util from '../../js/util/util.js';
    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';

    export default{

        computed: {
            shopData(){
                return this.$store.state.shopData;
            },
            pageList(){
                //console.log("pageList");
                return this.$store.state.pageList;
            },
            currentPage(){
              //console.log("currentPage");
              return this.$store.state.currentPage;
            },
            member(){
                return this.$store.state.member;
            },
            mode(){
                return this.$store.state.currentPage.mode;
            },
        },
        data(){
            return {
                success:true
            }
        },
        created(){

            //获取门店信息
            var shopData= util.pullLocal("shopData");
            this.$store.commit('setShopData', shopData);

            //先获取本地
            let localData=this.getLocalData();
           // let localData="";
//            //从中间件获取
            if(localData && localData.length){
                this.$store.commit("setPageList", localData);
            }
            if(!this.pageList || !this.pageList.length){
                this.$store.commit('initPage');
            }
        },
        methods:{
            addPage(){
                this.$store.commit('addPage', 1);
                this.$router.replace('/'+this.mode);
                this.saveLocalData()
            },
            removePage(){
                let vm = this;
                layer.confirm('确定要删除吗？删除后数据将丢失！', function(index){
                    vm.$store.commit('removePage', 1);
                    layer.close(index);
                    vm.$router.replace('/'+vm.mode);

                    vm.saveLocalData();
                });

            },
            switchPage(index){
                this.$store.commit('switchPage', index);
                //切换路由
                this.$router.replace('/'+this.mode);
                this.saveLocalData();
            },
            getLocalData(){
                return util.pullLocal("pageList");
            },
            saveLocalData(){
                util.pushLocal("pageList", this.pageList);
            },
            msg(){
                return false;
                this.$store.commit("setMode","message");
                this.$router.replace('/message');
                //alert("连接设备");
            },
            exit(){
                let vm = this;
                layer.confirm('确定要退出吗？', function(index){

                    var apiObj={
                        url: API_URLS.log_out
                    }
                    request.fnGet(vm,apiObj,(res)=>{

                            layer.closeAll();
                            util.delLocal("accessToken");
                            util.delLocal("shopData");
                            util.delLocal("pageList");
                            vm.saveLocalData();
                            location.href = "./login.html";

                        }
                    )
                });
            },
        },
        mounted() {
        }
    }
</script>

