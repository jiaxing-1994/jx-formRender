<template>
  <a-slider v-bind="parentAttrs"></a-slider>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs;
</script>

<style lang="less" scoped></style>
