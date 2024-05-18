<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

export interface IQuizCard {
    id: string;
    title: string;
    createdBy: string;
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
            <p class="font-semibold text-lg text-nowrap overfow-x-scroll">{{ props.createdBy }}</p>
            <p
                v-if="Boolean(props.description)"
                class="text-sm text-black/75 h-[60px] text-ellipsis overflow-y-scroll"
            >
                {{ props.description }}
            </p>
        </div>
        <!-- TODO: replace with router link -->
        <RouterLink
            :to="{ name: 'answer-quiz', params: { id: props.id } }"
            class="flex items-center justify-center w-full bg-main px-2 py-1 rounded-md shadow-sm font-semibold text-lg hover:bg-main/80"
        >
            Answer Quiz!
        </RouterLink>
    </div>
</template>
