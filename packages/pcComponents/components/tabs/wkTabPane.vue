<template>
  <a-tab-pane v-bind="parentAttrs">
    <slot></slot>
  </a-tab-pane>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
