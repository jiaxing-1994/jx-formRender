<template>
  <a-button v-bind="parentAttrs">
    {{ value }}
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

defineProps<{
  value?: string;
}>();

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped>
/deep/ .ant-btn {
  font-size: inherit;
}
</style>
