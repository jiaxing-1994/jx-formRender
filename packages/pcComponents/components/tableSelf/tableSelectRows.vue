<template>
  <table-row
    v-for="(rowOrder, rowIndex) in visibleRows"
    v-show="startRowIndex + rowOrder.currIndex < data.length"
    :key="rowIndex"
    class="flex"
    :origin-index="rowOrder.originIndex"
    :curr-index="rowOrder.currIndex"
    :start-row-index="startRowIndex"
    width="40px"
  >
    <wk-checkbox
      v-bind="
        rowSelection.getCheckboxProps
          ? rowSelection.getCheckboxProps(data[startRowIndex + rowOrder.currIndex])
          : {}
      "
      :checked="isChecked(rowOrder)"
      @change="
        onChange(
          $event,
          data[startRowIndex + rowOrder.currIndex],
          startRowIndex + rowOrder.currIndex
        )
      "
    ></wk-checkbox>
  </table-row>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from "vue";
import * as wkUtils from "@wk-libs/utils";
import { ColumnType } from "./wktTable.vue";
import tableRow from "./tableRow.vue";

export interface VisibleType {
  originIndex: number; // 原始序列
  currIndex: number; //当前序列
}
export interface RowSelectionType {
  selectedRowKeys?: string[];
  onChange?: (selectRowList: string[], selectDataList: any[]) => void;
  getCheckboxProps?: (record: any) => object;
}

export default defineComponent({
  name: "TableRows",
  components: {
    tableRow,
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
    rowSelection: {
      type: [Object, null] as PropType<RowSelectionType | null>,
      default: null,
    },
    rowKey: {
      type: [Function, null] as PropType<(data: any) => string | number>,
      default: null,
    },
  },
  setup(props) {
    const rowSelectList = inject<Ref<(string | number)[]>>("rowSelectList");
    const rowSelectDataList = inject<Ref<any[]>>("rowSelectDataList");
    const onChange = (e: InputEvent, data: any, rowIndex: number) => {
      let selectKey = props.rowKey ? props.rowKey(data) : data.key || rowIndex;
      if ((<HTMLInputElement>e.target).checked) {
        rowSelectList?.value.push(selectKey);
        rowSelectDataList?.value.push(data);
      } else {
        const selectIndex = rowSelectList?.value.findIndex((item) => item === selectKey);
        if (wkUtils.isNumber(selectIndex) && selectIndex > -1) {
          rowSelectList?.value.splice(selectIndex, 1);
          rowSelectDataList?.value.splice(selectIndex, 1);
        }
      }
    };

    const isChecked = (rowOrder: VisibleType) => {
      const currData = props.data[props.startRowIndex + rowOrder.currIndex];
      if (!currData) {
        return false;
      }
      const selectKey = props.rowKey
        ? props.rowKey(currData)
        : currData.key
        ? currData.key
        : props.startRowIndex + rowOrder.currIndex;
      return !!(rowSelectList && rowSelectList.value.includes(selectKey));
    };
    return {
      rowSelectList,
      onChange,
      isChecked,
    };
  },
});
</script>
