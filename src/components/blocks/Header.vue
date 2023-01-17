<script lang="ts">
import { RouterView } from 'vue-router';

export default {
    data() {
        return {
            links: [
                { to: '/', text: "Home" },
                { to: '/newsletter', text: 'Newsletter' },
            ],
        };
    }
};
</script>

<template>
    <header class="container mx-auto">
        <nav
            class="mt-4 flex flex-wrap place-items-center rounded-lg bg-off-white p-4 text-center"
        >
            <div class="flex w-screen justify-between">
                <span class="float-left px-2">
                    <router-link to="/">
                        <span class="font-display font-bold">
                            <span class="text-accent">e</span>Archives
                        </span>
                    </router-link>
                </span>

                <ul class="mx-auto flex space-x-12 px-4">
                    <li
                        v-for="(link, i) in links"
                        class="px-2 duration-150 hover:text-accent"
                        v-bind:key="i"
                    >
                        <router-link :to="link.to">{{ link.text }}</router-link>
                    </li>
                </ul>

                <LocaleSwitcher/>
            </div>
        </nav>
    </header>
</template>
