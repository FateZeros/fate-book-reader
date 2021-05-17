import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: String
  },

  setup(props) {
    return () => (
      <div class="hello">
        <h1>{props.msg}</h1>
      </div>
    )
  }
})
