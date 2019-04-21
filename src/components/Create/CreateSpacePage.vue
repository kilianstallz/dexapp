<template>
  <div class="wrapper">
    <button-close
      @click.native="goBack"
      class="close-btn"
    />

    <div class="form">
      <form
        @submit.prevent="handleSumbit"
        class="form-inner flex flex-col flex-auto"
      >
        <h1 class="text-3xl font-black text-gray-800 tracking-tight mb-6">Create a new stack</h1>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            NAME YOUR STACK
          </label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Like 'Applied Electronics'"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <p
            v-if="fullName.length > 24"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 24 letters</p>
        </div>

        <div class="flex flex-col w-full mb-6">
          <label
            class="text-gray-600 tracking-tight mb-2"
            style="font-size: 0.875rem; font-weight: 700;"
          >
            CHOOSE A SHORTHAND
          </label>
          <input
            v-model="shortHand"
            type="text"
            placeholder="Like 'AE'"
            class="w-full text-xl text-gray-600 focus:text-gray-700 font-bold mr-4"
          >
          <p
            v-if="shortHand.length > 8"
            style="font-size: 0.825rem;"
            class="lead-none text-red-500"
          >max. 8 letters</p>
        </div>

        <div>
          <button
            type="submit"
            class="rounded-lg text-white bg-blue-400 shadow-sm py-2 px-4 hover:shadow-lg"
          >CREATE STACK</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import Firebase from 'firebase/app'
import 'firebase/firestore'
import buttonClose from '../buttonClose.vue'
export default {
  components: {
    buttonClose
  },
  data () {
    return {
      fullName: '',
      shortHand: ''
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/app')
    },
    checkForm () {
      return this.fullName.length >= 24 && this.shortHand.length >= 8
    },
    async handleSumbit () {
      if (this.checkForm) {
        try {
          const db = Firebase.firestore()
          const colRef = db.collection('stacks')
          const user = Firebase.auth().currentUser.uid
          const stackRef = await colRef.add({
            name: this.fullName,
            short: this.shortHand,
            undoneTodos: 0,
            todos: 0,
            decks: 0,
            users: [user],
            creator: user
          })
          console.log('Created', stackRef)
          this.goBack()
        } catch (e) {
          console.log('Error sending data: ', e)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  padding-top: 32px;

  .close-btn {
    position: absolute;
    top: 32px;
    right: 20px;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: unset;
    justify-content: flex-start;
    max-width: 500px;
    padding: 32px 32px 80px;
  }

  input {
    border: none;
  }
}
</style>
