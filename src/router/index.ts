import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import NewQuiz from "@/views/NewQuiz.vue";
import AnswerQuiz from "@/views/AnswerQuiz.vue";

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
            path: "/signup",
            name: "signup",
            component: SignUp,
        },
        {
            path: "/new-quiz",
            name: "new-quiz",
            component: NewQuiz,
        },
        {
            path: "/quiz/:id",
            name: "answer-quiz",
            component: AnswerQuiz,
        },
    ],
});

export default router;
