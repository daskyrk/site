import service from '../api'

export const actions = {

  // 获取文章
  async getArtList({
    commit,
    state
  }, data = {
    current_page: 1
  }) {
    commit('article/FETCH_ART')
    const res = await service.getArticles(data)
      .catch(err => console.error(err))
    // TODO: 统一处理包裹的code、msg层
    if (res && res.code === 1) {
      commit('article/SET_ART_SUCCESS', res)
    } else commit('article/SET_ART_FAIL')
  },

}