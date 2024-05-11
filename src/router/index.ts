import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import NewQuiz from "@/views/NewQuiz.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/signin",
            name: "signin",
            component: SignIn,
        },
        {
            path: "/new-quiz",
            name: "new-quiz",
            component: NewQuiz,
        },
    ],
});

export default router;
