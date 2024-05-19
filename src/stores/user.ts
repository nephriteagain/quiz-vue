import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";
import a from "@/lib/utils";

export const userUserStore = defineStore("counter", () => {
    const user = ref<User | null>(null);
    async function login({ email, password }: { email: string; password: string }) {
        const res = await a.post("/user/signin", { email, password });
        const { message, userData } = res.data as { message: string; userData: User };
        if (!userData) {
            console.warn(message);
            return;
        }
        user.value = userData;
        return Boolean(userData);
    }
    async function logout() {
        const res = await a.post("/user/signout");
        console.log(res.status);
        if (res.status === 200) {
            user.value = null;
            return true;
        }
        return false;
    }

    async function signup(data: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        confirmPass: string;
    }) {
        const res = await a.post("/user/signup", data);
        return res.status;
    }

    return { user, login, logout, signup };
});
