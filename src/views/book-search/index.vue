<template>
  <div class="book-search-wrap">
    <form action="/">
      <van-search
        v-model="searchValue"
        @search="onSearch"
        shape="round"
        background="#1871f8"
        placeholder="请输入搜索关键词"
        class="book-search-input"
      />
    </form>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="book-name-list-wrap"
    >
      <div
        v-for="item in bookNameList"
        :key="item.id"
        class="book-name-list-item"
        @click="handleGoBookDetail(item)"
      >
        <div class="item-img">
          <img :src="item.novelImg" alt="" />
        </div>
        <div class="item-title">
          <div class="item-title-name">{{item.novelName}}</div>
          <div class="item-title-author">{{item.novelAuthor}}</div>
        </div>
        <RightArrow />
      </div>
      <van-empty v-if="bookNameList.length === 0" description="可以搜索你想看的书籍～" />
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import RightArrow from '@/components/right-arrow/index.vue'
import { bookDetailKey } from '@/config'
import { setLocalStorage } from '@/utils/storage'
import { Toast } from 'vant'
import { IBookNameList } from '@/interface/book-search'

export default defineComponent({
  name: 'book-search',

  setup() {
    return {}
  },

  components: {
    RightArrow
  },

  data() {
    return {
      searchValue: '',
      loading: false,
      finished: false
    }
  },

  computed: {
    ...mapState('bookSearch', ['bookNameList', 'bookNameCurrentPage', 'bookNameTotalPage'])
  },

  unmounted() {
    this.setBookNameListEmpty()
  },

  methods: {
    ...mapActions('bookSearch', ['searchBookList', 'setBookNameListEmpty']),

    getBookNameList(page: number) {
      if (this.searchValue) {
        const postData = {
          name: this.searchValue,
          page
        }
        Toast.loading({
          message: '努力加载中...',
          forbidClick: true
        })
        this.loading = true
        this.searchBookList(postData).then(() => {
          if (this.bookNameCurrentPage === this.bookNameTotalPage) {
            this.finished = true
          }
          this.loading = false
        }).finally(() => {
          Toast.clear()
        })
      }
    },

    onSearch() {
      this.setBookNameListEmpty()
      this.getBookNameList(1)
    },

    onLoad() {
      if (this.bookNameCurrentPage < this.bookNameTotalPage) {
        if (!this.loading) {
          this.getBookNameList(this.bookNameCurrentPage + 1)
        }
      }
    },

    handleGoBookDetail(item: IBookNameList) {
      setLocalStorage(bookDetailKey, item)
      this.$router.push({
        name: 'book-detail'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
