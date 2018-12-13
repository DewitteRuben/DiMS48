import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import BaseTestView from "./views/BaseTestView.vue";
import Dims48View from "./views/Dims48View.vue";
import Home from "./views/Home.vue";
import ResultsView from "./views/ResultsView.vue";
import ResultsListView from "./views/ResultsListView.vue";
import TestDetailView from "./views/TestDetailView.vue";
import LoginView from "./views/LoginView.vue";
import AdminPanelView from "./views/AdminPanelView.vue";
import AdminPanelTestView from "./views/AdminPanelTestView.vue";
import Dims48ResultDetailView from "./views/Dims48ResultDetailView.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/test/",
      name: "test",
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
        }
      ]
    },
    {
      path: "/results",
      name: "results",
      component: ResultsView
    },
    {
      path: "/results/dims48",
      name: "resultsList",
      component: ResultsListView
    },
    {
      path: "/detail/:name",
      name: "detail",
      component: TestDetailView
    },
    {
      path: "/results/dims48/:id",
      name: "resultsdetail",
      component: Dims48ResultDetailView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPanelView,
      beforeEnter: (to, from, next) => {mustBeLoggedIn(to,from,next);}
    },
    {
      path: "/admin/:name",
      name: "adminTest",
      component: AdminPanelTestView,
      beforeEnter: (to, from, next) => {mustBeLoggedIn(to,from,next);}
    }
  ]
});

function mustBeLoggedIn(to, from, next){
  console.log(to);
  if(!store.getters["user/isLoggedIn"]){
    //router.push({name: 'login', query: {redirect: to.path} })
    next({name: 'login', query: {from: to.path}})
  }else{
    next();
  }
}

export default router;
