import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Table from '../views/Table.vue'
import Modal from '../views/Modal.vue'
import Usuarios from '../views/Usuarios.vue'
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue'

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
      path: '/Form',
      name: 'Form',
      component: Form,
      meta: { requiresAuth: true }
    },
    {
      path: '/Table',
      name: 'Table',
      component: Table,
      meta: { requiresAuth: true }
    },
    {
      path: '/Modal',
      name: 'Modal',
      component: Modal,
      meta: { requiresAuth: true }
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios,
      meta: { requiresAuth: true }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true }
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
    next('/login');
  } else if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    next('/');
  } else if (to.path === '/login' && authStore.user) {
    next('/');
  } else {
    next();
  }
});


export default router