<template>
  <a-select
    style="width: 100%"
    v-bind="parentAttrs"
  >
    <slot></slot>
    <template #notFoundContent>
      <slot name="notFoundContent"></slot>
    </template>
  </a-select>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
