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
                            <span class="badge">{{msgData.msgNum}}</span>
                        </a>
                        <a class="cash-btn"  @click="cash()">
                            <i class="icon icon-cash"></i>
                            备用金
                        </a>
                        <a class="log-btn"  @click="log()">
                            <i class="icon icon-log"></i>
                            营业状态
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

    import util from 'util/util.js';
    import {request, API_URLS, HOST} from 'util/request.js';
    import layer from 'layer';

    export default{

        computed: {
            shopData(){
                return this.$store.state.shopData;
            },
            msgData(){
                return this.$store.state.msgData;
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


            //判断备用金 只填写一次
            if(this.shopData.needSpareCash){

                this.shopData.needSpareCash=false;
                util.pushLocal("shopData",this.shopData);
                setTimeout(() => {
                    this.cash();
                },300);
            }
            this.$store.dispatch("addListenAllocation");

            //先获取本地商品记录
            let localData=this.getLocalData();
            if(localData && localData.length){
                this.$store.commit("setPageList", localData);
            }
            if(!this.pageList || !this.pageList.length){
                this.$store.commit('initPage');
            }

            this.addMsglistener();
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


                this.mode= this.mode.replace(/\//i,"");
                this.$router.replace('/'+this.mode);
                this.saveLocalData();
            },
            getLocalData(){
                return util.pullLocal("pageList");
            },
            saveLocalData(){
                util.pushLocal("pageList", this.pageList);
            },
            delLocalData(){
                this.$store.commit("setPageList", []);
                this.$store.commit('setShopData', {});
                util.delLocal("accessToken");
                util.delLocal("shopData");
                util.delLocal("pageList");
            },
            cash(){

                var vm=this;

                this.$root.showCashModal=true;

                this.$nextTick(() => {
                    //弹出页面层
                    layer.open({
                        id: 'layui-cash',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-cash-box'),
                        success: function () {


                        },
                        end: function () {

                            vm.$root.showCashModal=false;
                        }
                    });
                })

            },
            msg(){

                this.$store.commit("setMode","message");
                this.$router.replace('/message');
                //alert("连接设备");
            },
            //消息检测
            addMsglistener(){

                var delay=10000;
                var roopOver=false;

                var roopAction=()=>{
                    setTimeout(()=> {
                            console.log("发生请求包");
                           this.$store.dispatch("addListenAllocation").then(res => {
                               if(res.appUnconfirmList.length>0){
                                   this.$root.showMsgModal=true;
                                   roopOver=true;
//                                   setTimeout(()=>{
//                                       this.$root.showMsgModal=false;
//                                   },4000);
                               }

                            if(!roopOver){
                                roopAction();
                            }
                        })
                    }, delay);

                }

                roopAction();
            },
            log(){

                var vm=this;

                this.$root.showLogModal=true;

                this.$nextTick(() => {
                    //弹出页面层
                    layer.open({
                        id: 'layui-msg',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-log-box'),
                        success: function () {

                        },
                        end: function () {

                            vm.$root.showLogModal=false;
                            //aa      this.$root.showLogModal=false;
                        }
                    });
                })
            },
            exit(){
                let vm = this;
                console.log(this.shopData);
                layer.confirm('确定要退出吗？', function(index){
                    vm.$store.dispatch('logout',vm.shopData.currentShiftId).then(()=>{
                             vm.delLocalData();
                             layer.closeAll();
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

