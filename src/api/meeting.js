import request from '../util/request'

export function QueryMeetingByRoomName(roomName) {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-meeting/api/v1/meetings/rooms/' + roomName,
    method: 'get'
  })
}

export function QueryMeetingByUserId() {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-meeting/api/v1/meetings/user',
    method: 'get'
  })
}

export function DeleteMeetingByMeetingId(meetingId) {
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-meeting/api/v1/meetings/' + meetingId,
    method: 'delete'
  })
}

export function UpdateMeeting(meetingId, meetingDate, meetingStartTime, meetingEndTime) {
  const data = {
    'meetingId': meetingId,
    'meetingDate': meetingDate,
    'meetingStartTime': meetingStartTime,
    'meetingEndTime': meetingEndTime
  };
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-meeting/api/v1/meeting',
    method: 'put',
    data
  })
}

export function BookMeeting(meetingUserId,meetingName, meetingTopic, meetingRoomName, meetingDate, meetingStartTime, meetingEndTime) {
  const data = {
    "meetingUserId": meetingUserId,
    'meetingName': meetingName,
    'meetingTopic': meetingTopic,
    'meetingRoomName': meetingRoomName,
    'meetingDate': meetingDate,
    'meetingStartTime': meetingStartTime,
    'meetingEndTime': meetingEndTime,
  };
  return request({
    url: 'http://58.87.120.47:8040/mms-provider-meeting/api/v1/meeting',
    method: 'post',
    data
  })
}

export function QueryAllBookableTime(meetingRoomName, meetingRoomDate) {
  return request({
    url: `http://58.87.120.47:8040/mms-provider-meeting/api/v1/meetings/times?roomName=${meetingRoomName}&roomDate=${meetingRoomDate}`
  })
}
