<template>
  <div :class="[u('search')]">
    <slot
      name="search"
      :on-search="onSearch"
      :form="formInfo"
      :configuration="configurationInfo"
      :cpns="searchCpns"
    ></slot>
  </div>
  <div :class="[u('operate'), 'flex', 'flex-between', 'pd_1']">
    <div :class="[u('operate', 'left')]">
      <slot
        name="operateLeft"
        :form="formInfo"
        :configuration="configurationInfo"
      ></slot>
    </div>
    <div :class="[u('operate', 'right')]">
      <slot
        name="operateRight"
        :form="formInfo"
        :configuration="configurationInfo"
        :search-conditions="searchConditions"
      ></slot>
    </div>
  </div>
  <div :class="[u('list')]">
    <slot
      name="table"
      :data="listData"
      :form="formInfo"
      :configuration="configurationInfo"
      :cpns="tableCpns"
    ></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { isArray } from "@wk-libs/utils";
import { useFormConfig, useFormData, useNamespace } from "@lc/useHooks";
import { Configuration, CpnInfo, Form, FormBaseInfo, OptionBodyQuery } from "../../types/index.d";

const props = defineProps<{
  tableName: string;
  headers: Record<string, string>;
  searchConditions: Record<string, any>;
}>();

if (!props.tableName) {
  throw new Error("tableName属性不能为空");
}

const { u } = useNamespace("lcDataList");

const { getFormDetail, getCanSearchCpns, getTableListCpns } = useFormConfig();

const formInfo = ref<FormBaseInfo>(); // 表单信息
const configurationInfo = ref<Configuration>(); // 配置信息
const cpns = ref<CpnInfo[]>([]); // 条件控件
getFormDetail(props.tableName).then((form: Form) => {
  formInfo.value = form.form;
  configurationInfo.value = form.configuration;
  cpns.value = form.cpns;
});
// 条件控件
const searchCpns = computed(() => {
  return getCanSearchCpns(cpns.value);
});
// 表格控件
const tableCpns = computed(() => {
  return getTableListCpns(cpns.value);
});

// 查询数据
const { listData, getFormListData } = useFormData(props.headers);
// 搜索条件
const searchConditions = ref<OptionBodyQuery[]>([]);
const onSearch = (data: OptionBodyQuery[]) => {
  let orderByKey = "";
  let orderDirection = "ASC";
  if (configurationInfo.value) {
    const { orderBy } = configurationInfo.value;
    if (isArray(orderBy) && orderBy.length > 0) {
      orderByKey = orderBy[0].key;
      orderDirection = orderBy[0].sort;
    }
  }
  searchConditions.value = data;
  getFormListData(props.tableName, data, { orderBy: orderByKey, orderDirection: orderDirection });
};
</script>

<style lang="less" scoped></style>
