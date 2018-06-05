import ax from 'axios';

export function getUploadToken() {
  return ax
    .get('/uploadToken')
    .then(resp => resp.data)
    .catch(e => console.error(e));
}