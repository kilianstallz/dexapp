<template>
  <transition>
    <div
      id="left"
      class="column flex flex-col pt-0 pb-5"
      v-show="showSidebar"
    >
      <div class="m-0 p-0">
        <router-link to="/app" class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3">
          <i class="fas fa-home text-gray-700"></i>
          <p class="flex-grow m-0 whitespace-no-wrap text-gray-700">Home</p>
        </router-link>
      </div>

      <div class="flex flex-grow"></div>

      <div>
        <a @click="logout" class="item flex flex-row align-middle flex-grow my-1 mx-3 px-4 py-3">
          <i class="fas fa-unlock text-red-500"></i>
          <p class="flex-grow m-0 whitespace-no-wrap text-red-500">Log Out</p>
        </a>
      </div>

    </div>
  </transition>
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

<style lang="scss">
.column {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#left {
  background-color: rgb(240, 237, 237);
  width: 200px;
  flex-shrink: 0;
  overflow-x: hidden;
}

.item {
  i {
    font-size: 1.25rem;
    margin-right: 16px;
    line-height: 1;
  }

  p {
    line-height: 1.25rem;
    font-weight: 400;
    font-size: 0.875rem;
    text-overflow: ellipsis;
  }
}
</style>
