<script setup lang="ts">
import SearchFilters from "@/components/SearchFilters.vue";
import CardQuiz from "@/components/CardQuiz.vue";
import { quizCards } from "@/lib/sample";
</script>

<template>
    <main>
        <h1 class="text-center text-4xl font-bold pt-1 pb-8 text-dark">Quiz Raptor</h1>
        <SearchFilters />
        <section class="w-full flex flex-row flex-wrap gap-4 justify-center py-8">
            <CardQuiz v-for="item in quizCards" :key="item.id" v-bind="item" />
        </section>
    </main>
</template>
