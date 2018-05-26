import ax from './axios';

export function getArticles() {
  return ax.get('/article')
    .then(res => res.data)
}

export function postArticle(data) {
  return ax.post('/article', data)
    .then(res => res.data);
}