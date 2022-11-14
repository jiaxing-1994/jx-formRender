<template>
  <a-step v-bind="parentAttrs">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #description>
      <slot name="desc"></slot>
    </template>
  </a-step>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs;
</script>

<style lang="less" scoped></style>
