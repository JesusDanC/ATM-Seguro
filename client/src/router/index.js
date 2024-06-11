import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Registro from '../views/Registro.vue'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Cuentas from '../views/Cuentas.vue'
import Tarjetas from '../views/Tarjetas.vue'
import Transacciones from '../views/Transacciones.vue';
import Servicios from '../views/Servicios.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/Cuentas',
      name: 'Cuentas',
      component: Cuentas,
      meta: { requiresAuth: true }
    },
    {
      path: '/Tarjetas',
      name: 'Tarjetas',
      component: Tarjetas,
      meta: { requiresAuth: true }
    },
    {
      path: '/Transacciones',
      name: 'Transacciones',
      component: Transacciones,
      meta: { requiresAuth: true }
    },
    {
      path: '/Servicios',
      name: 'Servicios',
      component: Servicios,
      meta: { requiresAuth: true }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/Registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/Home'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.user) {
    next('/Login');
  } else if (to.meta.requiresAdmin && authStore.user.role !== 'ADMIN') {
    next('/');
  } else if (to.path === '/Login' && authStore.user) {
    next('/Home');
  } else {
    next();
  }
});

export default router