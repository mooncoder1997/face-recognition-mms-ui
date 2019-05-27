<template>
  <div>
    <div style="margin-top: 10px; color: purple; font-size: larger">
      <center><h1>修改会议信息</h1></center>
    </div>
    <Row>
      <Col span="18">
        <Card style="margin-top: 10px; margin-left: 20px; margin-right: 10px">
          <div style="margin-top: -10px; margin-bottom: 5px; color: #ff9900; font-size: larger">
            <center><h4>点击修改会议信息</h4></center>
          </div>
          <Row :gutter="26">
            <Col v-for="(meeting) in meetingData" :key="meeting.meetingId" span="8">
              <div @click="updateMeetingByMeetingId(meeting)">
                <Card style="margin-top: 5px; margin-right: 10px; background: rgba(130,100,208,1)">
                  <p slot="title" style="color: #fff;">
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
    <Modal
      v-model="modal"
      title="修改会议时间"
      fullscreen
      footer-hide
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>
        <Card style="margin-top: 30px; margin-left: 20px; margin-right: 10px">
          <Row :gutter="26">
            <Col span="12">
              <Card>
                <Calendar v-on:choseDay="queryAllBookableTime"></Calendar>
              </Card>
            </Col>
            <Col span="12">
              <Card style="min-height: 328px">
                <Row :gutter="16" style="margin-top: 30px">
                  <Col span="8">
                    <Tag color="green" style="float: right">可预订时段:</Tag>
                  </Col>
                  <Col span="14">
                    <Input
                      size="large"
                      v-model="displayTime" disabled
                      type="textarea" autosize
                      style="margin-bottom: 20px; font-size: 20px"/>
                  </Col>
                </Row>
                <Row :gutter="16" style="margin-top: 20px">
                  <Col span="8">
                    <Tag color="green" style="float: right">会议时段:</Tag>
                  </Col>
                  <Col span="14">
                    <TimePicker
                      @on-change="onChange"
                      confirm
                      :steps=steps
                      type="timerange"
                      placement="bottom-end"
                      placeholder="请选择会议时段"
                      style="">
                    </TimePicker>
                  </Col>
                </Row>
                <Button type="success" long style="margin-top: 40px" @click="this.updateMeeting">提交</Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </Row>
    </Modal>
  </div>
</template>

<script>
  import {QueryAllBookableTime, QueryMeetingByUserId, UpdateMeeting} from "../../api/meeting";
  import Calendar from 'vue-calendar-component';
  import {timeParseInt} from "../../util/Date";

  export default {
    name: "EditMeeting",
    inject: ['reload'],
    data() {
      return {
        userId: '',
        meetingData: [],
        meetingId: '',
        modal: false,
        steps: [1, 10],
        meetingDate: '',
        bookableTime: '',
        displayTime: '',
        meetingStartTime: '',
        meetingEndTime: '',
      }
    },

    components: {
      Calendar
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

      updateMeetingByMeetingId(meeting) {
        this.meetingId = meeting.meetingId;
        this.modal = true;
      },

      updateMeeting() {
        UpdateMeeting(this.meetingId, this.meetingDate, this.meetingStartTime, this.meetingEndTime).then(response => {
          if (response.status === 201) {
            this.$Message.success('修改会议成功');
            this.modal = false;
            this.reload();
          } else {
            this.$Message.error("修改会议失败！");
            this.modal = false;
          }
        })
      },

      ok() {

      },

      cancel() {

      },

      //获取所有可预订时间
      queryAllBookableTime(meetingDate) {
        this.meetingDate = meetingDate.replace(/\//g, '-');
        return new Promise((resolve, reject) => {
          QueryAllBookableTime('MeetingRoom1', this.meetingDate).then(response => {
            this.bookableTime = response.data;
            this.displayTime = '';
            this.bookableTime instanceof Array
              ? this.bookableTime.forEach(item => this.displayTime += `${item.startTime}----${item.endTime};\n`)
              : this.displayTime = `${this.bookableTime.startTime}----${this.bookableTime.endTime}`
          })
        })
      },

      //选择要预定的时间段触发的回调
      onChange(value) {
        console.log(value);
        this.meetingStartTime = value[0];
        this.meetingEndTime = value[1];
        if (this.bookableTime instanceof Array) {
          try {
            let tag = 0;
            this.bookableTime.forEach(item => {
              if (timeParseInt(this.meetingStartTime, ':') >= timeParseInt(item.startTime, ':')
                && timeParseInt(this.meetingEndTime, ':') <= timeParseInt(item.endTime, ':')) {
                foreach.break = new Error("StopIteration");
              } else {
                tag = 1;
              }
            });
            if (tag === 1) {
              this.$Message.error("时间段不可用！")
            }
          } catch (e) {
            if (e === "StopIteration") {
              this.$Message.success("时间段选择成功！")
            }
          } finally {
            console.log(this.meetingStartTime + this.meetingEndTime)
          }
        } else if (timeParseInt(this.meetingStartTime, ':') >= timeParseInt(this.bookableTime.startTime, ':')
          && timeParseInt(this.meetingEndTime, ':') <= timeParseInt(this.bookableTime.endTime, ':')) {
          this.$Message.success("时间段选择成功！")
        } else {
          this.$Message.error("时间段不可用！")
        }
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
