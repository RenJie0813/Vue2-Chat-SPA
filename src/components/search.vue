<template>
  <!--复用性非常高，涉及的动效也比较复杂-->
  <!--search-open 控制搜索框被激活时的动效、样式-->
  <div id="search" :class="{'search-open':getHeaderStatus}">
    <div class="weui-search-bar" id="search_bar" :class="{'weui-search-bar_focusing':getHeaderStatus}">
      <form class="weui-search-bar__form" action="" @submit.prevent="submitHandler">
        <div class="weui-search-bar__box">
          <yd-icon name="search" size="16px" class="icon-search"></yd-icon>
          <input type="search" v-model="searchIpt" class="weui-search-bar__input" id="search_input" placeholder="搜索"
                 @focus="closeHeader"/>
          <a class="weui-icon-clear" v-on:click="searchClear"></a>
        </div>
        <label for="search_input" class="weui-search-bar__label" id="search_text">
          <yd-icon name="search" size="16px" style="vertical-align: middle"></yd-icon>
          <span>搜索</span>
        </label>
      </form>
      <a class="weui-search-bar__cancel-btn" id="search_cancel" v-on:click="$store.commit('toggleHeaderStatus',false)">取消</a>
    </div>
    <article>
      <h3>搜索指定内容</h3>
      <div v-for="item in result">
        {{item}}
      </div>
    </article>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "search",
    data() {
      return {
        searchIpt: "",
        result:[]
      }
    },
    computed: {
      ...mapGetters(['getHeaderStatus'])
    },
    methods: {
      // wx-header 隐藏
      closeHeader() {
        this.$store.commit('toggleHeaderStatus', true);
      },
      // 清除输入的内容 可以直接写 v-on:click="searchIpt=''"
      searchClear() {
        this.searchIpt = ""
      },
      getResult(val) {
        if (!val) return [];
        return [
          'Apple', 'Banana', 'Orange', 'Durian', 'Lemon', 'Peach', 'Cherry', 'Berry',
          'Core', 'Fig', 'Haw', 'Melon', 'Plum', 'Pear', 'Peanut', 'Other'
        ].filter(value => new RegExp(val, 'i').test(value));
      },
      submitHandler() {
        this.$dialog.toast({mes: `搜索str：${this.searchIpt}`});
        return false;
      },
      itemClickHandler(item) {
        this.$dialog.toast({mes: `搜索：${item}`});
      }
    },
    watch: {
      searchIpt(val) {
        this.result = this.getResult(val);
      }
    }
  }
</script>
<style>
  @import "../../static/css/search.css";
</style>
