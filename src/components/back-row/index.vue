<template>
  <van-cell
    title="后退"
    icon="arrow-left"
    class="back-row"
    @click="handleBackRoute"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'back-row',

  methods: {
    handleBackRoute() {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.back-row {
  margin-bottom: 24px;
  text-align: left;
  cursor: pointer;
}
</style>
