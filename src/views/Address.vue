<template>
    <div class="address-box">
        <SimpleHeader :name="'地址管理'" />
        <div class="address-item">
            <VanAddressList :list="state.list" v-model="state.chosenAddressId" default-tag-text="默认" @add="onadd"
                @edit="edit">

            </VanAddressList>
        </div>
    </div>
</template>

<script setup lang="ts">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { getAddressList } from '@/service/address';
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const [route, router] = [useRoute(), useRouter()];


const state = reactive({
    list: [],
    from: route.query.from,
    chosenAddressId: '1'
})

onMounted(async () => {
    const { data = [] } = await getAddressList();
    state.list = data.map((item: any) => {
        return {
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
            isDefault: !!item.defaultFlag
        }
    })
})

const onadd = () => {
    router.push({ path: '/address-edit', query: { type: 'add', from: state.from } })
}

const edit = () => {

}
</script>

<style lang="less" scoped>
@import '../common/style/mixin.less';

.address-box {
    padding-top: 66px;

    .van-radio__icon {
        display: none;
    }

    .address-item {
        .van-button {
            background: @primary;
            border-color: @primary;
        }
    }
}
</style>
