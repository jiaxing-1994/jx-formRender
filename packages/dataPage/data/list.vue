<template>
  <div class="search">
    <slot
      name="search"
      :cpns="searchCpns"
    ></slot>
  </div>
  <div class="operate">操作栏</div>
  <div class="list">
    <slot
      name="table"
      :cpns="tableCpns"
    ></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFormConfig } from "@lc/useHooks";
import { CpnInfo } from "../../types";
const { getFormDetail, getCanSearchCpns, getTableListCpns } = useFormConfig();

const props = defineProps<{
  tableName: string;
}>();

if (!props.tableName) {
  throw new Error("tableName属性不能为空");
}
const searchCpns = ref<CpnInfo[]>([]);
const tableCpns = ref<CpnInfo[]>([]);
const initData = async () => {
  const formData = await getFormDetail(props.tableName);
  console.log(formData);
  const { form, cpns, configuration } = formData.data;
  searchCpns.value = getCanSearchCpns(cpns);
  tableCpns.value = getTableListCpns(cpns);
};
initData();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LcDataList",
});
</script>

<style lang="less" scoped></style>
