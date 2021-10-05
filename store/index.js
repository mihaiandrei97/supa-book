export const state = () => ({
  loading: false,
  authenticated: false
})

export const mutations = {
  setLoading(state, value) {
    state.loading = value
  },
  setAuthenticated(state, value) {
    state.authenticated = value
  },

}

export const actions = {
  setLoading({ commit }) {
    commit('setLoading', true)
  },
  clearLoading({ commit }) {
    commit('setLoading', false)
  },
  setAuthenticated({ commit }) {
    commit('setAuthenticated', true)
  },
  clearAuthenticated({ commit }) {
    commit('setAuthenticated', false)
  },

}