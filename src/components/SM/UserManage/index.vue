<template>
  <div>
    <div class="query-c">
      查询：
      <Input search placeholder="请输入查询内容" style="width: auto"/>
      <Button type="primary" icon="ios-add-circle-outline">添加用户</Button>
    </div>
    <br>
    <Table border stripe :columns="columns" :data="data" :loading="loading"></Table>
    <br>
    <Page :total="100" show-sizer show-elevator/>
  </div>
</template>

<script>
  import { GetAllUsers } from "../../../api/user";

  export default {
    name: 'UserManage',
    data: function () {
      return {
        loading: true,
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
            minWidth: 100,
            align: 'center'
          },
          {
            title: '性别',
            key: 'userGender',
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
            minWidth: 180,
            align: 'center'
          },
          {
            title: '手机号',
            key: 'userMobile',
            minWidth: 130,
            align: 'center'
          },
          {
            title: '角色',
            key: 'userRoleName',
            minWidth: 80,
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
            title: '人脸编号',
            key: 'userFaceId',
            minWidth: 120,
            align: 'center',
            tooltip: true
          },
          {
            title: '备注',
            key: 'userRemarks',
            minWidth: 80,
            align: 'center'
          },
          {
            title: '操作',
            minWidth: 165,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    icon: 'md-create',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: confirm,
                    title: '您确定删除这条内容吗?',
                    okText: '确定',
                    cancelText: '取消',
                  },
                  on: {
                    'on-ok': (val) => {
                      this.data.splice(params.index, 1);
                    },
                    'on-cancel': (val) => {
                      this.$Message.info('You click cancel');
                    }
                  }
                },
                  [
                    h('Button', {
                      props: {
                        type: 'error',
                        icon: 'md-trash',
                        size: 'small'
                      }
                    }, '删除')
                  ]
                )
              ]);
            }
          }
        ],
        data: []
      }
    },
    methods: {
      getAllUsers() {
        return new Promise((resolve, reject) => {
          GetAllUsers().then(response => {
            response = response.data;
            if (response.code === 200) {
              this.$Message.success("获取所有用户成功!");
              console.log(response.data);
              this.data = response.data;
              this.loading = false;
            } else {
              this.$Message.success(response.message);
            }
          })
        }).catch(error => {
          reject(error)
        })
      },
      remove(index) {
        this.data.splice(index, 1);
      },
      ok() {
        this.$Message.info('You click ok');
      },
      cancel () {
        this.$Message.info('You click cancel');
      }
    },
    mounted() {
      this.getAllUsers();
    }
  }
</script>

<style scoped>

</style>
