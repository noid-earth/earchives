<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  //@ts-ignore
  import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div>
    <main class="container mx-auto flex flex-wrap my-6 mt-4">

      <Sidebar class="w-full md:w-1/4 flex flex-col pr-5"/>
      
      <RouterView class="w-full md:w-3/4 flex flex-col"/>
      
    </main>

    <footer>
      <!-- FOOTER -->
    </footer>

  </div>
</template>

<style scoped>

</style>
