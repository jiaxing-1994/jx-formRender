<template>
  <wk-button
    class="mg-x_1"
    type="primary"
    @click="onToAdd"
  >
    新增
  </wk-button>
</template>

<script lang="ts" setup>
import { FormBaseInfo } from "lc/types";

const props = defineProps<{
  form: FormBaseInfo | undefined;
}>();
const emit = defineEmits<{
  (e: "onToAdd", tableName: string): void;
}>();

const onToAdd = () => {
  emit("onToAdd", props.form?.formTableName || "");
};
</script>

<style lang="less" scoped></style>
