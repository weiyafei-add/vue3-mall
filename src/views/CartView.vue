<template>
  <div class="cart-box">
    <SimpleHeader :name="'购物车'" :noback="true" />
    <div class="cart-body">
      <VanCheckboxGroup @change="groupChange" v-model="state.result">
        <VanSwipeCell :right-width="50" v-for="(item, index) in state.list">
          <div class="good-item">
            <VanCheckbox :name="item.cartItemId" />
            <div class="good-img">
              <img :src="$filters.prefix(item.goodsCoverImg)" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">
                  ¥{{ item.sellingPrice }}
                </div>
                <VanStepper integer :min="1" :max="5" :model-value="item.goodsCount" :name="item.cartItemId" async-change
                  @change="onChange" />
              </div>
            </div>
          </div>
          <template #right>
            <VanButton square icon="delete" type="danger" class="delete-button" @click="deleteGood(item.cartItemId)" />
          </template>
        </VanSwipeCell>
      </VanCheckboxGroup>
    </div>
    <VanSubmitBar v-if="state.list.length > 0" class="submit-all van-hairline--top" :price="total * 100" button-text="结算"
      button-type="primary" @submit="onSubmit">
      <VanCheckbox @click="allCheck" v-model:checked="state.checkAll">全选</VanCheckbox>
    </VanSubmitBar>
    <NavBar />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/index';
import { closeToast, showLoadingToast } from 'vant';
import { getCart } from '@/service/cart';
import SimpleHeader from '@/components/SimpleHeader.vue';
import NavBar from '@/components/NavBar.vue';

const router = useRouter();
const cart = useCartStore();
const state = reactive<{
  list: Array<Record<string, any>>,
  [key: string]: any
}>({
  list: [],
  result: [],
  checkAll: false,
})

onMounted(() => {
  init();
})

const groupChange = (result: Array<number>) => {
  if (result.length === state.list.length) {
    state.checkAll = true;
  } else {
    state.checkAll = false;
  }

  state.result = result;
}

const allCheck = () => {
  state.result = state.checkAll ? [] : state.list.map((item) => item.cartItemId)
}

const init = async () => {
  showLoadingToast({ message: '加载中...', forbidClick: true });

  const { data } = await getCart({ pageNumber: 1 });

  state.list = data;
  state.result = data.map((item: any) => item.cartItemId);
  closeToast();
}

const onSubmit = () => {

}

const total = computed(() => {
  let sum = 0;
  let _list = state.list.filter((item) => state.result.includes(item.cartItemId));
  _list.forEach((item) => {
    sum += item.goodsCount * item.sellingPrice
  })
  return sum;
})

const deleteGood = (id: number) => {
  console.log(id)
}

const onChange = (value: number) => {
  console.log(value);
}

</script>

<style lang="less">
@import '../common/style/mixin';

.cart-box {
  .cart-header {
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
    border-bottom: 1px solid #dcdcdc;

    .cart-name {
      font-size: 14px;
    }
  }

  .cart-body {
    margin: 44px 0 100px 0;
    padding-left: 10px;

    .good-item {
      display: flex;

      .good-img {
        img {
          .wh(100px, 100px)
        }
      }

      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;

        .good-title {
          display: flex;
          justify-content: space-between;
        }

        .good-btn {
          display: flex;
          justify-content: space-between;

          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }

          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }

    .delete-button {
      width: 50px;
      height: 100%;
    }
  }

  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;

    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }

    .van-icon-smile-o {
      font-size: 50px;
    }

    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  .submit-all {
    margin-bottom: 64px;

    .van-checkbox {
      margin-left: 10px
    }

    .van-submit-bar__text {
      margin-right: 10px
    }

    .van-submit-bar__button {
      background: @primary;
    }
  }

  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
