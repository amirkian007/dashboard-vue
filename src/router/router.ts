//utils
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
//componnets
import Login from '@//pages/Login.vue';
import Register from '@//pages/Register.vue';
import NotFound from '@/pages/NotFound.vue';
import DashboardTemplate from '@/components/templates/DashboardTemplate.vue';
import DashBoard from '@//pages/DashBoard.vue';
import NewArticle from '@/pages/NewArticle.vue';
import EditArticle from '@/pages/EditArticle.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    component: DashboardTemplate,
    meta: { requiresAuth: true },
    children:[
      {
        path: '/',
        name: 'Dashboard',
        component: DashBoard,
      },
      {
        path: '/newArticle',
        name: 'NewArticle',
        component: NewArticle,
      },
      {
        path: '/editArticle/:slug',
        name: 'EditArticle',
        component: EditArticle,
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {

  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next({ name: 'Dashboard' });
  } 
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }

}); 

export default router;
