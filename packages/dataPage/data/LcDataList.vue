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
import { ref } from "vue";
import { isArray } from "@wk-libs/utils";
import { useFormConfig, useFormData, useNamespace } from "@lc/useHooks";
import { Configuration, CpnInfo, Form, OptionBodyQuery } from "../../types";
const { getFormDetail, getCanSearchCpns, getTableListCpns } = useFormConfig();
const { u } = useNamespace("lcDataList");

const props = defineProps<{
  tableName: string;
  headers: Record<string, string>;
  searchConditions: Record<string, any>;
}>();

if (!props.tableName) {
  throw new Error("tableName属性不能为空");
}
// 表单信息
const formInfo = ref<Form>();
// 配置信息
const configurationInfo = ref<Configuration>();
// 条件控件
const searchCpns = ref<CpnInfo[]>([]);
// 表格控件
const tableCpns = ref<CpnInfo[]>([]);
const initData = async () => {
  const formData = await getFormDetail(props.tableName);
  const { form, cpns, configuration } = formData.data;
  formInfo.value = form;
  configurationInfo.value = configuration;
  searchCpns.value = getCanSearchCpns(cpns);
  tableCpns.value = getTableListCpns(cpns);
};
initData();

// 查询数据
const { listData, getFormListData } = useFormData(props.headers);
const onSearch = (data: OptionBodyQuery[]) => {
  console.log(configurationInfo.value);
  let orderByKey = "";
  let orderDirection = "ASC";
  if (configurationInfo.value) {
    const { orderBy } = configurationInfo.value;
    if (isArray(orderBy) && orderBy.length > 0) {
      orderByKey = orderBy[0].key;
      orderDirection = orderBy[0].sort;
    }
  }
  getFormListData(props.tableName, data, { orderBy: orderByKey, orderDirection: orderDirection });
};
</script>

<style lang="less" scoped>
.wk-lcDataList_operate {
  &-left {
  }
  &-right {
  }
}
</style>
