<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
const currentPage = ref(1);
const pageNums = ref([1, 2, 3, 4, 5]);

function selectPage(page: number) {
    currentPage.value = page;
    console.log(currentPage.value);
}
function nextPage() {
    const lastPage = pageNums.value[pageNums.value.length - 1];
    if (currentPage.value === lastPage) {
        pageNums.value = pageNums.value.map((p) => p + 1);
        currentPage.value++;
        return;
    }
    currentPage.value++;
}
function previousPage() {
    if (currentPage.value === 0) return;
    const firstPage = pageNums.value[0];
    if (currentPage.value === firstPage) {
        pageNums.value = pageNums.value.map((p) => p - 1);
        currentPage.value--;
        return;
    }
    currentPage.value--;
}
</script>

<template>
    <main>
        <h1 class="text-center text-4xl font-bold pt-1 pb-8">Quiz Raptor</h1>
        <div>
            <div class="flex flex-row gap-10 py-2">
                <div class="flex flex-row gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        v-for="num in pageNums"
                        :key="num"
                        :class="{
                            'bg-dark text-white px-2 aspect-square rounded-md shadow-sm flex items-center justify-center':
                                currentPage === num,
                            'bg-sub  px-2 aspect-square rounded-md shadow-sm flex items-center justify-center':
                                currentPage !== num,
                        }"
                        @click="selectPage(num)"
                    >
                        {{ num }}
                    </Button>
                </div>
                <div class="flex flex-row gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        class="bg-sub px-2 aspect-square rounded-md shadow-sm"
                        @click="previousPage"
                    >
                        {{ "<" }}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        class="bg-sub px-2 aspect-square rounded-md shadow-sm"
                        @click="nextPage"
                    >
                        {{ ">" }}
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <input />
                    <select>
                        <option>title</option>
                        <option>author</option>
                    </select>
                </div>
                <div>
                    <select>
                        <option>ascending</option>
                        <option>descending</option>
                    </select>
                </div>
            </div>
        </div>
    </main>
</template>
