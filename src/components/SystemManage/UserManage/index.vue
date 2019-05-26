<template>
  <div>
    <div class="query-c">
      查询指定用户：
      <Input search @on-search="queryUserByUserId" v-model="searchUserId" placeholder="请输入用户编号" style="width: auto"/>
      <Button type="primary" icon="ios-add-circle-outline" @click="isAddUser = true">添加用户</Button>
    </div>
    <br>

    <Table border stripe :columns="columns" :data="data" :loading="loading" ref="userTable">
      <template slot-scope="{ row, index }" slot="userId">
        <Input type="text" v-model="editUserId" v-if="editIndex === index"/>
        <span v-else>{{ row.userId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userName">
        <Input type="text" v-model="editUserName" v-if="editIndex === index"/>
        <span v-else>{{ row.userName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userGender">
        <Select v-model="editUserGender" v-if="editIndex === index">
          <Option value="男">男</Option>
          <Option value="女">女</Option>
        </Select>
        <span v-else>{{ row.userGender }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userEmail">
        <Input type="text" v-model="editUserEmail" v-if="editIndex === index"/>
        <span v-else>{{ row.userEmail }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userMobile">
        <Input type="text" v-model="editUserMobile" v-if="editIndex === index"/>
        <span v-else>{{ row.userMobile }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userRoleName">
        <Select v-model="editUserRoleName" v-if="editIndex === index">
          <Option value="user">user</Option>
          <Option value="admin">admin</Option>
        </Select>
        <!--<Input type="text" v-model="editUserRoleName" v-if="editIndex === index"/>-->
        <span v-else>{{ row.userRoleName }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userFaceId">
        <Input type="text" v-model="editUserFaceId" v-if="editIndex === index"/>
        <span v-else>{{ row.userFaceId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="userRemarks">
        <Input type="text" v-model="editUserRemarks" v-if="editIndex === index"/>
        <span v-else>{{ row.userRemarks }}</span>
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

    <Modal v-model="isAddUser" title="添加新的用户" @on-ok="addUser" @on-cancel="cancel">
      <Form ref="addUserForm" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="编号: " prop="userId">
          <Input v-model="formValidate.userId" placeholder="请输入用户编号...">
            <Icon type="ios-create-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="密码: " prop="userPassword">
          <Input v-model="formValidate.userPassword" type="password" placeholder="请输入用户密码...">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="姓名: " prop="userName">
          <Input v-model="formValidate.userName" placeholder="请输入用户姓名...">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="请选择性别: " prop="userGender">
          <RadioGroup v-model="formValidate.userGender">
            <Radio label="男">
              <Icon type="ios-man" size="16"></Icon>
              <span>男</span>
            </Radio>
            <Radio label="女">
              <Icon type="ios-woman" size="16"></Icon>
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="邮箱: " prop="userEmail">
          <Input v-model="formValidate.userEmail" placeholder="请输入用户邮箱地址...">
            <Icon type="ios-mail-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="手机号: " prop="userMobile">
          <Input v-model="formValidate.userMobile" placeholder="请输入用户手机号...">
            <Icon type="ios-call-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="请选择角色: " prop="userRoleName">
          <Select v-model="formValidate.userRoleName">
            <Option value="user">普通用户</Option>
            <Option value="admin">管理员</Option>
          </Select>
        </FormItem>
        <FormItem label="备注: " prop="userRemarks">
          <Input v-model="formValidate.userRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {QueryUserByUserId, QueryAllUser, UpdateUser, DeleteUserByUserId, AddUser} from "../../../api/user";

  export default {
    name: 'UserManage',
    data: function () {
      return {
        loading: true,
        isAddUser: false,
        searchUserId: '',
        columns: [
          {
            title: '编号',
            key: 'userId',
            minWidth: 120,
            sortable: true,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'userName',
            slot: 'userName',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '性别',
            key: 'userGender',
            slot: 'userGender',
            minWidth: 80,
            align: 'center',
            filters: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.userGender === '男';
              } else if (value === 2) {
                return row.userGender === '女';
              }
            }
          },
          {
            title: '邮箱',
            key: 'userEmail',
            slot: 'userEmail',
            minWidth: 180,
            align: 'center'
          },
          {
            title: '手机号',
            key: 'userMobile',
            slot: 'userMobile',
            minWidth: 130,
            align: 'center'
          },
          {
            title: '角色',
            key: 'userRoleName',
            slot: 'userRoleName',
            minWidth: 100,
            align: 'center',
            filters: [
              {
                label: '管理员',
                value: 1
              },
              {
                label: '普通用户',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.userRoleName === 'admin';
              } else if (value === 2) {
                return row.userRoleName === 'user';
              }
            }
          },
          {
            title: '备注',
            key: 'userRemarks',
            slot: 'userRemarks',
            minWidth: 80,
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
        editUserId: '',
        editUserName: '',
        editUserGender: '',
        editUserEmail: '',
        editUserMobile: '',
        editUserRoleName: '',
        editUserFaceId: '',
        editUserRemarks: '',
        formValidate: {
          userId: '',
          userPassword: '',
          userName: '',
          userGender: '男',
          userEmail: '',
          userMobile: '',
          userRoleName: 'user',
          userRemarks: ''
        },
        ruleValidate: {
          userId: [
            {required: true, message: '用户编号不能为空！', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '用户密码不能为空！', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '用户姓名不能为空！', trigger: 'blur'}
          ],
          userGender: [
            {required: true, message: '请选择性别！', trigger: 'blur'}
          ],
          userEmail: [
            {required: true, message: '用户邮箱不能为空！', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确！', trigger: 'blur'}
          ],
          userMobile: [
            {required: true, message: '用户手机号不能为空！', trigger: 'blur'}
          ],
          userRoleName: [
            {required: true, message: '请选择用户角色！', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      queryUserByUserId(searchUserId) {
        if (searchUserId) {
          return new Promise((resolve, reject) => {
            QueryUserByUserId(searchUserId).then(response => {
              if (response.status === 200) {
                let data = [];
                data.push(response.data);
                this.data = data;
                this.$Message.success("查询用户成功！");
              } else {
                this.data = [];
                this.$Message.error("查询用户失败！");
              }
            })
          })
        } else {
          this.queryAllUser();
        }
      },
      queryAllUser() {
        return new Promise((resolve, reject) => {
          QueryAllUser().then(response => {
            if (response.status === 200) {
              this.$Message.success("获取所有用户成功!");
              this.data = response.data;
              this.loading = false;
            } else {
              this.$Message.success("获取所有用户失败!");
            }
          })
        }).catch(error => {
          reject(error)
        })
      },
      updateUser(userId, userName, userGender, userEmail, userMobile, userRoleName, userRemarks) {
        return new Promise(((resolve, reject) => {
          UpdateUser(userId, userName, userGender, userEmail, userMobile, userRoleName, userRemarks).then(response => {
            if (response.status === 201) {
              this.$Message.success("更新用户成功!");
            } else {
              this.$Message.error("更新用户失败!");
            }
          })
        }))
      },
      deleteUserByUserId(userId) {
        return new Promise((resolve, reject) => {
          DeleteUserByUserId(userId).then(response => {
            if (response.status === 204) {
              this.$Message.success("删除用户成功!");
            } else {
              this.$Message.error("删除用户失败!");
            }
          })
        })
      },
      addUser() {
        return new Promise(((resolve, reject) => {
          AddUser(this.$refs.addUserForm.model.userId,
            this.$refs.addUserForm.model.userPassword,
            this.$refs.addUserForm.model.userName,
            this.$refs.addUserForm.model.userGender,
            this.$refs.addUserForm.model.userEmail,
            this.$refs.addUserForm.model.userMobile,
            this.$refs.addUserForm.model.userRoleName,
            this.$refs.addUserForm.model.userRemarks).then(response => {
            if (response.status === 201) {
              this.$Message.success("添加用户成功!");
              this.data.push({
                userId: this.$refs.addUserForm.model.userId,
                userName: this.$refs.addUserForm.model.userName,
                userGender: this.$refs.addUserForm.model.userGender,
                userEmail: this.$refs.addUserForm.model.userEmail,
                userMobile: this.$refs.addUserForm.model.userMobile,
                userRoleName: this.$refs.addUserForm.model.userRoleName,
                userRemarks: this.$refs.addUserForm.model.userRemarks
              })
            } else {
              this.$Message.error("添加用户失败！");
            }
          })
        }))
      },

      handleDelete(row, index) {
        this.deleteUserByUserId(row.userId);
        this.data.splice(index, 1);
      },
      handleCancel() {
        this.$Message.info('取消删除');
      },
      handleEdit(row, index) {
        this.editUserId = row.userId;
        this.editUserName = row.userName;
        this.editUserGender = row.userGender;
        this.editUserEmail = row.userEmail;
        this.editUserMobile = row.userMobile;
        this.editUserRoleName = row.userRoleName;
        this.editUserFaceId = row.userFaceId;
        this.editUserRemarks = row.userRemarks;
        this.editIndex = index;
      },
      handleSave(index) {
        this.data[index].userId = this.editUserId;
        this.data[index].username = this.editUserName;
        this.data[index].userGender = this.editUserGender;
        this.data[index].userEmail = this.editUserEmail;
        this.data[index].userMobile = this.editUserMobile;
        this.data[index].userRoleName = this.editUserRoleName;
        this.data[index].userFaceId = this.editUserFaceId;
        this.data[index].userRemarks = this.editUserRemarks;
        this.editIndex = -1;
        this.updateUser(this.editUserId, this.editUserName, this.editUserGender, this.editUserEmail, this.editUserMobile, this.editUserRoleName, this.editUserRemarks);
      },
      exportData() {
        this.$refs.userTable.exportCsv({
          filename: '用户表'
        });
        this.$Message.success("导出用户表成功");
      }
    },
    mounted() {
      this.queryAllUser();
    }
  }
</script>

<style scoped>

</style>
