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
            return str.slice(0, num) + '...';
        },
    },
    data() {
        return {
            article: this.$props.data,
        };
    },
};
</script>

<template>
    <div class="relative mt-2 rounded-lg bg-off-white p-4 dark:bg-little-grey">
        <!-- TITLE-->
        <h3
            class="pb-1 text-xl transition-opacity duration-150 hover:opacity-75"
        >
            <router-link :to="`/article/${article.id}`">
                <!-- MOBILE TITLE -->
                <span class="inline-block md:hidden">{{
                    truncateString(article.title, 28)
                }}</span>
                <!-- DESKTOP TITLE -->
                <span class="hidden md:inline-block">{{ article.title }}</span>
            </router-link>
        </h3>
        <!-- TAGS -->
        <div class="space-x-1 pt-1 font-semibold text-accent">
            <span class="rounded-xl bg-zinc-200 px-4 dark:bg-not-black">
                🗂️ História
            </span>
            <span class="rounded-xl bg-zinc-200 px-4 dark:bg-not-black">
                🗓️ 12º Ano
            </span>

            <!-- HIDDEN (TEST)-->
            <span class="ml-1 hidden rounded bg-zinc-200 px-2 dark:bg-zinc-700">
                ✏️ @author
            </span>
        </div>
    </div>
</template>
