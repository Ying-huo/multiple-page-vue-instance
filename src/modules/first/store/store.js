import Vue from 'vue'
import Vuex from 'vuex'
import Info from './modules/Info'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Info
  }
})
