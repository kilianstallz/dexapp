<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(navigator.connection)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 0;
  outline: 0;
  padding: 0;
  text-decoration: none;
  text-rendering: optimizeLegibility;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.5;
  text-shadow: none;
}
</style>
