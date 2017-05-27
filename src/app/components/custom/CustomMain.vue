<template>

    <el-dialog
            :visible.sync="dialogTableVisible"
            size="small"
            custom-class="custom-layer"
            @close="closeWin"
            >
                  <span slot="title" class="dialog-title">
                        顾客
                  </span>
                  <custom-search  :step="step"  :add-callback="addEvent"  :search-callback="searchEvent" ></custom-search>
                 <div id="custom-solt">
                  <custom-normal v-if="step=='normal'" :tips="tips" :searching="searching" ></custom-normal>

                  <custom-register v-if="step=='register'" :register-callback="regEvent"></custom-register>

                  <custom-list v-if="step=='list'" :list-index="listIndex" :list-data="customListData" :list-callback="listSelect" :page-to="listPageTo"></custom-list>

                  <custom-detail v-if="step=='detail'" :member="custumData"></custom-detail>
                 </div>
        <span slot="footer" class="dialog-footer">
            <!--<el-button >取 消</el-button>-->
            <!--<el-button type="primary">确 定</el-button>-->
         </span>
    </el-dialog>

    <!--<div role="dialog" class="modal fade custom-layer" id="layer-custom">-->
    <!--<div class="modal-dialog ">-->
    <!--<div class="modal-content">-->
    <!--<div class="modal-header">-->
    <!--<h4 class="modal-title">顾客</h4>-->
    <!--<a class="close" data-dismiss="modal">&times;</span></a>-->
    <!--</div>-->
    <!--<div class="modal-body">-->
    <!--<custom-search :tips="tips" :custom="tempcustom" :info-show="infoShow" :search-show="searchShow"></custom-search>-->
    <!--<custom-register v-show="registerShow"></custom-register>-->
    <!--<custom-list v-show="listShow"></custom-list>-->

    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
</template>
<style  rel="stylesheet/less"  lang="less">





</style>

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
                step:'normal',
                historyStep:'',
                dialogTableVisible:false,
                searching:false,
                searchStr:'',
                listIndex:-1,
                custumData:'',
                customListData:{ },
                customListData_default:{
                    pageNum:1,
                    pageSize:10,
                    list:[],
                    total:1
                },
                tips:'',

//                registerShow:false,
//                searchShow:true,
//                normalShow:true,
//                infoShow:false,
//                listShow:false,
//                username:'',
//                tempcustom:null,
//
//                msg:"动态东西1",
//                con1:true,
//                con2:false

            }
        },
        computed: {
//            ssss:{
//                set(val){
//                    alert(val);
//                    this.$root.showCustomModal=!this.$root.showCustomModal;   //msg1设置值时此处触发 
//                },
//                get(){
//                    console.log('我被调用了') //msg1获取值时触发
//                    return this.$root.showCustomModal;         //这儿返回值将是msg1的值。
//                }
//            },
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
            this.dialogTableVisible=true;

            //test
//            this.searching=false;
//            this.infoShow = false;
//            this.searchShow = true;
//            this.registerShow = false;
//            this.listShow=false;


//            if(this.custom.id){
//                // 下次进来就显示当前顾客
//                this.searching=false;
//                this.infoShow = true;
//                this.searchShow = false;
//                this.registerShow = false;
//                this.listShow=false;
//                this.tempcustom={"appMember":this.custom};
//            }else{
//
//            }
        },
        methods:{
            wait(){

                return  Loading.service({ target:document.querySelector('#custom-solt'),text:"请稍后..."});

            },
            closeWin(){
                this.dialogTableVisible=false;
                this.$root.showCustomModal=false;

            },
            openSecend(){
                this.dialogVisible = true;
                this.con1=!this.con1;
                this.con2=!this.con2;
                this.msg="动态东西2";
            },


            //+号事件
            addEvent(){
                //保持上一个页面
                let lock = this.wait();
                setTimeout(_=>{
                    if (this.step == "register" ) {
                        this.step = this.historyStep;

                    }
                    else  if (this.step == "detail" ) {
                        this.step = "list";

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
                var data={searchStr:str,pageNum:1};
                this.$store.dispatch("fetchCustom",data).then(res=>{
                    console.log(res);
                    this.customListData=res.page;
                    setTimeout(_=>{
                        lock.close();
                        this.searching=false;
                        this.step='list';
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
                        if(this.$store.state.currentPage.mode=="order") {
                            this.$store.dispatch('fetchOrder');
                        }
                    });
                }).catch(res=>{
                    this.$alert('注册失败', {
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
                    this.custumData=item;
                    this.step="detail";
                    lock.close();
                },300)
            },
            //选择页码
            listPageTo(index){
                let lock = this.wait();
                this.pageNum=index;
                var data={searchStr:this.searchStr,pageNum:index};
                this.$store.dispatch("fetchCustom",data).then(res=>{
                    console.log(index);
                    console.log(this.searchStr);
                    this.customListData=res.page;
                    setTimeout(_=>{
                        lock.close();
                        this.searching=false;
                        this.step='list';
                    },300)
                }).catch(res=>{
                    lock.close();
                });

            },
            doSearch(){


//                    this.$store.dispatch("fetchCustom",vm.username).then(res=>{
//
//                               vm.tips="";
//
//                                $(modal).hide();
//                                vm.$store.state.waiting=true;
//                                setTimeout(()=>{
//                                    vm.$store.state.waiting=false;
//                                    $(modal).show();
//                                    vm.tempcustom = res;
//                                    vm.searching=false;
//                                    vm.searchShow=false;
//                                    vm.infoShow = true;
//
//                               },500)
//
////
////
////                           $(modal).modal('hidden');
////
//                    }).catch(res=>{
//                        vm.searching = true;
//                        this.tips="没有找到此会员";
//                        setTimeout(() => vm.searching = false, 3000);
//                    })
            },
            chooseThis(){
                let vm = this;
                // 存储到vuex
                vm.$store.commit('setCustomData', vm.tempcustom.appMember );
                if(vm.$store.state.currentPage.mode=="order") {
                    vm.$store.dispatch('fetchOrder');
                }
                //关闭弹窗
                $('#layer-custom').modal('hide');
            }
        }
    }
</script>


