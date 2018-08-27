<template>
  <div id="app" class="all-page">
    <div id="box">
      <yd-navbar slot="navbar" :title="getPageName" bgcolor="#1b1b1b" height=".9rem" color="#FFF" fontsize=".32rem" style="font-weight: 500">
          <span slot="left" @click="back" id="backIcon" v-if="$route.path.split('/').length>2">
              <yd-navbar-back-icon color="#FFF">返回</yd-navbar-back-icon>
          </span>
          <i v-show="$route.path=='/Concat'" @click="addFriend" class="iconfont" slot="right" style="color:#FFF;font-size:.4rem;cursor:pointer">&#xe66c;</i>
      </yd-navbar>
      <div id="container" :class="{noTop:getHeaderStatus}">
        <yd-layout id="main" :class="{'hideLeft':$route.path.split('/').length>2}">
          <div>
            <loading v-show="getIsLoading"></loading>
            <keep-alive>
              <router-view v-show="!getIsLoading" name="default"></router-view>
            </keep-alive>
          </div>

          <bottomNav slot="tabbar"></bottomNav>

        </yd-layout>

        <transition :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
          <router-view name="content" :class="['all-page',{'second':getIsMain}]"></router-view>
        </transition>
      </div>
    </div>
    <yd-popup id="login-bg" :class="{isMobile:!this.$store.state.app.isPC}" v-model="getIsLogin" position="bottom" height="100%">
      <Login></Login>
    </yd-popup>
  </div>
</template>

<script>
  import bottomNav from '@/components/bottomNav'
  import loading from '@/components/loading'
  import Login from '@/pages/Login'

  import {
    mapGetters
  } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      "pageName": "",
      "enterAnimate": "", //页面进入动效
      "leaveAnimate": "", //页面离开动效
    }
  },
  computed: {
    ...mapGetters(['getIsMain','getPageName','getIsLoading','getIsLogin','getHeaderStatus'])
  },
  watch: {
    // 监听 $route 为店内页设置不同的过渡效果
    "$route" (to, from) {
      if(from.fullPath!='/'){ //判断是否在当前页面进行了刷新
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
      
        if (toDepth === 2||!!to.name) {
            this.$store.commit("setPageName", to.name)
          }
          //同一级页面无需设置过渡效果
          if (toDepth === fromDepth) {
            return;
          }

          this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft";
          this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "long-animated fadeOutRight";

          // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
          if (toDepth === 3) {
            this.leaveAnimate = "long-animated fadeOutRight";
          }
      }else{
            this.leaveAnimate = "long-animated fadeOutRight";
      }  
    }
  },
  components:{
    bottomNav,
    loading,
    Login
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    addFriend(){
      this.$router.push({path:'/Concat/AddFriend'});
    }
  },
  created(){
    var u = navigator.userAgent,device={};
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(u)) {
      device.isPC=false;
      device.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    } else {
      device.isPC=true;
    }
    this.$store.commit("setDevice",device);

    this.$store.dispatch("setChatList",[
          { //普通消息列表
            "chatId": 1, //消息的id 唯一标识，重要
            "type": "single",
            "group_name": "",
            "newMsgCount": 1,
            "lastTime": 1488117964495,
            "headImg": ["https://sinacloud.net/vue-wechat/images/headers/yehua.jpg"],
            "name": "夜华",
            "lastMsg": "dsadasddasdasdasdasdadasdqeqweqwe萨达萨达萨达sdasdasdasdadadsad",
          },
          {
            "chatId": 2,
            "type": "group",
            "group_name": "收购万达讨论群",
            "newMsgCount": 11,
            "name": "阿荡",
            "lastTime": 1488117964395,
            "lastAuthor": "sb",
            "lastMsg": "1231313dsadasdadadsad",
            "headImg": [
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg",
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg",
              "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg"
            ]
          },
          {
            "chatId": 3,
            "type": "single",
            "group_name": "",
            "newMsgCount": 4,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 13,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 32,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 372,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 3872,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 302,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 4432,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 88832,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          },
          {
            "chatId": 1234,
            "type": "single",
            "group_name": "",
            "newMsgCount": 0,
            "lastTime": 1488117924495,
            "name": "阿荡",
            "lastMsg": "萨达大厦sadasdadadsad",
            "headImg": ['https://sinacloud.net/vue-wechat/images/headers/header01.png']
          }
        ]);    
  }
}
</script>

<style>
  @import "../static/css/app.css";
</style>
