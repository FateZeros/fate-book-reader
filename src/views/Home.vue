<template>
  <div class="home">
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component"></component>
      </transition>
    </router-view>
    <Tabbars />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Tabbars from '@/components/tab-bars' // @ is an alias to /src

export default defineComponent({
  name: 'Home',

  components: {
    Tabbars
  },

  watch: {
    // $route(to, from) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    // }
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
