<template>
  <div
    v-show="loading"
    class="flex"
    :class="{
      'w-loading': true,
      'w-loading_fullscreen': fullscreen,
    }"
  >
    <div
      v-show="!noMask"
      class="w-loading_mask"
    ></div>
    <div class="w-loading_text flex">
      <svg
        class="w-loading_icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-jiazai"></use>
      </svg>
      <p>{{ loadingText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean;
  noMask: boolean;
  loadingText: string;
  fullscreen: boolean;
}>();
</script>

<style lang="less" scoped>
.w-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(194, 194, 194, 0.1);
  z-index: 100;
  &_fullscreen {
    position: fixed;
  }
  &_mask {
  }
  &_text {
    color: #006cc6;
    fill: #006cc6;
  }
  &_icon {
    width: 30px;
    height: 30px;
    animation: rotate 2s infinite linear;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
