import ax from './axios';

export function getArts(params) {
  return ax.get('/article', {
    params
  })
}

export function getArt(id) {
  return ax.get(`/article/${id}`)
}

export function addArt(data) {
  return ax.post('/article', data)
}

export function updateArt(id, data) {
  return ax.put(`/article/${id}`, data)
}