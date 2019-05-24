<template>
  <div>
    <Row :gutter="26">
      <Col span="6">
        <Card class="meeting">
          <Icon type="ios-calendar" color="white"/>
          <h2>
            <b>{{todayMeetings.length}}</b>
          </h2>
          <h5 className="text-muted">指定日期会议</h5>
        </Card>
      </Col>
      <Col span="6">
        <Card class="meetingRoom">
          <Icon type="ios-bookmarks" color="white"/>
          <h2>
            <b>{{meetings.length}}</b>
          </h2>
          <h5 className="text-muted">已预定会议</h5>
        </Card>
      </Col>
      <Col span="6">
        <Card class="bookedMeeting">
          <Icon type="md-chatboxes" color="white"/>
          <h2>
            <b>{{totalMeetings.length}}</b>
          </h2>
          <h5 className="text-muted">会议</h5>
        </Card>
      </Col>
      <Col span="6">
        <Card class="todayMeeting">
          <Icon type="ios-easel" color="white"/>
          <h2>
            <b>{{totalMeetingRooms.length}}</b>
          </h2>
          <h5 className="text-muted">会议室</h5>
        </Card>
      </Col>
    </Row>
    <Row :gutter="26">
      <Col span="4">
        <div style="color: transparent;">blank</div>
      </Col>
      <Col span="8">
        <Card style="margin-top: 20px">
          <div v-if="todayMeetings.length !== 0" style="margin-left: 40px">
            <TimelineItem v-for="(meeting, meetingId) in todayMeetings" :key="meetingId" color="green">
              <p class="time">{{meeting.meetingDate}}<br/>{{meeting.meetingStartTime}}--{{meeting.meetingEndTime}}</p>
              <p class="content">{{meeting.meetingTopic}} | {{meeting.meetingRemarks}}</p>
            </TimelineItem>
          </div>
          <div v-else style="margin: 123px 20px">
            <TimelineItem>
              <p class="time">暂时没有数据</p>
            </TimelineItem>
          </div>
        </Card>
      </Col>
      <Col span="8">
        <Card style="margin-top: 20px">
          <Calendar v-on:choseDay="clickDay">
          </Calendar>
        </Card>
      </Col>
    </Row>
    <Row :gutter="26">
      <Col span="12">
        <Card>
          <div id="meetingRoom" :style="{width: '400px', height: '400px', marginLeft: '80px'}"></div>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <div id="room" :style="{width: '400px', height: '400px', marginLeft: '80px'}"></div>
        </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
  import {QueryAllMeetings, QueryMeetingForUser} from "../../api/meeting"
  import {QueryAllRoom} from "../../api/room";
  import Calendar from "vue-calendar-component";

  export default {
    name: 'Home',
    data() {
      return {
        userId: '',
        todayMeetings: [],
        meetings: [],
        data: '',
        totalMeetings: [],
        totalMeetingRooms: [],
      }
    },
    components: {
      Calendar
    },
    methods: {
      queryAllMeetings() {
        return new Promise(((resolve, reject) => {
          QueryAllMeetings().then(response => this.totalMeetings = response.data);
        }))
      },

      queryAllRoom() {
        return new Promise(((resolve, reject) => {
          QueryAllRoom().then(response => this.totalMeetingRooms = response.data);
        }))
      },

      queryMeetingForUser() {
        return new Promise((resolve, reject) => {
          QueryMeetingForUser().then(response => {
            let todayMeeting = [];
            this.meetings = response.data;
            response.data.forEach(item => {
              if (item.meetingDate.replace(/\b(0+)/gi, '') === this.data) {
                todayMeeting.push(item);
              }
            })
            this.todayMeetings = todayMeeting;
          })
        })
      },

      clickDay(data) {
        console.log(data)//2019/5/11
        this.data = data.replace(/\//g, '-')
        this.queryMeetingForUser();
      },

      drawMeetingRoom() {
        let myRoomChart = this.$echarts.init(document.getElementById('meetingRoom'));
        myRoomChart.setOption({
          title: {
            text: '会议室预定情况',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['会议室预订数']
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '会议室预定数',
              type: 'line',
              data: [1, 2, 10, 11, 1, 5, 8],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      },

      drawRoom() {
        let myChart = this.$echarts.init(document.getElementById('room'));
        myChart.setOption({
          title: {
            text: '会议室占用比例',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable: true,
          series: [
            {
              name: '会议室占用比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '测试会议室3'},
                {value: 310, name: '测试会议室4'},
                {value: 234, name: 'MeetingRoom1'},
                {value: 135, name: 'MeetingRoom2'}
              ]
            }
          ]
        })
      }
    },
    mounted() {
      // this.userId = this.$store.state.user.userId;
      let myDate = new Date();
      this.data = myDate.toLocaleDateString().replace(/\//g, '-');
      this.queryMeetingForUser();
      this.queryAllMeetings();
      this.queryAllRoom();
      this.drawMeetingRoom();
      this.drawRoom()
    }
  }
</script>

<style scoped>
  .time {
    font-size: 17px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    padding-left: 5px;
  }

  .meeting {
    background-color: #967adc;
  }

  .meetingRoom {
    background-color: #70ca63;
  }

  .bookedMeeting {
    background-color: #e9573f;
  }

  .todayMeeting {
    background-color: #3bafda;
  }

  h2 {
    padding: 5px;
    position: relative;
    color: #f5f2fd;
    font-size: 24px;
    line-height: 15px;
    margin-top: 19px;
  }

  h5 {
    padding: 5px;
    position: relative;
    color: #f5f2fd;
    font-size: 17px;
  }

  i {
    position: absolute;
    opacity: 0.8;
    right: 0;
    top: 10px;
    line-height: 100px;
    font-size: 80px;
  }
</style>
