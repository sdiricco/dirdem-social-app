import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const getJoinedBroadcastPage = () => import('@/views/JoinedBroadcastsPage.vue') 
const getCandidateBroadcastPage = () => import('@/views/CandidateBroadcastPage.vue') 

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
      {
        path: "welcome",
        component: () => import('@/views/WelcomePage.vue')
      },
      {
        path: "login",
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: "registration",
        component: () => import('@/views/RegistrationPage.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    redirect: "/home/candidate-broadcasts",
    children: [
      {
        name: 'candidate-broadcasts-page',
        path: "candidate-broadcasts",
        component: getCandidateBroadcastPage 
      },
      {
        name: 'joined-broadcasts-page',
        path: "joined-broadcasts",
        component: getJoinedBroadcastPage
      },
      {
        path: "joined-broadcasts/:id",
        component: () => import('@/views/ChatBroadcastsPage.vue')
      },
      {
        name: 'profile-page',
        path: "profile",
        component: () => import('@/views/ProfilePage.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.name === 'candidate-broadcasts-page') {
    
  }
  
})

export default router
