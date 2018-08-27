<template>
  <div :class="direction" :mid="mid">
    <div class="head_portrait">
      <img :src="headImg" alt="">
    </div>
    <div v-if="msgType=='text'" class="content" v-html="content"></div>
    <div v-else-if="msgType=='image'" class="content imgBox">
      <img class="msgImg" :src="content" alt="">
    </div>
    <div v-else class="content fileBox">
      file
    </div>
    <img v-if="direction=='right'" :class="['state', status==2&&('failMsg')]" :src="status==1?'../../static/images/animation.gif':status==2?'../../static/images/fail@2x.png':''" alt="">
  </div>
</template>

<script>
    export default {
        props:{
          // 消息类型：text，image，file
          msgType:{
            type:String,
            default:'text'
          },
          // 左右侧显示
          direction:{
            type:String,
            default:'left'
          },
          // 消息id
          mid:{
            type:Number,
            default:Date.now()
          },
          // 状态：成功0，发送中1，失败2
          status:{
            type:[Number,String],
            default:1
          },
          // 内容
          content:{
            type:String,
            default:""
          },
          // 发送者头像
          headImg:{
            type:String,
            default:"../../static/images/30.png"
          },
          // 群聊还是单聊,group,single
          type:{
            type:String,
            default:"single"
          }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {

        },
        mounted() {

        },
        created() {

        },
        components: {}
    }
</script>

<style>
  .chat .right , .chat .left{
    padding: .2rem 0;
    min-height: .8rem;
    overflow: hidden;
  }
  .chat .right{
    position: relative;
    text-align: right;
    padding-right: 1rem;
  }
  .chat .left{
    padding-left:1rem;
  }
  .chat .right .head_portrait,.chat .left .head_portrait{
    float: right;
    width: .8rem;
    height: .8rem;
    border-radius: 6px;
    margin-right: -.8rem;
    overflow: hidden;
  }
  .head_portrait img{
    width: 100%;
  }
  .chat .right .content{
    margin-left: 1.8rem;
    word-break: break-all;
  }
  .chat .right .content,.chat .left .content{
    position: relative;
    float: right;
    text-align: left;
    background-color: rgb(145,230,72);
    color: #333;
    padding: .14rem;
    border-radius: 4px;
    font-size: 15px;
    margin-right: .2rem;
    word-wrap: break-word;
  }
  .chat .right .content img,.chat .left .content img{
    width: 100%;
    max-width: 4rem;
    transition: 0.4s ease-in;
    -webkit-transition: 0.4s ease-in;
    border-radius: 6px;
  }
  .chat img.state {
    margin: 8px -1.6rem 0 0;
    width: .4rem;
  }
  .chat .right .imgBox img,.chat .left .imgBox img{
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .chat .right .content:before,.chat .left .content:before{
    content: "";
    position: absolute;
    top: 6px;
    right: -6px;
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgb(145,230,72);
  }
  .chat .right .imgBox:before{
    border-left: 6px solid #fff;
  }
  .chat .left .content a,.chat .right .content a{
    color: #006dd3;
    text-decoration: underline;
  }
  .chat .left .head_portrait{
    float: left;
    margin: 0 0 0 -.8rem;
  }
  .chat .left .content{
    float: none;
    display: inline-block;
    margin-left: .2rem;
    background-color: #fff;
    color: #222;
    margin-right: 1.8rem;
    word-break: break-all;
  }
  .chat .left .content:before{
    left: -6px;
    right:0;
    border-right: 6px solid #fff;
    border-left:0;
  }
  .chat .left .imgBox, .chat .right .imgBox {
    width: 4rem;
    max-height: 6rem;
    padding: 0;
    border-radius: 4px;
    background-color: transparent;
    overflow: hidden;
  }
  .failMsg{
    cursor: pointer;
  }
</style>
