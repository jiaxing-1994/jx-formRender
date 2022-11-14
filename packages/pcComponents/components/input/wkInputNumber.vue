<template>
  <a-input-number
    style="width: 100%"
    v-bind="parentAttrs"
  >
    <slot></slot>
  </a-input-number>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
