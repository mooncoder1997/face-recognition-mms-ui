<template>
  <div>
    <div style="margin-top: 30px; color: purple; font-size: larger">
      <center><h1>基于人脸识别的智能会议室管理系统</h1></center>
    </div>
    <Row type="flex" justify="center" class="code-row-bg" style="margin-top: 30px">
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
      <Col style="margin-left: 100px">
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
    <Row type="flex" justify="center" class="code-row-bg" style="margin-top: 80px">
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
      <Col style="margin-left: 100px">
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
  </div>
</template>

<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        modal: false,
      }
    },
    methods: {
      bookMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            function: 'book'
          }
        });
      },

      editMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            function: 'edit'
          }
        });
      },

      deleteMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            function: 'delete'
          }
        });
      },

      watchMeeting() {
        this.$router.replace({
          name: 'FaceLogin',
          params: {
            function: 'watch'
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">

</style>
