<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-btn
        v-on:click="metodo()"
      >
        clique aqui
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  methods: {
    metodo(){
       const newFruit = {
                name: 'Pink Lady',
                type: 'Apple',
                id: 2,
            }
      console.log(this.$store)
      console.log(this.$store.state.shop.users.Users)
      // Use dispatch to call an action
      //this.$store.dispatch('shop/product/addFruit', newFruit)
    }
  },
  computed: {
        fruits() {
          console.log(this.$store.state.shop.users.users)
            return this.$store
        },
    },
}
</script>
