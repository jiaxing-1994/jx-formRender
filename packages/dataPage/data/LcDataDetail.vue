<template>
  <slot
    name="header"
    :is-edit="isEdit"
    :is-show-edit="!isShowEdit"
    :on-save-data="onSaveData"
    :on-edit-data="onEditData"
    :on-cancel-edit="onCancelEdit"
  ></slot>
  <lc-form-render
    v-if="!isLoading && !isLoadingData"
    ref="formRenderRef"
    :cpns="cpns"
    :model="formDataInfo"
    :is-edit="isEdit"
  ></lc-form-render>
  <p v-else>加载中...</p>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useFormConfig, useFormData } from "@lc/useHooks";
import { FormRender } from "@lc/formRender";
import { Configuration, CpnInfo, Form } from "lc/types";

const props = defineProps<{
  tableName: string;
  headers?: Record<string, string>;
  id: string;
}>();

const { getFormDetailData, editData, getFormDetail } = useFormData(props.tableName);
const { getDetailPageCpns } = useFormConfig(props.headers);
const cpns = ref<CpnInfo[]>([]);
const configuration = ref<Configuration>();
const isLoading = ref(true);
getFormDetail().then((form: Form) => {
  cpns.value = getDetailPageCpns(form.cpns);
  console.log(cpns.value);
  configuration.value = form.configuration;
  isLoading.value = false;
});

const editConfig = computed(() => {
  return configuration.value?.defaultButtonConfig?.find((item) => item.type === "EDIT");
});
const isShowEdit = computed(() => {
  return !editConfig.value || editConfig.value.isShow;
});

const formRenderRef = ref<InstanceType<FormRender>>();

const formDataInfo = ref<Record<string, any>>({});
const isLoadingData = ref(true);
getFormDetailData(props.id).then((res) => {
  formDataInfo.value = res;
  isLoadingData.value = false;
});
// 保存数据
const onSaveData = async () => {
  if (formRenderRef.value) {
    const data = formRenderRef.value.getData();
    console.log(data);
    return;
    if (data) {
      await editData({
        ...formDataInfo.value,
        ...data,
      });
      alert("编辑成功");
      isEdit.value = false;
    }
  }
};
const isEdit = ref(false);
const onEditData = (edit: boolean) => {
  isEdit.value = edit;
};
const onCancelEdit = (edit: boolean) => {
  isEdit.value = edit;
};
</script>

<style lang="less" scoped>
.form-render {
  width: 100%;
  max-width: 1000px;
}
</style>
