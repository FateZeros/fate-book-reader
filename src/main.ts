import 'lib-flexible'
import { createApp } from 'vue'
import {
  Tabbar,
  TabbarItem,
  Search,
  List,
  Cell,
  Empty,
  Button,
  Toast,
  Dialog,
  Popup
} from 'vant'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

const app = createApp(App)
app.use(store)
app.use(router)
// 注册 UI 组件
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(List)
app.use(Cell)
app.use(Empty)
app.use(Button)
app.use(Toast)
app.use(Dialog)
app.use(Popup)

// 挂载 app
app.mount('#app')
