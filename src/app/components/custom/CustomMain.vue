<template>
    <div role="dialog" class="modal fade custom-layer" id="layer-custom">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">顾客</h4>
                    <a class="close" data-dismiss="modal">&times;</span></a>
                </div>
                <div class="modal-body">
                    <custom-search :tips="tips" :custom="tempcustom" :info-show="infoShow" :search-show="searchShow"></custom-search>
                    <custom-register v-show="registerShow"></custom-register>
                    <custom-list v-show="listShow"></custom-list>

                </div>
            </div>
        </div>
    </div>
</template>
<style  rel="stylesheet/less"  lang="less">





</style>

<script>

    import CustomSearch from './CustomSearch.vue';
    import CustomRegister from './CustomRegister.vue';
    import CustomList from './CustomList.vue';
    import $ from 'jquery';
    import layer from 'layer';

    import {request, API_URLS} from 'util/request.js';

    export default{

        data(){
            return {
                searching:false,
                registerShow:false,
                searchShow:true,
                infoShow:false,
                listShow:false,
                username:'',
                tempcustom:null,
                tips:''
            }
        },
        computed: {
            custom (){
                return  this.$store.state.currentPage.customData;
            }
        },
        components:{
            CustomSearch,                               //顾客查找
            CustomRegister,                             //顾客注册
            CustomList                                  //顾客列表
        },
        created(){
            //test
            this.searching=false;
            this.infoShow = false;
            this.searchShow = false;
            this.registerShow = false;
            this.listShow=true;


            if(this.custom.id){
                // 下次进来就显示当前顾客
                this.searching=false;
                this.infoShow = true;
                this.searchShow = false;
                this.registerShow = false;
                this.listShow=false;
                this.tempcustom={"appMember":this.custom};
            }else{

            }
        },
        methods:{
            cancelView(){

                this.registerShow=false;
                this.infoShow=false;
                this.searchShow=true;
                this.username = '';
            },
            registerView(){

                this.registerShow=!this.registerShow;
                this.infoShow=false;
                this.searchShow=false;

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


