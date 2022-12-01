<template>
  <lc-titie-bar @click="onBtnClick"></lc-titie-bar>
  <lc-data-add
    ref="lcDataAddRef"
    :table-name="tableName"
    :headers="headers"
  ></lc-data-add>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LcTitieBar from "../../components/LcTitieBar.vue";
import LcDataAdd from "../../data/LcDataAdd.vue";
defineProps<{
  tableName: string; // 表单数据库表名
  headers: Record<string, string>; // 默认请求头
}>();

const lcDataAddRef = ref<InstanceType<typeof LcDataAdd>>();
const onBtnClick = (type: string) => {
  console.log(type);
  if (lcDataAddRef.value) {
    lcDataAddRef.value.getData();
  }
};
</script>
