<template>
    <section>
        <aside class="bg-[#f6f6f6] dark:bg-[#292929] p-6 rounded-xl text-center">
            <router-link to="/">
                <img src="/icon.png" style="height: 1.75rem;" class="inline px-4"> 

                <span class="text-lg px-4">eArchives</span>
            </router-link>
        </aside>

        <aside class="bg-[#f6f6f6] dark:bg-[#292929] p-6 rounded-xl mt-6">
            <label class="inline-flex relative items-center cursor-pointer pb-4 ml-4">
                <input type="checkbox" value=true class="sr-only peer" onclick="toggleTheme()" id="THEME_SWITCH">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-[#1d1d1d] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#1d1d1d] peer-checked:bg-[#3036bf]"></div>
                <span class="ml-3">Alterar visualização</span>
            </label>

            <hr class="bg-[#fff] dark:bg-[#1d1d1d]">

            <ul class="px-4 list-insine">
                <li class="py-4">
                    <router-link to="/archive/history">
                        História
                    </router-link> 
                    <button class="float-right bg-[#fff] dark:bg-[#1d1d1d] px-2 rounded-full" type="button" data-collapse-toggle="history-dropdown">
                        <i class="fa-solid fa-caret-down opacity-75"></i>
                    </button>

                    <ul id="history-dropdown" class=" px-4 list-insine hidden">
                        <li>
                            11º Ano
                        </li>
                        <li>
                            12º Ano
                        </li>
                    </ul>
                </li>
                <li class="py-4">
                    <router-link to="/archive/portuguese">
                        Português
                    </router-link> 
                    <button class="float-right bg-[#fff] dark:bg-[#1d1d1d] px-2 rounded-full" type="button" data-collapse-toggle="portuguese-dropdown">
                        <i class="fa-solid fa-caret-down opacity-75"></i>
                    </button>

                    <ul id="portuguese-dropdown" class=" px-4 list-insine hidden">
                        <li>
                            11º Ano
                        </li>
                        <li>
                            12º Ano
                        </li>
                    </ul>
                </li>
                <li class="py-4">
                    <router-link to="/archive/ia">
                        Aplicações Informáticas
                    </router-link> 
                    <button class="float-right bg-[#fff] dark:bg-[#1d1d1d] px-2 rounded-full" type="button" data-collapse-toggle="ia-dropdown">
                        <i class="fa-solid fa-caret-down opacity-75"></i>
                    </button>

                    <ul id="ia-dropdown" class=" px-4 list-insine hidden">
                        <li>
                            12º Ano
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </section>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                path: []
            }
        }
    }
</script>