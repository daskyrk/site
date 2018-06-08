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

export function getUserInfo(username) {
  return ax.get(`/user?username=${username}`).then(resp => resp.data);
}
