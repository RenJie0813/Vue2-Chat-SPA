import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import userModule from './userModule/index'
import appModule from './appModule/index'

export default new Vuex.Store({
  modules: {
    user:userModule,
    app:appModule
  },
})
