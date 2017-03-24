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
                        <li v-for="item in pageList"><a class="custom" :class="{cur: currentPage && (currentPage.index == item.index)}" @click="switchPage(item.index)"><span class="num">{{item.index}}</span><span class="time">{{item.time}}</span></a></li>
                    </ul>
                    <a class="custom-add" @click="addPage()">+</a>
                    <a class="custom-remove" @click="removePage()">-</a>
                    <div class="menu-box">
                        <a class="contact-btn" :class="{success:contact}" @click="contact()">
                            <i class="icon icon-snan"></i>
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
                this.$store.commit('initPage', 1);
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
            contact(){
                //alert("连接设备");
            },
            exit(){
                let vm = this;
                layer.confirm('确定要退出吗？', function(index){
                    vm.saveLocalData();
                    util.delLocal("accessToken");
                    util.delLocal("shopData");
                    location.href="./login.html";
                    layer.close(index);
                });
            },
        },
        mounted() {
        }
    }
</script>

