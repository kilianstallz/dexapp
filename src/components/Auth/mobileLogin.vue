<template>
  <div class="h-full flex flex-col text-center justify-around align-middle w-64 mx-auto">
    <h2 class="text-2xl text-gray-900">Dex Login</h2>
    <form @submit.prevent="login" class="flex flex-col">
      <div class="bg-red-200 border-red-500 border-2 mb-1 py-4 text-center rounded-lg tracking-tight leading-tight text-red-900" style="font-size: 14px;" v-if="error">{{error}}</div>
      <input
        class="shadow p-2 rounded-lg my-1"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      >
      <input
        class="shadow p-2 rounded-lg my-1"
        placeholder="Password"
        type="password"
        v-model="password"
        required
      >
      <button
        type="submit"
        class="shadow bg-blue-600 p-2 rounded-lg text-white my-1 focus:border-gray-800 focus:shadow-lg"
      >Sign In</button>
      <!-- GOOGLE Sign In -->
      <button
        @click="loginGoogle"
        type="button"
        class="googleButton shadow bg-white p-0 pl-2 rounded-lg text-gray-800 my-1 w-64 flex flex-row focus:border-gray-800 focus:shadow-lg"
      ><img
          src="@/assets/btn_google_light_normal_ios.svg"
          alt="Google Login"
          height="40px"
          width="40px"
        ><span
          class="my-auto font-medium"
          style="margin-left: 24px; font-size: 14px;"
        >Sign in with Google</span></button>
    </form>
    <a
      @click="switchForm"
      class="mt-6" style="cursor: pointer;"
    >New here? Sign up for a new account!</a>
  </div>
</template>

<script>
export default {
  name: 'mobileLogin',
  data () {
    return {
      error: '',
      email: '',
      password: ''
    }
  },
  methods: {
    checkForm () { },
    async login () {
      try {
        await this.$auth.login(this.email, this.password)
      } catch (e) {
        if (e.code === 'auth/user-not-found') this.error = 'This user was not found! Try again...'
        else this.error = e.message
      }
    },
    async loginGoogle () {
      await this.$auth.loginWithGoogle()
    },
    switchForm () {
      this.$emit('switch')
    }
  }
}
</script>

<style lang="scss" scoped>
.googleButton {
  border: 1px solid #d1d1d1;
}
</style>
