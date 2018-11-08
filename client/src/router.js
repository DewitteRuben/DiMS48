import Vue from 'vue';
import Router from 'vue-router';
import BaseTestView from './tests/views/BaseTestView.vue';
import Dims48View from "./tests/dims48/views/Dims48View.vue";
import Home from './views/Home.vue';
import Results from './views/Results.vue';
import TestResults from './views/TestResults.vue';

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
        }
      ]
    },
    {
      path: '/testresults/',
      name: 'results',
      component: Results,
      children: [
        {
          name: "dims48",
          path: "dims48",
          component: TestResults
        }
      ]
    },
  ],
});
