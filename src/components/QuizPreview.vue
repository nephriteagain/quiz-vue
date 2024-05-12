<script setup lang="ts">
import { defineProps } from "vue";
import type { IQuiz } from "@/types";
import { chars } from "@/lib/sample";

const props = defineProps<IQuiz>();
</script>

<template>
    <div class="basis-1/2 bg-sub rounded-xl shadow-lg py-2 px-4">
        <h2 class="text-2xl font-bold text-center">Preview</h2>
        <div class="flex flex-col gap-y-4">
            <div>
                <h2 class="font-bold text-xl">{{ props.title }}</h2>
                <h2 class="font-bold text-lg">{{ props.description }}</h2>
            </div>
            <ul>
                <li v-for="(q, index) in props.questions" :key="q.id">
                    <div class="flex flex-row gap-x-3 text-lg font-semibold">
                        <p>{{ index + 1 }}.</p>
                        <p>{{ q.question }}</p>
                    </div>
                    <div
                        v-for="(c, index) in q.choices"
                        :key="c.id"
                        class="flex flex-row gap-x-3 ps-6"
                    >
                        <p>{{ chars[index] }}.</p>
                        <p>{{ c.value }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
