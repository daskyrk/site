import ax from './axios';

export function getArticles() {
  return ax.get('/article')
    .then(res => res.data)
}