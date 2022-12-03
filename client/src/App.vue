<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  //@ts-ignore
  import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div>

    <header>
      <!-- NAVBAR -->
    </header>

    <main class="container mx-auto flex flex-wrap py-6">

      <Sidebar></Sidebar>
      
      <RouterView/>
    </main>

    <footer>
      <!-- FOOTER -->
    </footer>

  </div>
</template>

<style scoped>

</style>
