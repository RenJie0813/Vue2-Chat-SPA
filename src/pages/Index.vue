<template>
  <div id="wechat">
    <search></search>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <ul class="wechat-list" v-show="!getHeaderStatus">
        <!--props传递消息对象 baseMsgObj -->
        <chat-item v-on:delete="deleteOne" v-for="baseMsgObj in getChatList" :item="baseMsgObj"
          class="list-row line-bottom" :key="baseMsgObj.chatId"></chat-item>
      </ul>
      <p v-for="item in list" :key="item">
        {{item}}
      </p>
      <yd-button size="large" loading-txt="正在加载" :loading="isLoad" @click.native="getData">Url</yd-button>
    </yd-pullrefresh>
    
  </div>
</template>

<script>
  import chatItem from '../components/chatItem.vue'
  import search from '../components/search.vue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {
        page:1,
        list:['a'],
        isLoad:false
      }
    },
    computed: {
      ...mapGetters(['getHeaderStatus','getChatList'])
    },
    methods: {
      deleteOne(data) {
        this.$store.dispatch("delChatItem",data.chatId);
      },
      loadList() {
       //请求数据
       let _this=this;
       setTimeout(function(){
         const _list = [1,2,3,4,5,6,7];

          _this.list = [..._list, ..._this.list];

          _this.$dialog.toast({
              mes: _list.length > 0 ? '为您更新了' + _list.length + '条内容' : '已是最新内容'
          });

          _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');

          _this.page++;
       },2000);
      },
      getData(){
        this.isLoad=true;
        this.$http({
          method:"post",
          data:{id:1},//post
          // params:{},//get
          url:"http://112.74.41.217/gms/GameTotalInfo"
        }).then(res=>{
          this.isLoad=false;
          console.log(res);
        }).catch(err=>{
          this.isLoad=false;
          console.log(err)
        });
         this.$http({
          method:"get",
          // data:{id:1},//post
          params:{name:222},//get
          url:"http://112.74.41.217/gms/GameTotalInfo"
        }).then(res=>{
          this.isLoad=false;
          console.log(res);
        }).catch(err=>{
          this.isLoad=false;
          console.log(err)
        });
      }
    },
    mounted() {

    },
    created() {
    },
    components: {
      chatItem,
      search
    },
    // beforeRouteLeave: function (to, from, next) {
    //   window.c = document.body.scrollTop;
    //   next();
    // },
    // beforeRouteEnter: function (to, from, next) {
    //   next();
    //   setTimeout(function () {
    //     document.body.scrollTop = window.c;
    //   }, 0)
    // }
  }
</script>

<style>
  @import "../../static/css/chat.css";
</style>
