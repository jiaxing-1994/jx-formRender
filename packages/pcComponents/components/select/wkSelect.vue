<template>
  <a-select
    style="width: 100%"
    :options="optionList"
    :show-search="!!extraId"
    v-bind="parentAttrs"
    @search="onSearch"
  >
    <slot></slot>
    <template #notFoundContent>
      <slot name="notFoundContent"></slot>
    </template>
  </a-select>
</template>

<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeUnmount } from "vue";
import { useFormExtraApi } from "@lc/useHooks";
import { KeyValue } from "lc/types";

const parentAttrs = useAttrs();

const props = defineProps<{
  options: KeyValue[];
  extraId: string;
}>();

const optionList = ref<KeyValue[]>([]);
const isLoading = ref(false);
const onSearch = (keyword: string) => {
  getOptions(keyword);
};

// 异步
const { getExtraApiResult } = useFormExtraApi();
let getResultFn: any = null;
onBeforeUnmount(() => {
  getResultFn = null;
});
isLoading.value = true;
const getOptions = async (keyword = "") => {
  if (getResultFn) {
    const res = await getResultFn(keyword);
    optionList.value = res;
  }
  isLoading.value = false;
};

if (props.extraId) {
  getExtraApiResult<KeyValue[]>(props.extraId).then((fn: any) => {
    getResultFn = fn;
    getOptions();
  });
} else {
  watch(
    () => props.options,
    () => {
      optionList.value = props.options;
    },
    {
      immediate: true,
    }
  );
}
</script>

<style lang="less" scoped></style>
