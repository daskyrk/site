import ax from 'axios';

export function getArts(params) {
  return ax.get('/article', {
    params,
  }).then(resp => resp.data);
}

console.count('init ser:');
export function getArt(id) {
  return ax.get(`/article/${id}`).then(resp => resp.data);
}

export function addArt(data) {
  return ax.post('/article', data).then(resp => resp.data);
}

export function updateArt(id, data) {
  return ax.put(`/article/${id}`, data).then(resp => resp.data);
}
