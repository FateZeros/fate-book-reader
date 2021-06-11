<template>
  <div>
    <van-search
      v-model="searchValue"
      @search="onSearch"
      shape="round"
      background="#1871f8"
      placeholder="请输入搜索关键词"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in bookNameList"
        :key="item.id"
        :title="item.novelName"
      />
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'book-search',

  setup() {
    return {}
  },

  data() {
    return {
      searchValue: '',
      loading: false,
      finished: false
    }
  },

  computed: {
    ...mapState('bookSearch', ['bookNameList'])
  },

  methods: {
    ...mapActions('bookSearch', ['searchBookList']),

    onSearch() {
      const postData = {
        name: this.searchValue,
        page: 1
      }
      this.searchBookList(postData)
    },

    onLoad() {
      console.log(1)
    }
  }
})
</script>
