<template>
  <div>
    <div class="query-c">
      查询：
      <Input search placeholder="请输入查询内容" style="width: auto"/>
    </div>
    <br>
    <Table border stripe :columns="columns" :data="data" :loading="loading"></Table>
    <br>
    <Page :total="100" show-sizer show-elevator/>
  </div>
</template>

<script>
  import { GetAllRoles } from "../../../api/role";

  export default {
    name: "RoleManage",
    data() {
      return {
        loading: true,
        columns: [
          {
            title: '角色名称',
            key: 'roleName',
            align: 'center'
          }
        ],
        data: [
        ]
      }
    },
    methods: {
      getAllRoles() {
        return new Promise((resolve, reject) => {
          GetAllRoles().then(response => {
            response = response.data;
            if (response.code === 200) {
              this.$Message.success("获取所有角色成功!");
              console.log(response.data);
              response.data.forEach((item) => {
                console.log(item);
                // this.role.roleName = item;
                var role = {
                  roleName: item
                };
                this.data.push(role);
                this.loading = false;
              });
            } else {
              this.$Message.success(response.message);
            }
          })
        }).catch(error => {
          reject(error)
        })
      }
    },
    mounted() {
      this.getAllRoles();
    }
  }
</script>

<style scoped>

</style>
