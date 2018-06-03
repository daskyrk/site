import ax from 'axios';

export function login(data) {
  return ax.post('/login', data).then(resp => resp.data);
}

// export function logout() {
//   return ax.post('/logout');
// }
