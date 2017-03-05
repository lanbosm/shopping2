<template>
    <div class="header">
        <div class="container-fluid ">
            <div class="logo">
                <a class="navbar-brand"><img src="../../images/logo.jpg" alt="Brand"></a>
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
                        <li v-for="(index,item) in listData.list"><a class="custom" :class="{cur:listData.index==(index+1)}" @click="switchCustom(index+1)"><span class="num">{{index+1}}</span><span class="time">{{item.time}}</span></a></li>
                    </ul>
                    <a class="custom-add" @click="addCustom();">+</a>
                    <a class="custom-remove" @click="removeCustom();">-</a>
                    <div class="menu-box">
                        <a class="contact-btn" onclick="queueTools.contact(this);">
                            <i class="icon icon-snan"></i>
                        </a>
                        <a class="exit-btn" onclick="queueTools.exit();">
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
        compiled() {

        },
        ready(){
            //数据传递
            this.listData= util.pullLocal("queue");
            console.log(this.listData);
        },
        data(){
            return {
                listData:{},
            }
        },
        props: {                                       //定义参数类型

        },
        methods:{
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

                this.saveLocalData();
            },
            removeCustom(){
                var index=this.listData.index-1;
                this.listData.list.splice(index,1);
                this.saveLocalData();
            },
            switchCustom(index){
                this.listData.index=index;
                this.saveLocalData();
            },
            getLocalData(){


            },
            saveLocalData(){
                this.$parent.headerData=this.listData;
                util.pushLocal("queue",this.$parent.headerData);
            }
        }
    }
</script>

