<template>
  <div class="page">
    <yd-cell-group style="margin-top:.35rem;">
      <yd-cell-item arrow @click.native="setHead">
        <div class="weui-cell__hd" slot="left">
          <img :src="headImg" alt="" class="self-header">
        </div>
        <div class="weui-cell__bd" slot="left">
          <h4 class="self-nickname">{{nickName}}</h4>
          <p class="self-wxid">手机号: {{mobile}}</p>
        </div>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
      <yd-cell-item arrow @click.native="setInfo=true">
        <yd-icon slot="icon" name="ucenter-outline" size=".42rem" color="#5eb95e"></yd-icon>
        <span slot="left">我的信息</span>
      </yd-cell-item>
      <yd-cell-item arrow @click.native="myLove">
        <yd-icon slot="icon" name="like" size=".42rem" color="#3bb4f2"></yd-icon>
        <span slot="left">我的收藏</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <yd-icon slot="icon" name="verifycode" size=".42rem" color="#F37B1D"></yd-icon>
        <span slot="left">修改密码</span>
      </yd-cell-item>
    </yd-cell-group>

    <div class="button-div">
      <yd-button size="large" type="primary" @click.native="removeRecords">清空聊天记录</yd-button>
      <yd-button size="large" type="hollow" @click.native="loginOut">退出登录</yd-button>
    </div>

    <yd-popup v-model="setInfo" position="bottom" height="100%">
      <div class="setInfo">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">昵称：</span>
            <yd-input slot="right" v-model="nickName" required :show-success-icon="false" :show-error-icon="false" max="8"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">性别：</span>
            <yd-radio-group slot="left" v-model="chooseSex">
              <yd-radio val="男"></yd-radio>
              <yd-radio val="女"></yd-radio>
            </yd-radio-group>
          </yd-cell-item>
        </yd-cell-group>

        <div class="rightAlign">
          <yd-button type="warning" @click.native="saveInfo">保存</yd-button>
          <yd-button type="hollow" style="margin:0 .8rem 0 .4rem;"  @click.native="setInfo = false">取消</yd-button>
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script>

    export default {
        data() {
            return {
              setInfo:false,
              nickName:"",
              sex:'man',
              mobile:"",
              headImg:"",
              chooseSex:'男'//选择性别
            }
        },
        computed: {},
        methods: {
          setHead(){
            this.$router.push({
              path:'/Setting/HeadImg',
              query:{
                head:this.headImg
              }
            });
          },
          myLove(){
            this.$dialog.alert({mes: '没有发现您的收藏'});
          },
          removeRecords(){
            this.$dialog.confirm({
                    title: false,
                    mes: '您确定要清空所有聊天记录吗？',
                    opts: () => {
                        this.$dialog.toast({mes: '你点了确定', timeout: 1000});
                    }
                });
          },
          loginOut(){
            this.$dialog.confirm({
                    title: false,
                    mes: '是否要退出当前账号重新？',
                    opts: () => {
                        this.$store.commit("setLogin");
                        this.$router.push({path:"/Login"});
                    }
                });
          },
          saveInfo(){
            this.sex=this.chooseSex=='男'?'max':'woman';
            //请求成功后更改state里面的用户信息，否则使用state的用户信息
          }
        },
        mounted() {

        },
        created() {
          let user=this.$store.getters.getUserData;
          this.mobile=user.mobile;
          this.nickName=user.nickName;
          this.sex=user.sex;
          this.chooseSex=this.sex=='man'?'男':'女';
          this.headImg=user.headImg;
        },
        components: {}
    }
</script>

<style scoped>
  .weui-cell__hd{padding:10px 0;}
  .weui-cell__hd img{width:23px;margin-right:8px;display:block}img.self-header{display:block;margin-right:10px;border-radius:4px;width:60px;height:60px}
  .self-nickname{font-size:15px;margin-bottom:5px;text-align: left}.self-wxid{font-size:13px}
  .setInfo{
    width:100%;
    height:100%;
    position: absolute;
    background-color: #efeff4;
  }
</style>
