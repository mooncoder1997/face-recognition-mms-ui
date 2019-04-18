import request from '../util/request'

export function QueryUserByUserId(userId) {
  return request({
    url: '/mms-provider-user/api/v1/users/' + userId,
    method: 'get'
  })
}

export function QueryAllUser() {
  return request({
    url: '/mms-provider-user/api/v1/users',
    method: 'get'
  })
}

export function UpdateUser(userId, userName, userGender, userEmail, userMobile, userRoleName, userRemarks) {
  const data = {
    'userId': userId,
    'userName': userName,
    'userGender': userGender,
    'userEmail': userEmail,
    'userMobile': userMobile,
    'userRoleName': userRoleName,
    'userRemarks': userRemarks
  };
  return request({
    url: '/mms-provider-user/api/v1/user',
    method: 'put',
    data
  })
}

export function UpdatePassword(userId, userPassword) {
  const data = {
    'userId': userId,
    'userPassword': userPassword
  };
  return request({
    url: '/mms-provider-user/api/v1/user',
    method: 'put',
    data
  })
}

export function DeleteUserByUserId(userId) {
  return request({
    url: '/mms-provider-user/api/v1/user/' + userId,
    method: 'delete'
  })
}

export function AddUser(userId, userPassword, userName, userGender, userEmail, userMobile, userRoleName, userRemarks) {
  const data = {
    'userId': userId,
    'userPassword': userPassword,
    'userName': userName,
    'userGender': userGender,
    'userEmail': userEmail,
    'userMobile': userMobile,
    'userRoleName': userRoleName,
    'userRemarks': userRemarks
  };
  return request({
    url: '/mms-provider-user/api/v1/user',
    method: 'post',
    data
  })
}
