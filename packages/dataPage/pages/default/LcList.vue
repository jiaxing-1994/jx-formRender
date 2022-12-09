<template>
  <lc-data-list
    :table-name="tableName"
    :headers="headers"
    :search-conditions="searchConditions"
  >
    <template #search="props">
      <div :class="[u('search-wrap'), 'pd-x_1', 'pd-y_2']">
        <lc-search-condition v-bind="props">
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
      <lc-table-list
        v-bind="props"
        @check="onToDetail"
      >
        <template #bodyCell="bodyCellProps">
          <slot
            name="bodyCell"
            v-bind="bodyCellProps"
          ></slot>
        </template>
        <template #bodyCellActions="bodyCellActionsProps">
          <slot
            name="bodyCellActions"
            v-bind="bodyCellActionsProps"
          ></slot>
        </template>
      </lc-table-list>
    </template>
  </lc-data-list>
</template>

<script lang="ts" setup>
import {
  LcImportBtn,
  LcAddBtn,
  LcExportBtn,
  LcSearchCondition,
  LcTableList,
} from "../../components";
import { useNamespace } from "@lc/useHooks";
import { OptionBodyQuery } from "@lc/types";

defineProps<{
  tableName: string; // 表单数据库表名
  headers: Record<string, string>; // 默认请求头
  searchConditions: OptionBodyQuery[]; // 默认查询条件
}>();
const emit = defineEmits<{
  (e: "onToAdd"): void;
  (e: "onToDetail", id: string): void;
}>();

const { u } = useNamespace("lc-data-list");

const onToAdd = () => {
  emit("onToAdd");
};
const onToDetail = (id: string) => {
  emit("onToDetail", id);
};
</script>

<style lang="less" scoped>
.wk-lc-data-list_search-wrap {
  background: #f1f2f3;
}
</style>
