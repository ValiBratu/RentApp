
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';


let isAuthenticated = async() => {
  return await store.getters.userData.token? true:false
}

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
    beforeEnter:(to,from,next)=>{
      if(isAuthenticated()){
        next({
          name: 'Home',
        })
      }
      else{
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter:(to,from,next)=>{
      if(isAuthenticated()){
        next({
          name: 'Home',
        })
      }
      else{
        next()
      }
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
