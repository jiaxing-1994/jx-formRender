<template>
  <a-checkbox v-bind="parentAttrs">
    <slot></slot>
  </a-checkbox>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
