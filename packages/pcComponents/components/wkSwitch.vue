<template>
  <a-switch
    :checked="value"
    v-bind="parentAttrs"
    @change="onChange"
  ></a-switch>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs;

defineProps<{
  value: boolean;
}>();
const emit = defineEmits<{
  (e: "update:value", value: boolean): void;
}>();
const onChange = (e: boolean) => {
  console.log(e);
  emit("update:value", e);
};
</script>

<style lang="less" scoped></style>
