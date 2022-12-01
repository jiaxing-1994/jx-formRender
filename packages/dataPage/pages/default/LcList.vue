<template>
  <lc-data-list
    :table-name="tableName"
    :headers="headers"
    :search-conditions="searchConditions"
  >
    <template #search="props">
      <div class="search-wrap pd-x_1 pd-y_2">
        <lc-search-condition
          :value="searchConditions"
          v-bind="props"
        >
          <template #searchBtn="{ onSearch, onClearSearch }">
            <wk-form-item>
              <wk-button
                type="primary"
                @click="onSearch"
              >
                搜索
              </wk-button>
              <wk-button
                type="link"
                @click="onClearSearch"
              >
                清除查询条件
              </wk-button>
            </wk-form-item>
          </template>
        </lc-search-condition>
      </div>
    </template>
    <template #operateLeft="props">
      <lc-add-btn
        v-bind="props"
        @onToAdd="onToAdd"
      ></lc-add-btn>
      <slot
        name="operateLeft"
        v-bind="props"
      ></slot>
    </template>
    <template #operateRight="props">
      <lc-import-btn v-bind="props"></lc-import-btn>
      <lc-export-btn v-bind="props"></lc-export-btn>
      <slot
        name="operateRight"
        v-bind="props"
      ></slot>
    </template>
    <template #table="props">
      <lc-table-list v-bind="props"></lc-table-list>
    </template>
  </lc-data-list>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import {
  LcImportBtn,
  LcAddBtn,
  LcExportBtn,
  LcSearchCondition,
  LcTableList,
} from "../../components";

defineProps<{
  tableName: string; // 表单数据库表名
  headers: Record<string, string>; // 默认请求头
  searchConditions: Record<string, any>; // 默认查询条件
}>();
const emit = defineEmits<{
  (e: "onToAdd", tableName: string): void;
}>();

const { push } = useRouter();
const onToAdd = (tableName: string) => {
  push("/LcAdd");
  emit("onToAdd", tableName);
};
</script>

<style lang="less" scoped>
.search-wrap {
  background: #f1f2f3;
}
</style>
