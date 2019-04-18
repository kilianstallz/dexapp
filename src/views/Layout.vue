<template>
  <div class="home flex flex-col overflow-hidden m-0">

    <Navbar :status="sidebar" @toggle="sidebar = !sidebar"/>

    <div class="wrapper flex m-0">
      <side-bar />
      <div id="right" @click="closeSidebar" class="column flex flex-col">
        <Content />
      </div>

    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Content from '../components/Layout/Content.vue'
export default {
  name: 'home',
  components: {
    Navbar,
    Content
  },
  data () {
    return {
      sidebar: false,
      window: {
        width: 0
      }
    }
  },
  methods: {
    closeSidebar () {
      if (this.$sidebar.showSidebar) {
        if (this.window.width < 768) {
          this.$sidebar.displaySidebar(false)
        }
      }
    },
    getWindowWidth (event) {
      this.window.width = window.innerWidth
      if (this.window.width < 768) {
        this.$sidebar.showSidebar = false
      } else {
        this.$sidebar.showSidebar = true
      }
    }
  },
  created () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowWidth)
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100vh;
    -webkit-app-region: drag;
    background-color: rgb(250, 249, 249);
    box-sizing: border-box;

    .wrapper {
      height: 100%;
      overflow: hidden;
      margin: 0;

      .column {
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: all .15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
      }
      #right {
        width: 100%;
        transition: all .15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
      }
    }
  }
</style>
