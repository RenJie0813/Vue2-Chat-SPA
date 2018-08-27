<!-- Login -->
<template>
  <div>
  <paint v-if="this.$store.state.app.isPC"></paint>    
  <div id="login">
    <div id=login-box>
      <yd-tab v-model="tab" :active-color="active">
        <yd-tab-panel label="登录">
          <div v-show="!forgetPwd">
            <yd-cell-group>
              <yd-cell-item>
                <i class="iconfont" slot="icon">&#xe622;</i>
                <span slot="left">手机号：</span>
                <yd-input slot="right" required v-model="mobile" max="11" placeholder="请输入手机号"
                          :show-success-icon="false" :show-error-icon="false"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                <i class="iconfont" slot="icon">&#xe6e8;</i>
                <span slot="left">密码：</span>
                <yd-input slot="right" type="password" v-model="passWord" max=16 placeholder="请输入密码"
                          :show-success-icon="false" :show-error-icon="false"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="right" @click="forgetPwd=true" id="forgetPwaSpan">忘记密码?</span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button-group>
              <yd-button @click.native="login" type="primary">登录</yd-button>
              <yd-button @click.native="tab = 1" type="hollow">注册</yd-button>
            </yd-button-group>
          </div>

          <div id="findPwd" v-show="forgetPwd">
            <yd-cell-group>
              <yd-cell-item>
                <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
                <input type="text" slot="right" ref="findPwdPhoneInput" placeholder="请输入手机号码" maxlength="11">
                <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode slot="right"
                             v-model="findIsSend"
                             @click.native="sendCode('findPwd')"
                             type="warning"
                             storage-key="forgetPwdKey"
                ></yd-sendcode>
                <!-- ↑↑关键代码是这里↑↑ -->
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">验证码：</span>
                <yd-input slot="right" required v-model="findCheckCode" max="6" :show-success-icon="false"
                          :show-error-icon="false"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">新密码：</span>
                <yd-input slot="right" type="password" v-model="newPwd" max=16  :show-success-icon="false"
                          :show-error-icon="false"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">确认密码：</span>
                <yd-input slot="right" type="password" v-model="newPwd2" max=16  :show-success-icon="false"
                          :show-error-icon="false"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button-group>
              <yd-button @click.native="resetPwd" type="danger">重置密码</yd-button>
              <yd-button @click.native="forgetPwd=false" type="hollow">返回登录</yd-button>
            </yd-button-group>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="注册">
          <yd-cell-group>
            <yd-cell-item>
              <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
              <input type="text" slot="right" ref="phoneInput" placeholder="请输入手机号码" maxlength="11">
              <!-- ↓↓关键代码是这里↓↓ -->
              <yd-sendcode slot="right"
                           v-model="isSend"
                           @click.native="sendCode('regiester')"
                           type="warning"
                           storage-key="regiesterKey"
              ></yd-sendcode>
              <!-- ↑↑关键代码是这里↑↑ -->
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">验证码：</span>
              <yd-input slot="right" required v-model="checkCode" max="6" :show-success-icon="false"
                        :show-error-icon="false"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">昵称：</span>
              <yd-input slot="right" required v-model="nickName" max="8" :show-success-icon="false"
                        :show-error-icon="false"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">密码：</span>
              <yd-input slot="right" type="password" v-model="pwd" max=16  :show-success-icon="false"
                        :show-error-icon="false"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">确认密码：</span>
              <yd-input slot="right" type="password" v-model="pwd2" max=16  :show-success-icon="false"
                        :show-error-icon="false"></yd-input>
            </yd-cell-item>
          </yd-cell-group>
          <yd-button-group>
            <yd-button @click.native="register" type="danger">注册</yd-button>
            <yd-button @click.native="tab = 0" type="hollow">登录</yd-button>
          </yd-button-group>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </div>
  </div>
</template>

<script>
import paint from '../components/paint'

  export default {
    data() {
      return {
        tab: 0,
        //验证码是否发送
        isSend: false,
        findIsSend:false,
        //登录
        mobile: "",
        passWord: "",
        //注册相关
        checkCode: "",
        nickName: "",
        pwd: "",
        pwd2: "",
        //找回密码
        forgetPwd: false,
        findCheckCode:"",
        newPwd:"",
        newPwd2:""
      };
    },

    components: {
          paint      
    },

    computed: {
      active() {
        return this.tab === 0 ? '#04be02' : '#FF5E53';
      }
    },

    mounted() {
    },

    created() {
    },

    methods: {
      sendCode(type) {
        let phone;
        if(type=="regiester"){
          phone=this.$refs.phoneInput.value;
        }else{
          phone=this.$refs.findPwdPhoneInput.value;
        }
        if(!this.isAvaildMobile(phone)){
          this.$dialog.toast({
            mes: '请输入正确的手机号',
            icon: 'error',
            timeout: 1000
          });
        }else{
          this.$dialog.loading.open('发送中...');
          setTimeout(() => {
            if(type=="regiester"){
              this.isSend = true;
            }else{
              this.findIsSend = true;
            }

            this.$dialog.loading.close();

            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1000
            });
          }, 1000);
        }
      },
      login() {
        if(!this.isAvaildMobile(this.mobile)){
          this.$dialog.toast({
            mes: '请输入正确的手机号',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.passWord.length<6||this.passWord.length>16){
          this.$dialog.toast({
            mes: '请输入6-16位数的密码',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        this.$store.commit("setLogin");//隐藏登录
        this.$router.push({path:"/Index"});        
      },
      register() {
        let reg=/^\d{6}$/;
        if(!reg.test(this.checkCode)) {
          this.$dialog.toast({
            mes: '请输入6位数验证码',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.nickName.length==0||this.nickName.length>8){
          this.$dialog.toast({
            mes: '昵称长度在1-8位',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.pwd.length<6||this.pwd.length>16){
          this.$dialog.toast({
            mes: '请输入6-16位数的密码',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.pwd!=this.pwd2){
          this.$dialog.toast({
            mes: '两次输入密码不一致',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
      },
      resetPwd(){
        let reg=/^\d{6}$/;
        if(!reg.test(this.findCheckCode)) {
          this.$dialog.toast({
            mes: '请输入6位数验证码',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.newPwd.length<6||this.newPwd.length>16){
          this.$dialog.toast({
            mes: '请输入6-16位数的密码',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
        if(this.newPwd!=this.newPwd2){
          this.$dialog.toast({
            mes: '两次输入密码不一致',
            icon: 'error',
            timeout: 1000
          });
          return;
        }
      },
      isAvaildMobile(phone) {
        let myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (!myreg.test(phone)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

</script>
<style>
  #login-bg.isMobile .yd-popup{
    background:url('../../static/images/login-bg.jpeg') no-repeat bottom;
    background-size:cover;
  }

  #login {
    max-width: 750px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  #login-box {
    margin: 3rem 20px 0;
    border-radius: 4px;
    overflow: hidden;
    padding-bottom: 20px;
    box-shadow: 1px 1px 4px #333;
    background-color: rgba(255,255,255,.9);    
  }

  #login-box div,.yd-tab-nav-item{
    background-color: transparent!important;
  }

  #login-box button + button {
    margin-left: 20px;
  }

  #forgetPwaSpan{
    padding-right: 15px;
    font-size: 14px;
  }
</style>
