const state = {
  product: {}
}

const mutations = {
  SET_PRODUCT_DETAIL: (state, product) => {
    state.product = product
  }
}

const actions = {
  onSetProductDetail({ commit }, product) {
    commit('SET_PRODUCT_DETAIL', product)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
