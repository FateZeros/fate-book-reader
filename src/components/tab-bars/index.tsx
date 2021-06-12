import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tabBars',

  setup() {
    return () => (
      <van-tabbar route>
        <van-tabbar-item icon="home-o" replace to="/book-shelf">
          书架
        </van-tabbar-item>
        <van-tabbar-item icon="search" replace to="/book-search">
          书城
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/mine">
          我的
        </van-tabbar-item>
      </van-tabbar>
    )
  }
})
