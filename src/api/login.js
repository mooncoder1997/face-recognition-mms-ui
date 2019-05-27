import request from '../util/request'

export function LoginByFace(faceImageBase64) {
  const data = {
    'faceImageBase64': faceImageBase64
  };
  return request({
    url: 'http://192.168.1.105:8040/mms-provider-face/api/v1/face/session',
    method: 'post',
    data
  })
}
