<script setup lang="ts">
import { chars } from "@/lib/sample";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import type { QuizItemDto } from "@/types";

const quizItem = ref<null | QuizItemDto>(null);
const answers = ref<string>("");
const route = useRoute();
const id = route.params.id as string;
async function fetchQuiz(id: string) {
    const res = await fetch(`http://localhost:3000/api/v1/quiz/${id}`);
    const quiz: QuizItemDto = await res.json();
    quizItem.value = quiz;
}
fetchQuiz(id);

watch(answers, () => {
    console.log({ answers });
});
</script>
<template>
    <main class="flex flex-col items-center py-8">
        <h1 v-if="!quizItem">Loading...</h1>
        <div
            v-else
            class="flex flex-col gap-y-4 p-4 bg-sub w-full max-w-[500px] shadow-lg rounded-lg"
        >
            <h2 class="text-xl font-bold">{{ quizItem.title }}</h2>
            <div class="flex flex-col gap-y-6">
                <div
                    v-for="(q, index) in quizItem.questions"
                    :key="index"
                    class="flex flex-col gap-y-2"
                >
                    <div class="flex flex-row gap-x-3 font-lg font-semibold">
                        <p>{{ index + 1 }}.</p>
                        <p>{{ q.questionText }}</p>
                    </div>
                    <ul>
                        <RadioGroup>
                            <div
                                v-for="(c, i) in q.options"
                                :key="i"
                                class="flex flex-row items-center gap-x-3 ps-6"
                            >
                                <RadioGroupItem
                                    :id="`${index}-${chars[i]}`"
                                    :value="c"
                                    v-model="answers"
                                />
                                <Label :for="`${index}-${chars[i]}`" class="text-sm font-medium"
                                    >{{ chars[i] }}.&nbsp;&nbsp;{{ c }}</Label
                                >
                            </div>
                        </RadioGroup>
                    </ul>
                </div>
            </div>
            <div class="pt-8">
                <AlertDialog>
                    <AlertDialogTrigger
                        class="bg-main px-3 py-1 rounded-md font-semibold text-lg hover:bg-main/80"
                        >Submit</AlertDialogTrigger
                    >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    </main>
</template>
