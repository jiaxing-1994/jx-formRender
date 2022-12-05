<template>
  <div class="h_100 flex">
    <side class="h_100 w_25">
      <slot name="left"></slot>
    </side>
    <div class="h_100 w_100 flex flex1 flex-column">
      <header class="w_100">
        <slot name="header"></slot>
      </header>
      <div class="flex1 w_100">
        <slot name="render"></slot>
      </div>
    </div>
    <side class="h_100 w_25">
      <slot name="right"></slot>
    </side>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
header {
  height: 60px;
}
</style>
