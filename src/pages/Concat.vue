<template>
    <div id="contact" class="page">
        <section>
          <div class="weui-cells_contact-head weui-cells weui-cells_access" style="margin-top:-1px">
            <router-link to="/Concat/NewFriends" class="weui-cell" @click.native="seeFriends">
              <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../static/images/contact_top-friend-notify.png"> </div>
              <div class="weui-cell_bd weui-cell_primary">
                <p>新的朋友&nbsp;<yd-badge type="danger" v-if="this.$store.state.user.newFriends>0">{{this.$store.state.user.newFriends}}</yd-badge></p>
              </div>
            </router-link>
            <router-link to="/Concat/GroupList" class="weui-cell">
              <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../static/images/contact_top-addgroup.png"> </div>
              <div class="weui-cell_bd weui-cell_primary">
                <p>群聊</p>
              </div>
            </router-link>
          </div>
          <!--联系人集合-->
          <div v-for="(value,key) in peopleList" :key="key">
            <!--首字母-->
            <div :ref="`key_${key}`" class="weui-cells__title">{{key}}</div>
            <div class="weui-cells">
              <router-link :key="item.mobile" :to="{path:'/Concat/UserDetail',query:{mobile:item.mobile}}" class="weui-cell weui-cell_access" v-for="item in value"
                           tag="div">
                <div class="weui-cell__hd">
                  <img v-lazy="item.headImg" class="home__mini-avatar___1nSrW">
                </div>
                <div class="weui-cell__bd">
                  {{item.remark?item.remark:item.nickName}}
                </div>
              </router-link>
            </div>
          </div>
        </section>
        <!--检索-->
        <div class="initial-bar"><span @click="toPs(i)" v-for="i in firstNameList" :key="i">{{i}}</span></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              myConcats:[],
              firstNameList:[],
              peopleList:[]
            }
        },
        computed: {
        },
        methods: {
          toPs(i){
            let scroll=document.getElementById("scrollView");
            scroll.scrollTo(0,this.$refs['key_'+i][0].offsetTop)
          },
          seeFriends(){
            this.$store.commit("resetNewFrdReq",0);
          },
          //从联系人中提取出首字母 再排序
          contactsInitialList(){
            var initialList = [],
              allContacts = this.myConcats,
              max = allContacts.length;
            for (var i = 0; i < max; i++) {
              if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                initialList.push(allContacts[i].initial.toUpperCase())
              }
            }
            return initialList.sort()
          },

          // 将联系人根据首字母进行分类
          contactsList(){
            var contactsList = {},
              allContacts = this.myConcats,
              max = allContacts.length,firstList=this.firstNameList;
            for (var i = 0; i < firstList.length; i++) {
              var protoTypeName = firstList[i];
              contactsList[protoTypeName] = [];
              for (var j = 0; j < max; j++) {
                if (allContacts[j].initial.toUpperCase() === protoTypeName) {
                  contactsList[protoTypeName].push(allContacts[j])
                }
              }
            }
            return contactsList
          }
        },
        mounted() {

        },
        created() {
          /**
           * initial-姓名首字母
           * headImg-头像地址
           * nickName-昵称
           * sex-性别
           * remark-备注
           * mobile-电话号码
           */
          this.myConcats = [
              { //昵称备注都有的朋友
              "initial": 'z',
              "headImg": "https://sinacloud.net/vue-wechat/images/headers/header01.png",
              "nickName": "阿荡",
              "sex": 'man',
              "remark": "阿荡",
              "mobile": 18896586152,
            },
              {
                "initial": 'b',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
                "nickName": "白浅",
                "sex": 'woman',
                "remark": "",
                "mobile": 18896586252,
              }, {
                "initial": 'y',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/yehua.jpg",
                "nickName": "夜华",
                "sex": 'man',
                "remark": "夜华啊",
                "mobile": 18896486152,
              },
              {
                "initial": 'l',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/liubei.jpg",
                "nickName": "刘备",
                "sex": 'man',
                "remark": "刘备",
                "mobile": 18866586152,
              },
              {
                "initial": 'g',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/guangyu.jpg",
                "nickName": "关羽",
                "sex": 'man',
                "remark": "关羽",
                "mobile": 18816586152,
              },
              {
                "initial": 'z',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/zhugeliang.jpg",
                "nickName": "诸葛亮",
                "sex": 'man',
                "remark": "诸葛亮",
                "mobile": 18896506152,
              },
              {
                "initial": 's',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/sunshangxiang.jpg",
                "nickName": "孙尚香",
                "sex": 'woman',
                "remark": "孙尚香2",
                "mobile": 18896286152,
              },
              {
                "initial": 's',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/sunquan.jpg",
                "nickName": "孙权",
                "sex": 'man',
                "remark": "孙权",
                "mobile": 18896996152,
              },
              {
                "initial": 'h',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/huangyueying.jpg",
                "nickName": "黄月英",
                "sex": 'woman',
                "remark": "黄月英",
                "mobile": 18896436152,
              }, {
                "initial": 'z',
                "headImg": "https://sinacloud.net/vue-wechat/images/headers/zhenji.jpg",
                "nickName": "甄姬",
                "sex": 'woman',
                "remark": "甄姬",
                "mobile": 18811086152,
              }
            ];
          this.$store.commit("setConcats",this.myConcats);
          this.firstNameList=this.contactsInitialList();
          this.peopleList=this.contactsList();
        },
        components: {}
    }
</script>

<style scoped>
  #contact{
    text-align: left;
    background-color: #efeff4;
  }
  .weui-cells {
    margin-top: 1.17647059em;
    background-color: #fff;
    line-height: 1.41176471;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }
  .weui-cells__title {
    padding:5px 15px 4px;
    color: #777;
    font-size: 14px;
    font-weight: 500;
  }
  .weui-cells__title+.weui-cells {
    margin-top: 0;
  }
  .weui-cells:after, .weui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    color: #d9d9d9;
  }
  .weui-cells:before {
    top: 0;
    border-top: 1px solid #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .weui-cells:after {
    bottom: 0;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    z-index: 1;
  }
  .weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    left: 15px;
  }
  #contact img {
    width: 32px;
    height: 32px;
    display: block;
    margin-right: 10px;
  }
  .weui-cell {
    cursor: pointer;
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .weui-cell_primary {
    -webkit-box-align: start;
    align-items: flex-start;
  }
  .weui-cell__bd {
    -webkit-box-flex: 1;
    flex: 1;
  }
  #contact .initial-bar{
    position:fixed;
    top:50%;
    z-index: 10;
    font-size:12px;
    font-weight: 600;
    line-height:1.2;
    cursor: pointer;
    right:6px;
    width:10px;
    -webkit-transform:translate3d(0, -50%, 0);
    transform:translate3d(0, -50%, 0)}
  #contact .initial-bar span{display:block;text-align:center;padding: 3px;}
</style>
