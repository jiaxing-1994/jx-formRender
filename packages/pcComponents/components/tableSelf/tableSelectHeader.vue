<template>
  <table-row
    class="flex"
    width="40px"
  >
    <wk-checkbox
      :checked="checkAll"
      :indeterminate="indeterminate"
      @change="onChange"
    ></wk-checkbox>
  </table-row>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType, Ref } from "vue";
import type { ColumnType } from "./wktTable.vue";
import tableRow from "./tableRow.vue";

export interface VisibleType {
  originIndex: number; // 原始序列
  currIndex: number; //当前序列
}
export interface RowSelectionType {
  selectedRowKeys: string[];
  onChange?: () => void;
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
    const onChange = (e: InputEvent) => {
      if (!rowSelectList || !rowSelectDataList) {
        return;
      }
      if ((<HTMLInputElement>e.target).checked) {
        rowSelectList.value.length = 0;
        props.data?.forEach((item, index) => {
          rowSelectList.value.push(
            props.rowKey ? props.rowKey(item) : item.key ? item.key : props.startRowIndex + index
          );
        });
        rowSelectDataList.value = props.data?.map((item) => item);
      } else {
        rowSelectList.value.length = 0;
        rowSelectDataList.value = [];
      }
    };
    const checkAll = computed(() => {
      if (rowSelectList?.value.length === props.data?.length && props.data?.length > 0) {
        return true;
      }
      return false;
    });
    const indeterminate = computed(() => {
      if (
        rowSelectList &&
        rowSelectList.value.length < props.data?.length &&
        rowSelectList.value.length > 0
      ) {
        return true;
      }
      return false;
    });
    return {
      checkAll,
      indeterminate,
      rowSelectList,
      onChange,
    };
  },
});
</script>
