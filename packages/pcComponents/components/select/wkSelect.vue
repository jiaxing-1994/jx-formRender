<template>
  <a-select
    style="width: 100%"
    v-bind="parentAttrs"
    :options="options"
    :mode="isMultiple ? 'multiple' : ''"
    :field-names="{
      label: 'value',
      value: 'key',
    }"
  >
    <slot></slot>
    <template #notFoundContent>
      <slot name="notFoundContent"></slot>
    </template>
  </a-select>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { CpnInfo } from "lc/types";
const props = defineProps<{
  cpn: CpnInfo;
}>();
const options = computed(() => {
  return props.cpn.extraInfo?.options;
});

const isMultiple = computed(
  () => props.cpn.extraInfo?.multiSelect || props.cpn.cpnType === "CHECKBOX"
);

const parentAttrs = useAttrs();
</script>

<style lang="less" scoped></style>
