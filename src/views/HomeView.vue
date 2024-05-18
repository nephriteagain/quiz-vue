<script setup lang="ts">
import SearchFilters from "@/components/SearchFilters.vue";
import CardQuiz from "@/components/CardQuiz.vue";
import { ref } from "vue";
import type { IQuizCard } from "@/components/CardQuiz.vue";
import type { QuizListDto } from "@/types";

const quizList = ref<IQuizCard[]>([]);

async function fetchCardData() {
    const res = await fetch("http://localhost:3000/api/v1/");
    const fetchedQuizList: QuizListDto[] = await res.json();
    const formattedQuizList = fetchedQuizList.map((q) => ({
        ...q,
        id: q._id,
    }));
    quizList.value = formattedQuizList;
}

fetchCardData();
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
            <CardQuiz v-for="item in quizList" :key="item.id" v-bind="item" />
        </section>
    </main>
</template>
