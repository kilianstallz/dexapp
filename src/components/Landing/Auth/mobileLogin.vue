<template>
  <div class="w-full h-full flex flex-col justify-center text-center">
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" required>
      <input type="password" v-model="password" required>
      <button type="submit"></button>
      <button type="button" @click="loginGoogle"></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MobileLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    checkForm () {},
    async handleSubmit () {
      this.checkForm()
      const user = await this.$auth.login(this.email, this.password)
      console.log(user)
      // TASK Update User Action
    },
    async loginGoogle () {
      const user = await this.$auth.loginGoogle()
      console.log(user)
      // TASK Update User Action
    }
  }
}
</script>

<style>

</style>
