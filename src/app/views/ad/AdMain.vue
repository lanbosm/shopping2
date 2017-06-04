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
						action="https://jsonplaceholder.typicode.com/posts/"
						list-type="picture-card"
						:show-file-list="true"
						:auto-upload="false"
						:file-list="fileList2"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove">
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

    import { Loading } from 'element-ui';


    export default{

        data(){
                return {
                    title:"广告管理",
                    back:{"label":"返回","url":"index","show":true},
                    dialogImageUrl: '',
                    dialogVisible: false,
                    fileList2: [
                        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
						{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                        {name: 'ddd.jpeg', url: 'http://img1.gtimg.com/sports/pics/hv1/226/147/2214/144003061.jpg'}
						],
					upUrl:"https://jsonplaceholder.typicode.com/posts/"
                }
        },
        computed: {
        },

        created(){
		},
        methods:{
            emptyList(){
                this.$refs.upload.clearFiles();

			},
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
		}
    }
</script>


