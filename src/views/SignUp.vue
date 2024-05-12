<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import EyeClean from "@/components/icons/EyeClean.vue";
import EyeSlash from "@/components/icons/EyeSlash.vue";

const showPassword = ref(false);
const showConfirmPassword = ref(false);
function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
function toggleShowConfirmPassword() {
    showConfirmPassword.value = !showConfirmPassword.value;
}
</script>
<template>
    <main class="w-full flex flex-col items-center py-4">
        <!-- TODO: convert into form -->
        <div class="w-full max-w-[330px] flex flex-col gap-y-4 py-4">
            <h1 class="font-bold text-2xl text-center">Sign In to your account.</h1>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-2">
                    <Label for="email" class="font-semibold">Email</Label>
                    <Input id="email" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="first-name" class="font-semibold">First name</Label>
                    <Input id="first-name" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="last-name" class="font-semibold">Last name</Label>
                    <Input id="last-name" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="password" class="font-semibold">Password</Label>
                    <div class="relative">
                        <Input id="password" :type="showPassword === false ? 'password' : 'text'" />
                        <span
                            @click="toggleShowPassword"
                            class="absolute top-1/2 -translate-y-1/2 right-2"
                        >
                            <EyeClean v-if="!showPassword" />
                            <EyeSlash v-else />
                        </span>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="confirm-password" class="font-semibold">Confirm Password</Label>
                    <div class="relative">
                        <Input
                            id="confirm-password"
                            :type="showConfirmPassword === false ? 'password' : 'text'"
                        />
                        <span
                            @click="toggleShowConfirmPassword"
                            class="absolute top-1/2 -translate-y-1/2 right-2"
                        >
                            <EyeClean v-if="!showConfirmPassword" />
                            <EyeSlash v-else />
                        </span>
                    </div>
                </div>
                <div>
                    <div class="flex flex-row gap-x-2 text-sm">
                        <p>Already have an account?</p>
                        <RouterLink to="/signin" class="text-dark">Sign In</RouterLink>
                    </div>
                </div>
            </div>
            <div>
                <Button class="w-full">Create Account</Button>
            </div>
        </div>
    </main>
</template>
