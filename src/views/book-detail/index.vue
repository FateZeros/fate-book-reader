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
    <div class="book-detail-footer">
      <van-button type="primary">加入书架</van-button>
      <van-button type="primary" class="ml24">开始阅读</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLocalStorage } from '@/utils/storage'
import BackRow from '@/components/back-row/index.vue'
import { bookDetailKey } from '@/config'
// import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'book-detail',

  components: {
    BackRow
  },

  setup() {
    const bookDetail = getLocalStorage(bookDetailKey)

    // onMounted(() => {

    // })

    // unMounted(() => {
    //   removeLocalStorage('FATE_BOOK_DETAIL')
    // })

    return {
      bookDetail
    }
  },

  methods: {
    // ...mapActions()
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
