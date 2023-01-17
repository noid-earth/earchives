<script lang="ts">

export default {
    data() {
        return {
            Locales: [
                //@ts-ignore
                { code: "en", name: "English" },
                { code: "pt", name: "Português" },
            ],
            LocaleNow: {} as {code: string, name: string} | undefined,
        }
    },
    mounted() {
        let locale = this.$cookies.get("locale") ? this.$cookies.get("locale") : 'pt';
        this.LocaleNow = this.Locales.find((l) => l.code === locale);
    },
    methods: {
        changeLocale(code: string) {
            this.LocaleNow = this.Locales.find((locale) => locale.code === code);
            this.$cookies.set("locale", code);
        }
    }
}
</script>

<template>
    <div class="flex items-center md:order-2">
        <button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center justify-center cursor-pointer min-w-[6rem]">
            {{ LocaleNow?.name }}
        </button>
        <!-- Dropdown -->
        <div class="z-50 hidden my-4 list-none bg-zinc-200 rounded shadow" id="language-dropdown-menu">
            <ul class="py-1" role="none">
                <li v-for="(local, index) in Locales" v-bind:key="index">
                    <button @click="changeLocale(local.code)" class="block px-4 py-2 hover:bg-zinc-300 w-full" role="menuitem" :value="local.code">
                        <div class="inline-flex items-center"> {{ local.name }} </div>
                    </button>
                </li>
            </ul>
        </div>
        <button data-collapse-toggle="language-dropdown-menu" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-language-select" aria-expanded="false">
            ⚙️
        </button>
  </div>
</template>