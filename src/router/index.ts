import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Auth from '../components/Auth.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/home',
    name: 'Home',
    component: HelloWorld,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router