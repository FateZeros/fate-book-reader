<template>
  <ul class="book-chapters-wrap">
    <li
      v-for="(item, index) in bookChapters"
      :key="item.id"
      @click="handleChoseBookChapter(index)"
      :class="['book-chapters-item', {'book-current-item': currentChapter === index }]"
    >
      {{item.novelChapterName}}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'book-chapters',

  props: {
    bookChapters: {
      type: Array,
      default: () => []
    },
    currentChapter: {
      type: Number,
      default: 0
    }
  },

  methods: {
    handleChoseBookChapter(index: number) {
      if (index !== this.currentChapter) {
        this.$emit('choseBookChapter', index)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.book-chapters-wrap {
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  .book-chapters-item {
    width: 100%;
    height: 34px;
    line-height: 34px;
    text-align: left;
    font-size: 14px;
  }

  .book-current-item {
    color: #1871f8;
  }
}
</style>
