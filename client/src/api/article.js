import ax from './axios';

export function getArticles() {
  return ax.get('/article')
}

export function postArticle(data) {
  return ax.post('/article', data)
}