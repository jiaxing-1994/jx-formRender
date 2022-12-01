<template>
  <wk-button
    class="mg-x_1"
    type="primary"
    :loading="exportLoading"
    @click="onExport"
  >
    导出
  </wk-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFormData } from "lc/useHooks";
import { FormBaseInfo, OptionBodyQuery } from "lc/types";

const props = defineProps<{
  form: FormBaseInfo;
  searchConditions: OptionBodyQuery[];
}>();
const { exportListData } = useFormData();
const exportLoading = ref(false);
const onExport = async () => {
  exportLoading.value = true;
  await exportListData(props.form.formTableName, props.searchConditions);
  exportLoading.value = false;
};
</script>

<style lang="less" scoped></style>
