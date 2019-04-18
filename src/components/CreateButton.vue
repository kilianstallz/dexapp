<template>
  <div
    role="button"
    class="flex flex-col align-middle whitespace-no-wrap justify-center"
  >
    <i class="fas fa-plus"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
div {
  height: 40px;
  box-sizing: border-box;
  pointer-events: auto;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(161, 159, 159);
  background: transparent;
  line-height: 1rem;
  align-self: auto;
  z-index: 9;
  padding: 0 0.625rem;
  text-decoration: none;
  border: 0.0625rem solid transparent;
  border-radius: 1.25rem;
  transition: all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
}

</style>
