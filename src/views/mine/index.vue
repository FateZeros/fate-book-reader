<template>
  <div class="mine-wrap">
    <van-cell
      title="清空书架"
      is-link
      @click="handleClearBookShelf"
    />
    <van-cell
      title="分享网址"
      is-link
      to="share-us"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { removeLocalStorage } from '@/utils/storage'
import { bookShelfKey, bookReadRecordKey } from '@/config'
import { Dialog } from 'vant'

export default defineComponent({
  name: 'mine',

  methods: {
    handleClearBookShelf() {
      Dialog.confirm({
        title: '清空书架',
        message: '确定清空书架吗？'
      })
        .then(() => {
          // on confirm
          removeLocalStorage(bookShelfKey)
          removeLocalStorage(bookReadRecordKey)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.mine-wrap {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
