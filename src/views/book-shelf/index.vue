<template>
  <div class="book-shelf-wrap">
    <ul v-if="bookShelfList.length > 0" class="book-shelf-list">
      <li class="book-shelf-item" v-for="item in bookShelfList" :key="item.novelHref" @click="handleReadBook(item)">
        <div class="book-shelf-item-img">
          <img :src="item.novelImg" alt="" />
        </div>
        <div class="book-shelf-item-name">{{item.novelName}}</div>
      </li>
    </ul>
    <van-empty v-else description="暂无书籍，快去书城搜下吧～" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLocalStorage } from '@/utils/storage'
import { bookShelfKey } from '@/config'
import { IBookNameList } from '@/interface/book-search'

export default defineComponent({
  name: 'book-shelf',

  setup() {
    const bookShelfList = getLocalStorage(bookShelfKey) || []
    return {
      bookShelfList
    }
  },

  methods: {
    handleReadBook(item: IBookNameList): void {
      this.$router.push({
        name: 'book-read',
        query: {
          novelHref: encodeURIComponent(item.novelHref)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
