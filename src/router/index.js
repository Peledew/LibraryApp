import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SaveNewBookView from '../views/SaveNewBookView.vue'
import UpdateBookView from '../views/UpdateBookView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/savenewbook',
    name: 'savenewbook',
    component: SaveNewBookView
  },
  {
    path: '/updatebook',
    name: 'updatebook',
    component: UpdateBookView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
