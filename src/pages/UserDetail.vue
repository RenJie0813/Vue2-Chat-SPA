<template>
  <div class="page">
    <yd-cell-group style="margin-top:.35rem">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <img :src="headImg" alt="" class="self-header">
          </div>
          <div class="weui-cell__bd">
            <h4 class="self-nickName">{{remark||nickName}}<i :class="['iconfont','sex',sex=='man'?'man':'woman']">{{sex=='man'?'&#xe6a0;':'&#xe6a1;'}}</i></h4>
            <p class="nickname" style="font-size: 13px; color: rgb(153, 153, 153);">昵称:{{nickName}}</p>
          </div>
        </div>
    </yd-cell-group>

    <yd-cell-group>
      <yd-cell-item arrow @click.native="showRemark">
        <span slot="left">设置备注</span>
      </yd-cell-item>
      <yd-cell-item arrow type="a" :href="callPhone">
        <span slot="left">电话号码:<span id="phone" v-text="mobile"></span></span>
      </yd-cell-item>
    </yd-cell-group>

    <div class="button-div">
      <yd-button size="large" type="primary" @click.native="sendMsg">发消息</yd-button>
      <yd-button size="large" type="danger" @click.native="deleteFriend">删除好友</yd-button>
    </div>

    <yd-popup v-model="setRemark" position="center" width="300px">
      <div class="choose">
        <yd-cell-group>
          <yd-cell-item>
            <yd-icon slot="icon" name="compose" size=".42rem"></yd-icon>
            <span slot="left">备注：</span>
            <input slot="right" ref="remark" type="text" maxlength="10">
          </yd-cell-item>
        </yd-cell-group>
        <yd-button @click.native="saveRemark">保存</yd-button>
        <yd-button type="hollow" @click.native="setRemark = false">取消</yd-button>
      </div>
    </yd-popup>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              mobile:"",
              nickName:"",
              remark:"",
              sex:'man',
              headImg:"../../static/images/30.png",
              setRemark:false
            }
        },
        computed: {
          callPhone(){
            return 'tel:'+this.mobile;
          }
        },
        methods: {
          showRemark(){
            this.setRemark=true;
            this.$refs.remark.value=this.remark;
          },
          saveRemark(){
            this.remark=this.$refs.remark.value;
            this.$store.commit("setConcatRemark",{
              mobile:this.mobile,
              remark:this.remark
            });
            this.setRemark = false;
          },
          sendMsg(){
            this.$router.push({path:'/Concat/UserDetail/Chat',query:{chatId: this.pandaId,name:this.remark,headImg:this.headImg,type:"single"}})
          },
          deleteFriend(){

          }
        },
        mounted() {

        },
        created() {
          this.mobile=this.$route.query.mobile;
          let userInfo=this.$store.getters.getConcatOne(this.mobile);
          if(!userInfo){
            this.$router.push({path:"/Concat"})
          }else{
            this.nickName=userInfo.nickName;
            this.remark=userInfo.remark||userInfo.nickName;
            this.headImg=userInfo.headImg;
            this.sex=userInfo.sex;
          }
        },
        components: {}
    }
</script>

<style scoped>
  .weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-align: left;
  }
  .weui-cell__hd {
    margin-right: 10px;
  }
  .weui-cell__bd {
    flex: 1;
    height: 60px;
  }
  .self-nickName {
    font-weight: 400;
    font-size: 16px;
  }
  .self-header{
    width: 60px;
    height: 60px;
  }
  .choose{
    background-color:#fff;
    padding: .2rem;
    text-align: center;
  }
  #phone{
    padding-left: 15px;
    color: darkslateblue;
  }
  .sex{
    font-size: 18px;
    margin-left: .1rem;
  }
  .man{
    color:dodgerblue;
  }
  .woman{
    color:deeppink;
  }
</style>
