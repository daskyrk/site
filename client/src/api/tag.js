import ax from 'axios';

export function getTags(params) {
  return ax
    .get('/tag', {
      params,
    })
    .then(resp => resp.data)
    .catch(e => console.error(e));
}

export function addTag(data) {
  return ax
    .post('/tag', data)
    .then(resp => resp.data)
    .catch(e => console.error(e));
}

export function updateTag(id, data) {
  return ax
    .put(`/tag/${id}`, data)
    .then(resp => resp.data)
    .catch(e => console.error(e));
}

export function delTag(id) {
  return ax
    .delete(`/tag/${id}`)
    .then(resp => resp.data)
    .catch(e => console.error(e));
}
