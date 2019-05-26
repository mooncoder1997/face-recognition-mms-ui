<template>
  <div class="login-vue" :style="bg">
    <div id="face-container">
      <video ref="video" id="video" width="400" height="320" autoplay></video>
      <canvas id="canvas" width="400" height="320"></canvas>
    </div>
    <div id="modal">
      <Spin fix>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在登录...</div>
      </Spin>
    </div>
  </div>
</template>

<script>
  require('jquery.facedetection');
  import {LoginByFace} from "../../../api/login";

  export default {
    name: 'FaceLogin',
    data() {
      return {
        bg: {
          backgroundImage: 'url(' + require('../../../assets/bg04.jpg'),
          backgroundPosition: 'center center',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
        function: ''
      }
    },
    created() {
      this.getRouterData();
    },
    methods: {
      getRouterData() {
        this.function = this.$route.params.function;
      }
    },
    mounted: function () {
      const message = this.$Message;
      const store = this.$store;
      const router = this.$router;
      let mediaStreamTrack;

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
        //显示遮罩层
        document.getElementById('modal').style.display = 'block';
        loginByFace(faceImageBase64);
      }
      function loginByFace(faceImageBase64) {
        mediaStreamTrack.getTracks()[0].stop();
        return new Promise(((resolve, reject) => {
          LoginByFace(faceImageBase64).then(response => {
            login(response);
          }).catch(error => {
            this.$Message.error(error.response.data.error);
            this.isShowLoading = false;
            reject(error);
          });
        }));
      }
      function login(response) {
        if (response.status === 201) {
          message.success("登录成功，正在跳转...");
          // 登录成功，设置用户信息
          store.commit('setUser', {
            userId: response.data.userId,
            userName: response.data.userName,
            userGender: response.data.userGender,
            userEmail: response.data.userEmail,
            userRoleName: response.data.userRoleName
          });
          router.replace(this.function);
        } else {
          message.error(response.data.error);
        }
      }
    },
  }
</script>

<style scoped>
  .login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  #face-container {
    position: absolute;
    width: 500px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, .5);
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

  #modal {
    position: absolute;
    width: 400px;
    height: 320px;
    top: 50%;
    left: 50%;
    margin: -160px 0 0 -200px;
    display: none;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>


