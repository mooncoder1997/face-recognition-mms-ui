<template>
  <div>
    <iframe id="meeting-iframe" src="http://58.87.120.47:8003/druid" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: "MeetingServiceMonitor",
    data: function () {
      return {
      }
    },
    mounted() {
      function autoSize() {
        const meetingIframe = document.getElementById('meeting-iframe');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        meetingIframe.style.width = (Number(deviceWidth) - 270) + 'px';
        meetingIframe.style.height = (Number(deviceHeight) + 2000) + 'px';
      }
      autoSize();
      window.onresize = function () {
        autoSize();
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
