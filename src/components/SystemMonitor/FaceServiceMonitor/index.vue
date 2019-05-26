<template>
  <div>
    <iframe id="face-iframe" src="http://58.87.120.47:8002/druid" frameborder="0" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: "FaceServiceMonitor",
    data: function () {
      return {
      }
    },
    mounted() {
      function autoSize() {
        const faceIframe = document.getElementById('face-iframe');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        faceIframe.style.width = (Number(deviceWidth) - 270) + 'px';
        faceIframe.style.height = (Number(deviceHeight) + 2000) + 'px';
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
