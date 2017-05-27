<template>
    <el-dialog
            :visible.sync="ssss"
            size="small"
            custom-class="custom-layer"
            @close="closeWin"

            >
                  <span slot="title" class="dialog-title">
                        顾客
                  </span>
                  <custom-search tips="tips" :step="step" :custom="tempcustom"  :add-callback="addEvent"  :search-callback="searchEvent" :search-show="searchShow"></custom-search>

                  <custom-normal v-if="step=='normal'" :tips="tips"  ></custom-normal>

                  <custom-register v-if="step=='register'" :register-callback="regEvent"></custom-register>

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
    import $ from 'jquery';
    import layer from 'layer';

    import {request, API_URLS} from 'util/request.js';

    export default{

        data(){
            return {
                step:'normal',
                historyStep:'',
                searching:false,
                registerShow:false,
                searchShow:true,
                normalShow:true,
                infoShow:false,
                listShow:false,
                username:'',
                tempcustom:null,
                tips:'',
                msg:"动态东西1",
                con1:true,
                con2:false,
                ssss:false


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
            CustomList                                  //顾客列表
        },
        created(){
            this.ssss=true;
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

            closeWin(){
                this.ssss=false;
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

                if (this.step == "register") {
                    this.step = this.historyStep;
                } else {
                    this.historyStep = this.step;
                    this.step = "register";
                }
            },
             //搜索事件
            searchEvent(str){
                    alert(str);

            },
            //注册事件
            regEvent(newCustom){



                this.$store.dispatch('registerCustom',newCustom).then(res=>{
                    console.log(res);
                    this.$root.showCustomModal=false;
                    layer.msg("保存成功");
                    if(this.$store.state.currentPage.mode=="order") {
                        this.$store.dispatch('fetchOrder');

                    }

                }).catch(res=>{
                    layer.msg(res.msg);
                });



            },

            doSearch(){
                    let vm = this;

                    if(!vm.username){

                        layer.msg('请输入手机号码/姓名');
                        return false;
                    }
                    this.registerShow=false;
                    this.infoShow = false;
                    this.listShow = false;

                    this.searchShow=true;
                    this.searching=true;
                    this.tips="正在查找...";

                    var modal='#layer-custom';
                    this.$store.dispatch("fetchCustom",vm.username).then(res=>{
                        this.searching=false;
                        this.searchShow=false;
                        this.listShow = true;


                    }).catch(res=>{
                        vm.searching = true;
                        this.tips="没有搜索到该会员";
                        setTimeout(() => vm.searching = false, 3000);
                    });

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


