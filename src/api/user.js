import request from '../util/request'

export function GetUserByUserId(userId) {
  return request({
    url: '/sm/api/v1/user/user/' + userId,
    method: 'get'
  })
}

export function GetAllUsers() {
  return request({
    url: '/sm/api/v1/user/user',
    method: 'get'
  })
}

export function UpdateRoom(userId, userName, userGender, userEmail, userMobile, userRoleName, userRemarks) {
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
    url: '/sm/api/v1/user/user',
    method: 'put',
    data
  })
}

export function DeleteUser(userId) {
  return request({
    url: '/sm/api/v1/user/user/' + userId,
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
    url: '/sm/api/v1/user/user',
    method: 'post',
    data
  })
}
