<template>
  <a-collapse v-bind="parentAttrs">
    <slot></slot>
  </a-collapse>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";
const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
