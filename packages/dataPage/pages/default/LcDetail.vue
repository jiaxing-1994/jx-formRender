<template>
  <lc-data-detail
    :id="id"
    :table-name="tableName"
    :headers="headers"
  >
    <template #header="{ isEdit, isShowEdit, onSaveData, onEditData, onCancelEdit }">
      <lc-titie-bar
        type="detail"
        :is-edit="isEdit"
        :is-can-not-edit="isShowEdit"
        @save="onSaveData"
        @edit="onEditData"
        @cancel="onCancelEdit"
      ></lc-titie-bar>
    </template>
  </lc-data-detail>
</template>

<script lang="ts" setup>
import LcTitieBar from "../../components/LcTitieBar.vue";
import LcDataDetail from "../../data/LcDataDetail.vue";

defineProps<{
  tableName: string; // 表单数据库表名
  headers?: Record<string, string>; // 默认请求头
  id: string;
}>();
</script>
