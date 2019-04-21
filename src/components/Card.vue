<template>
  <article class="my-2 bg-white rounded-lg overflow-hidden flex flex-col justify-between shadow-md hover:shadow-lg">
    <div class="flex flex-col align-middle px-6 py-4">
      <div class="font-bold text-2xl mb-2 tracking-tight font-gray-800">{{short}}</div>
      <p class="text-2xl font-light tracking-tight leading-tight">{{fullName}}</p>
    </div>
    <div class="px-6 py-6 flex flex-col">
      <span>{{decks}}</span>
      <span>{{todos}}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props: {
    deckId: String,
    short: String,
    fullName: String,
    nrOfDecks: Number,
    nrOfTodos: Number
  },
  computed: {
    decks () {
      if (this.nrOfDecks === 1) return `${this.nrOfDecks} Deck`
      else return `${this.nrOfDecks} Decks`
    },
    todos () {
      if (this.nrOfTodos === 1) return `${this.nrOfTodos} To-Do`
      else return `${this.nrOfTodos} To-Dos`
    }
  },
  methods: {
    // TASK: GO TO Details View
  }
}
</script>

<style lang="scss" scoped>
article {
  transition: all 0.1s ease-in;
}
</style>
