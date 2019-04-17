<template>
  <div
    v-if="isMobile && !loadingSpinner"
    class="p-0 m-0 w-screen h-screen"
  >
    <mobileLogin v-if="!signUp" @switch="signUp = !signUp" />
  </div>
  <!-- Desktop Auth -->
  <div
    v-else-if="!isMobile && !loadingSpinner"
    class="flex flex-row p-0 m-0"
    style="height: 100%; width: 100%"
  >
    <div
      class="flex flex-col justify-center align-middle text-center bg-blue-400 hidden md:flex"
      style="width: 50vw;"
    >
      <p class="text-2xl text-white">Welcome!</p>
    </div>
    <div class="flex flex-col justify-between flex-grow">
      <mobile-login v-if="!signUp" @switch="signUp = !signUp" />
      <sign-up v-if="signUp" @switch="signUp = !signUp"/>
    </div>
  </div>
  <div v-else>Loading</div>
</template>

<script>
import mobileLogin from '../components/Auth/mobileLogin.vue'
import signUp from '../components/Auth/signUp.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Authentication',
  data () {
    return {
      signUp: false
    }
  },
  computed: {
    ...mapGetters(['loadingSpinner']),
    ...mapGetters('user', ['user']),
    nextRoute () {
      return this.$route.query.redirect || '/app'
    },
    isMobile () {
      return window.innerWidth < 850
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
    mobileLogin,
    signUp
  }
}
</script>

<style lang="scss">
input {
  border: 1px solid #d1d1d1;
  height: 40px;
  outline: none;

  &:focus {
    outline: none;
    border: 1px solid cadetblue;
  }
}
button {
  height: 40px;
  outline: none;
}
</style>
