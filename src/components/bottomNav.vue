<template>
  <yd-tabbar :class="{hide:getHeaderStatus}">
    <yd-tabbar-item title="聊天" link="/Index">
      <i class="iconfont" slot="icon">&#xe611;</i>
      <yd-badge slot="badge" v-show="this.$store.state.user.unReadNum>0" type="danger">{{this.$store.state.user.unReadNum}}</yd-badge>
    </yd-tabbar-item>
    <yd-tabbar-item title="通讯录" link="/Concat" dot>
      <i class="iconfont" slot="icon">&#xe628;</i>
    </yd-tabbar-item>
    <yd-tabbar-item title="个人设置" link="/Setting">
      <yd-icon name="setting" slot="icon" size="0.54rem"></yd-icon>
    </yd-tabbar-item>
  </yd-tabbar>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getHeaderStatus'])
    },
    methods: {},
    mounted() {

    },
    created() {

    },
    components: {}
  }
</script>

<style>
  .hide{
    display: none;
  }
  .yd-tabbar-item{
    font-weight: 500;
  }
</style>
