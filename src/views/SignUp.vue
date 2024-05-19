<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import EyeClean from "@/components/icons/EyeClean.vue";
import EyeSlash from "@/components/icons/EyeSlash.vue";
import { userUserStore } from "@/stores/user";

const router = useRouter();
const userStore = userUserStore();
const formData = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
function toggleShowConfirmPassword() {
    showConfirmPassword.value = !showConfirmPassword.value;
}
async function onSubmit() {
    console.log(formData.value);
    const result = await userStore.signup(formData.value);
    if (result === 201) {
        router.replace("/signin");
    }
}
</script>
<template>
    <main class="w-full flex flex-col items-center py-4">
        <!-- TODO: convert into form -->
        <form class="w-full max-w-[330px] flex flex-col gap-y-4 py-4" @submit.prevent="onSubmit">
            <h1 class="font-bold text-2xl text-center">Sign In to your account.</h1>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-2">
                    <Label for="email" class="font-semibold">Email</Label>
                    <Input id="email" v-model="formData.email" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="first-name" class="font-semibold">First name</Label>
                    <Input id="first-name" v-model="formData.firstName" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="last-name" class="font-semibold">Last name</Label>
                    <Input id="last-name" v-model="formData.lastName" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="password" class="font-semibold">Password</Label>
                    <div class="relative">
                        <Input
                            id="password"
                            :type="showPassword === false ? 'password' : 'text'"
                            v-model="formData.password"
                        />
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
                            v-model="formData.confirmPass"
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
                <Button type="submit" class="w-full">Create Account</Button>
            </div>
        </form>
    </main>
</template>
