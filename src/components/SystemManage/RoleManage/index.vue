<template>
  <div>
    <Table border stripe :columns="columns" :data="data" :loading="loading"></Table>
  </div>
</template>

<script>
  import { QueryAllRole } from "../../../api/role";

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
      queryAllRole() {
        return new Promise((resolve, reject) => {
          QueryAllRole().then(response => {
            if (response.status === 200) {
              this.$Message.success("获取所有角色成功!");
              console.log(response.data);
              response.data.forEach((item) => {
                console.log(item);
                // this.role.roleName = item;
                let role = {
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
      this.queryAllRole();
    }
  }
</script>

<style scoped>

</style>
