<template>
  <a-radio v-bind="parentAttrs">
    <slot></slot>
  </a-radio>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
