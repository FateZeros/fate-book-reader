<template>
  <div class="book-search-wrap">
    <van-search
      v-model="searchValue"
      @search="onSearch"
      shape="round"
      background="#1871f8"
      placeholder="请输入搜索关键词"
      class="book-search-input"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="book-name-list-wrap"
      v-if="bookNameList.length > 0"
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
    </van-list>
    <van-empty v-else description="可以搜索你想看的书籍～" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import RightArrow from '@/components/right-arrow/index.vue'
import { bookDetailKey } from '@/config'
import { setLocalStorage } from '@/utils/storage'
import { Toast } from 'vant'

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
      finished: false,
      currentPage: 1
    }
  },

  computed: {
    ...mapState('bookSearch', ['bookNameList'])
  },

  unmounted() {
    this.currentPage = 1
  },

  methods: {
    ...mapActions('bookSearch', ['searchBookList']),

    getBookNameList() {
      const postData = {
        name: this.searchValue,
        page: this.currentPage
      }
      Toast.loading({
        message: '努力加载中...',
        forbidClick: true
      })
      this.searchBookList(postData).then(() => {
        this.currentPage += 1
        this.loading = false
      }).finally(() => {
        Toast.clear()
      })
    },

    onSearch() {
      this.getBookNameList()
    },

    onLoad() {
      if (this.loading) {
        this.getBookNameList()
      }
    },

    handleGoBookDetail(item: any) {
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
