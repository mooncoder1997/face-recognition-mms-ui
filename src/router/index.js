import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Login = () => import('@/components/Login/NormalLogin');
const FaceLogin = () => import('@/components/Login/FaceLogin');
const Index = () => import('@/components/Index');
const Home = () => import('@/components/Home');
const BookMeeting = () => import('@/components/MeetingManage/BookMeeting');
const MeetingManage = () => import('@/components/MeetingManage/MeetingManage');
const UserManage = () => import('@/components/SystemManage/UserManage');
const RoleManage = () => import('@/components/SystemManage/RoleManage');
const RoomManage = () => import('@/components/MeetingManage/RoomManage');
const AddFace = () => import('@/components/FaceManage/AddFace');
const FaceManage = () => import('@/components/FaceManage/FaceManage');
const ChangePassword = () => import('@/components/UserInfo/ChangePassword');
const T1 = () => import('@/components/T1');
const Msg = () => import('@/components/Msg');
const UserInfo = () => import('@/components/UserInfo');

// 首页下的子组件
const children = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/meeting/book',
    name: 'BookMeeting',
    component: BookMeeting
  },
  {
    path: '/meeting',
    name: 'MeetingManage',
    component: MeetingManage
  },
  {
    path: '/user',
    name: 'UserManage',
    component: UserManage
  },
  {
    path: '/role',
    name: 'RoleManage',
    component: RoleManage
  },
  {
    path: '/addFace',
    name: 'AddFace',
    component: AddFace
  },
  {
    path: '/face',
    name: 'FaceManage',
    component: FaceManage
  },
  {
    path: '/room',
    name: 'RoomManage',
    component: RoomManage
  },
  {
    path: 't1',
    name: 'T1',
    component: T1
  },
  {
    path: 'password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: 'msg',
    name: 'Msg',
    component: Msg
  },
  {
    path: 'userinfo',
    name: 'UserInfo',
    component: UserInfo
  }
];

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/faceLogin',
      name: 'FaceLogin',
      component: FaceLogin
    },

    {
      path: '/index',
      component: Index,
      children,
    }
  ]
})
