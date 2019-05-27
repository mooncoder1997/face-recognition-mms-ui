<template>
  <div>
    <div style="margin-top: 20px; color: purple; font-size: larger">
      <center><h1>删除会议</h1></center>
    </div>
    <Row>
      <Col span="18">
        <Card style="margin-top: 10px; margin-left: 20px; margin-right: 10px">
          <div style="margin-top: -10px; margin-bottom: 5px; color: #ff9900; font-size: larger">
            <center><h4>点击删除会议</h4></center>
          </div>
          <Row :gutter="26">
            <Col v-for="(meeting) in meetingData" :key="meeting.meetingId" span="8">
              <div @click="deleteMeetingByMeetingId(meeting.meetingId)">
                <Card style="margin-top: 5px; margin-right: 10px; background: rgba(130,100,208,1)">
                  <p slot="title"  style="color: #fff;">
                      会议名: {{meeting.meetingName}}
                  </p>
                  <ul style="color: #fff">
                    <li>
                      主题: {{ meeting.meetingTopic }}
                    </li>
                    <li>
                      日期: {{ meeting.meetingDate }}
                    </li>
                    <li>
                      开始时间: {{ meeting.meetingStartTime }}
                    </li>
                  </ul>
                </Card>
              </div>
            </Col>
          </Row>
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
  import {DeleteMeetingByMeetingId, QueryMeetingByUserId} from "../../api/meeting";

  export default {
    name: "DeleteMeeting",
    inject: ['reload'],
    data() {
      return {
        userId: '',
        meetingData: [],
        meetingId: '',
      }
    },
    methods: {
      returnToDashBoard() {
        this.$router.replace({
          name: 'Dashboard'
        });
      },

      queryMeetingByUserId() {
        QueryMeetingByUserId().then(response => {
          if (response.status === 200) {
            this.$Message.success("查询会议成功！");
            this.meetingData = response.data;
          } else {
            this.$Message.error("查询会议失败！");
          }
        })
      },

      deleteMeetingByMeetingId(meetingId) {
        this.meetingId = meetingId;
        DeleteMeetingByMeetingId(meetingId).then(response => {
          if (response.status === 204) {
            this.$Message.success("删除会议成功！");
            this.reload();
          } else {
            this.$Message.error("查询会议失败！");
          }
        })
      },
    },

    mounted() {
      this.queryMeetingByUserId();
      this.userId = this.$store.state.user.userId;
    }
  }
</script>

<style scoped>

</style>
