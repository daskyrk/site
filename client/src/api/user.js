import ax from 'axios';

export function login(data) {
  return ax.post('/login', data).then(resp => resp.data);
}

// export function logout() {
//   return ax.post('/logout');
// }

export function updateConfig(data) {
  return ax.post('/user/updateConfig', data).then(resp => resp.data);
}

export function getUserInfo() {
  return ax.get(`/user`).then(resp => resp.data);
}
