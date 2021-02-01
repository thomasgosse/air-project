import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Plans from "../views/Plans.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Plans",
    component: Plans
  },
  {
    path: "/drones",
    name: "Drones",
    component: () => import("../views/Drones.vue")
  },
  {
    path: "/orders-and-stocks",
    name: "Orders And Stocks",
    component: () => import("../views/OrdersAndStocks.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
