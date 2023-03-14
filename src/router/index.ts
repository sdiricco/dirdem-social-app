import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/WelcomePage.vue'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/views/RegistrationPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    redirect: '/home/broadcast',
    children: [
      {
        path: "broadcast",
        component: () => import('@/views/BroadcastPage.vue')
      },
      {
        path: "profile",
        component: () => import('@/views/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
