<template>
  <div class="flex flex-col text-center mt-12">
    <h2 class="text-2xl font-black text-gray-800">{{ `${greeting}${myName}!` }}</h2>
    <p class="text-gray-500 tracking-wide">You have <span class="text-black font-bold">{{ undoneTodos }}</span> {{ undoneEnding }}</p>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  data () {
    return {
      time: null
    }
  },
  computed: {
    myName () {
      let name = this.$store.getters['user/user'].displayName
      if (name) {
        let firstName = name.split(' ')
        return `, ${firstName[0]}`
      } else return ''
    },
    greeting () {
      if (this.time >= 18) return 'Good evening'
      else if (this.time >= 12) return 'Good afternoon'
      else return 'Good morning'
    },
    undoneTodos () {
      // TASK: Get undone todos from store
      return Math.floor(Math.random() * 10)
    },
    undoneEnding () {
      if (this.undoneTodos === 0) return 'undone todos! Great!'
      else if (this.undoneTodos === 1) return 'undone todo!'
      else return 'undone todos!'
    }
  },
  methods: {
    setTime () {
      const today = new Date()
      const hours = today.getHours()
      this.time = hours
    }
  },
  created () {
    this.setTime()
  }
}
</script>

<style lang="scss" scoped>

</style>
