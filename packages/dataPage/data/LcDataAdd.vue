<template>
  <lc-form-render
    ref="formRenderRef"
    :cpns="cpns"
  ></lc-form-render>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFormConfig } from "@lc/useHooks";
import { FormRender } from "@lc/formRender";
import { CpnInfo, Form } from "lc/types";

const props = defineProps<{
  tableName: string;
  headers: Record<string, string>;
  searchConditions: Record<string, any>;
}>();

const { getFormDetail, getDetailPageCpns } = useFormConfig(props.headers);
const cpns = ref<CpnInfo[]>([]);
getFormDetail(props.tableName).then((form: Form) => {
  cpns.value = getDetailPageCpns(form.cpns);
});

const formRenderRef = ref<InstanceType<FormRender>>();

const getData = () => {
  if (formRenderRef.value) {
    console.log(formRenderRef.value);
    const data = formRenderRef.value.getData();
    console.log(data);
  }
};

defineExpose({
  getData,
});
</script>

<style lang="less" scoped></style>
