<template>
    <VanSwipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
        <VanSwipeItem v-for="(item, index) in list" :key="index">
            <img :src="item.carouselUrl" alt=""
            @click="goTo(item.carouselUrl)"
            />
        </VanSwipeItem>
    </VanSwipe>
</template>

<script lang="ts" setup>
defineProps({
    list: Array<{carouselUrl: string}>
})

const goTo = (url: string) => {
    window.open(url);
}
</script>

<style lang='less' scoped>
  .my-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
