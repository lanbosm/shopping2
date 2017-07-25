<!-- register-->
<template>
    <div class="register">
        <div class="custom-table-body">
                    <div class="row">
                        <div class="col-xs-8 col-xs-offset-2">
                            <div class="custom-sex clearfix text-center">
                                <div class="man-radio radio">
                                    <input type="radio"  name="sex" value="male" id="custom-man" v-model="newCustom.sex"  />
                                    <label for="custom-man"></label>
                                </div>
                                <div class="women-radio radio">
                                    <input type="radio" name="sex" id="custom-women" value="female" v-model="newCustom.sex">
                                    <label for="custom-women"></label>
                                </div>
                            </div>
                            <div class="input-group custom-name custom-group">
                                <el-input placeholder="姓名" v-model="newCustom.name">
                                    <template slot="prepend"><i style="padding: 6px 3px" class="iconfont icon-guanliyuan"></i></template>
                                </el-input>
                            </div>
                            <div class="input-group custom-phone custom-group">
                                <el-input type="num"   :maxlength="11"  placeholder="手机号" v-model="newCustom.phone">
                                    <template slot="prepend"><i style="padding: 6px 3px"  class="iconfont icon-mobilefill"></i></template>
                                </el-input>
                            </div>
                            <div class="input-group  custom-group">
                                <span class="input-group-addon" style="padding: 6px 11px"><i class="glyphicon glyphicon-home"></i> </span>
                                <el-cascader
                                        placeholder="请选择"
                                        :options="options"
                                        @active-item-change="handleItemChange"
                                        :props="props"
                                        v-model="selectedOptions"   @change="handleChange"
                                ></el-cascader>
                            </div>
                            <!--<div class="input-group custom-phone custom-group">-->
                                <!--<span class="input-group-addon"><i  class="iconfont icon-mima"></i></span>-->
                                <!--<input type="password" class="form-control" placeholder="提货密码 (选填)"  id="password" v-model="newCustom.password">-->
                            <!--</div>-->
                            <!--<div class="input-group custom-phone custom-group">-->
                                <!--<span class="input-group-addon"><i  class="iconfont icon-querenmima"></i></span>-->
                                <!--<input type="password" class="form-control" placeholder="确认密码"  id="passworded" v-model="newCustom.passworded" @keyup.enter="doRegister()">-->
                            <!--</div>-->
                            <!--<div class="input-group custom-phone custom-group">-->
                                <!--<span class="input-group-addon"><i  class="iconfont icon-qiahao"></i></span>-->
                                <!--<input type="num" class="form-control" placeholder="卡号 (选填)"  id="card" v-model="newCustom.membeCard">-->
                            <!--</div>-->
                            <a class="btn btn-primary btn-block" @click="doRegister()">保存</a>
                        </div>
                    </div>
        </div>
    </div>
</template>
<style>

</style>

<script>

    import areaData from  'util/areaData.js';
    import layer from 'layer';
    import $ from  'jquery';



    function filterArr(arr){

        arr.forEach((ele,index)=>{

            if(ele.child && ele.child.length==0) {
                delete  ele.child;
            }
            if(ele.child &&  ele.child.length>0) {
                filterArr(ele.child);
            }
        })




    }

    export default{
        name:"CustomRegister",
        props:['registerCallback'],
        data(){
            return {
                searchName:"",
                newCustom:{
                    'phone':'',
                    'name':'',
                    'sex':'male',
                    'membeCard':'',
                    'password':'',
                    'passworded':'',
                    'areaId':''
                },
                tempArr:[],
                areaArr:[],
                selectedOptions: [],
                options:[],
                props: {
                    label:'name',
                    value: 'id',
                    children: 'child'
                },
                parentId:null

            }
        },
        computed:{



        },
        created(){
            var tmp=areaData;
            filterArr(tmp);
            this.$nextTick(_=>{
                console.log(tmp);
                this.options = tmp;
            });


        },
        methods:{

            fetchArea(callback){
                this.$store.dispatch('fetchArea',this.parentId).then(res=>{
                    res.areas.forEach((ele,index)=>{
                        if(ele.childNum>0){
                            ele.children=[];
                        }
                    })
                    this.areaArr=res.areas;
//                    this.tempArr=res.areas;
//                    this.sss=res.areas;
                })

            },
            getIndex(val,arr){
               var index=0;
                arr.forEach((e,i)=>{
                    if(e.id==val){
                        index=i;
                    }
                })
                return index;
            },
            handleChange(value) {
                console.log(value);
                var aid=this.selectedOptions[this.selectedOptions.length-1];
                this.newCustom.areaId=aid;

            },

            handleItemChange(val) {
               // this.parentId = val[val.length-1];
//                var len=val.length-1;
//
//                this.parentId=val[len];
//                var sindex=this.getIndex(this.parentId,this.sss);
//                alert(sindex);
//                this.$store.dispatch('fetchArea',this.parentId).then(res=>{
//                        res.areas.forEach((ele,index)=>{
//                            if(ele.childNum>0){
//                                ele.children=[];
//                            }
//                        })
//                        alert(val.length);
//                        if(this.aaa.length!=val.length) {
//                            alert(222222);
//                            this.sss.children = res.areas;
//                            this.aaa = val;
//                        }else{
//                            this.sss=this.options2[sindex];
//                        }

//                      if(len==0) {
//                          this.options2[this.areaIndexs[len]].children = res.areas;
//                      }
//
//                      if(len==1) {
//
//                          this.options2[this.areaIndexs[len-1]].children[this.areaIndexs[len]] = res.areas;
//                      }
//
//                        res.areas.forEach((ele,index)=>{
//                            if(ele.childNum>0){
//                                ele.children=[];
//                            }
//                        })

                       // this.tempArr=res.areas;
//                    if(val.length-1==1) {
//                        this.options2[sIndex].children[sIndex].children = res.areas;
//                    }

        },
            //去注册
            doRegister(){


                let vm = this;
                if(!this.newCustom.name){
                    this.$message('姓名不能为空');
                    return;
                }
                if(!this.newCustom.phone){
                    this.$message('手机号码不能为空');
                    return;
                }
                if(!this.newCustom.sex){
                    this.$message('请选择性别');
                    return;
                }
                if(!this.newCustom.areaId){
                    this.$message('请选择所在地');
                    return;
                }
                if(!/\d{11}/.test(this.newCustom.phone)){
                    this.$message.error({ message: '手机号码不正确' });
                    return;
                }


                if(this.newCustom.password && this.newCustom.password!==this.newCustom.passworded){
                    this.$message.error({ message: '提货密码不正确' });
                    return;
                }

                this.registerCallback(this.newCustom);

            }
        }
    }
</script>


