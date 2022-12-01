<template>
  <div
    class="file-upload"
    :class="{
      'file-upload_disable': disabled,
    }"
  >
    <label
      v-if="isEdit"
      ref="dropBox"
      class="cs-p white_bg"
      :class="`file-upload_label${isMobile ? '-mobile' : ''}`"
    >
      <input
        ref="fileRef"
        :multiple="multiple"
        class="file-upload_picker"
        type="file"
        @change="onChange"
      />
      <div
        v-if="isMobile"
        class="file-upload_label-btn ta_c main_bg white w_100"
      >
        上传附件
      </div>
      <div
        v-else
        class="file-upload_label-tip ta_c fs_xs fc_6"
      >
        点击选择文件或拖拽文件到此
        <br />
        {{ ruleTip }}
      </div>
    </label>
    <div class="file-upload_show flex flex-top">
      <template
        v-for="(item, index) in fileOriginList"
        :key="index"
      >
        <div v-if="isPicture(item)">
          <div class="flex image-box">
            <img
              v-if="item"
              :src="item.file"
              :alt="item.name"
              @click="onPreview(item, true)"
            />
            <span
              v-else
              class="iconfont f-picture blue"
              style="font-size: 32px"
            ></span>
          </div>
        </div>
        <div
          v-else
          class="file-upload_item flex flex-between cs-p w_100 pd-x_1 mg_1"
        >
          <div
            class="flex flex-left w_100"
            @click="onDownload(item)"
          >
            <i
              class="iconfont fs_xl blue f-wenjian"
              style="margin-right: 5px"
            ></i>
            <span
              :title="item.name"
              class="ellipsis w_100"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="flex flex-right">
            <span
              v-if="isEdit"
              class="iconfont f-close fs_lg pd-r_1 cs-p nowrap"
              @click.stop="onDelFile(index)"
            ></span>
          </div>
        </div>
      </template>
      <wk-empty
        v-if="fileOriginList.length === 0 && !isEdit"
        description="暂无文件"
      ></wk-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 邓雯完善
import { ref, watch, onBeforeUnmount } from "vue";
import { message } from "ant-design-vue";
import * as wkUtils from "@wk-libs/utils";
import { defineProps } from "vue";

interface FileType {
  name: string;
  size: number;
  file: string | File;
}
const props = withDefaults(
  defineProps<{
    value: FileType[];
    multiple: boolean;
    regxType: RegExp;
    ruleTip: string;
    disabled: boolean;
    maxSize: number | null;
    isEdit: boolean;
    isMobile: boolean;
  }>(),
  {
    isEdit: true,
  }
);

const emits = defineEmits<{
  (e: "onOk", fileOriginList: FileType[]): void;
  (e: "update:value", fileOriginList: FileType[] | null): void;
  (e: "fileChange", fileOriginList: FileType[] | null): void;
}>();

const fileOriginList = ref<FileType[]>(props.value || []);
watch(
  () => props.value,
  () => {
    if (props.value) {
      fileOriginList.value = props.value;
    } else {
      fileOriginList.value = [];
    }
  }
);
const isPicture = (file: FileType) => {
  return /png|jpeg|jpg|gif|svg|pic/.test(file.name);
};

const validator = (fileList: FileList): FileType[] => {
  const verifyFileType = (file: File) => {
    if (props.regxType.test(file.name)) {
      return true;
    }
    message.warn(`${file.name}_格式不对`);
    return false;
  };
  const verifyRepeat = (file: File) => {
    const findIndex = fileOriginList.value.findIndex(
      (item) =>
        item.file instanceof File &&
        item.file.lastModified === file.lastModified &&
        item.name === file.name
    );
    if (findIndex === -1) {
      return true;
    }
    message.warn(`${file.name}_重复选择`);
    return false;
  };
  const verifySize = (file: File) => {
    const { size } = file;
    if (props.maxSize && props.maxSize * 1024 * 1024 < size) {
      message.warn(`${file.name}文件超出最大${props.maxSize}M限制`);
      return false;
    }
    return true;
  };
  const verifies = [verifyFileType, verifyRepeat, verifySize];
  return Array.from(fileList)
    .filter((file) =>
      verifies.reduce((prev: boolean, curr: (file: File) => boolean) => prev && curr(file), true)
    )
    .map((file) => ({
      name: file.name,
      size: file.size,
      file: file,
    }));
};
const addFile = (fileList: FileList) => {
  if (props.multiple) {
    fileOriginList.value = validator(fileList);
    emitResult();
  } else {
    const verifiedList = validator(fileList);
    if (verifiedList.length > 0) {
      fileOriginList.value = [verifiedList[0]];
      emitResult();
    }
  }
};
const onDelFile = (index: number) => {
  fileOriginList.value.splice(index, 1);
  emitResult();
};

const onChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement;
  if (files) {
    addFile(files);
    (<HTMLInputElement>e.target).value = "";
  }
};
const emitResult = () => {
  if (fileOriginList.value.length > 0) {
    emits("update:value", fileOriginList.value);
    emits("fileChange", fileOriginList.value);
  } else {
    emits("update:value", null);
    emits("fileChange", null);
  }
};

const onPreview = (fileItem: FileType, isPicture = false) => {
  if (wkUtils.isString(fileItem.file)) {
    if (isPicture) {
      // TODO 图片预览
      window.open(fileItem.file, "_blank");
    } else {
      window.open(fileItem.file, "_blank");
    }
  }
};
const onDownload = (fileItem: FileType) => {
  if (wkUtils.isString(fileItem.file)) {
    window.open(fileItem.file, "__blank");
  }
};

// 拖拽文件
const dropBox = ref<HTMLElement>();
const preventDefault = (e: DragEvent) => e.preventDefault();
const onDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer) {
    addFile(e.dataTransfer.files);
  }
};
watch(
  dropBox,
  () => {
    if (dropBox.value) {
      document.addEventListener("drop", preventDefault, false);
      document.addEventListener("dragover", preventDefault, false);
      dropBox.value.addEventListener("drop", onDrop);
    }
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(() => {
  if (dropBox.value) {
    document.removeEventListener("drop", preventDefault, false);
    document.removeEventListener("dragover", preventDefault, false);
    dropBox.value.removeEventListener("drop", onDrop);
  }
});
</script>

<style lang="less" scoped>
.file-upload {
  width: 100%;
  height: 100%;
  min-width: 50px;
  &_disable {
    .file-upload_label {
      background-color: #f5f5f5 !important;
    }
  }
  &_label {
    width: 100%;
    height: 100px;
    border: dashed 1px #979797;
    border-radius: 5px;
    display: block;
    position: relative;
    transition: all 0.2s;
    &-mobile {
      width: 90px;
      height: 32px;
    }
    &-btn {
      height: 32px;
      line-height: 32px;
    }
    &-tip {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 20px;
    }
  }
  &_desc {
  }
  &_picker {
    display: none !important;
  }
  &_show {
  }
  &_item {
    height: 32px;
    background: #fafafc;
    border-radius: 4px;
  }
}

.image-box {
  width: 40%;
  height: 40%;
  min-width: 120px;
  min-height: 120px;
  background: #fafafc;
  border: 1px dashed #ccc;
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>
