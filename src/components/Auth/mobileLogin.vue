<template>
  <div class="h-full flex flex-col text-center justify-around align-middle w-64 mx-auto">
    <h2 class="text-2xl text-gray-900">Dex Login</h2>
    <form class="flex flex-col">
      <input
        class="shadow p-2 rounded-lg my-1"
        type="email"
        placeholder="Email"
        required
      >
      <input
        class="shadow p-2 rounded-lg my-1"
        placeholder="Password"
        type="password"
        required
      >
      <button
        type="submit"
        class="shadow bg-blue-600 p-2 rounded-lg text-white my-1"
      >Sign In</button>
      <!-- GOOGLE Sign In -->
      <button
        @click="loginGoogle"
        type="button"
        class="googleButton shadow bg-white p-0 pl-2 rounded-lg text-gray-800 my-1 w-64 flex flex-row"
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
    <p
      @click="$emit('switchForm')"
      class="mt-6"
    >New here? Sign up for a new account!</p>
  </div>
</template>

<script>
export default {
  methods: {
    checkForm () { },
    async login () {
      await this.$auth.login()
    },
    async loginGoogle () {
      const user = await this.$auth.loginWithGoogle()
      await console.log(user)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #d1d1d1;
  height: 40px;
}
button {
  height: 40px;
}
.googleButton {
  border: 1px solid #d1d1d1;
}
</style>
