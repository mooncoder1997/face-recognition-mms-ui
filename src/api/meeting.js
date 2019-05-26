import request from '../util/request'

export function QueryMeetingByMeetingId(meetingId) {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings/' + meetingId,
    method: 'get'
  })
}

export function QueryMeetingByUserId(userId) {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings/users/' + userId,
    method: 'get'
  })
}

export function QueryMeetingForUser() {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings/user',
    method: 'get'
  })
}

export function QueryAT(roomName, roomDate) {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings/times',
    method: 'get',
    params: {
      'roomName': roomName,
      'roomDate': roomDate
    }
  })
}

export function QueryAllMeetings() {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings',
    method: 'get'
  })
}

export function DeleteMeetingByMeetingId(meetingId) {
  return request({
    url: '/mms-provider-meeting/api/v1/meetings/' + meetingId,
    method: 'delete'
  })
}

export function UpdateMeeting(meetingId, meetingName, meetingTopic, meetingRoomName, meetingDate, meetingStartTime, meetingEndTime, meetingRemarks) {
  const data = {
    'meetingId': meetingId,
    'meetingName': meetingName,
    'meetingTopic': meetingTopic,
    'meetingRoomName': meetingRoomName,
    'meetingDate': meetingDate,
    'meetingStartTime': meetingStartTime,
    'meetingEndTime': meetingEndTime,
    'meetingRemarks': meetingRemarks
  };
  return request({
    url: '/mms-provider-meeting/api/v1/meeting',
    method: 'put',
    data
  })
}

export function BookMeeting(meetingUserId,meetingName, meetingTopic, meetingRoomName, meetingDate, meetingStartTime, meetingEndTime, meetingPeople, meetingRemarks) {
  const data = {
    "meetingUserId": meetingUserId,
    'meetingName': meetingName,
    'meetingTopic': meetingTopic,
    'meetingRoomName': meetingRoomName,
    'meetingDate': meetingDate,
    'meetingStartTime': meetingStartTime,
    'meetingEndTime': meetingEndTime,
    'meetingPeople': meetingPeople,
    'meetingRemarks': meetingRemarks
  };
  return request({
    url: '/mms-provider-meeting/api/v1/meeting',
    method: 'post',
    data
  })
}

export function QueryAllBookableTime(meetingRoomName, meetingRoomDate) {
  return request({
    url: `/mms-provider-meeting/api/v1/meetings/times?roomName=${meetingRoomName}&roomDate=${meetingRoomDate}`
  })
}
