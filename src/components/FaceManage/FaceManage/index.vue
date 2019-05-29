<template>
  <div>
<!--    <div class="query-c">-->
<!--      查询人脸：-->
<!--      <Input search @on-search="queryFaceByUserId" v-model="searchMeetingByUserId" placeholder="请输入用户编号"-->
<!--             style="width: auto"/>-->
<!--    </div>-->
<!--    <br>-->

    <Table border stripe :columns="columns" :data="data" :loading="loading" ref="faceTable">
      <template slot-scope="{ row, index }" slot="faceId">
        <Input type="text" v-if="editIndex === index"/>
        <span v-else>{{ row.faceId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="faceUserId">
        <Input type="text" v-if="editIndex === index"/>
        <span v-else>{{ row.faceUserId }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="faceAge">
        <Input type="text" v-if="editIndex === index"/>
        <span v-else>{{ row.faceAge }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="faceGender">
        <Input type="text" v-if="editIndex === index"/>
        <span v-else>{{ row.faceGender }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="faceRemarks">
        <Input type="text" v-if="editIndex === index"/>
        <span v-else>{{ row.faceRemarks }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div>
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
  </div>
</template>

<script>
  import {DeleteFaceByFaceId, QueryAllFaces} from "../../../api/face";

  export default {
    name: "FaceManage",
    data() {
      return {
        loading: true,
        searchMeetingByUserId: '',
        columns: [
          {
            title: '编号',
            key: 'faceId',
            slot: 'faceId',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '人脸用户编号',
            key: 'faceUserId',
            slot: 'faceUserId',
            minWidth: 120,
            align: 'center',
          },
          {
            title: '人脸年龄',
            key: 'faceAge',
            slot: 'faceAge',
            sortable: true,
            minWidth: 120,
            align: 'center',
          },
          {
            title: '人脸性别',
            slot: 'faceGender',
            key: 'faceGender',
            minWidth: 150,
            align: 'center'
          },
          {
            title: '人脸备注',
            slot: 'faceRemarks',
            key: 'faceRemarks',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            minWidth: 100,
            align: 'center'
          }
        ],
        data: [],
      }
    },
    methods: {
      queryAllFaces() {
        QueryAllFaces().then(response => {
          if (response.status === 200) {
            this.$Message.success("查询所有人脸成功！");
            this.data = response.data;
            this.loading = false;
          } else {
            this.$Message.error("查询所有人脸失败！");
          }
        })
      },
      deleteFaceByFaceId(faceId) {
        DeleteFaceByFaceId(faceId).then(response => {
          if (response.status === 204) {
            this.$Message.success("删除人脸成功！");
          } else {
            this.$Message.error("删除人脸失败！");
          }
        })
      },

      handleDelete(row, index) {
        console.log(row.faceId);
        this.deleteFaceByFaceId(row.faceId);
        this.data.splice(index, 1);
      },
      handleCancel() {
        this.$Message.info('取消删除');
      },
    },
    mounted() {
      this.queryAllFaces();
    }
  }
</script>

<style scoped>

</style>
