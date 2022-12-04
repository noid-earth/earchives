<script lang="ts">
    //@ts-ignore
    import { FeedService } from '../services/FeedService';

    export default {
      name: 'Feed',
      data() {
        return {
          posts: [] as any[],
          error: undefined as (undefined | string),
          text: '',
        }
      },
      async created() {
        try {
            this.posts = await FeedService.getPosts();
        } catch(err) {
            this.error = 'Não foi possível carregar os posts do feed.';
            console.error(err);
        }

        setInterval(async () => {
            this.posts = await FeedService.getPosts();
        }, 5 * 1000);
      }
    }
</script>

<template>
  <section>

    <!-- ERROR -->
    <div v-if="error" class="bg-[#f6f6f6] dark:bg-[#292929] rounded-xl p-6">
      {{ error }}
    </div>

    <article 
    v-for="(post, index) in posts" 
    v-bind:item="post" 
    v-bind:index="index" 
    v-bind:key="post.id" 
    class="bg-[#f6f6f6] dark:bg-[#292929] overflow-hidden rounded-xl max-w-full" :class="(index !== 0 ? 'mt-6' : '')">
      
      <img v-if="((post.thumbnailURL?.length > 6) && post.showThumbnailOnFeed)" :src="post.thumbnailURL" class="max-h-96 object-cover w-full border-b-[#3036bf] border-b-4"/>

      <div class="p-6">
          <span 
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

          <div class="footer grid grid-cols-4 gap-4 mt-5 text-center">
            <router-link :to="(`/post/` + post.id)" class="py-2 px-6 bg-accent rounded-lg hover:text-neutral-400 transition-all duration-300 text-white block text-center">
              Ler mais
            </router-link>
          </div>

      </div>
    </article>

    <article v-if="!(posts.length > 4)" class="h-96 outline-dashed rounded-xl outline-2 outline-[#f6f6f6] dark:outline-[#292929]" :class="(posts.length > 0) ? 'mt-6' : 'mt-0.5'"></article>
  </section>
</template>
