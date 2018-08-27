<template>
    <div class="page">
      <form action="" @submit.prevent="searchNew">
        <yd-cell-group style="margin-top: .35rem">
          <yd-cell-item>
            <yd-icon name="search" slot="icon" size=".3rem" color="rgb(9, 187, 7)"></yd-icon>
            <yd-input slot="right" required v-model="searchStr" max="11" placeholder="账号/手机号" :show-success-icon="false" :show-error-icon="false"></yd-input>
            <yd-button slot="right" type="primary" @click.native="searchNew">搜索</yd-button>
          </yd-cell-item>
        </yd-cell-group>
      </form>
      <p class="myInfo">我的熊猫号：{{$store.getters.getUserOneInfo("mobile")}}</p>
      <yd-cell-group v-show="result.mobile">
        <yd-cell-item>
          <img slot="left" class="img" :src='result.headImg' alt="">
          <span class="nick" slot="left">{{result.nickName}}</span>
          <yd-button slot="right" type="hollow" @click.native="add">添加好友</yd-button>
        </yd-cell-item>
      </yd-cell-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              searchStr:"",
              result:{
                headImg:"",
                nickName:"",
                mobile:null
              },
            }
        },
        computed: {},
        methods: {
          searchNew(){
            if(!this.searchStr){return;}
            this.$dialog.loading.open('正在搜索联系人...');
            setTimeout(()=>{
              this.result.mobile=13;
              this.$dialog.loading.close();
            },800);
          },
          add(){
            let hello=window.prompt("附加消息：");
            this.$dialog.loading.open('请求发送中...');
            setTimeout(()=>{
              this.$dialog.loading.close();
            },800);
          }
        },
        mounted() {

        },
        created() {

        },
        components: {}
    }
</script>

<style scoped>
  .myInfo{
    text-align: center;
    margin-bottom: .35rem;
    font-size: 14px;
  }
  .img{
    width: 1rem;
    height:1rem;
    margin:10px 0;
    vertical-align: middle;
  }
  .nick{
    font-size: 14px;
    padding-left: 10px;
  }

</style>
