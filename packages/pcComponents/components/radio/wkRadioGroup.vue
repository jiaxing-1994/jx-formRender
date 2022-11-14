<template>
  <a-radio-group
    v-bind="parentAttrs"
    :options="optionList"
  >
    <slot></slot>
  </a-radio-group>
</template>

<script lang="ts" setup>
import { useAttrs, computed } from "vue";

const props = defineProps<{
  options: Record<string, string | number>[];
}>();

const parentAttrs = useAttrs();
const optionList = computed(() => {
  if (props.options) {
    return props.options.map((item) => ({
      label: item.value,
      value: item.key,
    }));
  }
  return [];
});
</script>

<style lang="less" scoped></style>
