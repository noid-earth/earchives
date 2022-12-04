<template>
    <section>
        <aside class="bg-[#f6f6f6] dark:bg-[#292929] py-5 rounded-xl text-center">
            <router-link to="/">
                <img src="/icon.png" style="height: 1.75rem;" class="inline px-4"> 

                <span class="text-lg px-4">eArchives</span>
            </router-link>
        </aside>

        <aside class="bg-[#f6f6f6] dark:bg-[#292929] p-6 rounded-xl mt-6">
            <label class="inline-flex relative items-center cursor-pointer pb-4 ml-4">
                <input type="checkbox" value=true class="sr-only peer" onclick="toggleTheme()" id="THEME_SWITCH">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-[#1d1d1d] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-opacity dark:border-[#1d1d1d] peer-checked:bg-[#3036bf]"></div>
                <span class="ml-3">Alterar visualização</span>
            </label>

            <hr class="bg-[#fff] dark:bg-[#1d1d1d]">

            <div class="px-4 py-2 mt-2">
                <router-link to="/archives" class="text-base font-semibold accent bg-[#fff] dark:bg-[#1d1d1d] py-2 px-4 rounded-xl">
                    Arquivos
                </router-link> 
            </div>

            <ul class="px-4 list-insine">
                
                <li class="py-4" v-for="(subject, index) in archives.subjects" v-bind:key="index">

                    <router-link :to="('/archives/' + subject.subjectId)" class="hover:opacity-75 duration-300">
                        {{ subject.subjectName }}
                    </router-link> 

                    <button class="float-right bg-[#fff] dark:bg-[#1d1d1d] px-2 rounded-full hover:opacity-75 transition-opacity duration-300" type="button" :data-collapse-toggle="(subject.subjectId + '-dropdown')">
                        <i class="fa-solid fa-caret-down opacity-75"></i>
                    </button>

                    <ul v-if="(subject.years?.length > 0)" :id="(subject.subjectId + '-dropdown')" class="py-2 px-3 mt-2 rounded-xl list-insine hidden outline-2 outline-dashed outline-[#fff] dark:outline-[#1d1d1d]">
                        <li v-for="(year, index) in subject.years" v-bind:key="index" class="py-0.5 hover:opacity-75 duration-300">
                            <router-link :to="('/archives/' + subject.subjectId + '/' + year)">
                                {{ year }}º Ano
                            </router-link> 
                        </li>
                    </ul>
                </li>

            </ul>

            <hr class="bg-[#fff] dark:bg-[#1d1d1d] mt-4">

            <div class="px-4 py-2 mt-2">
                <a href="#" data-collapse-toggle="login-dropdown" class="text-base font-semibold accent bg-[#fff] dark:bg-[#1d1d1d] py-2 px-4 rounded-xl">
                    Administração
                </a>
            </div>

            <div class="px-4">
                <div id="login-dropdown" ref="loginDropwdown" class="mt-2 hidden">
                    <input type="text" v-model="loginData.username" class="w-full rounded-t-lg bg-[#fff] dark:bg-[#1d1d1d] border-none focus:ring-0" placeholder="Nome de usuário" name="username" required>
                    <input type="password" v-model="loginData.password" class="w-full rounded-b-lg bg-[#fff] dark:bg-[#1d1d1d] border-none focus:ring-0 mt-0.5" placeholder="Passe" name="password" required>

                    <button type="submit" @click="login();" class="mt-2 py-2 px-6 bg-accent rounded-lg hover:text-neutral-400 transition-all duration-300 text-white block text-center">
                        Entrar
                    </button>
                </div>
            </div>
        </aside>
    </section>
</template>

<script lang="ts">
    //@ts-ignore
    import {AuthService} from "../services/AuthService";

    export default {
        data() {
            return {
                
                loginData: {
                    username: '',
                    password: '',
                },
                archives: {
                    subjects: [
                        {
                            subjectName: 'História',
                            subjectId: 'history',
                            years: [10, 11, 12]
                        },
                        {
                            subjectName: 'Português',
                            subjectId: 'portuguese',
                            years: [11, 12]
                        },
                        {
                            subjectName: 'Aplicações Informáticas',
                            subjectId: 'ia',
                            years: [12]
                        }
                    ]
                }
            }
        },
        created() {

        },
        methods: {
            async login() {

            }
        }
    }
</script>