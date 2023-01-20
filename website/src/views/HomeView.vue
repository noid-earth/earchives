<script lang="ts">
//@ts-ignore

import Article from '../components/library/Article.vue';
import axios from 'axios';

export default {
    components: { Article },
    data() {
        return {
            articles: [] as any[],
            cookies: this.$cookies,
            showMore: false,
            subject: undefined as string | undefined,
            year: undefined as string | undefined,
        };
    },
    mounted() {

        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response: any) => (this.articles = response.data));
            
        this.subject = this.$route.query.subject as string | undefined;
        this.year = this.$route.query.year as string | undefined;
    },
    methods: {
        getFirst(n: number) {
            return (this.articles as any[])?.slice(0, n);
        },
        getExtra(n: number) {
            return (this.articles as any[])?.slice(n, undefined);
        },
    },
};
</script>

<template>
    <div class="my-24">
        <div class="animate">
            <h1 class="font-display text-4xl font-bold uppercase underline decoration-accent">Conteúdos de estudo</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur dolores odit similique.
            </p>
        </div>
    </div>
    <main>
        <div>
            <div v-if="subject || year">
                <span class="opacity-75">Pesquisando por conteúdos {{ subject ? 'de' : 'do' }}</span> <br class="inline-block md:hidden">
                {{ subject }}
                <span class="font-semibold text-accent" v-if="subject && year">/</span> {{ year ? `${year}º Ano` : year }}
            </div>

            <div>
                <Article
                    :data="article"
                    v-for="article in getFirst(20)"
                    v-bind:key="article.id"
                />
            </div>

            <div class="my-4 text-center">
                <button
                    v-if="!showMore"
                    @click="showMore = !showMore"
                    class="rounded-lg bg-accent py-2 px-4 text-white duration-150 hover:text-white/75"
                >
                    Mostrar mais
                </button>
            </div>

            <div v-if="showMore">
                <Article
                    :data="article"
                    v-for="article in getExtra(20)"
                    v-bind:key="article.id"
                />
            </div>
        </div>
    </main>
</template>
