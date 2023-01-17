<script lang="ts">
export default {
    props: {
        data: {
            type: Object,
            required: true,
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
    <div
        class="relative mt-2 rounded-lg bg-off-white p-4"
    >
        <!-- TITLE-->
        <h3 class="pb-1 text-xl hover:opacity-75 duration-150">
            <router-link :to="`/article/${article.id}`">
                {{ article.title }}
            </router-link>
        </h3>
        <!-- TAGS -->
        <div class="pt-1">
            <span class="rounded bg-zinc-300 px-2"> 🗂️ História </span>
            <span class="ml-1 rounded bg-zinc-300 px-2"> 🗓️ 12º Ano </span>
            <span class="ml-1 rounded bg-zinc-300 px-2"> ✏️ @author </span>
        </div>
    </div>
</template>
