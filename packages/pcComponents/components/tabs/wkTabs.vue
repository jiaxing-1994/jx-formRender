<template>
  <a-tabs v-bind="parentAttrs">
    <slot></slot>
  </a-tabs>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less">
.ant-tabs {
  font-size: inherit !important;
}
</style>
