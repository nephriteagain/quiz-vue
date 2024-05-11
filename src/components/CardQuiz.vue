<script setup lang="ts">
import { Button } from "./ui/button";
import { defineProps } from "vue";

interface IQuizCard {
    title: string;
    author: string;
    description?: string;
}
const props = defineProps<IQuizCard>();
</script>
<template>
    <div
        class="flex flex-col justify-between min-w-[300px] max-w-[420px] aspect-[16/10] bg-sub rounded-xl px-4 py-2 gap-y-2 shadow-md"
    >
        <div>
            <p class="font-bold text-xl text-nowrap overflow-x-scroll">{{ props.title }}</p>
            <p class="font-semibold text-lg text-nowrap overfow-x-scroll">{{ props.author }}</p>
            <p
                v-if="Boolean(props.description)"
                class="text-sm text-black/60 min-h-[60px] max-h-[84px] text-ellipsis overflow-y-scroll"
            >
                {{ props.description }}
            </p>
        </div>
        <div>
            <!-- TODO: replace with router link -->
            <Button class="w-full"> Answer Quiz! </Button>
        </div>
    </div>
</template>
