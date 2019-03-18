import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Login = () => import('@/components/Login');
const Index = () => import('@/components/Index');

const Home = () => import('@/components/Home');
const UserManage = () => import('@/components/SM/UserManage');
const RoleManage = () => import('@/components/SM/RoleManage');
const RoomManage = () => import('@/components/SM/RoomManage');
const AddFace = () => import('@/components/FM/AddFace');
const T1 = () => import('@/components/T1');
const Password = () => import('@/components/Password');
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
    name: 'Password',
    component: Password
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
      path: '/index',
      component: Index,
      children,
    }
  ]
})
