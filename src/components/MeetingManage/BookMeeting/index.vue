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
    <br>
    <Button type="primary" @click="next">下一步</Button>
  </div>
</template>

<script>
  export default {
    name: "BookMeeting",
    data() {
      return {
        current: 0
      }
    },
    methods: {
      next() {
        if (this.current === 3) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      }
    }
  }
</script>

<style scoped>

</style>
