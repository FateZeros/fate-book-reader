<template>
  <div class="book-detail-wrap">
    <BackRow />
    <div class="book-detail-info">
      <div class="detail-img">
        <img :src="bookDetail.novelImg" />
      </div>
      <ul class="detail-info">
        <li class="info-row">{{bookDetail.novelName}}</li>
        <li class="info-row row-desc">作者:{{bookDetail.novelAuthor}}</li>
      </ul>
    </div>
    <div class="book-detail-desc">简介:{{bookDetail.novelDesc}}</div>
    <div class="book-detail-chapter">
      <div class="chapter-all-title">全部章节 - {{bookChapterList.length}} 章</div>
      <BookChapters
        :bookChapters="bookChapterList"
      />
    </div>
    <div class="book-detail-footer">
      <van-button type="primary" @click="handleAddBookShelf">加入书架</van-button>
      <van-button type="primary" class="ml24" @click="handleReadBook">开始阅读</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import BackRow from '@/components/back-row/index.vue'
import { bookDetailKey, bookShelfKey } from '@/config'
import { mapActions, mapState } from 'vuex'
import { IBookNameList } from '@/interface/book-search'
import { Toast } from 'vant'
import BookChapters from '@/components/book-chapters/index.vue'

export default defineComponent({
  name: 'book-detail',

  components: {
    BackRow,
    BookChapters
  },

  data() {
    return {
      bookDetail: {
        novelHref: ''
      }
    }
  },

  computed: {
    ...mapState('bookSearch', ['bookChapterList', 'bookChapterContent'])
  },

  mounted() {
    const bookDetail: any = getLocalStorage(bookDetailKey)
    this.bookDetail = bookDetail
    this.searchBookChapterList({
      novelHref: this.bookDetail.novelHref
    })
  },

  methods: {
    ...mapActions('bookSearch', ['searchBookChapterList']),

    handleAddBookShelf() {
      const bookShelfList = getLocalStorage(bookShelfKey) || []
      // 是否已在书架列表
      const isExist = bookShelfList.some((item: IBookNameList) => item.novelHref === this.bookDetail.novelHref)
      if (isExist) {
        Toast({
          message: '已添加在书架了～',
          position: 'top'
        })
      } else {
        bookShelfList.push(this.bookDetail)
        setLocalStorage(bookShelfKey, bookShelfList)
        Toast.success('成功添加～')
      }
    },

    handleReadBook() {
      this.$router.push({
        name: 'book-read',
        query: {
          novelHref: encodeURIComponent(this.bookDetail.novelHref)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
