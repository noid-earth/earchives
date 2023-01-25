<script lang="ts">
export default {
    data() {
        return {
            isTop: false,
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
    mounted() {
        const that = this;
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            if (scrollPos >= 100) {
                that.isTop = true;
            } else {
                that.isTop = false;
            }
        });
    },
};
</script>

<template>
    <button
        @click="scrollToTop"
        :class="{ 'go-top': isTop }"
        class="fixed bottom-4 right-10 z-10 hidden h-10 w-10 rounded-full border-2 border-zinc-400 bg-zinc-200 text-zinc-800 shadow transition duration-300 hover:-translate-y-2 dark:border-zinc-600 dark:bg-little-grey dark:text-zinc-200 md:block 2xl:right-4 2xl:border-none"
    >
        <i class="fa-solid fa-caret-up"></i>
    </button>
</template>

<style scoped>
button {
    visibility: hidden;
    opacity: 0;
    transition: 0.8s;
}

button.go-top {
    opacity: 1;
    visibility: visible;
}
</style>
