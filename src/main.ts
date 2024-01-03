import 'vant/es/button/style'
import './assets/main.css'
import './common/style/theme.css'
import 'vant/es/toast/style'
import 'lib-flexible/flexible'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import {
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Divider,
  Popup,
  Overlay,
  Loading,
  Dialog,
  ContactCard,
  Form,
  AddressEdit,
  AddressList,
  Field,
  CellGroup,
  Cell,
  SwipeCell,
  Icon,
  Stepper,
  Card,
  Checkbox,
  CheckboxGroup,
  Button,
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  SubmitBar,
  Toast,
  Skeleton
} from 'vant'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.log(err)
}

app.use(createPinia())

app.use(router)

app
  .use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Skeleton)

app.config.globalProperties.$filters = {
  prefix(url: string) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

app.mount('#app')
