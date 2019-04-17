<template>
  <div
    id="left"
    class="column flex flex-col pt-6"
    v-show="showSidebar"
  >
    <div class="item mx-auto">Home</div>
    <div
      class="item mx-auto"
      @click="logout"
    >Logout</div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Sidebar',
  computed: {
    showSidebar () {
      return this.$sidebar.showSidebar
    }
  },
  methods: {
    logout () {
      store.dispatch('user/logout')
    }
  }
}
</script>

<style>
.column {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#left {
  width: 200px;
  flex-shrink: 0;
}
</style>
