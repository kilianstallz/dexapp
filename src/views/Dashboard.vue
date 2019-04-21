<template>
  <div class="flex flex-col text-center justify-center">
    <greeting />
    <div v-if="isLoading">Loading ...</div>
    <div
      v-else
      class="band mt-6"
    >
      <card
        v-for="card in allStacks"
        :cardId="card.id"
        :key="card.id"
        :short="card.short"
        :fullName="card.name"
        :nrOfTodos="card.todos || 0"
        :nrOfDecks="card.decks || 0"
        @click.native="openStack(card.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Greeting from '@/components/Landing/Greeting.vue'
import Card from '@/components/Card.vue'
export default {
  name: 'Dashboard',
  components: {
    Greeting,
    Card
  },
  data () {
    return {}
  },
  computed: {
    isLoading () {
      return this.$store.getters['loadingSpinner']
    },
    ...mapGetters('data', ['allStacks'])
  },
  methods: {
    openStack (id) {
      this.$router.push('/app/stack/' + id)
    }
  },
  created () {
    // TASK: Fetch Spaces
    this.$store.dispatch('data/fetchStacks')
    this.$store.commit('LOADING_SPINNER', false)
  }
}
</script>

<style lang="scss" scoped>
.band {
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
}

@media only screen and (min-width: 500px) {
  .band {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 850px) {
  .band {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}

@media only screen and (min-width: 1440px) {
  .band {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}
</style>
