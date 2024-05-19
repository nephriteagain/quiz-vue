<script setup lang="ts">
import { debounce } from "lodash";
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ChevronLeft from "./icons/ChevronLeft.vue";
import ChevronRight from "./icons/ChevronRight.vue";
import SearchIcon from "./icons/SearchIcon.vue";

const currentPage = ref(1);
const currentDateSort = ref("-1");
const currentQuizSort = ref("title");
const searchKeyword = ref("");

const pageNums = ref([1, 2, 3, 4, 5]);

const route = useRoute();
const router = useRouter();

function selectPage(page: number) {
    currentPage.value = page;
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
    if (currentPage.value === 1) return;
    const firstPage = pageNums.value[0];
    if (currentPage.value === firstPage) {
        pageNums.value = pageNums.value.map((p) => p - 1);
        currentPage.value--;
        return;
    }
    currentPage.value--;
}

const debouncedSearch = debounce((quizSort, searchKeyword) => {
    if (quizSort === "title") {
        router.push({
            path: route.path,
            query: { ...route.query, author: "", title: searchKeyword },
        });
        return;
    }
    router.push({
        path: route.path,
        query: { ...route.query, title: "", author: searchKeyword },
    });
}, 500);

watch(currentPage, (newPage) => {
    router.push({ path: route.path, query: { ...route.query, page: newPage } });
});

watch(currentDateSort, (newDateSort) => {
    router.push({ path: route.path, query: { ...route.query, date: newDateSort } });
});

watch([currentQuizSort, searchKeyword], ([newQuizSort, newSearchKeyword]) => {
    debouncedSearch.cancel();
    debouncedSearch(newQuizSort, newSearchKeyword);
});
</script>

<template>
    <div class="pt-8">
        <div class="flex flex-row gap-10 py-2">
            <div class="flex flex-row gap-2">
                <RouterLink
                    :to="{ path: $route.path, query: { ...$route.query, page: num } }"
                    v-for="num in pageNums"
                    :key="num"
                >
                    <Button
                        size="icon"
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
                </RouterLink>
            </div>
            <div class="flex flex-row gap-2">
                <Button
                    size="icon"
                    class="bg-sub px-2 aspect-square rounded-md shadow-sm"
                    @click="previousPage"
                >
                    <ChevronLeft />
                </Button>

                <Button
                    size="icon"
                    class="bg-sub px-2 aspect-square rounded-md shadow-sm"
                    @click="nextPage"
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row justify-between gap-y-2 py-1">
            <div class="flex flex-row gap-x-2 items-center">
                <div class="relative">
                    <SearchIcon />
                    <Input placeholder="Search..." class="ps-8" v-model="searchKeyword" />
                </div>

                <Select default-value="title" v-model="currentQuizSort">
                    <SelectTrigger class="w-[120px]">
                        <SelectValue placeholder="select a filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="title"> Title </SelectItem>
                            <SelectItem value="author"> Author </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Select default-value="desc" v-model="currentDateSort">
                    <SelectTrigger class="w-[180px]">
                        <SelectValue placeholder="select a filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="-1"> descending </SelectItem>
                            <SelectItem value="1"> ascending </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
</template>
