<template>
  <div>
    <div class="query-c">
      查询指定会议室：
      <Input search @on-search="queryRoomByRoomName" v-model="searchRoomName" placeholder="请输入会议室名称" style="width: auto"/>
      <Button type="primary" icon="ios-add-circle-outline" @click="isAddRoom = true">添加会议室</Button>
    </div>
    <br>

    <Table border stripe :columns="columns" :data="data" :loading="loading" ref="roomTable">
      <template slot-scope="{ row, index }" slot="roomName">
        <Input type="text" v-model="editRoomName" v-if="editIndex === index"/>
        <span v-else>{{ row.roomName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="roomLocation">
        <Input type="text" v-model="editRoomLocation" v-if="editIndex === index"/>
        <span v-else>{{ row.roomLocation }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="roomPeople">
        <Input type="text" v-model="editRoomPeople" v-if="editIndex === index"/>
        <span v-else>{{ row.roomPeople }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="roomRemarks">
        <Input type="text" v-model="editRoomRemarks" v-if="editIndex === index"/>
        <span v-else>{{ row.roomRemarks }}</span>
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
    <div style="overflow: hidden">
      <Button type="primary" @click="exportData">
        <Icon type="ios-download-outline"></Icon>
        导出数据
      </Button>
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>

    <Modal v-model="isAddRoom" title="添加新的会议室" @on-ok="addRoom" @on-cancel="cancel">
      <Form ref="addRoomForm" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="会议室名称: " prop="roomName">
          <Input v-model="formValidate.roomName" placeholder="请输入会议室名称...">
            <Icon type="ios-easel-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="会议室位置: " prop="roomLocation">
          <Input v-model="formValidate.roomLocation" placeholder="请输入会议室位置...">
            <Icon type="ios-navigate-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="最大容纳人数: " prop="roomPeople">
          <Slider v-model="maxPeople" show-input></Slider>
        </FormItem>
        <FormItem label="备注: " prop="roomRemarks">
          <Input v-model="formValidate.roomRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {QueryRoomByRoomName, QueryAllRoom, DeleteRoomByRoomName, UpdateRoom, AddRoom} from "../../../api/room";

  export default {
    name: 'RoomManage',
    data() {
      return {
        loading: true,
        isAddRoom: false,
        searchRoomName: '',
        maxPeople: 10,
        columns: [
          {
            title: '会议室名称',
            key: 'roomName',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '位置',
            slot: 'roomLocation',
            key: 'roomLocation',
            sortable: true,
            minWidth: 120,
            align: 'center',
            filters: [
              {
                label: 'L1',
                value: 1
              },
              {
                label: 'L2',
                value: 2
              },
              {
                label: 'L3',
                value: 3
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.roomLocation === 'L1';
              } else if (value === 2) {
                return row.roomLocation === 'L2';
              } else if (value === 3) {
                return row.roomLocation === 'L3';
              }
            }
          },
          {
            title: '最大容纳人数',
            slot: 'roomPeople',
            key: 'roomPeople',
            sortable: true,
            minWidth: 150,
            align: 'center',
            filters: [
              {
                label: '大于4人',
                value: 1
              },
              {
                label: '大于6人',
                value: 2
              },
              {
                label: '大于10人',
                value: 3
              },
              {
                label: '大于15人',
                value: 4
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.roomPeople >= 4;
              } else if (value === 2) {
                return row.roomPeople >= 6;
              } else if (value === 3) {
                return row.roomPeople >= 10;
              } else if (value === 4) {
                return row.roomPeople >= 15
              }
            }
          },
          {
            title: '备注',
            slot: 'roomRemarks',
            key: 'roomRemarks',
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
        editIndex: -1,
        editRoomName: '',
        editRoomLocation: '',
        editRoomPeople: '',
        editRoomRemarks: '',
        formValidate: {
          roomName: '',
          roomLocation: '',
          roomRemarks: ''
        },
        ruleValidate: {
          roomName: [
            {required: true, message: '会议室名称不能为空！', trigger: 'blur'}
          ],
          roomLocation: [
            {required: true, message: '会议室位置不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      queryRoomByRoomName(searchRoomName) {
        if (searchRoomName) {
          return new Promise((resolve, reject) => {
            QueryRoomByRoomName(searchRoomName).then(response => {
              if (response.status === 200) {
                let data = [];
                data.push(response.data);
                this.data = data;
                this.$Message.success("查询会议室成功！");
              } else {
                this.data = [];
                this.$Message.error("查询会议室失败！");
              }
            })
          })
        } else {
          this.queryAllRoom();
        }
      },
      queryAllRoom() {
        return new Promise((resolve, reject) => {
          QueryAllRoom().then(response => {
            if (response.status === 200) {
              this.$Message.success("查询所有会议室成功！");
              this.data = response.data;
              this.loading = false;
            } else {
              this.$Message.error("查询所有会议室失败！");
            }
          })
        }).catch(error => {
          reject(error)
        })
      },
      updateRoom(roomName, roomLocation, roomPeoplem, roomRemarks) {
        return new Promise(((resolve, reject) => {
          UpdateRoom(roomName, roomLocation, roomPeoplem, roomRemarks).then(response => {
            if (response.status === 201) {
              this.$Message.success("更新会议室成功！");
            } else {
              this.$Message.error("更新会议室失败");
            }
          })
        }))
      },
      deleteRoomByRoomName(roomName) {
        return new Promise((resolve, reject) => {
          DeleteRoomByRoomName(roomName).then(response => {
            if (response.status === 204) {
              this.$Message.success("删除会议室成功！");
            } else {
              this.$Message.error("删除会议室失败！");
            }
          })
        })
      },
      addRoom() {
        return new Promise(((resolve, reject) => {
          AddRoom(this.$refs.addRoomForm.model.roomName, this.$refs.addRoomForm.model.roomLocation, this.maxPeople, this.$refs.addRoomForm.model.roomRemarks).then(response => {
            if (response.status === 201) {
              this.$Message.success("添加会议室成功！");
              this.data.push({
                roomName: this.$refs.addRoomForm.model.roomName,
                roomLocation: this.$refs.addRoomForm.model.roomLocation,
                roomPeople: this.maxPeople,
                roomRemarks: this.$refs.addRoomForm.model.roomRemarks})
            } else {
              this.$Message.error("添加会议室失败！");
            }
          })
        }))
      },

      handleDelete(row, index) {
        this.deleteRoomByRoomName(row.roomName);
        this.data.splice(index, 1);
      },
      handleCancel() {
        this.$Message.info('取消删除');
      },
      handleEdit(row, index) {
        this.editRoomName = row.roomName;
        this.editRoomLocation = row.roomLocation;
        this.editRoomPeople = row.roomPeople;
        this.editRoomRemarks = row.roomRemarks;
        this.editIndex = index;
      },
      handleSave(index) {
        this.data[index].roomName = this.editRoomName;
        this.data[index].roomLocation = this.editRoomLocation;
        this.data[index].roomPeople = this.editRoomPeople;
        this.data[index].roomRemarks = this.editRoomRemarks;
        this.editIndex = -1;
        this.updateRoom(this.editRoomName, this.editRoomLocation, this.editRoomPeople, this.editRoomRemarks);
      },
      exportData() {
        this.$refs.roomTable.exportCsv({
          filename: '会议室表'
        });
        this.$Message.success("导出会议室表成功");
      }
    },
    mounted() {
      this.queryAllRoom();
    }
  }
</script>

<style scoped>

</style>
