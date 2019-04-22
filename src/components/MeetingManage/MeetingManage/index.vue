<template>
  <div>
    <div class="query-c">
      查询指定用户预定的会议：
      <Input search @on-search="queryMeetingByUserId" v-model="searchMeetingByUserId" placeholder="请输入用户编号"
             style="width: auto"/>
    </div>
    <br>

    <Table border stripe :columns="columns" :data="data" :loading="loading" ref="meetingTable">
      <template slot-scope="{ row, index }" slot="meetingId">
        <Input type="text" v-model="editMeetingId" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingUserId">
        <Input type="text" v-model="editMeetingUserId" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingUserId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingUserName">
        <Input type="text" v-model="editMeetingUserName" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingUserName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingName">
        <Input type="text" v-model="editMeetingName" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingTopic">
        <Input type="text" v-model="editMeetingTopic" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingTopic }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingRoomName">
        <Select v-model="editMeetingRoomName" v-if="editIndex === index">
          <Option v-for="item in roomData" :value="item.roomName" :key="item.roomName">{{ item.roomName }}</Option>
        </Select>
        <span v-else>{{ row.meetingRoomName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingDate">
        <DatePicker type="date" placeholder="Select date" v-model="editMeetingDate"
                    v-if="editIndex === index"></DatePicker>
        <span v-else>{{ row.meetingDate }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingStartTime">
        <Input type="text" v-model="editMeetingStartTime" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingStartTime }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingEndTime">
        <Input type="text" v-model="editMeetingEndTime" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingEndTime }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="meetingRemarks">
        <Input type="text" v-model="editMeetingRemarks" v-if="editIndex === index"/>
        <span v-else>{{ row.meetingRemarks }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button type="success" icon="md-checkmark" size="small" @click="handleSave(index)">保存</Button>
          <Button type="warning" icon="md-close" size="small" @click="editIndex = -1">取消</Button>
          <Poptip
            confirm
            title="您确定删除这条内容吗?"
            placement="top-end"
            transfer
            ok-text="确定"
            cancel-text="取消"
            @on-ok="handleDelete(row, index)"
            @on-cancel="handleCancel">
            <Button type="error" icon="md-trash" size="small">删除</Button>
          </Poptip>
        </div>
        <div v-else>
          <Button type="info" icon="md-create" size="small" @click="handleEdit(row, index)">操作</Button>
          <Poptip
            confirm
            title="您确定删除这条内容吗?"
            placement="top-end"
            transfer
            ok-text="确定"
            cancel-text="取消"
            @on-ok="handleDelete(row, index)"
            @on-cancel="handleCancel">
            <Button type="error" icon="md-trash" size="small">删除</Button>
          </Poptip>
        </div>
      </template>
    </Table>
    <br>
    <Button type="primary" @click="exportData">
      <Icon type="ios-download-outline"></Icon>
      导出数据
    </Button>
  </div>
</template>

<script>
  import {QueryAllMeetings, DeleteMeetingByMeetingId, UpdateMeeting, QueryMeetingByUserId} from "../../../api/meeting";
  import {QueryAllRoom} from "../../../api/room";

  export default {
    name: 'MeetingManage',
    data() {
      return {
        loading: true,
        isAddMeeting: false,
        searchMeetingByUserId: '',
        maxPeople: 10,
        columns: [
          {
            title: '编号',
            key: 'meetingId',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '会议发起人编号',
            key: 'meetingUserId',
            sortable: true,
            minWidth: 120,
            align: 'center',
          },
          {
            title: '会议发起人',
            key: 'meetingUserName',
            sortable: true,
            minWidth: 120,
            align: 'center',
          },
          {
            title: '会议名称',
            slot: 'meetingName',
            key: 'meetingName',
            minWidth: 150,
            align: 'center'
          },
          {
            title: '会议主题',
            slot: 'meetingTopic',
            key: 'meetingTopic',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '会议房间',
            slot: 'meetingRoomName',
            key: 'meetingRoomName',
            sortable: true,
            minWidth: 130,
            align: 'center'
          },
          {
            title: '会议日期',
            slot: 'meetingDate',
            key: 'meetingDate',
            sortable: true,
            minWidth: 120,
            align: 'center'
          },
          {
            title: '会议开始时间',
            slot: 'meetingStartTime',
            key: 'meetingStartTime',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '会议结束时间',
            slot: 'meetingEndTime',
            key: 'meetingEndTime',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '备注',
            slot: 'meetingRemarks',
            key: 'meetingRemarks',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            minWidth: 230,
            align: 'center'
          }
        ],
        data: [],
        roomData: [],
        editIndex: -1,
        editMeetingId: '',
        editMeetingUserId: '',
        editMeetingUserName: '',
        editMeetingName: '',
        editMeetingTopic: '',
        editMeetingRoomName: '',
        editMeetingDate: '',
        editMeetingStartTime: '',
        editMeetingEndTime: '',
        editMeetingRemarks: ''
      }
    },
    methods: {
      queryAllMeetings() {
        return new Promise((resolve, reject) => {
          QueryAllMeetings().then(response => {
            if (response.status === 200) {
              this.$Message.success("查询所有会议成功！");
              this.data = response.data;
              this.loading = false;
            } else {
              this.$Message.error("查询所有会议失败！");
            }
          })
        }).catch(error => {
          reject(error)
        })
      },
      queryMeetingByUserId(searchMeetingByUserId) {
        if (searchMeetingByUserId) {
          QueryMeetingByUserId(searchMeetingByUserId).then(response => {
            if (response.status === 200) {
              this.$Message.success("查询会议成功！");
              this.data = response.data;
              this.loading = false;
            } else {
              this.$Message.error("查询会议失败！");
            }
          })
        } else {
          this.queryAllMeetings();
        }
      },
      updateMeeting(meetingId, meetingName, meetingTopic, meetingRoomName, meetingDate, meetingStartTime, meetingEndTime, meetingRemarks) {
        meetingDate = meetingDate.toLocaleDateString().replace(/\//g, "-");
        return new Promise(((resolve, reject) => {
          UpdateMeeting(meetingId, meetingName, meetingTopic, meetingRoomName, meetingDate, meetingStartTime, meetingEndTime, meetingRemarks)
            .then(response => {
              if (response.status === 201) {
                this.$Message.success("更新会议成功！");
              } else {
                this.$Message.error("更新会议失败！");
              }
            })
        }))
      },
      deleteMeetingByMeetingId(meetingId) {
        return new Promise((resolve, reject) => {
          DeleteMeetingByMeetingId(meetingId).then(response => {
            if (response.status === 204) {
              this.$Message.success("删除会议室成功！");
            } else {
              this.$Message.error("删除会议室失败！");
            }
          })
        })
      },
      queryAllRoom() {
        return new Promise((resolve, reject) => {
          QueryAllRoom().then(response => {
            if (response.status === 200) {
              this.$Message.success("查询所有会议室成功！");
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

      handleDelete(row, index) {
        this.deleteMeetingByMeetingId(row.meetingId);
        this.data.splice(index, 1);
      },
      handleCancel() {
        this.$Message.info('取消删除');
      },
      handleEdit(row, index) {
        this.editMeetingId = row.meetingId;
        this.editMeetingName = row.meetingName;
        this.editMeetingTopic = row.meetingTopic;
        this.editMeetingRoomName = row.meetingRoomName;
        this.editMeetingDate = row.meetingDate;
        this.editMeetingStartTime = row.meetingStartTime;
        this.editMeetingEndTime = row.meetingEndTime;
        this.editMeetingRemarks = row.meetingRemarks;
        this.editIndex = index;
      },
      handleSave(index) {
        this.data[index].meetingId = this.editMeetingId;
        this.data[index].meetingName = this.editMeetingName;
        this.data[index].meetingTopic = this.editMeetingTopic;
        this.data[index].meetingRoomName = this.editMeetingRoomName;
        this.data[index].meetingDate = this.editMeetingDate.toLocaleDateString().replace(/\//g, "-");
        this.data[index].meetingStartTime = this.editMeetingStartTime;
        this.data[index].meetingEndTime = this.editMeetingEndTime;
        this.data[index].meetingRemarks = this.editMeetingRemarks;
        this.editIndex = -1;
        this.updateMeeting(this.editMeetingId, this.editMeetingName, this.editMeetingTopic, this.editMeetingRoomName, this.editMeetingDate, this.editMeetingStartTime, this.editMeetingEndTime, this.editMeetingRemarks);
      },
      exportData() {
        this.$refs.meetingTable.exportCsv({
          filename: '已预定会议表'
        });
        this.$Message.success("导出会议表成功");
      }
    },
    mounted() {
      this.queryAllRoom();
      this.queryAllMeetings();
    }
  }
</script>

<style scoped>

</style>
