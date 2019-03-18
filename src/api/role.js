import request from '../util/request'

export function GetAllRoles() {
  return request({
    url: '/sm/api/v1/role/role',
    method: 'get'
  })
}
