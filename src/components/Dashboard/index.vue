<template>
  <div>
    <div style="margin-top: 5px; color: purple; font-size: larger">
      <center><h1>基于人脸识别的智能会议室管理系统</h1></center>
    </div>
    <Row type="flex" justify="center" class="code-row-bg" style="margin-top: 5px">
      <Col>
        <div @click="this.bookMeeting">
          <Card style="width:320px">
            <div style="text-align:center">
              <img src="../../assets/bookMeeting.png">
              <h2>预定会议</h2>
            </div>
          </Card>
        </div>
      </Col>
      <Col style="margin-left: 50px">
        <div @click="this.editMeeting">
          <Card style="width:320px">
            <div style="text-align:center">
              <img src="../../assets/editMeeting.png">
              <h2>修改预定信息</h2>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg" style="margin-top: 10px">
      <Col>
        <div @click="this.deleteMeeting">
          <Card style="width:320px">
            <div style="text-align:center">
              <img src="../../assets/deleteMeeting.png">
              <h2>删除会议预定</h2>
            </div>
          </Card>
        </div>
      </Col>
      <Col style="margin-left: 50px">
        <div @click="this.watchMeeting">
          <Card style="width:320px">
            <div style="text-align:center">
              <img src="../../assets/watchMeeting.png">
              <h2>查看该会议室的会议安排</h2>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
    <div style="margin-top: 5px; color: purple; font-size: larger">
      <center><h2>当前会议室为: {{meetingRoomData.roomName}}, 最大容纳人数: {{meetingRoomData.roomPeople}}</h2></center>
    </div>
  </div>
</template>

<script>
  import {QueryRoomByRoomName} from "../../api/room";

  export default {
    name: "Dashboard",
    data() {
      return {
        modal: false,
        meetingRoomData: []
      }
    },
    mounted() {
      this.queryRoomByRoomName();
    },
    methods: {
      bookMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            url: 'book'
          }
        });
        // this.$router.replace({
        //   name: 'BookMeeting'
        // });
      },

      editMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            url: 'edit'
          }
        });
        // this.$router.replace({
        //   name: 'EditMeeting'
        // });
      },

      deleteMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            url: 'delete'
          }
        });
        // this.$router.replace({
        //   name: 'DeleteMeeting'
        // });
      },

      watchMeeting() {
        this.$router.replace({
          name: 'WatchMeeting'
        });
      },

      queryRoomByRoomName() {
        return new Promise((resolve, reject) => {
          QueryRoomByRoomName('MeetingRoom1').then(response => {
            if (response.status == 200) {
              this.meetingRoomData = response.data;
            } else {
              this.$Message.error("查询会议室失败！");
            }
          }).catch(error => {
            this.$Message.error("网络异常！");
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">

</style>
