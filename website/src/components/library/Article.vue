<script lang="ts">
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        truncateString(str: string, num: number) {
            if (str.length <= num) {
                return str;
            }
            return str.slice(0, num) + '...'
        }
    },
    data() {
        return {
            article: this.$props.data,
        };
    },
};
</script>

<template>
    <div
        class="relative mt-2 rounded-lg bg-off-white dark:bg-little-grey p-4"
    >
        <!-- TITLE-->
        <h3 class="pb-1 text-xl hover:opacity-75 duration-150 transition-opacity">
            <router-link :to="`/article/${article.id}`">
                <!-- MOBILE TITLE -->
                <span class="inline-block md:hidden">{{ truncateString(article.title, 28) }}</span>
                <!-- DESKTOP TITLE -->
                <span class="hidden md:inline-block">{{ article.title }}</span>
            </router-link>
        </h3>
        <!-- TAGS -->
        <div class="pt-1">
            <span class="rounded bg-zinc-200 dark:bg-zinc-700 px-2"> 🗂️ História </span>
            <span class="ml-1 rounded bg-zinc-200 dark:bg-zinc-700 px-2"> 🗓️ 12º Ano </span>

            <!-- HIDDEN (TEST)-->
            <span class="ml-1 rounded bg-zinc-200 dark:bg-zinc-700 px-2 hidden"> ✏️ @author </span>
        </div>
    </div>
</template>
