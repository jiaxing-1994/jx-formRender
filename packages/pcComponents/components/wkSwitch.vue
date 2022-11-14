<template>
  <a-switch v-bind="parentAttrs"></a-switch>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs;
</script>

<style lang="less" scoped></style>
