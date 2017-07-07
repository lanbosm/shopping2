<template>
    <div class="header">
            <div class="logo">
                <router-link  class="navbar-brand" :to="{ path: '/'}" replace><img src="/images/logo.jpg" alt="Brand"></router-link>
            </div>
            <div class="staff">{{shopData.adminName}}</div>
            <div class="nav-box" id="header-nav">
                    <div class="nav-box-list" id="nav-box-list">
                        <ul class="nav" >
                            <li v-for="(item,index) in pageList" ><a class="custom"   :class="{cur: currentPage && (headIndex == index)}" @click="switchPage(index)">
                                <span class="num">
                                    <em v-if="headIndex == index && item.customData.id ">{{item.customData.nickname}}</em>
                                    <em v-else-if="item.customData.id">{{item.customData.nickname}}</em>
                                    <em v-else>{{ item.title}}</em>
                                </span>
                                <span class="time">{{item.time}}</span></a>
                            </li>
                        </ul>
                    </div>
                    <a class="custom-add" @click="addPage()">+</a>
                    <a class="custom-remove" @click="removePage()">-</a>
            </div>
             <div class="menu-box">

                        <a class="msg-btn"  @click="msg()">
                            消息
                            <!--<span class="badge">{{msgNum}}</span>-->
                        </a>
                         <a class="setting-btn"  @click="setting()">
                             <i class="glyphicon glyphicon-th-large" style="width:30px;"></i>
                             应用
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
                        <!--<a class="exit-btn" @click="demo()">-->
                            <!--<i class="icon icon-exit"></i>-->
                            <!--测试赠品弹框-->
                        <!--</a>-->
             </div>
    </div>
</template>


<script>

    import util from 'util/util.js';


    export default{

        computed: {
            headIndex(){
                return this.$store.state.headIndex;
            },
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
            history(){
                return this.$store.state.currentPage.history;
            }

        },
        data(){
            return {
                dialogVisible: false,
                timer:null,
                notice:null,
                msgNum:0

            }
        },
        created(){

            //获取门店信息
            var shopData= util.pullLocal("shopData");
            this.$store.commit('setShopData', shopData);
            //判断备用金 只填写一次
            if(this.shopData.needSpareCash && this.$store.state.login){
                this.cash();
            }
            this.$store.dispatch("loadLastData");
            //this.addMsglistener();
        },
        mounted(){

            this.$nextTick(_=>{
               this.$simpleScroll('#nav-box-list','horizontal',true);
                document.querySelector('.nav-box-list > div').scrollLeft=document.querySelector('.nav-box-list > div').scrollWidth;
            })

        },
        methods:{
            addPage(){
                this.$store.dispatch('addPage').then(res=> {
                    this.$router.replace('/');

                });

                this.$nextTick(_=> {
                    document.querySelector('.nav-box-list > div').scrollLeft = document.querySelector('.nav-box-list > div').scrollWidth;
                }  )
            },
            removePage(){
                this.$confirm('确定要删除吗？删除后数据将丢失！', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch("removePage").then(res=> {
                        console.log(res);
                        this.$router.replace(this.history);
                    });
                }).catch(() => {

                });

            },
            switchPage(index){
                this.$store.dispatch('switchPage', index).then(res=> {
                    //切换路由
                    //this.history= this.history.replace(/\//i,"");
                    this.$router.replace(this.history);
                });
            },
            cash(){

                this.$root.showCashDialog=true;
            },
            msg(){
                this.$router.replace('/notice');
            },

            //消息检测
            addMsglistener(){

                var delay=10000;
                var roopOver=false;

                const vnode = this.$createElement;
                var roopAction=()=>{
                    this.$store.state.msgTimer=setTimeout(()=> {
                            console.log("发生请求包");

                           this.$store.dispatch("addListenAllocation").then(res => {
                               if (res.appUnconfirmList.length > 0) {


                                   var newMsg = res.appUnconfirmList;


                                   var html = vnode('dialog-notice', {props: {"item": newMsg[0]}});

                                   this.$notify({
                                       title: newMsg[0].shopName + '的申请调拨',
                                       message: html,
                                       customClass: 'notice',
                                       type: 'warning',
                                       duration: 0
                                   });
                               }
                           });

                            if(!roopOver&&this.$store.state.login){
                                roopAction();
                            }
                    }, delay);

                }

                roopAction();
            },
            log(){
                this.$root.showLogDialog=true;
            },
            setting(){
                this.$root.showSettingDialog=true;
            },
            exit(){

                this.$confirm('确定要退出吗？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('logout',this.shopData.currentShiftId).catch((res)=>{
                        this.$alert(res.msg, {
                            type: 'error',
                        });
                    });
                    ;
                })

            },
        }
    }
</script>

