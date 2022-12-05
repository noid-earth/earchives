<template>
    <nav class="py-2.5 rounded-lg">
      <div class="flex flex-wrap items-center justify-between">

        <a href="/">
          <span class="text-xl font-semibold"><span class="text-accent">e</span>Archives</span>
        </a>

        <button data-collapse-toggle="navbar" type="button" class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden" aria-controls="navbar" aria-expanded="false">
          <span class="sr-only">Abrir menu</span>
          <i class="fa-solid fa-bars p-2"></i>
        </button>

        <div class="hidden w-full md:block md:w-auto" id="navbar">
          <ul class="flex flex-col p-4 mt-4 border bg-[#292929] rounded-lg md:m-0 m-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:hover:opacity-75">Principal</a>
            </li>
            <li>
              <a href="/library" class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:hover:opacity-75">Biblioteca</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="h-24 md:h-48 relative">
        <h1 class="text-4xl absolute bottom-0 left-0">Feed</h1>
      </div>
    </nav>
</template>

<script lang="ts">
export default {
  name: 'Header'  
}
</script>