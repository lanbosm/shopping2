<template>
    <div class="header">
            <div class="logo">
                <router-link  class="navbar-brand" :to="{ path: '/'}" replace><img src="/images/logo.jpg" alt="Brand"></router-link>
            </div>
            <div class="staff hidden-xs">{{shopData.adminName}}</div>
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
             <span class="staff-xs visible-xs-inline" >{{shopData.adminName}}</span>
             <div class="menu-box" >

                        <a class="msg-btn"  @click="msg()">
                            消息
                            <!--<span class="badge">{{msgNum}}</span>-->
                        </a>
                         <a class="setting-btn"  @click="setting()" title="设置">
                             <i class="glyphicon glyphicon-th-large" ></i>
                             <em class="hidden-sm">应用</em>
                         </a>
                        <a class="cash-btn"  @click="cash()" title="备用金">
                            <i class="icon iconfont icon-xianjin"></i>
                            <em class="hidden-sm">备用金</em>
                        </a>
                        <a class="log-btn"  @click="log()" title="营业状态">
                            <i class="icon iconfont icon-yingyebaobiao"></i>
                            <em class="hidden-sm">营业状态</em>
                        </a>
                        <span class="sys-btns">
                            <a title="网络"><i class="icon iconfont icon-wifi" :class="{enabled:online}" ></i></a>
                            <a title="全屏" @click="fullscreen()"><i class="icon iconfont icon-quanping " :class="{enabled:fullScreen}"></i></a>
                            <a title="退出" @click="exit()"><i class="icon iconfont icon-tuichu"  ></i></a>
                        </span>

             </div>
    </div>
</template>


<script>

    import util from 'util/util.js';


    function checkFullScreen(){
        var doc = document.documentElement;
        return ( 'requestFullscreen' in doc ) ||
            ( 'webkitRequestFullScreen' in doc ) ||
            // 对Firefox除了能力判断，还加上了属性判断
            ( 'mozRequestFullScreen' in doc && document.mozFullScreenEnabled ) ||
            false;
    }

    function requestFullScreen() {

        var element=document.documentElement;
        // 判断各种浏览器，找到正确的方法
        var requestMethod = element.requestFullScreen || //W3C
            element.webkitRequestFullScreen ||    //Chrome等
            element.mozRequestFullScreen || //FireFox
            element.msRequestFullScreen; //IE11
        if (requestMethod) {
            requestMethod.call(element);
            return true;
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
            return true;
        }else{
            alert("请手动全屏");
            return false;
        }
    }

    //退出全屏 判断浏览器种类
    function exitFull() {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen ||    //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }



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
            },
            online(){
                return  this.$store.state.online;
            },
            msgTimer(){
                return  this.$store.state.msgTimer;
            },
            noticeOn(){
                return  this.$store.state.noticeOn;
            }
        },
        data(){
            return {
                dialogVisible: false,
                msgNum:0,
                fullScreen:false,
                listName:'#productList'
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

            this.$store.dispatch("fetchShopData").then(res=>{
                this.shopData.shopSetting=res.shopSetting;

            });

            this.$nextTick(_=> {
                this.resetHeight();
                window.onresize=this.autoresetHeight;
            });
            this.addMsglistener();
        },
        mounted(){

            this.$nextTick(_=>{
               this.$simpleScroll('#nav-box-list','horizontal',true);
                document.querySelector('.nav-box-list > div').scrollLeft=document.querySelector('.nav-box-list > div').scrollWidth;
            })

        },
        methods:{
            autoresetHeight(){
                var listBox=this.listName;
                if(document.querySelector(listBox)) {
                    this.listName=listBox;
                    var sss = document.querySelector(listBox).getBoundingClientRect().top;
                    var ph = window.innerHeight - sss - 100;

                    document.querySelector(listBox).style.height = ph + 'px';
                }
            },
            resetHeight(listBox){
                    if(document.querySelector(listBox)) {
                        this.listName=listBox;
                        var sss = document.querySelector(listBox).getBoundingClientRect().top;
                        var ph = window.innerHeight - sss - 100;

                        document.querySelector(listBox).style.height = ph + 'px';
                    }
            },
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
                this.fetchNotice();

                var roopAction=()=>{
                    this.$store.state.msgTimer=setTimeout(()=> {
                            console.log("发生请求包");

                            this.fetchNotice();

                            if(!roopOver&&this.$store.state.login&& this.noticeOn){
                                roopAction();
                            }
                    }, delay);

                }

                roopAction();
            },
            fetchNotice(){
                const vnode = this.$createElement;
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
            },
            log(){
                this.$root.showLogDialog=true;
            },
            setting(){
                this.$root.showSettingDialog=true;
            },
            fullscreen(){

                if(!this.fullScreen){

                    if(requestFullScreen()) {
                        this.fullScreen = true;
                    }
                }else{
                    exitFull();
                    this.fullScreen=false;
                }

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

