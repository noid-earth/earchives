<script setup lang="ts">
import { RouterView } from 'vue-router';

//@ts-ignore
import Header from './components/blocks/Header.vue';
</script>

<template>
    <Header></Header>

    <div class="container mx-auto">
        <RouterView />
    </div>
</template>
