<script lang="ts">
import LocaleSwitcher from '../utils/LocaleSwitcher.vue';
import Theme from '../utils/Theme.vue';

export default {
    data() {
        return {
            links: [
                { to: '/', text: 'Home' },
                { to: '/newsletter', text: 'Newsletter' },
            ],
        };
    },
    mounted() {
        if (location.protocol !== 'https:' && location.hostname === 'earchives.noid.earth') {
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
        }
    },
    components: {
        LocaleSwitcher, Theme,
    },
};
</script>

<template>
    <header class="mx-4 md:container md:mx-auto">
        <nav
            class="mt-4 flex flex-wrap place-items-center rounded-lg bg-off-white dark:bg-little-grey p-4 text-center"
        >
            <div class="flex w-screen justify-between">
                <span class="float-left px-2 py-1">
                    <router-link to="/">
                        <span class="font-display font-bold">
                            <span class="text-accent">e</span>Archives
                        </span>
                    </router-link>
                </span>

                <ul class="mx-auto space-x-12 px-4 hidden md:flex">
                    <li
                        v-for="(link, i) in links"
                        class="px-2 py-1 duration-150 hover:text-accent"
                        v-bind:key="i"
                    >
                        <router-link :to="link.to">{{ link.text }}</router-link>
                    </li>
                </ul>

                <Theme/>
            </div>
        </nav>
    </header>
</template>
