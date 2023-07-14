import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthPage.vue'),
    redirect: "/auth/welcome",
    children: [
      // {
      //   path: "welcome",
      //   component: () => import('@/views/WelcomePage.vue')
      // },
      {
        path: "login",
        component: () => import('@/views/LoginPage.vue')
      },
      // {
      //   path: "registration",
      //   component: () => import('@/views/RegistrationPage.vue')
      // }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('@/views/HomePage.vue'),
  //   redirect: "/home/candidate-broadcasts",
  //   children: [
  //     {
  //       path: "candidate-broadcasts",
  //       component: () => import('@/views/CandidateBroadcastPage.vue')
  //     },
  //     {
  //       path: "joined-broadcasts",
  //       component: () => import('@/views/JoinedBroadcastsPage.vue')
  //     },
  //     {
  //       path: "joined-broadcasts/:id",
  //       component: () => import('@/views/ChatBroadcastsPage.vue')
  //     },
  //     {
  //       path: "profile",
  //       component: () => import('@/views/ProfilePage.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
