<template>
  <div class="content bottom">
    <transition>
      <div class="container">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.content {
  margin-left: auto;
  height: 100%;
  width: 100%;
  float: right;
  transition: all .15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
}
.bottom {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 100%;
}

.container {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
}
</style>
