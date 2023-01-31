<script lang="ts">
//@ts-ignore

import Article from '../components/library/ArticlePreview.vue';
import LoadingSpinner from '../components/utils/LoadingSpinner.vue';
import axios from 'axios';

export default {
    components: { Article, LoadingSpinner },
    data() {
        return {
            articlesAPILoading: true,
            articles: [] as any[],
            articlesRAW: [] as any[],

            cookies: this.$cookies,
            showingAllArticles: false,

            subject: undefined as string | undefined,
            year: undefined as string | undefined,
        };
    },
    async mounted() {
        
        this.subject = this.$route.query.subject as string
        this.year = this.$route.query.year as string


        try {
            this.articlesRAW =
                (await axios.get('http://localhost:3101/articles')).data;
            this.articles = this.getArticles(0, 20);
            this.articlesAPILoading = false;
        } catch (err) {
            console.error(err);
        }

    },
    methods: {
        showMore() {
            this.articles = this.getArticles(0, undefined);
            this.showingAllArticles = true;
        },
        getArticles(n1: number, n2: number | undefined) {
            console.log(this.year);
            return (this.articlesRAW as any[]).filter((a) => {
                if(this.year && a.year !== this.year) {
                    return false;
                } 
                if(this.subject && a.subject !== this.subject) {
                    return false;
                }
                return a;
            }).slice(n1, n2);
        },
    },
};
</script>

<template>
    <div class="my-24">
        <div class="animate">
            <h1
                class="font-display text-4xl font-bold uppercase underline decoration-accent"
            >
                Conteúdos de estudo
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur dolores odit similique.
            </p>
        </div>
    </div>

    <main>
        <div>
            <!-- SEARCH QUERIES -->
            <div v-if="subject || year">
                <span class="opacity-75"
                    >Pesquisando por conteúdos {{ subject ? 'de' : 'do' }}</span
                >

                <br class="inline-block md:hidden" />
                {{ subject }}
                <span class="font-semibold text-accent" v-if="subject && year"
                    >/</span
                >
                {{ year ? `${year}º Ano` : year }}
            </div>

            <!-- RESULTS/ARTICLES -->
            <div v-if="!articlesAPILoading">
                <Article
                    :data="article"
                    v-for="article in articles"
                    v-bind:key="article.sha"
                />
            </div>

            <div class="my-4 text-center">
                <button
                    v-if="!showingAllArticles && !articlesAPILoading && articles.length > 20"
                    @click="showMore"
                    class="rounded-lg bg-accent py-2 px-4 text-white duration-150 hover:text-white/75"
                >
                    Mostrar mais
                </button>
            </div>
        </div>
    </main>
</template>
