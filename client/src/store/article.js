export const state = () => ({
  list: [],
  total: 0,
  fetch: false,
})

export const mutations = {

  FETCH_ART(state) {
    state.fetch = true
  },

  SET_ART_SUCCESS(state, data) {
    const {
      list,
      total
    } = data.result;
    state.fetch = false
    state.list = list;
    state.total = total;
  },

  SET_ART_FAIL(state) {
    state.fetch = false
  }

}