<template>
  <div>
    <iframe id="user-iframe" src="http://10.211.55.4:8001/druid" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: "UserServiceMonitor",
    data: function () {
      return {
      }
    },
    mounted() {
      function autoSize() {
        const userIframe = document.getElementById('user-iframe');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        userIframe.style.width = (Number(deviceWidth) - 270) + 'px';
        userIframe.style.height = (Number(deviceHeight) + 2000) + 'px';
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
