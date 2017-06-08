<template>
	<div class="ad">
		<commom-header  :title="title" :back="back"  ></commom-header>
		<div class="container ad-main">
			<div class="gallery-btn-row">
				<a class="gallery-btn gallery-ok" @click="submitUpload">确定</a>
				<a class="gallery-btn gallery-empty" @click="emptyList">清空</a>
			</div>
			<div class="gallery">
				<el-upload
						ref="upload"
						action="http://192.168.1.122:82/cashier/member/ads/add_image"
						list-type="picture-card"
						:show-file-list="true"
						:auto-upload="false"
						:file-list="fileList"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-success="handleSuccess"
						:before-upload="beforeUpload"
						:data="token"
					>
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>

		</div>

	</div>
</template>


<script>


    import {request, API_URLS, HOST} from 'util/request.js';

    export default{

        data(){
                return {
                    title:"广告管理",
                    back:{"label":"返回","url":"index","show":true},
                    dialogImageUrl: '',
                    dialogVisible: false,
                    fileList: [],
					token:{}

                }
        },
        computed: {
        },

        created(){

            this.$store.dispatch('fetchAdList').then(res=>{
                for(var i in res.ads){
                    res.ads[i].url= res.ads[i].image;

				}

				this.fileList=res.ads;
				console.log(this.$refs.upload);
                console.log(res);
                //action="http://192.168.1.122:82/cashier/member/ads/add_image"

			})


		},
        methods:{
            beforeUpload (file) {
				 console.log(file);

                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 1;
                 var  isMax=false;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }

				var token=this.$store.state.login;

                this.$set(this.token,'accessToken',token)

                if(!token) {
                    this.$message.error('令牌过期');
                }

                if(this.fileList.length>10) {
                    isMax=true;
                    this.$message.error('最多只能保留10张图片');
                }
                return isJPG && isLt2M && token && !isMax;
            },

            emptyList(){

                this.$confirm('确认清空广告吗？',{'type':'warning'}).then(_ => {

                    var strIds=[];
                    this.fileList.forEach(function(ele,index){
                        strIds.push(ele.id);

                    });
                    var  strIdsstr=strIds.join(',');

                    return  this.$store.dispatch('removeAdList',{'strIds':strIdsstr}).then(res=>{
                       console.log(res);
                    })


                        //ids='1,2,3,5,6,7'





                }).then(res=>{

                    this.$refs.upload.clearFiles();
				});


                //

			},
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {

                this.$store.dispatch('removeAdList',{'strIds':file.id}).then(res=>{
                    console.log(res);
                    this.fileList=fileList;
                })
            },
            handleSuccess(response, file, fileList){
                this.fileList=fileList;
			},

            handleUpload(file){

                //this.$store.commit('show_waiting');
//                this.$store.dispatch('uploadAdList',file.file).then(res=>{
//
//                    console.log(res);
//
//
//                    //action="http://192.168.1.122:82/cashier/member/ads/add_image"
//
//                })
			},
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
		}
    }
</script>


