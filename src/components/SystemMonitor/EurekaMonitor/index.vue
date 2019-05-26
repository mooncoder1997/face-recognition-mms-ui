<template>
  <div>
    <iframe id="eureka-iframe" src="http://58.87.120.47:8761" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: "EurekaMonitor",
    data: function () {
      return {
      }
    },
    mounted() {
      function autoSize() {
        const eurekaIframe = document.getElementById('eureka-iframe');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        eurekaIframe.style.width = (Number(deviceWidth) - 270) + 'px';
        eurekaIframe.style.height = (Number(deviceHeight) + 2000) + 'px';
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
