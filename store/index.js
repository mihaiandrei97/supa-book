export const state = () => ({
  loading: false
})

export const mutations = {
  setLoading(state, value) {
    state.loading = value
  }
}

export const actions = {
  setLoading({ commit }) {
    commit('setLoading', true)
  },
  clearLoading({ commit }) {
    commit('setLoading', false)
  }
}