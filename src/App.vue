<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import { userUserStore } from "./stores/user";
import { Button } from "./components/ui/button";

const userStore = userUserStore();
const router = useRouter();

async function handleLogout() {
    const result = await userStore.logout();
    if (result) {
        router.replace("/");
    }
}
</script>

<template>
    <div class="flex flex-col w-full h-screen">
        <nav class="fixed w-full bg-sub flex flex-row justify-between py-2 shadow-md px-2 sm:px-4">
            <div class="flex flex-row gap-x-3">
                <RouterLink
                    to="/"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Home
                </RouterLink>
                <RouterLink
                    v-if="userStore.user"
                    :to="`/profile/${userStore.user.id}`"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Profile
                </RouterLink>
                <RouterLink
                    v-if="userStore.user && $route.path !== '/'"
                    to="/new-quiz"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Create
                </RouterLink>
            </div>
            <div v-if="Boolean(!userStore.user)" class="flex flex-row gap-x-3">
                <RouterLink
                    to="/signin"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Sign In
                </RouterLink>
                <RouterLink
                    to="/signup"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Sign Up
                </RouterLink>
            </div>
            <div v-else class="flex flex-row gap-x-3">
                <Button
                    class="bg-light px-2 py-1 rounded-md shadow-sm font-semibold text-lg text-gray-600"
                    @click="handleLogout"
                >
                    Log out
                </Button>
            </div>
        </nav>
        <div class="w-full px-2 sm:px-4 md:px-8 lg:px-12 flex-grow bg-light pt-14">
            <RouterView />
        </div>
    </div>
</template>
