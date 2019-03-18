import request from '../util/request'

export function GetAllUsers() {
  return request({
    url: '/sm/api/v1/user/user',
    method: 'get'
  })
}
