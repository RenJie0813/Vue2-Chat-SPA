import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);

import axios from './lib/http'
Vue.use(axios);

import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
filters(Vue);

//快速响应
const FastClick = require('fastclick');
document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body);
}, false);

//懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'../static/images/error.png',
    loading:'../static/images/animation.gif',
    preLoad:1.1,
    attempt:2
});

//移动端图片压缩
import minImgVue from '../static/js/minImgVue'
Vue.use(minImgVue);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  //前进不缓存，后退缓存
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  if (toDepth < fromDepth) {
    from.meta.keepAlive = false;
    to.meta.keepAlive = true
  }
  if(toDepth==2){
    /* 显示加载中动画 */
    store.commit('updateLoadingStatus', true);
  }
  next();
});

router.afterEach(route => {
  //判断是否是在三个主页面,用于其切换效果
  const toDepth = route.path.split('/').length;
  if(toDepth==2){
    store.commit('setMain',true);
    /* 隐藏加载中动画 */
    store.commit('updateLoadingStatus', false);
  }else{
    store.commit('setMain',false);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
