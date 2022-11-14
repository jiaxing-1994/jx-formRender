<template>
  <a-collapse-panel v-bind="parentAttrs">
    <slot></slot>
  </a-collapse-panel>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
