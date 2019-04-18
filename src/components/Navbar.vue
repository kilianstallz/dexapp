<template>
  <nav class="navbar pl-4 pr-4">

    <div v-if="showModal" class="modal-wrapper fixed left-0 top-0 bottom-0 right-0 w-screen h-screen overflow-auto" style="background: rgb(0,0,0); background: rgba(0,0,0,.4); z-index: 99999;">
      <transition>
        <div class="modal mx-auto p-4 w-64 bg-white flex flex-col text-center rounded-lg" style="margin-top: 33vh;">

          <div class="flex flex-row">
            <h1 class="font-black mb-4 pl-4 flex-grow">Create</h1>
            <i class="far fa-window-close" @click="toggleModal(false)"></i>
          </div>

          <div class="w-100 p-2 border border-gray-900 bg-gray-900 rounded-lg shadow-sm hover:shadow-md mb-2 cursor-pointer">
            <p class="text-white">Create a new space</p>
          </div>
          <div class="w-100 p-2 border border-orange-500 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md mb-2 cursor-pointer">
            <p>Create a new todo</p>
          </div>
          <div class="w-100 p-2 border border-blue-500 bg-blue-500 text-white rounded-lg shadow-sm hover:shadow-md mb-2 cursor-pointer">
            <p>Create a new deck</p>
          </div>
        </div>
      </transition>
    </div>

    <toggle-sidebar :status="status" @toggle="$emit('toggle')"/>
    <router-link v-for="item in leftItems" :key="item.to" :to="item.to" class="navbar-item flex-row align-middle">
      <p>{{ item.name }}</p>
    </router-link>
    <div class="spacer"></div>
    <create-button @click.native="toggleModal" />
    <profile-button />
  </nav>
</template>

<script>
import ToggleSidebar from '../components/ToggleSidebar.vue'
import CreateButton from '../components/CreateButton.vue'
import ProfileButton from '../components/ProfileButton.vue'
export default {
  name: 'Navbar',
  data () {
    return {
      showModal: false,
      leftItems: [
        { to: '/app', name: 'My Space' },
        { to: '/about', name: 'Browse' }
      ]
    }
  },
  methods: {
    toggleModal (bool = true) {
      this.showModal = bool
    }
  },
  props: {
    status: Boolean
  },
  components: {
    ToggleSidebar,
    CreateButton,
    ProfileButton
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
