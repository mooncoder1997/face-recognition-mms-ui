<template>
  <div>
    <video ref="video" id="video" width="320" height="330" autoplay></video>
    <canvas id="canvas" width="320" height="320"></canvas>
  </div>
</template>

<script>
  require('jquery.facedetection');
  export default {
    name: 'AddFace',
    mounted() {
      var context = canvas.getContext('2d');
      var video = this.$refs.video;  //这个对应的是ref属性
      var videoObj = { "video": true };

      navigator.mediaDevices.getUserMedia(videoObj)
        .then(function(mediaStream) {
          video.srcObject = mediaStream;
          video.play();
        })
        .catch(function(error) {
          console.log(error);
        });

      var is_stop=0;
      video.ontimeupdate=function () {
        if(is_stop) return;
        context.drawImage(video, 0, 0, video.width, video.height);
        var base64 = canvas.toDataURL('images/png');
        $('#canvas').faceDetection({
          complete: function (faces) {
            console.log(faces);
            if(faces.length>=1){
              is_stop = 1;
              draw_face_box(faces)
              //upload(base64)
            }

          }
        });
      };

      //画出人脸区域
      function draw_face_box(faces) {
        var rect;
        var i;
        //context.clearRect(0, 0, canvas.width, canvas.height);
        for(i=0;i<faces.length;i++) {
          rect = faces[i];
          context.strokeStyle = '#a64ceb';
          if(rect.width<60) return
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        }
      }
      // $('#canvas').faceDetection({
      //   complete: function (faces) {
      //     console.log(faces);
      //     alert("检测到人脸");
      //   }
      // });
    }
  }
</script>

<style scoped>
</style>
