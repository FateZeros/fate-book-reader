<script>
import { defineComponent } from 'vue'
import Tabbars from '@/components/tab-bars' // @ is an alias to /src

export default defineComponent({
  name: 'Home',

  components: {
    Tabbars
  },

  setup() {
    return () => (
      <div class="home">
        <Tabbars />
      </div>
    )
  }
})
</script>
