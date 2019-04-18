import request from '../util/request'

export function LoginByUserNameAndPassWord(username, password) {
  const data = {
    'username': username,
    'password': password
  };
  return request({
    url: '/mms-provider-user/api/v1/user/session',
    method: 'post',
    data,
    transformRequest: [function (data) {
      // 将数据转换为表单数据
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function LoginByFace(faceImageBase64) {
  const data = {
    'faceImageBase64': faceImageBase64
  };
  return request({
    url: '/mms-provider-face/api/v1/face/session',
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
