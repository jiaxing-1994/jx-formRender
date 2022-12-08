<template>
  <template v-if="!isLoading">
    <div :class="[u('search')]">
      <slot
        name="search"
        :on-search="onSearch"
        :form="formInfo"
        :default-search-conditions="defaultSearchConditions"
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
        :on-del="onDel"
        :od-check="onCheck"
      ></slot>
    </div>
  </template>
  <p v-else>数据加载中...</p>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { isArray } from "@wk-libs/utils";
import { useFormConfig, useFormData, useFormTools, useNamespace } from "@lc/useHooks";
import { Configuration, CpnInfo, Form, FormBaseInfo, OptionBodyQuery } from "../../types/index.d";

const props = withDefaults(
  defineProps<{
    tableName: string;
    headers: Record<string, string>;
    searchConditions?: OptionBodyQuery[];
  }>(),
  {
    searchConditions: () => [],
  }
);
const emit = defineEmits<{
  (e: "onToDetail", id: string): void;
}>();

if (!props.tableName) {
  throw new Error("tableName属性不能为空");
}

const { u } = useNamespace("lc-data-list");

// 查询数据
const { listData, getFormListData, delData, getFormDetail } = useFormData(
  props.tableName,
  props.headers
);
const { getCanSearchCpns, getTableListCpns } = useFormConfig();

const formInfo = ref<FormBaseInfo>(); // 表单信息
const configurationInfo = ref<Configuration>(); // 配置信息
const cpns = ref<CpnInfo[]>([]);
const searchCpns = ref<CpnInfo[]>([]); // 条件控件
const isLoading = ref(true);

getFormDetail().then((form: Form) => {
  formInfo.value = form.form;
  configurationInfo.value = form.configuration;
  cpns.value = form.cpns;
  searchCpns.value = getCanSearchCpns(cpns.value);
  isLoading.value = false;
});
// 表格控件
const tableCpns = computed(() => {
  return getTableListCpns(cpns.value);
});

const { getUrlParams, parseSearchInUrl } = useFormTools();

// 默认条件
const defaultSearchConditions: OptionBodyQuery[] = [
  ...parseSearchInUrl(getUrlParams(props.tableName, "searchOptions")),
  ...props.searchConditions,
];
// 搜索条件
const searchConditions = ref<OptionBodyQuery[]>([]);
const onSearch = (conditions: OptionBodyQuery[]) => {
  // 不存在搜索列表项中的默认搜索条件，目的为使用户无法清除默认固定参数
  const notInSearch = defaultSearchConditions.filter((item) => {
    return !cpns.value.find((cpn) => cpn.cpnKey == item.key);
  });
  let orderByKey = "";
  let orderDirection = "ASC";
  if (configurationInfo.value) {
    const { orderBy } = configurationInfo.value;
    if (isArray(orderBy) && orderBy.length > 0) {
      orderByKey = orderBy[0].key;
      orderDirection = orderBy[0].sort;
    }
  }
  searchConditions.value = conditions;
  getFormListData([...conditions, ...notInSearch], {
    orderBy: orderByKey,
    orderDirection: orderDirection,
  });
};

const onDel = async (id: string) => {
  await delData(id);
  alert("删除成功");
  onSearch(searchConditions.value);
};

const onCheck = async (id: string) => {
  emit("onToDetail", id);
};
</script>

<style lang="less" scoped></style>
