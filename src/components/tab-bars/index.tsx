import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tabBars',

  setup() {
    return () => (
      <van-tabbar>
        <van-tabbar-item icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    )
  }
})
