<script lang="ts">
    export default {
        data() {
            return {
                theme: undefined as string | undefined,
            }
        },
        mounted() {
            let existingTheme = this.$cookies.get("theme") || 'light';
            this.changeTo(existingTheme)
        },
        methods: {
            toggleTheme() {
                if(this.theme === 'dark') {
                    this.changeTo('light');
                } else {
                    this.changeTo('dark');
                }

                this.playSound('https://assets.mixkit.co/sfx/preview/mixkit-plastic-bubble-click-1124.mp3')
            },
            changeTo(theme: string) {
                if(this.theme) document.documentElement.classList.remove(this.theme);
                document.documentElement.classList.value = theme;

                this.theme = theme;
                this.$cookies.set("theme", theme);
            },
            playSound(sound: string) {
                if(sound) {
                    var audio = new Audio(sound);
                    audio.play();
                }
            }
        }
    }
</script>

<template>
    <button @click="toggleTheme" class="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg">
        <span v-if="theme === 'light'">
            🌚
        </span>
        <span v-else>
            ✨
        </span>
    </button>
</template>