import request from '../util/request'

export function LoginByUserName(username, password) {
  const data = {
    'username': username,
    'password': password
  };
  return request({
    url: '/sm/api/v1/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/sm/api/v1/user/logout',
    method: 'post'
  })
}
