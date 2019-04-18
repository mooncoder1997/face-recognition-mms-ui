import request from '../util/request'

export function QueryAllRole() {
  return request({
    url: '/mms-provider-user/api/v1/roles',
    method: 'get'
  })
}
