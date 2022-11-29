<template>
  <wk-table
    :columns="columns"
    :data="data"
  ></wk-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useFormTable, useFormConfig } from "@lc/useHooks";
import { CpnInfo } from "lc/types";

const props = defineProps<{
  cpns: CpnInfo[];
  headers: Record<string, string>;
  data: Record<string, any>[];
}>();

const { getTableListCpns } = useFormConfig();
const { getTabelColumns } = useFormTable();
const columns = computed(() => getTabelColumns(getTableListCpns(props.cpns)));
</script>
