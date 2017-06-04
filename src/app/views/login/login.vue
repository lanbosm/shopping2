<template>
    <div class="login">
        <div class="container" >
            <div class="row">
                <div class="right-con col-xs-6 col-xs-offset-6">
                    <div class="register-box pr">
                        <div class="register-row1 pr" >
                            <a class="logo"></a>
                            <span class="weclome">
                                            <h1 >欢迎来到 阿喔优品</h1>
                                            <small >阿喔优品 专业核销平台</small>
                                        </span>
                        </div>
                        <div class="register-row2 pr">
                            <h3>欢迎回来</h3>
                        </div>
                        <div class="register-row3 pr">
                            <div class="register-row3-input">
                                <label for="username" class="username"></label>
                                <input   type="text" name="username" id="username" v-model="username" placeholder="请输入账号" />
                            </div>
                            <div class="register-row3-input">
                                <label for="password" class="password"></label>
                                <input type="password" name="username" id="password"  v-model="password" v-on:keyup.enter="toLogin()" placeholder="请输入密码"/>
                            </div>
                        </div>
                        <div class="register-row4 pr">
                            <a class="btn login" @click="toLogin()">登录</a>
                            <p>如登录出现异常，请清理浏览器缓存后再尝试。</p>
                        </div>
                        <div class="register-row5 pr div1">
                            <p>Powered by ©2016-2017 awo123.cn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import layer from 'layer';
    import util from 'util/util.js'
    import { Loading } from 'element-ui';

    export default{
        name:"Login",
        data(){
            return {
                logining: false,
                username: '',
                password: '',
                lastUserName: ""
            }
        },
        created(){

            this.lastUserName=  this.getCookie("username") ;
            this.username=this.lastUserName;

        },
        watch: {
            'username': function (val) {
                if(this.logining){return;}
                if(val){
                    //实时action
                }
                else{
                    //layer.tips('请输入用户名', '#username');
                }
            },
            'password': function (val) {
                if(val){
                    //实时action
                }
                else{
                    //layer.tips('请输入密码', '#password');
                }
            }
        },
        methods: {
            toLogin:function(){

                if(this.logining){return false;}
                if(!this.username){ layer.tips('请输入用户名', '#username'); return false;}
                if(!this.password){ layer.tips('请输入密码', '#password'); return false;}

                this.logining=true;

                let loading = Loading.service({ target:document.querySelector('.register-box'),'text':'请稍等...'});


                this.$store.dispatch('loginIn',{'username':this.username,'password':this.password}).then(res=>{
                    if(this.lastUserName!=this.username){
                        util.pushLocal("lastData", []);
                    }
                    util.pushLocal('shopData',res)
                    this.setCookie("username",this.username,7);

                    loading.close();

                    this.logining=false;
                    this.$router.replace('/');

                }).catch(res=>{
                    console.log(res);
                    loading.close();

                    this.$alert(res.msg, {
                        type: 'error',
                    });


                    this.password="";
                    this.logining=false;
                })

            }
        }
    }
</script>

