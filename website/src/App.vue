<script setup lang="ts">
import { RouterView } from 'vue-router';

//@ts-ignore
import Header from './components/blocks/Header.vue';
</script>

<template>
    <Header></Header>

    <div class="mx-4 md:container md:mx-auto">
        <RouterView />
    </div>
</template>
