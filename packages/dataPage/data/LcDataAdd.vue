<template>
  <slot
    name="header"
    :on-save-data="onSaveData"
  ></slot>
  <lc-form-render
    v-if="!isLoading"
    ref="formRenderRef"
    :cpns="cpns"
  ></lc-form-render>
  <p v-else>加载中...</p>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormConfig, useFormData } from "@lc/useHooks";
import { FormRender } from "@lc/formRender";
import { CpnInfo, Form } from "lc/types";

const props = defineProps<{
  tableName: string;
  headers?: Record<string, string>;
}>();

const { addData, getFormDetail } = useFormData(props.tableName);
const { getDetailPageCpns } = useFormConfig(props.headers);
const cpns = ref<CpnInfo[]>([]);
const isLoading = ref(true);
getFormDetail().then((form: Form) => {
  cpns.value = getDetailPageCpns(form.cpns);
  isLoading.value = false;
});

const formRenderRef = ref<InstanceType<FormRender>>();

const { go } = useRouter();

const onSaveData = async () => {
  if (formRenderRef.value) {
    const data = formRenderRef.value.getData();
    if (data) {
      await addData(data);
      alert("新增成功");
      go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.form-render {
  width: 100%;
  max-width: 1000px;
}
</style>
