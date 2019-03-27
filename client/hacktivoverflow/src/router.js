import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/AllQuestion.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/RegisForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/LoginForm.vue'),
    },
    {
      path: '/addQuestion',
      name: 'add',
      component: () => import('./components/AddQuestion.vue'),
    },
    {
      path: '/questions/:id',
      name: 'detail',
      component: () => import('./components/QuestionDetail.vue'),
    },
    {
      path: '/questions/:questionId/:id',
      name: 'updateAnswer',
      component: () => import('./components/UpdateAnswer.vue'),
    },
    {
      path: '/myQuestion',
      name: 'myQuestion',
      component: () => import('./components/MyQuestion.vue'),
    },
    {
      path: '/myQuestion/update/:id',
      name: 'updateQuestion',
      component: () => import('./components/UpdateQuestion.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
