<template>
  <a-input-number
    style="width: 100%"
    v-bind="parentAttrs"
    @change="onChange"
  >
  </a-input-number>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";

const parentAttrs = useAttrs();
const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const onChange = (value: number) => {
  emit("update:value", value ? `${value}` : "");
};
</script>
