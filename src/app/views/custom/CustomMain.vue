<template>
    <el-dialog
            :visible.sync="dialogShow"
            size="small"
            custom-class="custom-layer"
            @close="closeWin"
            top="5%"
            >
                  <span slot="title" class="dialog-title">
                        顾客
                  </span>
                  <custom-search  :step="step"  v-if="$route.name!='customlist'" :add-callback="addEvent"  :search-callback="searchEvent" :select-callback="selectEvent"></custom-search>
                 <div id="custom-solt">
                  <!--<custom-normal v-if="step=='normal'" :tips="tips" :searching="searching" ></custom-normal>-->

                  <custom-register v-if="step=='register'" :register-callback="regEvent"></custom-register>

                  <custom-list v-if="step=='list'" :list-index="listIndex" :list-data="customListData" :list-callback="listSelect" :page-to="listPageTo"></custom-list>

                  <custom-detail v-if="step=='detail'" :member="customData" :order-callback="orderEvent" :recharge-callback="rechargeEvent" :stock-callback="stockEvent"></custom-detail>
                 </div>
    </el-dialog>

</template>

<script>

    import CustomSearch from './CustomSearch.vue';
    import CustomNormal from './CustomNormal.vue';
    import CustomRegister from './CustomRegister.vue';
    import CustomList from './CustomList.vue';
    import CustomDetail from './CustomDetail.vue';
    import $ from 'jquery';
    import layer from 'layer';

    import {request, API_URLS} from 'util/request.js';
    import { Loading } from 'element-ui';

    export default{
        data(){
            return {
                dialogShow: true,
                step:'normal',
                historyStep:'',
                searching:false,
                searchStr:'',
                listIndex:-1,
                customData:{},
                customListData:{ },
                customListData_default:{
                    pageNum:1,
                    pageSize:10,
                    list:[],
                    total:1
                },
                tips:'',


            }
        },
        computed: {
            custom (){
                return  this.$store.state.currentPage.customData;
            }
        },
        components:{
            CustomSearch,                               //顾客查找
            CustomNormal,                               //顾客正常
            CustomRegister,                             //顾客注册
            CustomList,                                 //顾客列表
            CustomDetail                                //顾客详情
        },
        created(){

            if(this.$route.name=='customlist'){
                this.$nextTick(_=> {
                    console.log(this.customData);
                    this.step='detail';
                })
            }else {

                this.customListData = this.customListData_default;
                var data = {username: '', pageNum: 1};
                let lock;
                this.$nextTick(_=>{

                     lock=this.wait();
                })

                this.$store.dispatch("fetchCustom", data).then(res => {
                    console.log(res);
                    lock.close();
                    this.customListData = res.page;
                    this.searching = false;
                    this.step = 'list';
                    this.$nextTick(_ => {
                        //this.$simpleScroll('#custom-list-list');
                    })

                }).catch(res => {

                    this.tips = "没有搜索到该会员";
                    this.tips = '';
                    this.searching = false;

                });
            }


        },
        methods:{
            wait(){

                return  Loading.service({ target:document.querySelector('#custom-solt'),text:"请稍后..."});

            },
            closeWin(){
                this.dialogShow=false;
                setTimeout(_=> {
                    this.$root.showCustomDialog = false;
                },300);
            },

            //+号事件
            addEvent(){
                //保持上一个页面
                let lock = this.wait();
                setTimeout(_=>{
                    if (this.step == "register" ) {
                        this.step = this.historyStep;
                        this.$nextTick(_=>{
                           // this.$simpleScroll('#custom-list-list');
                        })
                    }
                    else  if (this.step == "detail" ) {
                        this.step = "list";
                        this.$nextTick(_=>{
                           // this.$simpleScroll('#custom-list-list');
                        })

                    }
                    else {
                        this.historyStep = this.step;
                        this.step = "register";
                    }
                    lock.close();
                },300)

            },
             //搜索事件
            searchEvent(str){
                if(this.searching) {
                    return false;
                }
                if(!str){

                    this.$message({
                        message: '请输入用户名/手机号',
                        type: 'warning'
                    });
                    return false;
                }
                this.searching=true;
                this.tips="正在查找...";
                this.searchStr=str;
                let lock = this.wait();
                this.customListData=this.customListData_default;
                var data={username:str,pageNum:1};
                this.$store.dispatch("fetchCustom",data).then(res=>{
                    console.log(res);
                    this.customListData=res.page;
                    setTimeout(_=>{
                        lock.close();
                        this.searching=false;
                        this.step='list';
                        this.$nextTick(_=>{
                            //this.$simpleScroll('#custom-list-list');
                        })
                    },300)
                }).catch(res=>{
                    lock.close();
                    this.tips="没有搜索到该会员";
                    setTimeout(_ => {
                        this.tips='';
                        this.searching=false;
                    },3000);
                });

            },
            //注册事件
            regEvent(newCustom){

                this.$store.dispatch('registerCustom',newCustom).then(res=>{
                    console.log(res);
                    this.$root.showCustomModal=false;

                    this.$alert('注册成功', {
                        confirmButtonText: '确定',
                        type: 'success'
                    }).then(_=>{
                        if(this.$route.path.history=="/order") {
                            this.$store.dispatch('fetchOrder');
                        }
                        this.closeWin();
                    });
                }).catch(res=>{
                    console.log(res);
                    this.$alert(res.msg, {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                });

            },
            //列表选择
            listSelect(item,index){
                this.listIndex=index;
                let lock = this.wait();

                setTimeout(_=>{
                    this.customData=item;
                    this.step="detail";
                    lock.close();
                },300)
            },
            //选择页码
            listPageTo(index){
                let lock = this.wait();
                this.pageNum=index;
                var data={searchStr:this.searchStr,pageNum:index};
                this.$store.dispatch("fetchCustomList",data).then(res=>{
                    console.log(res);
                    this.customListData=res.page;
                    setTimeout(_=>{
                        lock.close();
                        this.searching=false;
                        this.step='list';
                        this.$nextTick(_=>{
                            document.getElementById('custom-list-list').scrollTop=0;
                            //this.$simpleScroll('#custom-list-list');
                        })
                    },300)
                }).catch(res=>{
                    lock.close();
                });

            },
            selectEvent(){
                this.$store.commit('setCustomData',this.customData);
                this.closeWin();

            },
            orderEvent(){
                this.closeWin();
                this.$router.replace({path:'/orderlist',query:{type:"custom",p:1,mid:this.customData.id}});
               // this.$router.push('/orderlist');
            },
            rechargeEvent(){
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
                    vm.$root.$refs.recharge.customName=vm.customData.username;
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
            stockEvent(){
                this.$store.dispatch("fetchPickList",{"memberId":this.customData.id,"pageNum":1}).then(res=>{
                   this.$router.push({path:'/membercargo',query:{mid:this.customData.id,p:1}});
                   this.closeWin();
                }).catch(res=>{
                    this.$message.error(res.msg);
                });
//                this.$store.dispatch("fetchPickList",{"memberId":this.customData.id}).then(res=>{
//                    this.$root.showCustomModal=false;
//                    this.$router.push({path:'/membercargo'});
//
//                }).catch(res=>{
//                     this.$message.error(res.msg);
//                });
            }

        }
    }
</script>


