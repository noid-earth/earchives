<script lang="ts">
// @ts-ignore
import { FeedService } from '../services/FeedService';

export default {
    name: 'Posts',
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
    }
}
</script>

<template>
    <div>
        <!-- ERROR -->
        <div v-if="error">
            <p>
                {{ error }}
            </p>
        </div>

        <!-- POSTS -->
        <div class="w-full">

            <article 
            class="flex flex-col my-4" style="width: 100vh"
            v-for="(post, index) in posts" 
            v-bind:item="post" 
            v-bind:index="index" 
            v-bind:key="post.id">
        
                <a href="#">
                    <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1"/>
                </a>

                <div class="flex flex-col justify-start p-6">

                    <a href="#">
                        {{ post.categories }}
                    </a>

                    <a href="#">{{ post.title }}</a>
                    <p href="#">
                        Por <a :href="(`/user/` + post.authorID)">{{ post.author }}</a>, Publicado em {{ post.createdAt }}
                    </p>
                    <a href="#">{{ post.shortDescription }}</a>
                    <a href="#">Ler mais</a>
                </div>

            </article>

        </div>
    </div>
</template>