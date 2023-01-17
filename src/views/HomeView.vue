<script lang="ts">
//@ts-ignore

import axios from "axios";

export default {
    components: {  },
    data() {
        return {
            articles: null as any,
            cookies: this.$cookies,
        }
    },
    mounted() {
        axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response: any) => (this.articles = response.data))
    }
}
</script>

<template>
    <div class="my-24">
        <div class="animate">
            <h1 class="font-display font-bold text-4xl">
                Conteúdos de estudo
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolores odit similique.
            </p>
        </div>
    </div>
    <main>
        <div>
            <div>
                <span class="opacity-75">Pesquisando por</span> História <span class="text-accent font-semibold">/</span> 12º Ano
            </div>

            <!-- ARTICLE -->
            <div v-for="(article) in articles" v-bind:key="article.id" class="p-4 bg-off-white mt-2 rounded-lg relative">
                
                <!-- TITLE-->
                <h3 class="pb-1 text-xl">
                    <router-link :to="`/article/${article.id}`">
                        {{ article.title }}
                    </router-link>
                </h3>
                <!-- TAGS -->
                <div class="pt-1">
                    <span class="bg-zinc-300 px-2 rounded ">
                        🗂️ História
                    </span>
                    <span class="bg-zinc-300 ml-1 px-2 rounded">
                        🗓️ 12º Ano
                    </span>
                    <span class="bg-zinc-300 ml-1 px-2 rounded">
                        ✏️ @author
                    </span>
                </div>
            </div>
        </div>
    </main>
</template>
