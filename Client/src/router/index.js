import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/LandingView.vue";
// import About from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/donation",
      name: "donation",
      component: () => import("../views/DonationView.vue"),
    },
    {
      path: "/complete-Profile",
      name: "completeProfile",
      component: () => import("../views/CompleteProfileView.vue"),
      props: true,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/updateUser",
      name: "updateUser",
      component: () => import("../views/UpdateUserView.vue"),
    },
    {
      path: "/admin/student-detail/:id",
      name: "studentView",
      component: () => import("../views/AdminStudentView.vue"),
    },
    {
      path: "/game/:name",
      name: "game",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/game",
      name: "detailGame",
      component: () => import("../views/DetailGame.vue"),
    },
    {
      path: "/deleted/:id",
      name: "deleted",
      component: () => import("../views/DeletedView.vue"),
      params: true,
    },
    {
      path: "/recover",
      name: "recover",
      component: () => import("../views/RecoverAccountView.vue"),
    },
    {
      path: "/sendCode",
      name: "sendCode",
      component: () => import("../views/PasswordCodeView.vue"),
    },
    {
      path: "/setNewPassword",
      name: "setNewPassword",
      component: () => import("../views/PasswordSetView.vue"),
    },
    {
      path: "/game/:name",
      name: "game",
      component: ()=> import("../views/GameView.vue")
    }, 
    {
      path: "/banned",
      name: "banned",
      component: () => import("../views/BannedView.vue"),
    },
    {
      path: "/videocall",
      name: "videocall",
      component: () => import("../views/VideocallView.vue")
    },
    {
      path: '/:pathMatch(.*)',
      name: "404",
      component: () => import("../views/404View.vue")
    },
    {
      path: "/videocall",
      name: "videocall",
      component: () => import("../views/VideocallView.vue")
    },
    {
      path: '/:pathMatch(.*)',
      name: "404",
      component: () => import("../views/404View.vue")
    }

  ],
});

export default router;
