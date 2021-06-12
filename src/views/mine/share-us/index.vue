<template>
  <div class="share-us-wrap">
    <BackRow />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import BackRow from '@/components/back-row/index.vue'

export default defineComponent({
  name: 'share-us',

  components: {
    BackRow
  },

  setup() {
    onMounted(() => {
      console.log(222)
    })
  }
})
</script>

<style lang="scss" scoped>
.share-us-wrap {
  width: 100%;
  height: 100%;
}
</style>
