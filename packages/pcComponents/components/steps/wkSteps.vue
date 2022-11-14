<template>
  <a-steps v-bind="parentAttrs">
    <slot></slot>
  </a-steps>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs;
</script>

<style lang="less" scoped></style>
