<template>
  <h1>{{stack.name}}</h1>
</template>

<script>
import { db } from '../../_imports/firebaseInit'
export default {
  name: 'ViewStack',
  data () {
    return {
      stack: null
    }
  },
  methods: {
    async getStack () {
      let stack = await db.collection('stacks').doc(this.$route.params.id).get()
      this.stack = stack.data()
    }
  },
  created () {
    this.getStack()
  }
}
</script>

<style>
</style>
