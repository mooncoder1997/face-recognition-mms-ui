import request from '../util/request'

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
    url: 'http://58.87.120.47:8040/sm/api/v1/user/logout',
    method: 'post'
  })
}
