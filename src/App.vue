<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="flex flex-col w-full h-screen">
        <nav class="bg-sub flex flex-row justify-between py-2 shadow-md px-2 sm:px-4">
            <div class="flex flex-row gap-x-3">
                <RouterLink
                    to="/"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Home
                </RouterLink>
            </div>
            <div class="flex flex-row gap-x-3">
                <RouterLink
                    to="/signin"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Sign In
                </RouterLink>
                <RouterLink
                    to="/signup"
                    class="bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg"
                    >Sign Ip
                </RouterLink>
            </div>
        </nav>
        <div class="w-full px-0 sm:px-4 md:px-8 lg:px-12 flex-grow bg-light">
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
