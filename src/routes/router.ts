import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import MainView from '@/views/MainView.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
