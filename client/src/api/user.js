import ax from 'axios';

export function login(data) {
  return ax.post('/login', data);
}
