import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Quiz from '@/views/Quiz.vue';
import Result from '@/views/Result.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
    },
    {
      path: '/new',
      name: 'new_quiz',
      component: () => import('../views/NewQuiz/NewQuiz.vue'),
    },
  ]
})

export default router
