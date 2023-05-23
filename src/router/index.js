import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicTacToe from '../views/TicTacToe.vue'
import QuanLySinhVien from '../views/QuanLySinhVien.vue'
import NotFound404 from '../views/NotFound404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-route',
      component: HomeView
    },
    {
      path: '/tictactoe',
      name: 'tictactoe-route',
      component: TicTacToe
    },
    {
      path: '/quanlysinhvien',
      name: 'quanlysinhvien-route',
      component: QuanLySinhVien
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound404
    }
  ]
})

export default router
