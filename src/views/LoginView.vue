<template>
    <div class="login">
        <SimpleHeader :name="state.type === 'login' ? '登录' : '注册'" :back="'/home'" @callback="callback">
        </SimpleHeader>
        <img class="logo" src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="">
        <div v-if="state.type === 'login'" class="login-body login">
            <VanForm @submit="onSubmit">
                <VanField
                    v-model="state.username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{
                        required: true,
                        message: '请填写用户名'
                    }]"
                    autocomplete="off"
                />
                <VanField
                    v-model="state.password"
                    name="password"
                    label="密码"
                    type='password'
                    placeholder="密码"
                    :rules="[{
                        required: true,
                        message: '请填写密码'
                    }]"
                />
                <VanField
                    center
                    clearable
                    label="验证码"
                    placeholder="输入验证码"
                    v-model="state.verify"
                >
                   <template #button>
                        <VueImageVerify ref="verifyRef"/>
                   </template> 
                </VanField>
                <div style="margin: 16px;">
                    <div class="link-register" @click="toggle('register')">
                        立即注册
                    </div>
                    <VanButton
                    color="#1baeae"
                    native-type="submit"
                    round
                    block
                    >
                        登录
                    </VanButton>
                </div>
            </VanForm>
        </div>
        <div v-else class="login-body register">
            <VanForm @submit="onSubmit">
                <VanField
                  v-model="state.username1"
                  name="username1"
                  label="用户名"
                  placeholder="用户名"
                  :rules="[{required: true, message: '请填写用户名'}]"
                />
                <VanField
                  v-model="state.password1"
                  name="password1"
                  label="密码"
                  placeholder="密码"
                  :rules="[{required: true, message: '请填写密码'}]"
                />
                <VanField
                  label="验证码"
                  center
                  name=""
                  placeholder="请输入验证码"
                  v-model="state.verify"
                >
                  <template #button>
                    <VueImageVerify ref="verifyRef" />
                  </template>
                </VanField>
                <div style="margin: 16px;">
                  <div class="link-login" @click="toggle('login')">
                    已有登陆账号
                  </div>
                  <VanButton round block color="#1baeae" native-type='submit'>
                    注册
                  </VanButton>
                </div>
            </VanForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import SimpleHeader from '@/components/SimpleHeader.vue'
import VueImageVerify from '@/components/VueImageVerify.vue';
import type {VueImageVerifyState} from '@/components/VueImageVerify.vue';
import { showFailToast, showSuccessToast } from 'vant';
import { reactive, ref } from 'vue';
import { login, register } from '@/service/user';
import md5 from 'js-md5';
import { setLocal } from '@/common/js/utils';

type type = 'login'| 'register';
type value = 'password1' | 'username1' | 'password' | 'username';



const verifyRef = ref<{state:VueImageVerifyState}>();

const state = reactive<{type: type, [key: string]:  any}>({
    type: 'login',
    username: '',
    password: '',
    username1: '',
    password1: '',
    imgCode: '',
    verify: ''
})

const toggle = (v: type) => {
    state.type = v;
    state.verify = ''
}

const callback = () => {
  console.log('callback runing')
}

const onSubmit = async (value: Record<value, any>) => {
  state.imgCode = verifyRef.value!.state.imgCode ||'';
  console.log(state.imgCode)
  if (state.verify.toLowerCase() != state.imgCode.toLowerCase()) {
    showFailToast('验证码有误')
    return;
  }
  if (state.type === 'login') {
    const {data} = await login({
      'loginName': value.username,
      'passwordMd5': md5(value.password),
    })
    setLocal('token', data);
    window.location.href = '/';
  } else {
    await register({
      'loginName': value.username1,
      'password': value.password1,
    })
    showSuccessToast('注册成功');
    state.type = 'login';
    state.verify = ''
  }
}

</script>

<style lang="less">
  .login {
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 80px auto 20px;
    }
    .login-body {
      padding: 0 20px;
    }
    .login {
      .link-register {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .register {
      .link-login {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .verify-bar-area {
      margin-top: 24px;
      .verify-left-bar {
        border-color: #1baeae;
      }
      .verify-move-block {
        background-color: #1baeae;
        color: #fff;
      }
    }
    .verify {
      >div {
        width: 100%;
      }
      display: flex;
      justify-content: center;
      .cerify-code-panel {
        margin-top: 16px;
      }
      .verify-code {
        width: 40%!important;
        float: left!important;
      }
      .verify-code-area {
        float: left!important;
        width: 54%!important;
        margin-left: 14px!important;
        .varify-input-code {
          width: 90px;
          height: 38px!important;
          border: 1px solid #e9e9e9;
          padding-left: 10px;
          font-size: 16px;
        }
        .verify-change-area {
          line-height: 44px;
        }
      }
    }
  }
</style>
