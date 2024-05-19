import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types";

export const userUserStore = defineStore("counter", () => {
    const user = ref<User | null>(null);
    async function login({ email, password }: { email: string; password: string }) {
        const res = await fetch("http://localhost:3000/api/v1/user/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { message, userData } = (await res.json()) as { message: string; userData: User };
        if (!userData) {
            console.warn(message);
            return;
        }
        user.value = userData;
        return Boolean(userData);
    }
    async function logout() {
        const res = await fetch("http://localhost:3000/api/v1/user/signout", {
            method: "POST",
        });
        console.log(res.status);
        if (res.status === 200) {
            user.value = null;
            return true;
        }
        return false;
    }

    return { user, login, logout };
});
