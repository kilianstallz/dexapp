<template>
  <button
    @click="toggle"
    class="flex flex-col align-middle whitespace-no-wrap justify-center"
    :class="{'isOpen': sidebar}"
  >|||</button>
</template>

<script>
export default {
  name: 'SidebarToggle',
  methods: {
    toggle () {
      this.$sidebar.showSidebar = !this.$sidebar.showSidebar
    }
  },
  props: {
    status: Boolean
  },
  computed: {
    sidebar () {
      return this.$sidebar.showSidebar
    }
  }
}
</script>

<style scoped>
button {
  height: 40px;
  box-sizing: border-box;
  pointer-events: auto;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(161, 159, 159);
  background: transparent;
  line-height: 1rem;
  align-self: auto;
  z-index: 9;
  padding: 0 0.625rem;
  text-decoration: none;
  border: 0.0625rem solid transparent;
  border-radius: 1.25rem;
  transition: all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
}

.isOpen {
  transform: rotateZ(90deg);
}
</style>
