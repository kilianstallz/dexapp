<template>
  <nav class="navbar pl-6">
    <toggle-sidebar :status="status" @toggle="$emit('toggle')"/>
    <router-link v-for="item in leftItems" :key="item.to" :to="item.to" class="navbar-item flex-row align-middle">
      <p>{{ item.name }}</p>
    </router-link>
    <div class="spacer"></div>
  </nav>
</template>

<script>
import ToggleSidebar from '../components/ToggleSidebar.vue'
export default {
  name: 'Navbar',
  data () {
    return {
      leftItems: [
        { to: '/app', name: 'My Space' },
        { to: '/app/about', name: 'About' }
      ]
    }
  },
  props: {
    status: Boolean
  },
  components: {
    ToggleSidebar
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  background-color: rgb(250, 249, 249);
  height: 64px;
  position: sticky;
  top: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  z-index: 99;
  transition: all .15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  flex: 0 0 auto;
  border-bottom: unset;

  .spacer {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
  }

  .router-link-active {background-color: rgb(240, 237, 237);}

  .navbar-item {
    border-radius: 8px;
    padding: 8px;
    margin: 0 8px;
    -webkit-blox-align: center;

    p {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: -0.2px;
      color: rgb(64, 63, 63);
      line-height: 1.25rem;
      margin: 0 0 0 8px;
    }
  }
}
</style>
