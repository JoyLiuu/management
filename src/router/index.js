import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// const home = () => import("../views/home.vue")
const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/main.vue"),
    redirect:'/home',
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("../views/home.vue"),
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: () => import("../views/user.vue"),
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   component: () => import("../views/mall.vue"),
      // },
      // {
      //   path: "/page1",
      //   name: "page1",
      //   component: () => import("../views/other/page1.vue"),
      // },
      // {
      //   path: "/page2",
      //   name: "page2",
      //   component: () => import("../views/other/page2.vue"),
      // },
      
    ],
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/login.vue')
  }
];
const router = new VueRouter({
  routes,
  mode: "history",
});
export default router;
