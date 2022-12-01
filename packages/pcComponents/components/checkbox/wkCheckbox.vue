<template>
  <a-checkbox
    v-bind="parentAttrs"
    :checked="value"
    @change="onChange"
  >
    <slot></slot>
  </a-checkbox>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();

defineProps<{
  value: string[];
}>();

const emit = defineEmits<{
  (e: "update:value", value: boolean): void;
}>();
const onChange = (e: boolean) => {
  emit("update:value", e);
};
</script>

<style lang="less" scoped></style>
