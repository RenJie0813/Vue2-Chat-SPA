<template>
  <div class="yd-flexview chat">
    <div ref="msgDiv" class="yd-scrollview" @click="hideFile();showImg($event)">
      <Msg direction="right" content="阿大大胆决定哈看几遍风景看卡就是能看见你打开就能打吗，的 爱上"></Msg>
      <Msg direction="left" content="阿大大胆决定哈看几遍风景看卡就是能看见你打开就能打吗，的 爱上"></Msg>
      <Msg direction="left" msgType="image" content="http://yydy.image.alimmdn.com/patient_img/Img_20180425_181958_2027.jpg"></Msg>
      <Msg direction="right" status='2' msgType="image" content="http://yydy.image.alimmdn.com/patient_img/Img_20180425_181958_2027.jpg"></Msg>
      <Msg v-for="item in msgList" :key="item.mid" :direction="item.mid%2==0?'left':'right'"
           :status="item.status" :msgType="item.type" :content="item.msg"
           :headImg="item.mid%2==0?(chatType=='single'?leftImg:item.headImg):rightImg"></Msg>
    </div>
    <div class="footer" ref="footer">
      <div ref="pcInput" v-if="this.$store.state.app.isPC==true" class="text" contenteditable="true"></div>
      <yd-input v-else v-model="msg" class="txt" required :show-success-icon="false" :on-focus="MobileHideFile" :show-error-icon="false" :show-clear-icon="false"></yd-input>
      <yd-button type="primary" id="sendMsg" v-show="!showAdd" @click.native="sendMsg">发送</yd-button>
      <div @click="showFile" class="add" v-show="showAdd">
        <span></span>
      </div>
    </div>
    <div class="btm" v-show="chooseFile">
      <p><img src="../../static/images/tp@2x.png" alt=""><br><span>图片</span><input type="file" @change="uploadImg($event)" ref="imgInput" accept="image/*"></p>
      <p><img src="../../static/images/bl@2x.png" alt=""><br><span>文件</span><input type="file" @change="uploadFile($event)" ref="fileInput" accept="*/*"></p>
    </div>
  </div>
</template>

<script>
import "../../static/js/md5";
import "../../static/js/previewImage";
import Msg from "../components/msg.vue";
export default {
  data() {
    return {
      leftImg: "../../static/images/30.png",
      rightImg: "", //自己的头像
      chatType: "single", //群聊还是单聊,单聊：leftImg就是聊天人头像，群聊：从每条消息里取头像
      msg: "", //编辑的消息
      chooseFile: false, //选择图片文件
      imgObj: {
        urls: [
          "1.png",
          "http://yydy.image.alimmdn.com/patient_img/Img_20180425_181958_2027.jpg",
          "3.png"
        ],
        current: "1.png"
      },
      msgList: [
        {
          chatId: 1122, //聊天id，单聊：md5(发起者和另一人id)；群聊：第一条消息时间戳
          mid: 1, //md5(发送者id+当前时间戳)
          sendId: 12, //发送者id
          name: "", //发送者昵称
          msg: "阿大大胆决定哈看几遍风景看卡就是能看见你打开就能打吗",
          type: "text",
          time: Date.now(),
          status: 1
        },
        {
          chatId: 1122,
          mid: 2,
          msg:
            "http://yydy.image.alimmdn.com/patient_img/Img_20180425_181958_2027.jpg",
          type: "image",
          time: Date.now(),
          status: 1
        },
        {
          chatId: 1122,
          mid: 3,
          msg:
            "阿大大胆决定哈看几遍风景看卡就是能看见你打开就能打吗遍风景看卡就是能看见你打开就能打吗遍风景看卡就是能看见你打开就能打吗",
          type: "text",
          time: Date.now(),
          status: 2
        }
      ]
    };
  },
  computed: {
    showAdd() {
      if (this.msg.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    showFile() {
      let _this=this;
      this.chooseFile = true;
      setTimeout(_this.goBottom, 100);                
    },
    hideFile() {
      this.chooseFile = false;
    },
    MobileHideFile() {
      this.hideFile();
      this.goBottom();
      if (this.$store.state.app.isAndroid) {
        setTimeout(function() {
          this.$refs.footer.scrollIntoView(false);
        }, 100);
      } else {
        setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight;
        }, 100);
      }
    },
    //图片点击
    showImg(event) {
      let tag = event.target;
      if (tag.className == "msgImg") {
        this.imgObj.current=tag.src;
        previewImage.start(this.imgObj);
      } else {
      }

      //消息重发
      if (tag.className.indexOf("failMsg") > -1) {
        this.$dialog.confirm({
          mes: "确定要重发该消息吗？",
          opts: () => {
            console.log("reSend");
          }
        });
      }
    },
    //到达页面底部
    goBottom() {
      this.$refs.msgDiv.scrollTop = this.$refs.msgDiv.scrollHeight;
    },
    //发送消息
    sendMsg() {
      this.msgList.push({
        mid: Date.now(),
        msg: this.msg,
        type: "text",
        time: Date.now(),
        status: 0
      });
      this.msg = "";
      this.$store.state.app.isPC && (this.$refs.pcInput.innerHTML = "");
      setTimeout(this.goBottom, 100);
    },
    //发送图片
    uploadImg(evt) {
      let file = evt.target.files[0]; // js 获取文件对象
      let _this = this;
      let options = {
        file: file,
        cb: function(newImg) {
          _this.msgList.push({
            mid: Date.now(),
            msg: newImg,
            type: "image",
            time: Date.now(),
            status: 0
          });
        setTimeout(_this.goBottom, 100);  
        _this.imgObj.urls.push(newImg);
        },
        uploadUrl:"https://www.easy-mock.com/mock/5b023b930fd6ca52bfec4049/example/upload",
        resultCB: function(res) {
          console.log(res);
          if (res.status == 200) {
          } else {
          }
        }
      };
      this.minImg(options);
    },
    //发送文件
    uploadFile(evt) {}
  },
  mounted() {
    //选择文件显隐
    let _this = this;

    //移动pc渲染不同输入框
    if (this.$store.state.app.isPC) {
      this.$refs.pcInput.addEventListener("focus", _this.hideFile);
      this.$refs.pcInput.addEventListener("focus", _this.goBottom);

      this.$refs.pcInput.addEventListener("input", function() {
        _this.msg = this.innerHTML;
      });

      //监听图片预览的左右按键
      document.onkeydown = function(evt) {
        let key = evt.keyCode;
        if (key == 37) {
          let index = previewImage.index;
          if (index > 0) {
            previewImage.changeIndex(-1);
          }
        } else if (key == 39) {
          let index = previewImage.index,
            max = previewImage.maxLen;
          if (index + 1 <= max) {
            previewImage.changeIndex(1);
          }
        } else {
        }
      };
    } else {
    }

    setTimeout(_this.goBottom, 100);
  },
  created() {
    this.$store.commit("setPageName", this.$route.query.name);
    this.chatType = this.$route.query.type;
    this.chatType == "single" && (this.leftImg = this.$route.query.headImg);
    this.rightImg = this.$store.getters.getUserOneInfo("headImg");
  },
  components: {
    Msg
  }
};
</script>

<style>
.chat {
  text-align: left;
  background-color: #ebebeb;
}
.chat .footer {
  display: flex;
  width: 100%;
  background-color: #f4f5f7;
  border-top: 1px solid #ccc;
}
.chat .footer .txt,
.chat .footer .text {
  width: 100%;
  height: 40px;
  margin: 8px 0 8px 8px;
  padding: 8px 6px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
.chat .footer .text {
  height: auto;
  max-height: 100px;
  overflow-y: auto;
}
#sendMsg {
  margin: 8px;
  height: 40px;
  cursor: pointer;
}
.chat .footer .add {
  width: 30px;
  height: 40px;
  text-align: center;
  margin: 8px 10px;
  cursor: pointer;
}
.chat .add span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  background-image: url("../../static/images/tj@2x.png");
  background-size: cover;
  margin-top: 5px;
  border: none;
}
.chat .btm {
  width: 100%;
  border-top: 1px solid #ccc;
  font-size: 0;
  background-color: #f4f5f7;
}
.chat .btm p {
  display: inline-block;
  vertical-align: top;
  color: #555;
  font-size: 14px;
  margin: 0.2rem 0 0.1rem 0.4rem;
  text-align: center;
  position: relative;
}
.chat .btm p img {
  width: 1rem;
  height: 1rem;
}
.chat .btm p > span {
  font-size: 12px;
  color: #888;
}
.chat .btm p input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.chat .yd-scrollview:before {
  content: "";
    display: block;
    width: 100%;
    height: .2rem;
}
.chat .yd-scrollview:after {
  height: .2rem;
}
</style>
