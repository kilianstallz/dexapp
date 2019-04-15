import Sidebar from './Sidebar.vue'
const SidebarStore = {
  showSidebar: true,
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {
  install (Vue) {
    let app = new Vue({
      data: {
        SidebarStore
      }
    })

    Vue.prototype.$sidebar = app.SidebarStore
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
