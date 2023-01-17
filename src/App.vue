<script setup lang="ts">
import { RouterView } from 'vue-router';

//@ts-ignore
import Header from './components/blocks/Header.vue';
</script>

<template>
    <Header></Header>

    <RouterView class="container mx-auto" />
</template>
