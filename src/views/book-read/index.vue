<template>
  <div class="book-content-wrap">
    <div
      class="book-chapter-content"
      v-html="bookChapterContent"
      @click="handleShowReadSetting"
    />
    <van-popup
      v-model:show="showReadSetting"
      round
      position="bottom"
      :style="{ height: '20%' }"
      :overlay="false"
    >
      <div class="read-setting-wrap">
        <div class="read-chapter-actions">
          <span @click="handleReadChapter('pre')">上一章</span>
          <span @click="handleReadChapter('next')">下一章</span>
        </div>
        <ul class="read-setting-row">
          <li
            class="read-setting-item"
            @click="handleBack"
          >
            <div class="read-setting-item-back"></div>
            <div class="read-setting-item-word">返回</div>
          </li>
          <li
            class="read-setting-item"
            @click="handleShowBookMenu"
          >
            <div class="read-setting-item-menu"></div>
            <div class="read-setting-item-word">目录</div>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-popup
      v-model:show="showBookMenu"
      round
      position="bottom"
      :style="{ height: '80%' }"
      :overlay="true"
    >
      <BookChapters
        :bookChapters="bookChapterList"
        :currentChapter="bookReadRecordChapterIndex"
        @choseBookChapter="handleChoseBookChapter"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapActions, mapState } from 'vuex'
import { bookReadRecordKey } from '@/config'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { Toast } from 'vant'
import BookChapters from '@/components/book-chapters/index.vue'

export default defineComponent({
  name: 'book-read',

  components: {
    BookChapters
  },

  data() {
    return {
      // 当前书籍
      novelHrefDecode: '',
      // 当前阅读章节 index
      bookReadRecordChapterIndex: 0
    }
  },

  computed: {
    ...mapState('bookSearch', ['bookChapterList', 'bookChapterContent'])
  },

  setup() {
    const showReadSetting = ref(false)
    const showBookMenu = ref(false)

    const handleShowReadSetting = () => {
      showReadSetting.value = !showReadSetting.value
    }

    const handleShowBookMenu = (e: Event) => {
      if (e) e.stopPropagation()
      showReadSetting.value = false
      setTimeout(() => {
        showBookMenu.value = true
      }, 500)
    }

    return {
      showReadSetting,
      showBookMenu,
      handleShowReadSetting,
      handleShowBookMenu
    }
  },

  mounted() {
    /**
     * 1.获取全部章节
     * 2.查看是否有章节记录，没有则从0开始阅读
     * 3.根据章节查询章节内容
     */
    const novelHref: any = this.$route.query.novelHref
    this.novelHrefDecode = decodeURIComponent(novelHref)
    Toast.loading({
      message: '努力加载中...',
      forbidClick: true
    })
    this.searchBookChapterList({
      novelHref: this.novelHrefDecode
    }).then(() => {
      const bookReadRecord = getLocalStorage(bookReadRecordKey) || {}
      // 当前书籍的阅读章节记录
      this.bookReadRecordChapterIndex =
        bookReadRecord[this.novelHrefDecode] || 0
      const bookChapterHref = this.bookChapterList[
        this.bookReadRecordChapterIndex
      ].novelChapterHref
      this.handleSearchBookContent(bookChapterHref)
    })
  },

  methods: {
    ...mapActions('bookSearch', [
      'searchBookChapterList',
      'searchBookContent',
      'setBookContentEmpty'
    ]),

    handleBack() {
      this.setBookContentEmpty()
      this.$router.go(-1)
    },

    handleSearchBookContent(bookChapterHref: string) {
      Toast.loading({
        message: '努力加载中...',
        forbidClick: true
      })
      this.searchBookContent({
        novelChapterHref: bookChapterHref
      })
        .then(() => {
          const bookReadRecord = getLocalStorage(bookReadRecordKey) || {}
          // 翻页滚动到顶部
          window.scrollTo(0, 0)
          bookReadRecord[this.novelHrefDecode] = this.bookReadRecordChapterIndex
          setLocalStorage(bookReadRecordKey, bookReadRecord)
        })
        .finally(() => {
          Toast.clear()
        })
    },

    handleReadChapter(readType: string) {
      if (readType === 'pre') {
        if (this.bookReadRecordChapterIndex > 1) {
          this.bookReadRecordChapterIndex -= 1
        } else {
          Toast({
            message: '前面没有章节啦～',
            position: 'top'
          })
          return false
        }
      } else {
        if (this.bookReadRecordChapterIndex < this.bookChapterList.length - 1) {
          this.bookReadRecordChapterIndex += 1
        } else {
          Toast({
            message: '后面没有章节啦～',
            position: 'top'
          })
          return false
        }
      }
      const bookChapterHref = this.bookChapterList[
        this.bookReadRecordChapterIndex
      ].novelChapterHref
      this.handleSearchBookContent(bookChapterHref)
    },

    handleChoseBookChapter(index: number) {
      const bookChapterHref = this.bookChapterList[index].novelChapterHref
      this.bookReadRecordChapterIndex = index
      this.showBookMenu = false
      this.handleSearchBookContent(bookChapterHref)
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
