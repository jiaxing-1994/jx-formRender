<template>
  <wk-table
    :columns="columns"
    :data="data"
  ></wk-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useFormTools, useFormConfig } from "lc/useHooks";
import { CpnInfo } from "lc/types";

const props = defineProps<{
  cpns: CpnInfo[];
  headers: Record<string, string>;
  data: Record<string, any>[];
}>();

const { getTableListCpns } = useFormConfig();
const { getTabelColumns } = useFormTools();
const columns = computed(() => getTabelColumns(getTableListCpns(props.cpns)));
</script>
