import ax from './axios';

export function getArts(params) {
  return ax.get('/article', {
    params
  })
}

export function getArt(id) {
  return ax.get(`/article/${id}`)
}

export function postArticle(data) {
  return ax.post('/article', data)
}