<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import EyeClean from "@/components/icons/EyeClean.vue";
import EyeSlash from "@/components/icons/EyeSlash.vue";
import { userUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = userUserStore();
const formData = ref({
    email: "",
    password: "",
});
function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
async function onSubmit() {
    const { email, password } = formData.value;
    const result = await userStore.login({ email, password });
    if (result) {
        router.replace({ name: "home" });
    }
}
const showPassword = ref(false);
</script>
<template>
    <main class="w-full flex flex-col items-center py-4">
        <!-- TODO: convert into form -->
        <form @submit.prevent="onSubmit" class="w-full max-w-[330px] flex flex-col gap-y-4 py-4">
            <h1 class="font-bold text-2xl text-center">Sign In to your account.</h1>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-2">
                    <Label for="email" class="font-semibold">Email</Label>
                    <Input id="email" v-model="formData.email" />
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
                <div>
                    <div class="flex flex-row gap-x-2 text-sm">
                        <p>Forgot password?</p>
                        <RouterLink to="/reset" class="text-dark">click here.</RouterLink>
                    </div>
                    <div class="flex flex-row gap-x-2 text-sm">
                        <RouterLink to="/signup" class="text-dark">Create a new account</RouterLink>
                        <p>instead.</p>
                    </div>
                </div>
            </div>
            <div>
                <Button type="submit" class="w-full">Sign In</Button>
            </div>
        </form>
    </main>
</template>
