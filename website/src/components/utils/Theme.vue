<script lang="ts">
export default {
    data() {
        return {
            theme: undefined as string | undefined,
        };
    },
    mounted() {
        let existingTheme = this.$cookies.get('theme') || 'light';
        this.changeTo(existingTheme);
    },
    methods: {
        toggleTheme() {
            if (this.theme === 'dark') {
                this.changeTo('light');
            } else {
                this.changeTo('dark');
            }
        },
        changeTo(theme: string) {
            if (this.theme)
                document.documentElement.classList.remove(this.theme);
            document.documentElement.classList.value = theme;

            this.theme = theme;
            this.$cookies.set('theme', theme);
        },
    },
};
</script>

<template>
    <button
        @click="toggleTheme"
        class="rounded-lg bg-zinc-200 px-2 py-1 dark:bg-zinc-700"
    >
        <span v-if="theme === 'light'"> 🌚 </span>
        <span v-else> ✨ </span>
    </button>
</template>
