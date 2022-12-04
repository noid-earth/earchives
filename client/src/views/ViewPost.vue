<script lang="ts">
// @ts-ignore
import { FeedService } from '../services/FeedService';

//@ts-ignore
import { marked } from 'marked';

export default {
    data() {
        return {
            post: '' as any,
            error: undefined as (undefined | string),
            text: '',
            body: undefined as any,
        }
    },
    async created() {
        try {
            this.post = await FeedService.viewPost(this.$route.params.id);
            this.body = marked(this.post.body);
        } catch(err) {
            this.error = 'Não foi possível carregar este post.';
            console.error(err);
        }
    },
}
</script>

<template>
  <div>
    <section class="flex flex-col bg-[#f6f6f6] dark:bg-[#292929] overflow-hidden rounded-xl max-w-full">
        <img :src="post.thumbnailURL" class="max-h-96 object-cover w-full border-b-[#3036bf] border-b-4">

        <div class="p-6">
            <span 
            title="Categorias"
            v-for="(cat, index) in post.categories" 
            v-bind:item="cat" 
            v-bind:index="index" 
            v-bind:key="cat"
            class="accent uppercase font-bold text-sm py-1 px-2 rounded-xl mr-2 bg-[#fff] dark:bg-[#1d1d1d]">
                {{ cat }}
            </span>

            <h2 class="text-3xl pb-1 mt-4">
                {{ post.title }}
            </h2>

            <hr class="bg-[#f6f6f6] dark:bg-[#292929] border-0 h-2">

            <span class="bg-[#fff] dark:bg-[#1d1d1d] px-2 py-1 rounded-xl text-sm mt-40">
                <span class="opacity-75">
                    Publicado em 
                    <b>
                        {{ new Date(post.createdAt).toLocaleDateString('pt-BR') }} às {{ new Date(post.createdAt).toLocaleTimeString('pt').slice(0, 5) }}
                    </b> 

                    por
                </span> 
                <a :href="(`/user/` + post.authorID)" class="accent font-bold">
                    {{ post.author }}
                </a>
            </span>

            <p class="pb-4 opacity-75 mt-4">
                {{ post.shortDescription }}
            </p>

            <div class="py-4"><hr class="bg-[#fff] dark:bg-[#1d1d1d] border-0 h-0.5 rounded-xl"></div>
            
            <div v-html="body" id="BODY" class="mt-4"></div>
        </div>
    </section>
    <section class="mt-6">
        <div class="footer grid grid-cols-4 gap-4 text-center">
            <router-link to="/" class="py-2 px-6 bg-accent rounded-lg hover:text-neutral-400 transition-all duration-300 text-white block">
                Voltar
            </router-link>
          </div>
    </section>
  </div>
</template>

<style>
    h1 {
        font-size: 36px;
    }
    h2 {
        font-size: 32px;
    }
    h3 {
        font-size: 28px;
    }

    p {
        line-height: 2rem;
    }

    blockquote {
        border-left: 4px solid var(--accent);
        padding-left: 1rem;
        margin: 1rem 0;
    }

    #BODY img {
        padding: 1rem 0;
    }
</style>
