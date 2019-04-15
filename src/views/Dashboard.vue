<template>
  <div class="flex flex-col text-center justify-center">
    <greeting />
    <div class="band mt-6">
      <card v-for="card in entries" :cardId="card.id" :key="card.id" :short="card.short" :fullName="card.fullName" :nrOfTodos="card.todos" :nrOfDecks="card.decks" />
    </div>
  </div>
</template>

<script>
import Greeting from '@/components/Landing/Greeting.vue'
import Card from '@/components/Card.vue'
export default {
  name: 'Dashboard',
  components: {
    Greeting,
    Card
  },
  data () {
    return {
      entries: [
        {
          id: 1,
          short: 'E',
          fullName: 'English',
          todos: '2',
          decks: '4'
        },
        {
          id: 2,
          short: 'IE',
          fullName: 'Industrial Electronics',
          todos: '1',
          decks: '5'
        }
      ]
    }
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
  }
}
</style>
