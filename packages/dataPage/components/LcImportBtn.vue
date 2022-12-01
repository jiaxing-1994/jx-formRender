<template>
  <wk-button
    class="mg-x_1"
    type="primary"
    :loading="loading"
    @click="onImport"
  >
    导入
  </wk-button>
  <wk-modal
    v-model:visible="visible"
    title="选择文件"
    destroy-on-close
    :confirm-loading="loading"
    @ok="onOk"
  >
    <wk-picker-file
      :regx-type="/(xls|xlsx)$/"
      rule-tip="仅支持xlx和xlsx格式"
      @fileChange="onFileChange"
    ></wk-picker-file>
    <div
      class="fs_sm blue ta_r mg-t_1 cs-p"
      @click="onDownloadTemplate"
    >
      点击下载模板示例文件
    </div>
  </wk-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useFormData } from "lc/useHooks";
import { Configuration, FileType, FormBaseInfo } from "lc/types";

const props = defineProps<{
  form: FormBaseInfo;
  configuration: Configuration;
}>();

const visible = ref(false);
const loading = ref(false);

const importConfig = computed(() => {
  return props.configuration?.defaultButtonConfig?.find((item) => item.type === "IMPORT");
});
const onImport = () => {
  visible.value = true;
};
const { importListData, downloadTemplateFile } = useFormData();
const currFile = ref<File>();
const onOk = async () => {
  loading.value = true;
  if (currFile.value && currFile.value) {
    const formData = new FormData();
    formData.append("file", currFile.value);
    if (!importConfig.value || importConfig.value.isShow) {
      // 走默认逻辑
      const tipMsg = await importListData(props.form.formTableName, formData);
      console.log(tipMsg);
      // 邓雯
    } else {
      // 走自定义逻辑
      // 邓雯
    }
  }
  visible.value = false;
  loading.value = false;
};
const onFileChange = (file: FileType[]) => {
  if (file && file.length > 0 && file[0].file instanceof File) {
    currFile.value = file[0].file;
  }
};
const onDownloadTemplate = () => {
  if (!importConfig.value || importConfig.value.isShow) {
    // 走默认
    downloadTemplateFile(props.form.formTableName);
  } else {
    // 走自定义
    const { isCustomTemplate, templateUrl } = importConfig.value;
    if (isCustomTemplate && templateUrl) {
      try {
        const { file } = JSON.parse(templateUrl)[0];
        window.open(file, "__blank");
        return;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
