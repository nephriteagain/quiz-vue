<script setup lang="ts">
import SearchFilters from "@/components/SearchFilters.vue";
import CardQuiz from "@/components/CardQuiz.vue";
import { quizCards } from "@/lib/sample";
</script>

<template>
    <main>
        <h1 class="text-center text-4xl font-bold pt-1 pb-8 text-dark">Quiz Raptor</h1>
        <div class="flex items-center justify-center">
            <RouterLink
                to="/new-quiz"
                class="bg-main font-bold text-2xl rounded-lg px-6 py-2 shadow-md hover:bg-main/80"
                >Create New Quiz</RouterLink
            >
        </div>
        <SearchFilters />
        <section class="w-full flex flex-row flex-wrap gap-4 justify-center py-8">
            <CardQuiz v-for="item in quizCards" :key="item.id" v-bind="item" />
        </section>
    </main>
</template>
