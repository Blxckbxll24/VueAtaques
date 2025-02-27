import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegisterView from '../views/RegisterView.vue'
import { isAuth } from '@/composables/IsAuth' // Importamos la función que verifica si está autenticado

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true }, // 🔐 Requiere autenticación
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = isAuth().value
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.name == 'login' && token) {
    next(from)
  } else if(to.name == 'register' && token){
    next(from)
  }else {
    next()
  }
})

export default router
