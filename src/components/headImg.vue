<!-- 用户头像预览 -->
<template>
  <div class="black-bg">
        <div id="headBox">
            <img ref="head" :src="headImg" alt="">
        </div>
        <div>
            <yd-button class="upload" size="large" type="primary">上传头像</yd-button>
            <input type="file" @change="upladFile" id="headInput" accept="image/*">  
        </div>
            
  </div>
</template>

<script>

export default {
  data () {
    return {
        headImg:"",
        oldHead:""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.headImg=this.$route.query.head;
  },

  methods: {
        upladFile() {
            let file = document.getElementById("headInput").files[0]; // js 获取文件对象        
            let _this=this;    
            let options={
                file:file,
                showLoading:true,
                cb:function(newImg){
                    _this.oldHead=_this.headImg;
                    _this.headImg=newImg;
                },
                uploadUrl:'https://www.easy-mock.com/mock/5b023b930fd6ca52bfec4049/example/upload',
                resultCB:function(res){
                    console.log(res);
                    if(res.status==200){
                        _this.oldHead="";   
                    }else{
                        _this.headImg=_this.oldHead;      
                        _this.oldHead=""; 
                    }
                },
            }
            this.minImg(options);
        }
  }
}

</script>
<style scoped>
    .black-bg{
        width: 100%;
        height:100%;
        background-color: #333;
    }
    #headBox{
        width: 6rem;
        height:6rem;
        margin: 20px auto;
        position: relative;
    }
    #headBox>img{
        width: 100%;
        height:100%;
    }    
    .upload{
        width: 90%;
        margin:0 auto 0;
    }
    #headInput{
        opacity: 0;
    }
</style>