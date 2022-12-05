<template>
  <header class="flex flex-between pd_1">
    <h3>详情</h3>
    <div>
      <wk-button
        v-if="isEditShow"
        class="mg-l_1"
        type="primary"
        @click="onEdit"
      >
        编辑
      </wk-button>
      <wk-button
        v-if="isSaveShow"
        class="mg-l_1"
        type="primary"
        @click="onSave"
      >
        保存
      </wk-button>
      <wk-button
        v-if="isCancelShow"
        class="mg-l_1"
        @click="onCancel"
      >
        取消
      </wk-button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps<{
  type: string;
  isEdit?: boolean;
  isCanNotEdit?: boolean;
}>();
const emit = defineEmits<{
  (e: "edit", value: boolean): void;
  (e: "save"): void;
  (e: "cancel", value: boolean): void;
}>();

const isEditShow = computed(() => {
  return !props.isCanNotEdit && props.type === "detail" && !props.isEdit;
});
const onEdit = () => {
  emit("edit", true);
};

const isSaveShow = computed(() => {
  return (props.type === "detail" && props.isEdit) || props.type === "add";
});
const onSave = () => {
  emit("save");
};

const isCancelShow = computed(() => {
  return props.type === "detail" && props.isEdit;
});
const onCancel = () => {
  emit("cancel", false);
};
</script>
