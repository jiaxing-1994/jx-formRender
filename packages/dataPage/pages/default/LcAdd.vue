<template>
  <lc-data-add
    :table-name="tableName"
    :headers="headers"
  >
    <template #header="{ onSaveData }">
      <lc-titie-bar
        type="add"
        :edit="true"
        @save="onSaveData"
      ></lc-titie-bar>
    </template>
  </lc-data-add>
</template>

<script lang="ts" setup>
import LcTitieBar from "../../components/LcTitieBar.vue";
import LcDataAdd from "../../data/LcDataAdd.vue";

defineProps<{
  tableName: string; // 表单数据库表名
  headers?: Record<string, string>; // 默认请求头
}>();
</script>
