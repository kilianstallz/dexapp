<template>
  <div
    v-if="isMobile"
    class="p-0 m-0 w-screen h-screen"
  >
    <mobileLogin />
  </div>
  <!-- Desktop Auth -->
  <div
    v-else
    class="flex flex-row p-0 m-0"
    style="height: 100%; width: 100%"
  >
    <div
      class="flex flex-col justify-center align-middle text-center bg-blue-400 hidden md:flex"
      style="width: 50vw;"
    >
      <p class="text-2xl text-white">Sign In Now!</p>
    </div>
    <div class="flex flex-col justify-between flex-grow">
      <header class="flex flex-row flex-wrap text-center bg-gray-200 p-2">
        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            class="my-1 w-56"
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="my-1 w-56"
          >
          <button class="rounded bg-blue-400 w-56 my-1">Log In</button>
        </form>
      </header>
      <section class="flex flex-col"></section>
      <footer class="flex flex-row"></footer>
    </div>
  </div>
</template>

<script>
import mobileLogin from '../components/Auth/mobileLogin.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Authentication',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['loadingSpinner']),
    ...mapGetters('user', ['user']),
    nextRoute () {
      return this.$route.query.redirect || '/app'
    },
    isMobile () {
      return window.innerWidth < 768
    }
  },
  methods: {
    async login () {
      await this.$auth.login(this.login.email, this.login.password)
    },
    async loginGoolge () {
      await this.$auth.loginGoolge()
    }
  },
  watch: {
    user (auth) {
      if (auth) {
        this.$router.push(this.nextRoute)
      }
    }
  },
  components: {
    mobileLogin
  }
}
</script>

<style>
</style>
