<script setup lang="ts">
import { RouterView } from 'vue-router';

//@ts-ignore
import Header from './components/blocks/Header.vue';
import Metatags from './components/blocks/Metatags.vue';
import Footer from './components/blocks/Footer.vue';
</script>

<template>
    <Metatags />

    <Header />

    <div class="mx-4 md:container md:mx-auto">
        <RouterView />
    </div>

    <Footer />
</template>
