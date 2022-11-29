<template>
  <a-button v-bind="parentAttrs">
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";
const parentAttrs = useAttrs();
</script>

<style lang="less" scoped>
/deep/ .ant-btn {
  font-size: inherit;
}
</style>
