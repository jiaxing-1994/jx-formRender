<template>
  <a-time-picker
    style="width: 100%"
    v-bind="parentAttrs"
  ></a-time-picker>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
