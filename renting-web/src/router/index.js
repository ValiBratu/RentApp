
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "landingpage" */ '../views/LandingPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
  },
  {
    path: '/user/:id',
    name: 'user-profile',
    component: () => import(/* webpackChunkName: "userProfile" */ '../views/UserProfile.vue')
  },
  {
    path: '/post/:id',
    name: 'rent-post',
    component: () => import(/* webpackChunkName: "rentPostPage" */ '../views/rentPost/RentPostPage.vue')
  },
  {
    path:"/:catchAll(.*)",
    name:'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
