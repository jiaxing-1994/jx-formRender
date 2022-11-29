<template>
  <wk-button
    class="mg-x_1"
    type="primary"
  >
    新增
  </wk-button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { FormBaseInfo } from "lc/types";

const props = defineProps<{
  form: FormBaseInfo | undefined;
}>();
const tableName = computed(() => {
  return props.form?.formTableName;
});
console.log(tableName);
</script>

<style lang="less" scoped></style>
