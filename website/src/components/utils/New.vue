<script lang="ts">
function isBetween(value: number, a: number, b: number) {
    var min = Math.min(a, b),
        max = Math.max(a, b);
    return value > min && value < max;
}

export default {
    data() {
        return {
            seen: this.$cookies.get(`NEW_ITEM_BADGE_` + this.id + `_SEEN`),
        };
    },
    props: {
        id: {
            required: true,
            type: String,
        },
    },
    mounted() {
        document.onclick = (e) => {
            let refs = this.$refs[this.id] as any;
            if (!refs) return;
            let notificationPos = refs.getBoundingClientRect();

            let isXInRange = isBetween(
                e.clientX,
                Number(notificationPos.x) + 50,
                Number(notificationPos.x) - 50,
            );
            let isYInRange = isBetween(
                e.clientY,
                Number(notificationPos.y) + 50,
                Number(notificationPos.y) - 50,
            );

            if (isXInRange && isYInRange) {
                this.seen = true;
                this.$cookies.set(`NEW_ITEM_BADGE_` + this.id + `_SEEN`, true);
            }
        };
    },
};
</script>

<template>
    <span
        v-if="!seen"
        :ref="id"
        class="absolute top-0 right-0 inline-block h-2 w-2 translate-x-1/2 -translate-y-1/2 transform animate-pulse-slow rounded-full bg-red-500"
    ></span>
</template>
