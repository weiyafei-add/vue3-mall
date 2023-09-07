<template>
    <div ref="wrapperRef" class="scroll-wrapper">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import type { BScrollInstance } from 'better-scroll';
import { ref, onMounted, nextTick } from 'vue';
import BScroll from 'better-scroll';
import { onUpdated } from 'vue';

const wrapperRef = ref();
let bs: BScrollInstance;

defineProps({
    probeType: {
        type: Number,
        default: 1,
    },
    click: {
        type: Boolean,
        default: true,
    },
    scrollX: {
        type: Boolean,
        default: false,
    },
    listenScroll: {
        type: Boolean,
        default: false,
    },
    scrollData: {
        type: Array,
        default: null
    },
    pullup: {
        type: Boolean,
        default: false,
    },
    pulldown: {
        type: Boolean,
        default: false,
    },
    beforeScroll: {
        type: Boolean,
        default: false
    },
    refreshDelay: {
        type: Number,
        default: 20
    }
})

// 解决初始加载后无法滚动的问题。
onUpdated(() => {
    bs.refresh();
})

onMounted(() => {
    nextTick(() => {
        bs = new BScroll(wrapperRef.value, {
            probeType: 3,
            click: true,
        })
        bs.on('scroll', () => {
            console.log('scrolling')
        })
        bs.on('scrollEnd', () => {
            console.log('scrollingEnd')
        })

    })
})

</script>

<style lang="less" scoped>
.scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    touch-action: pan-y;
}
</style>