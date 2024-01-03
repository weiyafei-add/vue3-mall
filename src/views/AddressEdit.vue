<template>
    <div class="address-edit-box">
        <SimpleHeader :name="`${state.type == 'add' ? '新增地址' : '修改地址'}`" />
        <VanAddressEdit class="edit" show-set-default show-search-result :area-columns-placeholder="['请选择', '请选择', '请选择']"
            :area-list="state.areaList" :show-delete="true" @save="onSave" />
    </div>
</template>

<script setup lang="ts">
import SimpleHeader from '@/components/SimpleHeader.vue';
import { reactive } from 'vue';
import { tdist } from '@/common/js/utils'
import { onMounted } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { EditAddress, addAddress } from '@/service/address';
const router = useRouter();

const state = reactive({
    type: 'add',
    areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
    },
    searchResult: [],
});

onMounted(async () => {
    // 省市区列表构造
    let _province_list = {}
    let _city_list = {}
    let _county_list = {}
    tdist.getLev1().forEach(p => {
        _province_list[p.id] = p.text
        tdist.getLev2(p.id).forEach(c => {
            _city_list[c.id] = c.text
            tdist.getLev3(c.id).forEach(q => _county_list[q.id] = q.text)
        })
    })
    state.areaList.province_list = _province_list
    state.areaList.city_list = _city_list
    state.areaList.county_list = _county_list
});

const onSave = async (content: any) => {
    const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
    }
    await state.type == 'add' ? addAddress(params) : EditAddress(params)
    showToast('保存成功')
    setTimeout(() => {
        router.back()
    }, 1000)
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.edit {
    .van-field__body {
        textarea {
            height: 26px !important;
        }
    }
}

.address-edit-box {
    padding-top: 60px;

    .van-address-edit {
        .van-button--danger {
            background: @primary;
            border-color: @primary;
        }

        .van-switch--on {
            background: @primary;
        }
    }
}
</style>
