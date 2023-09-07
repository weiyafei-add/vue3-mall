<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router'
import { reactive } from 'vue';
const router = useRouter();

const state = reactive({
  transitionName: 'slide-left',
})

router.beforeEach((to, from) => {
})

</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
