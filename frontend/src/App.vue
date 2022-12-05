<script lang="ts">
  import axios from "axios";
  // @ts-ignore
  import { API } from "./services/API";

  export default {
    data() {
      return {
        feed: [] as any[],
      }
    },
    async created() {
      let feed = await API.get("/feed/list");
      if(feed) this.feed = feed;
    }
  }
</script>

<template>
  <div class="">
    <header class="mx-auto container px-32">
      <Header/>
    </header>

    <main class="bg-[#292929] overflow-visible">
      
      <section class="mx-auto container py-6 px-32">
        <article class="bg-[#1d1d1d] shadow rounded-lg overflow-hidden" v-for="(post, index) in feed" v-bind:key="index">
          <img v-if="(post.thumbnailURL.length > 5)" :src="post.thumbnailURL" class="w-full max-h-72 object-cover border-b-2 border-[#42b883]">

          <div class="py-4 px-24">
            <div class="text-sm font-semibold">
              <span class="rounded-full bg-[#292929] py-0.5 px-2" :class="(i == (post.categories.length - 1) ? 'ml-1' : '')" v-for="(c, i) in post.categories" v-bind:key="i">{{ c }}</span>
              <span class="opacity-50"> | </span>
              <span class="text-accent">{{ new Date(post.createdAt) }}</span>
            </div>

            <h1 class="text-3xl font-light mt-4">{{ post.title }}</h1>
            <span class="text-sm opacity-50"><span>Postado por </span> <span>{{ post.author }}</span></span>

            <p class="opacity-75 mt-2">
              {{ post.shortDescription }}
            </p>

            <div class="text-right">
              <a href="#" class="bg-accent py-2 px-20 inline-block mt-6 rounded-lg">
                Ver
              </a>
            </div>
          </div>
        </article>
        
        
      </section>

    </main>
  </div>
</template>