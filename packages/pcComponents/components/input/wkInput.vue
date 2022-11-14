<template>
  <a-input v-bind="parentAttrs"></a-input>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
</script>

<style lang="ts" scoped></style>
