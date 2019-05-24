<template>
  <div>
    <div id="face-container">
      <video ref="video" id="video" width="400" height="330" autoplay></video>
      <canvas id="canvas" width="400" height="320"></canvas>
    </div>
  </div>
</template>

<script>
  import {RegisterFace} from "../../../api/face";

  require('jquery.facedetection');
  export default {
    name: 'AddFace',
    mounted() {
      const message = this.$Message;
      let mediaStreamTrack;
      let userId = this.$store.state.user.userId;

      let context = canvas.getContext('2d');
      let video = this.$refs.video;
      let videoObj = {"video": true};

      navigator.mediaDevices.getUserMedia(videoObj).then(function (mediaStream) {
        video.srcObject = mediaStream;
        mediaStreamTrack = mediaStream;
        video.play();
      }).catch(function (error) {
        console.log(error);
      });

      let is_stop = 0;
      video.ontimeupdate = function () {
        if (is_stop) return;
        context.drawImage(video, 0, 0, video.width, video.height);
        let base64 = canvas.toDataURL('image/jpeg');
        $('#canvas').faceDetection({
          complete: function (faces) {
            if (faces.length >= 1) {
              is_stop = 1;
              draw_face_box(faces, base64);
            }
          }
        })
      };

      //画出人脸区域
      function draw_face_box(faces, base64) {
        let rect;
        let i;
        //context.clearRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < faces.length; i++) {
          rect = faces[i];
          context.strokeStyle = '#a64ceb';
          if (rect.width < 60) return;
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        }
        let faceImageBase64 = base64.substring(23);
        registerFace(faceImageBase64);
      }

      function registerFace(faceImageBase64) {
        mediaStreamTrack.getTracks()[0].stop();
        return new Promise(((resolve, reject) => {
          RegisterFace(userId, faceImageBase64).then(response => {
            register(response);
          }).catch(error => {
            if (error.response.status === 406) {
              message.error("已经注册过人脸");
            }
          })
        }));
      }

      function register(response) {
        if (response.status === 201) {
          message.success("人脸注册成功！");
        } else {
          message.error(response.data.error);
        }
      }
    }
  }
</script>

<style scoped>
  #face-container {
    margin-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 500px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*background-color: rgba(255, 255, 255, .5);*/
    border-radius: 10px;
  }

  #video {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -160px 0 0 -200px;
    object-fit: contain;
    border-radius: 10px;

  }

  #canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -160px 0 0 -200px;
    object-fit: fill;
    border-radius: 10px;
  }
</style>
