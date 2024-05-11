<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
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
    <div>
        <div class="flex flex-row gap-10 py-2">
            <div class="flex flex-row gap-2">
                <Button
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
        <div class="flex flex-row justify-between py-1">
            <div class="flex flex-row gap-x-2 items-center">
                <div class="relative">
                    <SearchIcon />
                    <Input placeholder="Search..." class="ps-8" />
                </div>

                <Select default-value="title">
                    <SelectTrigger class="w-[180px]">
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
                <Select default-value="desc">
                    <SelectTrigger class="w-[180px]">
                        <SelectValue placeholder="select a filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="desc"> descending </SelectItem>
                            <SelectItem value="asc"> ascending </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
</template>
