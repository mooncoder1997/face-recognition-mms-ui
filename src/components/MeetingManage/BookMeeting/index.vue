<template>
  <div>
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <br>
    <Steps :current="current">
      <Step title="选择会议室" icon="md-easel" content="根据最多容纳人数选择会议室"></Step>
      <Step title="选择会议时间" icon="md-clock" content="根据会议时间安排和可预定时段选择会议时间"></Step>
      <Step title="邀请参会人" icon="md-contacts" content="选择需要参加会议的人"></Step>
      <Step title="输入会议内容" icon="md-clipboard" content="输入会议的主题和内容等信息"></Step>
    </Steps>
    <div id="book-content">
      <div v-if="current == 0">
        <Row>
          <Col v-for="(room, roomName) in roomData" :key="roomName" span="6">
            <div @click="selectRoom(room.roomName)">
              <Card style="margin-top: 20px; margin-right: 20px; background: rgba(130,100,208,1)">
                <p slot="title" @click="selectRoom" style="color: #fff;">
                  <Icon type="ios-add" />
                  {{room.roomName}}
                </p>
                <ul style="color: #fff">
                  <li>
                    <Icon type="ios-film-outline"></Icon>
                    会议室位置：{{ room.roomLocation }}
                  </li>
                  <li>
                    <Icon type="ios-film-outline"></Icon>
                    最大容纳人数：{{ room.roomPeople }}
                  </li>
                  <li>
                    <Icon type="ios-film-outline"></Icon>
                    备注：{{ room.roomRemarks }}
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <div v-else-if="current == 1">
        <Row id="time-choice" :gutter="26">
          <Col span="12">
            <Card>
              <Calendar v-on:choseDay="queryAllBookableTime"></Calendar>
            </Card>
          </Col>
          <Col span="12">
            <Card style="min-height: 328px">
              <Row :gutter="16" style="margin-top: 40px">
                <Col span="6">
                  <Tag color="green" style="float: right">可预订时间段：</Tag>
                </Col>
                <Col span="16">
                  <Input
                    size="large"
                    v-model="displayTime" disabled
                    type="textarea" autosize
                    style="margin-bottom: 20px"/>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="6">
                  <Tag color="green" style="float: right">会议召开时段：</Tag>
                </Col>
                <Col span="16">
                  <TimePicker
                    @on-change="onChange"
                    confirm
                    :steps=steps
                    type="timerange"
                    placement="bottom-end"
                    placeholder="请选择开始时间"
                    style="margin-bottom: 20px">
                  </TimePicker>
                </Col>
              </Row>
              <Button type="info" style="display: block; margin: 20px auto;" @click="next">下一步</Button>
            </Card>
          </Col>
        </Row>
      </div>
      <div v-else-if="current == 2">
        <Select
          v-model="model1"
          placeholder="请输入邀请参会的人员"
          multiple
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading">
          <Option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
        <Button type="primary" style="display: block; margin: 20px auto" @click="next">
          下一步
        </Button>
      </div>
      <div v-else>
        <Row>
          <Col span="2">
            <Tag color="success">会议名称</Tag>
          </Col>
          <Col span="22">
            <Input
              v-model="meetingName"
              placeholder="请输入会议名称">
              <Icon type="ios-contact" slot="prefix"/>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <Tag color="success">会议主题</Tag>
          </Col>
          <Col span="22">
            <Input
              v-model="meetingTopic"
              type="textarea"
              :autosize="{minRows: 3}"
              placeholder="请输入会议主题"/>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <Tag color="success">备注信息</Tag>
          </Col>
          <Col span="22">
            <Input
              v-model="meetingRemarks"
              type="textarea"
              :autosize="{minRows: 2}"
              placeholder="请输入备注"/>
          </Col>
        </Row>
        <Button type="info" style="display: block; margin: 0 auto" @click="bookMeeting">提交</Button>
        <Modal
          v-model="prompt"
          @on-ok="successConfirm">
          <p>会议室预定成功！</p>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
  import {QueryAllRoom} from "../../../api/room";
  import {QueryAllUser} from "../../../api/user";
  import {BookMeeting, QueryAllBookableTime} from "../../../api/meeting";
  import Calendar from "vue-calendar-component";
  import {timeParseInt} from "../../../util/Date";

  export default {
    name: "BookMeeting",
    inject: ['reload'],
    data() {
      return {
        userId: '',
        current: 0,
        loading: false,
        roomData: [],
        meetingRoomName: '',
        meetingDate: '',
        bookableTime: '',
        displayTime: '',
        steps: [1, 10],
        meetingStartTime: '',
        meetingEndTime: '',
        model1: '',
        options: [],
        list: [],
        meetingName: '',
        meetingTopic: '',
        meetingRemarks: '',
        prompt: false
      }
    },
    components: {
      Calendar
    },
    methods: {
      //获取所有会议室信息
      queryAllRoom() {
        return new Promise((resolve, reject) => {
          QueryAllRoom().then(response => {
            if (response.status === 200) {
              this.roomData = response.data;
              this.loading = false;
            } else {
              this.$Message.error("查询所有会议室失败！");
            }
          })
        }).catch(error => {
          reject(error)
        })
      },
      //选择会议室触发的回调
      selectRoom(roomName) {
        this.meetingRoomName = roomName;
        this.current = 1;
      },
      //点击下一步
      next() {
        if (this.current === 1) {
          this.current = 2;
        } else {
          this.current = 3
        }
      },
      //获取所有可预订时间
      queryAllBookableTime(meetingDate) {
        this.meetingDate = meetingDate.replace(/\//g, '-');
        return new Promise((resolve, reject) => {
          QueryAllBookableTime(this.meetingRoomName, this.meetingDate)
            .then(response => {
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
          this.$Message.success("时间段预定成功！")
        } else {
          this.$Message.error("时间段不可用！")
        }
      },
      //获取所有用户列表
      queryAllUser() {
        return new Promise((resolve, reject) => {
          QueryAllUser()
            .then(response => {
              this.list = response.data;
            })
        })
      },
      //远程联想
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            const list = this.list.map(item => {
              return {
                value: item.userId,
                label: item.userName
              };
            });
            this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options = [];
        }
      },
      //预定会议室
      bookMeeting() {
        console.log(this.meetingTopic);
        return new Promise((resolve, reject) => {
          BookMeeting(this.userId, this.meetingName, this.meetingTopic, this.meetingRoomName, this.meetingDate, this.meetingStartTime, this.meetingEndTime, this.meetingRemarks)
            .then(response => {
              this.prompt = true;

            })
        })
      },
      //成功后点击模态框确认
      successConfirm() {
        this.prompt = false;
        this.reload()
      },
    },

    mounted() {
      this.queryAllRoom();
      this.queryAllUser();
      this.userId = this.$store.state.user.userId;
    }
  }
</script>

<style scoped>
  #book-content {
    margin-top: 40px;
  }

  .ivu-row {
    margin-bottom: 20px;
  }

  #time-choice {
    margin-right: 80px;
  }
</style>
