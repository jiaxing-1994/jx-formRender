<template>
  <a-modal v-bind="parentAttrs">
    <slot></slot>
  </a-modal>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
