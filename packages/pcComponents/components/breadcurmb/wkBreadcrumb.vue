<template>
  <a-breadcrumb v-bind="parentAttrs">
    <slot></slot>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";
const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
