<template>
  <wk-button
    v-if="isShowExport"
    class="mg-x_1"
    type="primary"
    :loading="exportLoading"
    @click="onExport"
  >
    导出
  </wk-button>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useFormData } from "lc/useHooks";
import { Configuration, FormBaseInfo, OptionBodyQuery } from "lc/types";

const props = defineProps<{
  form: FormBaseInfo;
  configuration: Configuration;
  searchConditions: OptionBodyQuery[];
}>();

const exportConfig = computed(() => {
  return props.configuration?.defaultButtonConfig?.find((item) => item.type === "EXPORT");
});
const isShowExport = computed(() => {
  return !exportConfig.value || exportConfig.value.isShow;
});

const { exportListData } = useFormData(props.form.formTableName);
const exportLoading = ref(false);
const onExport = async () => {
  exportLoading.value = true;
  await exportListData(props.searchConditions);
  exportLoading.value = false;
};
</script>
