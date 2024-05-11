<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MinusCircle from "@/components/icons/MinusCircle.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import { nodeModuleNameResolver } from "typescript";

interface IChoice {
    id: number;
    value: string;
}

interface IQuestion {
    question: string;
    choices: IChoice[];
    answer: string;
}

interface IQuiz {
    title: string;
    description: string;
    questions: IQuestion[];
}

let id = 0;
const initialChoiceValue = [
    { id: id++, value: "" },
    { id: id++, value: "" },
    { id: id++, value: "" },
];
const currentQuestionNum = ref(1);
const question = ref("");
const choices = ref([
    { id: id++, value: "" },
    { id: id++, value: "" },
    { id: id++, value: "" },
]);
const answer = ref("");
const quiz: Ref<IQuiz> = ref({
    title: "",
    description: "",
    questions: [],
});

function addChoice() {
    if (choices.value.length === 10) {
        alert("maximum choice is 10");
        return;
    }
    choices.value.push({
        id: id++,
        value: "",
    });
}
function removeChoice(id: number) {
    choices.value = choices.value.filter((option) => option.id !== id);
}

function addQuestion() {
    quiz.value.questions.push({
        question: question.value,
        choices: choices.value,
        answer: answer.value,
    });
    question.value = "";
    choices.value = initialChoiceValue;
    answer.value = "";
}

const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
</script>
<template>
    <main>
        <h1 class="font-bold text-3xl text-center py-4">Create New Quiz</h1>
        <div class="flex flex-row gap-y-4">
            <div class="basis-1/2 flex flex-col gap-y-4">
                <div class="flex flex-col gap-y-2">
                    <Label for="create-title">Title</Label>
                    <Input id="create-title" placeholder="title" v-model="quiz.title" />
                </div>
                <div class="flex flex-col gap-y-2">
                    <Label for="create-title">Description</Label>
                    <Textarea
                        id="create-description"
                        placeholder="description"
                        v-model="quiz.description"
                    />
                </div>
                <div>
                    <div class="flex flex-col gap-y-2">
                        <Label for="create-question">Question</Label>
                        <div class="flex flex-row gap-x-3">
                            <p>{{ currentQuestionNum }}.</p>
                            <Textarea id="create-question" v-model="question" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-4 ps-6">
                        <div class="flex flex-col gap-y-2 pt-4">
                            <div
                                v-for="(option, index) in choices"
                                :key="option.id"
                                class="flex flex-row gap-x-3"
                            >
                                <p>{{ chars[index] }}.</p>
                                <Input v-model="option.value" :name="`choice-${index}`" />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    class="border-2 border-dark self-center rounded-full items-center justify-center"
                                    @click="removeChoice(option.id)"
                                >
                                    <MinusCircle />
                                </Button>
                            </div>
                        </div>
                        <Button class="w-fit" @click="addChoice">Add Choice</Button>
                    </div>
                    <div class="py-1">
                        <Label for="create-answer">Answer</Label>
                        <Input id="create-answer" v-model="answer" />
                    </div>
                </div>
                <Button class="w-[300px] font-semibold" @click="addQuestion">Add Question</Button>
            </div>
            <div class="basis-1/2">
                <h2 class="text-2xl font-bold text-center">Preview</h2>
                <div>
                    {{ `${JSON.stringify(quiz, null, 4)}` }}
                </div>
            </div>
        </div>
    </main>
</template>
