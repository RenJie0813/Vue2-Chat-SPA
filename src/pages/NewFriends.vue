<template>
    <div class="page scroll">
      <div id="requestList">
        <yd-cell-group v-if="result.length>0">
          <yd-cell-item v-for="item in result" :key="item.mobile">
            <img slot="left" class="img" :src='item.headImg' alt="">
            <div slot="left">
              <span class="nick">{{item.nickName}}</span>
              <p class="msg oneLine">附加消息：{{item.msg}}</p>
            </div>
            <div v-if="item.status==0" slot="right">
              <yd-button type="primary" @click.native="ok(item.mobile)">同意</yd-button>
              <yd-button type="hollow" @click.native="no(item.mobile)">拒绝</yd-button>
            </div>
            <span v-else slot="right" style="color:#888">
              {{item.status==1?'已同意':'已拒绝'}}
            </span>

          </yd-cell-item>
        </yd-cell-group>
        <p v-else class="center-p">暂无好友请求</p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              result:[
                {
                  mobile:1,
                  headImg:"../../static/images/30.png",
                  nickName:'啊啊啊',
                  msg:"hello啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                  status:0//0-未处理，1同意，2拒绝
                },
                {
                  mobile:132,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },
                {
                  mobile:142,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:1//0-未处理，1同意，2拒绝
                },{
                  mobile:12,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:1//0-未处理，1同意，2拒绝
                },{
                  mobile:182,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:1//0-未处理，1同意，2拒绝
                },{
                  mobile:17872,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:19992,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:1002,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:102,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:0//0-未处理，1同意，2拒绝
                },{
                  mobile:66512,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:188662,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:19972,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },{
                  mobile:1322,
                  headImg:"../../static/images/30.png",
                  nickName:'aasds',
                  msg:"hellasdaso",
                  status:2//0-未处理，1同意，2拒绝
                },
              ]
            }
        },
        computed: {},
        methods: {
          ok(id){
            console.log(id)
          },
          no(id){

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
  .center-p{
    text-align: center;
    font-size: 13px;
    padding-top: 20px;
  }
  .scroll{
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
  }
  #requestList .img{
    width: .8rem;
    height:.8rem;
    margin: 10px 10px 10px 0;
  }
  #requestList .nick{
    font-size: 15px;
  }
  #requestList .msg{
    font-size: 12px;
    max-width: 500px;
    color:#888;
    padding-top: 4px;
  }
  #requestList button+button{
    margin-left: .14rem;
  }
  @media screen and (max-width: 414px){
    #requestList .msg{
      max-width: 205px;
    }
  }
  @media screen and (max-width: 375px){
    #requestList .msg{
      max-width: 190px;
    }
  }
  @media screen and (max-width: 320px){
    #requestList .msg{
      max-width: 155px;
    }
  }
</style>
