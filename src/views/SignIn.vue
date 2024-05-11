<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
</script>
<template>
    <main class="w-full flex flex-col items-center py-4">
        <!-- TODO: convert into form -->
        <div class="w-full max-w-[330px] flex flex-col gap-y-4">
            <h1 class="font-bold text-2xl text-center">Sign In to your account.</h1>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-2">
                    <Label for="email" class="font-semibold">Email</Label>
                    <Input id="email" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="password" class="font-semibold">Password</Label>
                    <Input id="password" />
                </div>
                <div>
                    <div class="flex flex-row gap-x-2">
                        <p>Forgot password?</p>
                        <RouterLink to="/reset" class="text-dark">click here.</RouterLink>
                    </div>
                    <div class="flex flex-row gap-x-2">
                        <RouterLink to="/signup" class="text-dark">Create a new account</RouterLink>
                        <p>instead.</p>
                    </div>
                </div>
            </div>
            <div>
                <Button class="w-full">Sign In</Button>
            </div>
        </div>
    </main>
</template>
