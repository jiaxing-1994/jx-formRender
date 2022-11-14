<template>
  <a-menu v-bind="parentAttrs">
    <slot></slot>
  </a-menu>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
