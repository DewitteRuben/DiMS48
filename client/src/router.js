import Vue from 'vue';
import Router from 'vue-router';
import BaseTestView from './views/BaseTestView.vue';
import Dims48View from "./views/Dims48View.vue";
import Home from './views/Home.vue';
import ResultsView from './views/ResultsView.vue';
import TestResults from './views/TestResults.vue';
import TestDetailView from "./views/TestDetailView.vue";
import LoginView from "./views/LoginView.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/test/',
      name: 'test',
      component: BaseTestView,
      children: [
        {
          name: "dims48a",
          path: "dims48a",
          component: Dims48View
        },
        {
          name: "dims48b",
          path: "dims48b",
          component: Dims48View
        },
      ],
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
    },
    {
      path: '/detail/:name',
      name: 'detail',
      component: TestDetailView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
});
