<script setup lang="ts">
import SearchFilters from "@/components/SearchFilters.vue";
import CardQuiz from "@/components/CardQuiz.vue";
import { ref, watch } from "vue";
import type { IQuizCard } from "@/components/CardQuiz.vue";
import type { QuizListDto } from "@/types";
import { useRoute } from "vue-router";
import { userUserStore } from "@/stores/user";
import a from "@/lib/utils";

const quizList = ref<IQuizCard[]>([]);
const route = useRoute();
const userStore = userUserStore();

async function fetchCardData(query: typeof route.query) {
    const queryParams = queryParamsToString(query);
    const res = await a.get(`/?${queryParams}`);
    const fetchedQuizList: QuizListDto[] = res.data;
    const formattedQuizList = fetchedQuizList.map((q) => ({
        ...q,
        id: q._id,
    }));
    quizList.value = formattedQuizList;
}

function queryParamsToString(queryParams: Record<string, any>): string {
    const params = new URLSearchParams(queryParams);
    return params.toString();
}

fetchCardData(route.query);
watch(
    () => route.query,
    (query) => {
        fetchCardData(query);
    },
);
</script>

<template>
    <main>
        <h1 class="text-center text-4xl font-bold pt-1 pb-8 text-dark">Quiz Raptor</h1>
        <div class="flex items-center justify-center">
            <RouterLink
                v-if="userStore.user"
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
