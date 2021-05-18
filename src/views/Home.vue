<script>
import { defineComponent } from 'vue'
import HelloWorld from '@/components/hello-word' // @ is an alias to /src

export default defineComponent({
  name: 'Home',

  components: {
    HelloWorld
  },

  setup() {
    return () => (
      <div class="home">
        <HelloWorld msg={'test'} />
      </div>
    )
  }
})
</script>
