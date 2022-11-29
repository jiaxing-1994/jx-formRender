<template>
  <lc-data-list
    :table-name="tableName"
    :headers="headers"
    :search-conditions="searchConditions"
  >
    <template #search="{ cpns, onSearch }">
      <div class="search-wrap pd-x_1 pd-y_2">
        <lc-search-condition
          :value="searchConditions"
          :cpns="cpns"
          @search="onSearch"
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
    <template #operateLeft="{ form }">
      <lc-add-btn :form="form"></lc-add-btn>
      <wk-button>自定义左边</wk-button>
    </template>
    <template #operateRight="{ form }">
      <lc-import-btn :form="form"></lc-import-btn>
      <lc-export-btn :form="form"></lc-export-btn>
      <wk-button>自定义右边</wk-button>
    </template>
    <template #table="{ cpns, data }">
      <lc-table-list
        :table-name="tableName"
        :cpns="cpns"
        :data="data"
      ></lc-table-list>
    </template>
  </lc-data-list>
</template>

<script lang="ts" setup>
import { LcImportBtn, LcAddBtn, LcExportBtn, LcSearchCondition, LcTableList } from "../components";

defineProps<{
  tableName: string; // 表单数据库表名
  headers: Record<string, string>; // 默认请求头
  searchConditions: Record<string, any>; // 默认查询条件
}>();
</script>

<style lang="less" scoped>
.search-wrap {
  background: #f1f2f3;
}
</style>
