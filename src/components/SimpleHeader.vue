<template>
    <header class="simple-header van-hairline--bottom">
        <i v-if="!isback" class="nbicon nbfanhui" @click="goBack"></i>
        <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <div class="simple-header-name">{{ name }}</div>
        <i class="nbicon nbmore"></i>
    </header>
</template>

<script lang="ts" setup>
const props = defineProps({
        name: {
            type: String,
            default: ''
        },
        back: {
            type: String,
            default: '',
        },
        noback: {
            type: Boolean,
            default: false,
    }
})

const emits = defineEmits(['callback']);


import { ref } from 'vue';
import { useRouter } from 'vue-router';


const isback = ref(props.noback);
const router = useRouter();

const goBack = () => {
    if (!props.back) {
        router.go(-1)
    } else {
        router.push({path: props.back})
    }
    emits('callback')
}

</script>

<style lang="less" scoped>
  @import '../common//style/mixin.less';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
      font-size: 14px;
    }
  }
  .block {
    height: 44px;
  }
</style>
