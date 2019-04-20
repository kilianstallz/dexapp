<template>
  <div class="close-btn">
      <svg class="close">
        <g>
          <title>Close</title>
          <path d="M.854.146C.658-.05.342-.05.146.146-.05.342-.05.658.146.854L5.793 6.5.146 12.146c-.195.196-.195.512 0 .707.196.196.512.196.708 0L6.5 7.208l5.646 5.647c.196.195.512.195.707 0 .196-.196.196-.512 0-.707L7.208 6.5 12.854.854c.195-.196.195-.512 0-.708-.196-.195-.512-.195-.707 0L6.5 5.793.854.146z"></path>
        </g>
      </svg>
    </div>
</template>

<script>
export default {
  name: 'buttonClose'
}
</script>

<style lang="scss">
.close-btn {
    height: 1.25rem;
    width: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    transition: all .25s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;

    .close {
      fill: #a19f9f;
      width: 13px;
      height: 13px;
      overflow: visible;
    }

    &:hover {
      transform: rotate(360deg);
    }

    &:focus {
      transform: rotate(360deg);
    }
  }
</style>
