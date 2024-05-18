<script setup lang="ts">
import { ref, computed } from "vue";
import QuizPreview from "@/components/QuizPreview.vue";
import QuizEditor from "@/components/QuizEditor.vue";
import { Button } from "@/components/ui/button";
import type { Ref } from "vue";
import type { IQuiz, IQuestion } from "@/types";

const quiz: Ref<IQuiz> = ref({
    title: "",
    description: "",
    questions: [],
});
const currentQuestionNum = computed(() => quiz.value.questions.length + 1);
const canSaveQuiz = computed(() => quiz.value.questions.length > 0);

function addQuestion(question: IQuestion) {
    quiz.value.questions.push(question);
}

function saveQuiz() {
    console.log(quiz.value);
}
</script>
<template>
    <main>
        <div class="flex flex-row justify-between items-center">
            <div></div>
            <h1 class="font-bold text-3xl text-center py-4">Create New Quiz</h1>
            <Button :disabled="!canSaveQuiz" class="flex-semibold text-lg" @click="saveQuiz"
                >Save Quiz</Button
            >
        </div>
        <div class="flex flex-row gap-x-4">
            <QuizEditor
                :current-question-num="currentQuestionNum"
                @add-question="addQuestion"
                @title-change="(desc) => (quiz.description = desc)"
                @description-change="(desc) => (quiz.description = desc)"
            />
            <QuizPreview v-bind="quiz" />
        </div>
    </main>
</template>
