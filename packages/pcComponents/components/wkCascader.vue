<template>
  <a-cascader
    v-bind="parentAttrs"
    v-model:value="modelValue"
    style="width: 100%"
    change-on-select
    :options="options"
    :field-names="{
      label: 'name',
      value: 'code',
      children: 'childNodes',
    }"
    @change="onChange"
  ></a-cascader>
</template>

<script lang="ts" setup>
import { ref, useAttrs, watchEffect } from "vue";
import { useFormData, useFormTools } from "@lc/useHooks";
import type { RegionType } from "@lc/types";

const parentAttrs = useAttrs();

const props = defineProps<{
  value?: RegionType;
}>();
const emit = defineEmits<{
  (e: "update:value", value: RegionType): void;
  (e: "update:code", value: string): void;
}>();

const modelValue = ref<string[]>([]);
const regineCache = new Map();
const { getParentTrees } = useFormTools();
const options = ref<RegionType[]>([]);
const initData = (code: string) => {
  if (code) {
    let result: RegionType[] = [];
    if (regineCache.has(code)) {
      result = regineCache.get(code);
    } else {
      getParentTrees(options.value, code, result);
      regineCache.set(code, result);
    }
    modelValue.value = result.map((item) => item.code);
  } else {
    modelValue.value = [];
  }
};
const { getRegionCode } = useFormData("noNeedTableName");
getRegionCode().then((data) => {
  options.value = data;
  if (props.value && props.value.code) {
    initData(props.value.code);
  }
});
watchEffect(async () => {
  if (props.value && props.value.code && options.value.length > 0) {
    initData(props.value.code);
  } else {
    modelValue.value = [];
  }
});

const onChange = (value: string[], searchOptions: RegionType[]) => {
  if (searchOptions && searchOptions.length > 0) {
    const lastRegion = searchOptions[searchOptions.length - 1];
    emit("update:value", {
      code: lastRegion.code,
      fullName: lastRegion.fullName,
    });
  } else {
  }
};
</script>
