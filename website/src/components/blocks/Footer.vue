<script lang="ts">
export default {
    data() {
        return {
            show: false,
        };
    },
    mounted() {
        setTimeout(() => (this.show = true), 500);
    },
};
</script>

<template>
    <div class="py-4 text-center text-sm text-zinc-500" :class="{ show: show }">
        Copyright (C) 2023 - Noid<span class="font-semibold text-accent"
            >Earth</span
        >
    </div>
</template>

<style scoped>
div {
    transition: all 0.7s ease-in;
    opacity: 0;
}

div.show {
    opacity: 1;
}
</style>
