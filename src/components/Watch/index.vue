<template>
  <div>
    <div style="margin-top: 10px; color: purple; font-size: larger">
      <center><h1>会议安排</h1></center>
    </div>
    <Row gutter="26">
      <Col span="18">
        <Card style="margin-top: 10px; margin-left: 20px; margin-right: 10px">
          <div v-if="meetingData.length !== 0" style="margin-top: 20px; margin-left: 40px">
            <TimelineItem v-for="(meeting, meetingId) in meetingData" :key="meetingId" color="green">
              <p class="time">日期: {{meeting.meetingDate}}&nbsp;&nbsp;时间: {{meeting.meetingStartTime}}--{{meeting.meetingEndTime}}</p>
              <p class="content">会议名称: {{meeting.meetingName}}</p>
              <p class="content">会议室：{{meeting.meetingRoomName}}</p>
            </TimelineItem>
          </div>
          <div v-else style="margin: 123px 20px">
            <TimelineItem>
              <p class="time">暂时没有会议安排</p>
            </TimelineItem>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <div @click="this.returnToDashBoard">
          <Card style="margin-top: 10px;  margin-right: 20px">
            <div style="text-align:center">
              <img src="../../assets/dashBoard.png">
              <h2>返回主页</h2>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {QueryMeetingByRoomName} from "../../api/meeting";

  export default {
    name: "WatchMeeting",
    data() {
      return {
        meetingData: []
      }
    },

    mounted() {
      this.queryMeetingByRoomName();
    },
    methods: {
      queryMeetingByRoomName() {
        return new Promise((resolve, reject) => {
          QueryMeetingByRoomName('MeetingRoom1').then(response => {
            if (response.status === 200) {
              this.meetingData = response.data;
            } else {
              this.$Message.error("获取会议失败！");
            }
          })
        }).catch(error => {
          this.$Message.error("网络异常！");
        })
      },

      returnToDashBoard() {
        this.$router.replace({
          name: 'Dashboard'
        });
      }
    }
  }
</script>

<style scoped>
  .time {
    font-size: 20px;
    font-weight: bold;
    color: purple;
  }

  .content {
    font-size: 16px;
    padding-left: 5px;
    color: dimgrey;
    font-weight: bold;
  }
</style>
