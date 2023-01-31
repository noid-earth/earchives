<script lang="ts">
import BackToTop from '../utils/BackToTop.vue';
import Theme from '../utils/Theme.vue';

export default {
    data() {
        return {
            links: [
                { to: '/', text: 'Artigos' },
                { to: '/newsletter', text: 'Newsletter' },
            ],
        };
    },
    mounted() {
        if (
            location.protocol !== 'https:' &&
            location.hostname === 'earchives.noid.earth'
        ) {
            location.replace(
                `https:${location.href.substring(location.protocol.length)}`,
            );
        }
    },
    components: {
        Theme,
        BackToTop,
    },
};
</script>

<template>
    <header class="mx-4 md:container md:mx-auto">
        <nav
            class="mt-4 flex flex-wrap place-items-center rounded-lg bg-off-white p-4 text-center dark:bg-little-grey"
        >
            <div class="flex w-screen justify-between">
                <span class="float-left">
                    <router-link to="/">
                        <span
                            class="mr-2 inline-block rounded-lg bg-zinc-200 px-2 py-1 dark:bg-zinc-700 md:hidden"
                        >
                            ⬅️
                        </span>

                        <span
                            class="inline-block py-1 px-2 font-display font-bold"
                        >
                            <span class="text-accent">e</span>Archives
                        </span>
                    </router-link>
                </span>

                <ul class="mx-auto hidden space-x-12 px-4 md:flex">
                    <li
                        v-for="(link, i) in links"
                        class="px-2 py-1 duration-150 hover:text-accent"
                        v-bind:key="i"
                    >
                        <router-link :to="link.to">{{ link.text }}</router-link>
                    </li>
                </ul>

                <a
                    href="https://github.com/noid-earth/earchives"
                    target="_blank"
                    class="mr-2 hidden rounded-lg bg-zinc-200 px-2.5 py-1 dark:bg-zinc-700 md:inline-block"
                >
                    <i class="fa-brands fa-github"></i>
                </a>

                <Theme />
            </div>
        </nav>
    </header>

    <BackToTop />
</template>
