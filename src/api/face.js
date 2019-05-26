import request from '../util/request'

export function RegisterFace(faceUserId, faceFeature) {
  const data = {
    'faceUserId': faceUserId,
    'faceFeature': faceFeature
  };
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-face/api/v1/face',
    method: 'post',
    data
  })
}

export function QueryAllFaces() {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-face/api/v1/faces',
    method: 'get'
  })
}

export function DeleteFaceByFaceId(faceId) {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-face/api/v1/faces/' + faceId,
    method: 'delete'
  })
}
