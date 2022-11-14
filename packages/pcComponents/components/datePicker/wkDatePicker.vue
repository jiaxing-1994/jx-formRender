<template>
  <a-date-picker
    style="width: 100%"
    v-bind="parentAttrs"
  ></a-date-picker>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped>
/deep/ .ant-picker {
  width: 100%;
}
</style>
