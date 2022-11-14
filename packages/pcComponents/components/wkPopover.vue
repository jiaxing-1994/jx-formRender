<template>
  <a-popover v-bind="parentAttrs">
    <template #content>
      <slot name="content"></slot>
    </template>
    <slot></slot>
  </a-popover>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
