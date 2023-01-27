<script lang="ts">
type VIEW_MODE = 'default' | 'reading' | 'chill';
import New from '../../components/utils/New.vue';

export default {
    components: {
        New,
    },
    data() {
        return {
            articleId: this.$route.params.articleId,
            viewMode:
                this.$cookies.get(
                    `ARTICLE_${this.$route.params.articleId}_VIEWMODE`,
                ) || ('default' as VIEW_MODE),
        };
    },
    mounted() {},
    methods: {
        switchMode(mode: VIEW_MODE) {
            this.viewMode = mode;
            this.$cookies.set(`ARTICLE_${this.articleId}_VIEWMODE`, mode);
        },
        isOnMode(mode: VIEW_MODE) {
            return this.viewMode === mode;
        },
    },
};
</script>

<template>
    <!-- BANNER IMAGE BOX -->
    <div class="mt-12 md:px-20">
        <img
            id="articleBanner"
            class="max-h-80 w-full rounded-xl object-cover"
            src="https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/63c6e5fc81fbdd4500fa95e2_BackupBlogHeaders_Batch2Artboard%206.png"
            alt=""
        />
    </div>

    <!-- BODY -->
    <div
        class="mt-[-2rem] rounded-xl bg-off-white p-4 pt-12 dark:bg-little-grey md:px-20"
    >
        <!--HEAD-->
        <div>
            <h3 class="font-display text-base font-bold uppercase text-accent">
                <a href="/?subject=História">História</a>
            </h3>
            <h1
                class="mt-0.5 font-display text-4xl font-bold uppercase md:text-5xl"
            >
                Guião de Estudos guerra fria
            </h1>
            <div class="mt-2 text-base font-bold text-accent">
                <span class="rounded-xl bg-zinc-200 px-4 dark:bg-not-black">
                    <a href="/?year=12">12º Ano</a>
                </span>
            </div>
        </div>

        <!-- VIEW MODE SWITCH -->
        <div
            class="-pb-1 relative mt-4 hidden cursor-pointer rounded bg-zinc-200 text-base font-bold dark:bg-not-black xl:inline-block"
        >
            <span
                class="rounded px-3"
                @click="switchMode('default')"
                :class="{ 'bg-accent text-white/75': isOnMode('default') }"
                ><i class="fa-solid fa-tower-observation"></i> Visão Geral</span
            >
            <span
                class="rounded px-3"
                @click="switchMode('chill')"
                :class="{ 'bg-[#00c477] text-green-700': isOnMode('chill') }"
                ><i class="fa-solid fa-leaf"></i> Relaxe</span
            >
            <span
                class="rounded px-3"
                @click="switchMode('reading')"
                :class="{ 'bg-[#FEE75C] text-yellow-700': isOnMode('reading') }"
                >Leitura <i class="fa-solid fa-book-open"></i
            ></span>
            <New :id="'switch_view_mode'" />
        </div>

        <div
            class="grid gap-x-4"
            :class="{ 'grid-cols-3': isOnMode('reading') }"
        >
            <div
                class="col-span-2 mt-4 border-t-4 border-zinc-200 pt-6 indent-6 text-[#151a1e] dark:border-not-black dark:text-zinc-200"
                :class="{
                    'text-lg text-black': isOnMode('reading'),
                    'text-lg text-zinc-800': isOnMode('chill'),
                }"
            >
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro dolores iste tempore, autem asperiores quibusdam
                    consequatur, obcaecati incidunt voluptatibus, modi in
                    tempora placeat maxime labore possimus nam eveniet qui illo.
                </p>
            </div>

            <div
                v-if="isOnMode('reading')"
                class="rounded-xl bg-zinc-300 p-6 dark:bg-not-black"
            >
                <h3 class="font-display font-bold">Fontes/Documentos</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
#articleBanner {
    animation: ShowArticleBanner ease-in 0.8s;
}

@keyframes ShowArticleBanner {
    0% {
        max-height: 0rem;
    }
    100% {
        max-height: 20rem;
    }
}
</style>
