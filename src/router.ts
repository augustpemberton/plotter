import { createWebHistory, createRouter } from 'vue-router'

import SketchPage from './pages/SketchPage.vue'
import SketchList from './pages/SketchList.vue'

const routes = [
  { path: '/', component: SketchList},
  { path: '/sketch/:name', component: SketchPage},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})