<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MinusCircle from "@/components/icons/MinusCircle.vue";
import { computed, ref } from "vue";
import { chars } from "@/lib/sample";

const props = defineProps<{ currentQuestionNum: number }>();
defineEmits(["title-change", "description-change", "add-question"]);

function generateBlankChoices() {
    return [
        { id: id++, value: "" },
        { id: id++, value: "" },
        { id: id++, value: "" },
    ];
}

let id = 0;
let questionId = 0;
const title = ref("");
const description = ref("");
const question = ref("");
const choices = ref(generateBlankChoices());
const answer = ref("");
const canAddQuestion = computed(() => {
    const questionNotEmpty = question.value.length > 0;
    const answerNotEmpty = answer.value.length > 0;
    const allChoicesHasValue = choices.value.every((v) => Boolean(v.value));
    const answerHasOneMatch =
        choices.value.reduce((acc, curr) => (answer.value === curr.value ? acc + 1 : acc), 0) === 1;
    return questionNotEmpty && answerNotEmpty && allChoicesHasValue && answerHasOneMatch;
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
    if (choices.value.length === 1) return;
    choices.value = choices.value.filter((option) => option.id !== id);
}
</script>
<template>
    <div class="basis-1/2 flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-2">
            <Label for="create-title">Title</Label>
            <Input
                id="create-title"
                placeholder="title"
                v-model="title"
                @input="$emit('title-change', title)"
            />
        </div>
        <div class="flex flex-col gap-y-2">
            <Label for="create-title">Description</Label>
            <Textarea
                id="create-description"
                placeholder="description"
                v-model="description"
                @input="$emit('description-change', description)"
            />
        </div>
        <div>
            <div class="flex flex-col gap-y-2">
                <Label for="create-question">Question</Label>
                <div class="flex flex-row gap-x-3">
                    <p>{{ props.currentQuestionNum }}.</p>
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
                            class="border-2 border-dark self-center rounded-full items-center justify-center aspec"
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
        <Button
            :disabled="!canAddQuestion"
            class="w-[300px] font-semibold"
            @click="
                $emit('add-question', {
                    question,
                    choices,
                    answer,
                    id: questionId++,
                })
            "
            >Add Question</Button
        >
    </div>
</template>
