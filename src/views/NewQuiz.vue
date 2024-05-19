<script setup lang="ts">
import { ref, computed } from "vue";
import QuizPreview from "@/components/QuizPreview.vue";
import QuizEditor from "@/components/QuizEditor.vue";
import { Button } from "@/components/ui/button";
import type { Ref } from "vue";
import type { IQuiz, IQuestion } from "@/types";
import { userUserStore } from "@/stores/user";
import a from "@/lib/utils";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = userUserStore();
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

async function saveQuiz() {
    if (!userStore.user) return;
    const authorId = userStore.user.id;
    const createdBy = `${userStore.user.firstName} ${userStore.user.lastName}`;
    const title = quiz.value.title;
    const questions = quiz.value.questions.map((q) => ({
        questionText: q.question,
        correctAnswer: q.answer,
        options: q.choices.map((c) => c.value),
    }));
    const description = quiz.value.description;
    const payload = {
        title,
        authorId,
        createdBy,
        questions,
        description,
    };
    const res = await a.post("/", payload);
    if (res.status === 201) {
        console.log("success");
        router.push("/");
        return;
    }
    console.warn("failed to created quiz");
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
                @title-change="(title) => (quiz.title = title)"
                @description-change="(desc) => (quiz.description = desc)"
            />
            <QuizPreview v-bind="quiz" />
        </div>
    </main>
</template>
