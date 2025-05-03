import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/Auth.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
      },
      {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        meta: { hideFooter: true },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../pages/NotFound.vue'),
        meta: { hideFooter: true },
      },
    ],
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt')
  if (to.matched.some(record => record.path.startsWith('/app')) && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router