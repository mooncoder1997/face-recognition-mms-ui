import request from '../util/request'

export function QueryAllRole() {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-user/api/v1/roles',
    method: 'get'
  })
}
