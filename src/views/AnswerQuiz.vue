<script setup lang="ts">
import { chars } from "@/lib/sample";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import XMark from "@/components/icons/XMark.vue";
import CheckMark from "@/components/icons/CheckMark.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import type { QuizItemDto, UserQuizAnswer, QuestionResultDto } from "@/types";
import a from "@/lib/utils";

const route = useRoute();
const id = route.params.id as string;

const quizItem = ref<null | QuizItemDto>(null);
const userAnswer = ref<UserQuizAnswer[]>([]);
const quizResult = ref<QuestionResultDto[] | null>(null);
const totalScore = computed(() => {
    if (!quizResult.value) {
        return "Score: 0/0";
    }
    const score = quizResult.value.reduce((acc, curr) => (curr.userCorrect ? acc + 1 : acc), 0);
    const totalQuestions = quizResult.value.length;
    return `Score: ${score}/${totalQuestions}`;
});
const submitDisabled = computed(
    () =>
        userAnswer.value.length === 0 || userAnswer.value.some((a) => a.correctAnswer.length === 0),
);

async function fetchQuiz(id: string) {
    const res = await a.get(`/quiz/${id}`);
    const quiz: QuizItemDto = res.data;
    quizItem.value = quiz;
    userAnswer.value = quiz.questions.map((q) => ({
        questionText: q.questionText,
        correctAnswer: "",
    }));
}

async function submitQuiz() {
    if (!quizItem.value || userAnswer.value.length === 0) return;
    const data = {
        _id: quizItem.value._id,
        questions: userAnswer.value,
    };
    const res = await a.post(`/quiz/${quizItem.value._id}`, data);
    const results = res.data as QuestionResultDto[];
    quizResult.value = results;
}

function retryQuiz() {
    userAnswer.value = quizItem.value!.questions.map((q) => ({
        questionText: q.questionText,
        correctAnswer: "",
    }));
    quizResult.value = null;
}

fetchQuiz(id);
</script>

<template>
    <main class="flex flex-col items-center py-8">
        <h1 v-if="!quizItem">Loading...</h1>
        <div
            v-else
            class="flex flex-col gap-y-4 p-4 bg-sub w-full max-w-[500px] shadow-lg rounded-lg"
        >
            <h2 class="text-xl font-bold">{{ quizItem.title }}</h2>
            <div v-if="quizResult" class="flex flex-col gap-y-6">
                <div v-for="(q, qIndex) in quizResult" :key="qIndex">
                    <div class="flex flex-row gap-x-2 font-lg font-semibold">
                        <CheckMark v-if="q.userCorrect" />
                        <XMark v-else />
                        <p>{{ qIndex + 1 }}.</p>
                        <p>{{ q.questionText }}</p>
                    </div>
                    <ul class="ps-6">
                        <RadioGroup v-model="userAnswer[qIndex].correctAnswer">
                            <div
                                v-for="(c, i) in q.options"
                                :key="i"
                                class="flex flex-row items-center gap-x-3 ps-6"
                            >
                                <RadioGroupItem :id="`${qIndex}-${chars[i]}`" :value="c" disabled />
                                <Label
                                    :for="`${qIndex}-${chars[i]}`"
                                    class="text-sm font-medium pointer-events-none"
                                    >{{ chars[i] }}.&nbsp;&nbsp;{{ c }}</Label
                                >
                            </div>
                        </RadioGroup>
                    </ul>
                    <div v-if="!q.userCorrect" class="ps-8 text-sm py-2">
                        <p class="text-red-600 italic">correct answer: {{ q.correctAnswer }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col gap-y-6">
                <div
                    v-for="(q, qIndex) in quizItem.questions"
                    :key="qIndex"
                    class="flex flex-col gap-y-2"
                >
                    <div class="flex flex-row gap-x-2 font-lg font-semibold">
                        <p>{{ qIndex + 1 }}.</p>
                        <p>{{ q.questionText }}</p>
                    </div>
                    <ul>
                        <RadioGroup v-model="userAnswer[qIndex].correctAnswer">
                            <div
                                v-for="(c, i) in q.options"
                                :key="i"
                                class="flex flex-row items-center gap-x-3 ps-6"
                            >
                                <RadioGroupItem :id="`${qIndex}-${chars[i]}`" :value="c" />
                                <Label :for="`${qIndex}-${chars[i]}`" class="text-sm font-medium"
                                    >{{ chars[i] }}.&nbsp;&nbsp;{{ c }}</Label
                                >
                            </div>
                        </RadioGroup>
                    </ul>
                </div>
            </div>

            <div class="pt-8">
                <div class="pb-2 text-xl font-bold">
                    <p>{{ totalScore }}</p>
                </div>
                <Button v-if="quizResult" @click="retryQuiz"> Retry Quiz </Button>
                <AlertDialog v-else>
                    <AlertDialogTrigger
                        class="bg-main px-3 py-1 rounded-md font-semibold text-lg hover:bg-main/80 disabled:opacity-60 transition-all duration-150"
                        :disabled="submitDisabled"
                        >Submit</AlertDialogTrigger
                    >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction @click="submitQuiz">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    </main>
</template>
