import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// Raspberry
const Dashboard = () => import('@/components/Dashboard');
const FaceLogin = () => import('@/components/Login/FaceLogin');
const BookMeeting = () => import('@/components/Book');
const EditMeeting = () => import('@/components/Edit');
const DeleteMeeting = () => import('@/components/Delete');
const WatchMeeting = () => import('@/components/Watch');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/faceLogin',
      name: 'FaceLogin',
      component: FaceLogin
    },
    {
      path: '/book',
      name: 'BookMeeting',
      component: BookMeeting
    },
    {
      path: '/edit',
      name: 'EditMeeting',
      component: EditMeeting,
    },
    {
      path: '/delete',
      name: 'DeleteMeeting',
      component: DeleteMeeting,
    },
    {
      path: '/watch',
      name: 'WatchMeeting',
      component: WatchMeeting,
    }
  ]
})
