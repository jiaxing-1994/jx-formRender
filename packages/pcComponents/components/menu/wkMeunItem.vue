<template>
  <a-menu-item v-bind="parentAttrs">
    <slot></slot>
  </a-menu-item>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
