<template>
  <div>
    <div style="margin-top: 20px; color: purple; font-size: larger">
      <center><h1>会议预定</h1></center>
    </div>
    <Row>
      <Col span="18">
        <Card style="margin-top: 10px; margin-left: 20px; margin-right: 10px">
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
                    <Tag color="green" style="float: right">可预订时段: </Tag>
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
                    <Tag color="green" style="float: right">会议时段: </Tag>
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
                <Button type="success" long style="margin-top: 40px" @click="bookMeeting">提交</Button>
                <Modal
                  v-model="prompt"
                  @on-ok="successConfirm">
                  <h2 style="color: purple"><center>会议室预定成功！</center></h2>
                </Modal>
              </Card>
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
  import {BookMeeting, QueryAllBookableTime} from "../../api/meeting";
  import {timeParseInt} from "../../util/Date";
  import Calendar from "vue-calendar-component";

  export default {
    name: "BookMeeting",
    inject: ['reload'],
    data() {
      return {
        userId: '',
        meetingDate: '',
        bookableTime: '',
        displayTime: '',
        steps: [1, 10],
        meetingStartTime: '',
        meetingEndTime: '',
        prompt: false
      }
    },
    components: {
      Calendar
    },
    methods: {
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

      //预定会议
      bookMeeting() {
        console.log(this.meetingTopic);
        return new Promise((resolve, reject) => {
          BookMeeting(this.userId, '会议室预定', '会议室预定', 'MeetingRoom1', this.meetingDate, this.meetingStartTime, this.meetingEndTime, this.model1)
            .then(response => {
              this.prompt = true;
            })
        })
      },

      //成功后点击模态框确认
      successConfirm() {
        this.prompt = false;
        this.$router.replace({
          name: 'Dashboard'
        });
      },

      returnToDashBoard() {
        this.$router.replace({
          name: 'Dashboard'
        });
      }
    },

    mounted() {
      this.userId = this.$store.state.user.userId;
    }
  }
</script>

<style scoped>

</style>
