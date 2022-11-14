<template>
  <table-row
    v-for="(rowOrder, rowIndex) in visibleRows"
    v-show="startRowIndex + rowOrder.currIndex < data.length"
    :key="rowIndex"
    :origin-index="rowOrder.originIndex"
    :curr-index="rowOrder.currIndex"
    :start-row-index="startRowIndex"
    :fixed="fixed"
  >
    <table-col
      v-for="(column, colIndex) in columns"
      :key="colIndex"
      :data="data[startRowIndex + rowOrder.currIndex]"
      :column="column"
      :col-index="colIndex"
      :row-index="startRowIndex + rowOrder.currIndex"
    ></table-col>
  </table-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ColumnType } from "./wktTable.vue";
import tableRow from "./tableRow.vue";
import tableCol from "./tableCol.vue";

export interface VisibleType {
  originIndex: number; // 原始序列
  currIndex: number; //当前序列
}

export default defineComponent({
  name: "TableRows",
  components: {
    tableRow,
    tableCol,
  },
  props: {
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    startRowIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
    visibleRows: {
      type: Array as PropType<VisibleType[]>,
      default: () => [],
    },
    fixed: {
      type: [String, null] as PropType<string>,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>
