<template>
    <div class="header">
        <div class="container-fluid ">
            <div class="logo">
                <a class="navbar-brand"><img src="/images/logo.jpg" alt="Brand"></a>
            </div>

            <div class="header-nav navbar " id="header-nav">
                <div class="staff">{{listData.staff}}</div>
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
                        <li v-for="(item,index) in listData.list"><a class="custom" :class="{cur:listData.index==(index+1)}" @click="switchCustom(index+1)"><span class="num">{{index+1}}</span><span class="time">{{item.time}}</span></a></li>
                    </ul>
                    <a class="custom-add" @click="addCustom();">+</a>
                    <a class="custom-remove" @click="removeCustom();">-</a>
                    <div class="menu-box">
                        <a class="contact-btn" :class="{success:contact}" @click="contact();">
                            <i class="icon icon-snan"></i>
                        </a>
                        <a class="exit-btn" @click="exit();">
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

    "use strict";
    import util from 'util/util.js';

    export default{

        computed: {
            listData () {

                var cacheData;

                //先获取本地
                cacheData=this.getLocalData();

                //从中间件获取
                if(!cacheData){
                    cacheData=this.$store.state.headData
                }

                //从本地创建新的
                if(!cacheData){
                    cacheData={
                        index:0,
                        staff:"李科兴3号",
                        list:[]
                    };
                }
                //同步中间件的数据
                this.$store.state.headData=cacheData;

                return cacheData;
            }
        },
        data(){
            return {
                success:true
            }
        },
        created(){

            if(this.listData.list.length==0){
                this.addCustom();
            }
        },
        methods:{
            //获取员工资料
            getStaffData(){
                    var headData={
                            index:0,
                            staff:"李科兴2号",
                            list:[]
                    };
                    this.$store.state.headData=headData;
                    this.saveLocalData();
            },
            //获得时间信息
            getTimeData(){
                function nz(n){
                    if(n<10){
                        n="0"+n;
                    }else{
                        n=n+"";
                    }
                    return n;
                }

                var time=new Date();
                var timestr=nz(time.getHours())+":"+nz(time.getMinutes());

                return timestr;
            },
            //获得用户资料
            getCustomData(){
                var custom={}
                custom.uid="1001";
                custom.name="custom_"+new Date().getTime();
                custom.cid=parseInt(Math.random()*1000);
                return custom;
            },
            addCustom(){
                var queue={};
                //记录客户当前时间
                queue.time=this.getTimeData();
                //记录客户名会员
                queue.custom=this.getCustomData();

                this.listData.list.push(queue);
                this.listData.index=this.listData.list.length;

                this.haomafan("add",this.listData.index);


            },
            removeCustom(){
                var index=this.listData.index-1;
                this.listData.list.splice(index,1);

                this.haomafan("remove",index);
            },
            switchCustom(index){
                alert(index);
                this.listData.index=index;
                this.haomafan("swicth",index);
            },
            getLocalData(){
                return util.pullLocal("queue");
            },
            //好麻烦啊
            haomafan(code,index){

                if(code=="add") {
                    this.$store.commit("addQueue",index);
                }
                if(code=="swicth") {
                    this.$store.commit("swicthQueue",index);
                }
                if(code=="remove") {
                    this.$store.commit("removeQueue",index);
                }
                //console.log( this.$store.state.queueData);
                //newobj.pageData=pageData;

                //push(newobj);




                //util.pushLocal("queue",this.$store.state.headData);
            },
            contact(){
                alert("连接设备");
            },
            exit(){
                var res=confirm("确定退出吗?");
                if(res){
                    location.href="./login.html"
                }else{

                }
            },
        },
        mounted() {



        }
    }
</script>

