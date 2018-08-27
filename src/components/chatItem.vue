<template>
  <!--消息列表组件 数据交互频繁-->
  <li>
    <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
    <router-link :to="{ path: '/Index/Chat', query: { chatId: item.chatId,name:item.name,headImg:item.headImg[0],type:item.type}}" tag="div" class="list-info" v-swiper v-on:click.native="toggleMsgRead($event,'enter')">
      <div class="header-box">
        <!--未读并且未屏蔽 才显示新信息数量-->
        <div class="unread" v-show="item.newMsgCount>0">
          <yd-badge type="danger" >{{item.newMsgCount}}</yd-badge>
        </div>
        <!--如果是私聊，只显示一个头像； 如果是群聊，则显示多个头像，flex 控制样式-->
        <div class="header" :class="[item.type=='group'?'multi-header':'']">
          <img v-for="userInfo in item.headImg" :src="userInfo">
        </div>
      </div>
      <div class="desc-box">
        <!--使用过滤器 fmtDate 格式化时间-->
        <div class="desc-time">{{item.lastTime | fmtDate('MM-dd hh:ss')}}</div>
        <div class="desc-author" v-if="item.type=='group'">{{item.group_name}}</div>
        <!--如果没有备注好友，则显示微信昵称-->
        <div class="desc-author" v-else>{{item.name}}</div>
        <div class="desc-msg">
          <span v-show="item.type=='group'">{{item.lastAuthor}}:</span>
          <p class="oneLine">{{item.lastMsg}}</p>
        </div>
      </div>
    </router-link>
    <div class="operate-box">
      <div class="operate-unread" v-if="item.newMsgCount==0" @click="toggleMsgRead">标为未读</div>
      <div class="operate-read" v-else @click="toggleMsgRead">标为已读</div>
      <div class="operate-del" @click="deleteEvent">删除</div>
    </div>
  </li>
</template>
<script>
  export default {
    props: ["item"],
    data() {
      return {
        chatId: this.item.chatId
      }
    },
    methods: {
      //切换消息未读/已读状态
      toggleMsgRead(event,status) {
        if (status === 'enter') {
          this.$store.commit("addUnReadNum",-this.item.newMsgCount);                    
          this.item.newMsgCount=0;
        } else {
          if(this.item.newMsgCount>0){
            this.$store.commit("addUnReadNum",-this.item.newMsgCount);                        
            this.item.newMsgCount=0;
          }else{
            this.$store.commit("addUnReadNum",1);
            this.item.newMsgCount=1;            
          }
        }
        //滑动恢复
        event.target.parentNode.parentNode.firstChild.style.transform = "translateX(0px)";
      },
      deleteEvent() {
       this.$emit("delete",{chatId:this.chatId});
      }
    },
    // 参考 https://vuefe.cn/v2/guide/custom-directive.html
    directives: {
      swiper: {
        bind: function(element, binding) {
          var isTouchMove, startTx, startTy;
          element.addEventListener('touchstart', function(e) {
            var touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            isTouchMove = false;
          }, false);
          element.addEventListener('touchmove', function(e) {
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy;
            if (distanceX < 0) { //右滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (Math.abs(distanceX) > 20) {
                  element.style.transform = "translateX(0px)";
                }
              }
            } else { //左滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (distanceX < 156 && distanceX > 20) {
                  e.preventDefault()
                  element.style.transform = "translateX("+(-distanceX)+"px)";
                  isTouchMove = true
                }
              }
            }
            // e.preventDefault()
          }, false);
          element.addEventListener('touchend', function(e) {
            if (!isTouchMove) {
              return;
            }
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy,
              isSwipe = false
            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
              if (distanceX < 0) {
                return;
              }
              if (Math.abs(distanceX) < 60) {
                isSwipe = true;
                element.style.transform = "translateX(0px)"
              } else {
                element.style.transform = "translateX(-156px)"
              }
            }
          }, false);
        }
      }
    },
    created(){
    }
  }
</script>
