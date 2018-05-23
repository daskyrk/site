import ax from './axios';

export function getArticles() {
  return ax.get('/articles')
    .then(resp => resp.data)
}