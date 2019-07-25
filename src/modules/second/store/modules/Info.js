const state = {
  info: null // 数据
}

const getters = {
  info: state => state.info
}

const actions = {
  fetchInfo: ({ commit, state }, text) => {
    commit('updateInfo', text)
  }
}

const mutations = {
  updateInfo: (state, text) => {
    state.info = text
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
