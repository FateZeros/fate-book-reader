<template>
  <div class="share-us-wrap">
    <BackRow />
    <div class="qrcode-wrap" />
    <p>扫码即可访问</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import BackRow from '@/components/back-row/index.vue'

export default defineComponent({
  name: 'share-us',

  components: {
    BackRow
  }
})
</script>

<style lang="scss" scoped>
.share-us-wrap {
  width: 100%;
  height: 100%;

  .qrcode-wrap {
    width: 100%;
    height: 200px;
    background: url('../../../assets/qrcode.png') no-repeat center;
    background-size: 200px;
  }
}
</style>
