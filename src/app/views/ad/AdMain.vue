<template>
	<div class="ad">
		<commom-header  :title="title" :back="back"  ></commom-header>
		<div class="container ad-main">
			<div class="gallery-btn-row">
				<a class="gallery-btn gallery-ok" @click="submitUpload">确定</a>
				<a class="gallery-btn gallery-empty" @click="emptyList">清空</a>
			</div>
			<div class="gallery" id="gallery">
				<el-upload
						ref="upload"
						action="http://http://192.168.1.122:82/cashier/member/ads/add_image"
						list-type="picture-card"
						accept="image/jpg,image/png,image/jpeg"
						:show-file-list="true"
						:auto-upload="true"
						:file-list="fileList"
						:on-change="handleChange"
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

			  this.$nextTick(_=> {
                  this.$simpleScroll("#gallery");

              });
				this.fetchList();

		},
        methods:{
            fetchList(){

                this.$store.dispatch('fetchAdList').then(res=>{
                    for(let i in res.ads){
                        res.ads[i].url= res.ads[i].image;
                        var num=parseInt(i)+1;
                        res.ads[i].name="广告图"+num;

                    }

                    this.fileList=res.ads;
                    console.log(this.$refs.upload);
                   // console.log(res);
                    //action="http://192.168.1.122:82/cashier/member/ads/add_image"

                })

			},
            beforeUpload (file,xx) {

				 console.log(file);

                var token=this.$store.state.login;
                if(!token) {
                    this.$message.error('没有权限上传');
                }else{

                    this.$set(this.token,'accessToken',token);
				}

                return  new Promise((resolve,reject)=> {

                    var canUpload=true;



					var isImage=true;

                    const imageType = /image\/(jpg|jpeg|png|JPG|PNG)/;
                     if (!file.type.match(imageType)) {
                        	 isImage=false;
                     }

                    const isLt500KB = file.size / 1024 / 1024 < 0.5;


                    if (!isImage) {
                        this.$message.error('上传头像图片只能是 JPG 格式!');
                        canUpload=false;
                    }
                    if (!isLt500KB) {
                        this.$message.error('上传头像图片大小不能超过 500KB!');
                        canUpload=false;
                    }



                    if(this.fileList.length>10) {
                        canUpload=false;
                        this.$message.error('最多只能保留10张图片');
                    }

                    var _URL = window.URL || window.webkitURL;
                    var blobUrl=_URL.createObjectURL(file);
                    var img = new Image();

                    img.onload = (_)=>{
                        console.log(img.width/img.height);
                        if(img.width/img.height<=1.2 || img.width/img.height>=1.5  ){  //4比3
                            canUpload=false;
                            this.$message.error('上传图片不符合规范大小(4:3)');
                        }
                         resolve(canUpload);

                    };
                    img.src = blobUrl;



                }).then(res=>{

                    if(res){		//图片可以上传

                        return Promise.resolve();

					}else{  //图片不可以上传
                        return Promise.reject();
					}


				});


//                img.src = blobUrl;
//                var imgwidth = img.offsetWidth;
//                var imgheight = img.offsetHeight;
//
//                alert(imgwidth + "," + imgheight);
//                alert(2222222);
//				return  false;




               // return isJPG && isLt2M && token && !isMax && false;








            },
            handleChange(file, fileList) {

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
                if(file) {
                    this.$store.dispatch('removeAdList', {'strIds': file.id}).then(res => {
                        console.log(res);
                        this.fileList = fileList;
                    })
                }
            },
            handleSuccess(response, file, fileList){

              this.fileList=fileList;
              //  alert(222);
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


