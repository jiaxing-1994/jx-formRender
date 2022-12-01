<template>
  <header class="flex flex-between pd_1">
    <h3>详情</h3>
    <div>
      <wk-button
        class="mg-l_1"
        type="primary"
        @click="onEdit"
      >
        编辑
      </wk-button>
      <wk-button
        class="mg-l_1"
        type="primary"
        @click="onSave"
      >
        保存
      </wk-button>
      <wk-button
        class="mg-l_1"
        @click="onCancel"
      >
        取消
      </wk-button>
    </div>
  </header>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "click", type: string): void;
}>();
const onEdit = () => {
  emit("click", "edit");
};
const onSave = () => {
  emit("click", "save");
};
const onCancel = () => {
  emit("click", "cancel");
};
</script>

<style lang="less" scoped></style>
