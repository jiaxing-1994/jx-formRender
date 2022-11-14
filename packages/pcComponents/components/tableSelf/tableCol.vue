<script lang="ts">
import { defineComponent, inject, ref, computed, h, PropType } from "vue";
import * as wkUtils from "@wk-libs/utils";
import type { ColumnType } from "./wktTable.vue";

export default defineComponent({
  name: "WkTableCol",
  props: {
    data: {
      type: [Object, null] as PropType<Record<string, any> | null>,
      default: null,
    },
    column: {
      type: Object as PropType<ColumnType>,
    },
    rowIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
    colIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const asyncDataValue = ref("");
    const getDataValue = () => {
      if (props.column && props.data) {
        const { dataIndex, customRender, customRenderAsync } = props.column;
        if (customRender) {
          return customRender({
            text: (dataIndex && props.data[dataIndex]) || null,
            record: props.data,
            index: props.rowIndex,
            column: props.column,
          });
        }
        if (customRenderAsync) {
          customRenderAsync({
            text: (dataIndex && props.data[dataIndex]) || null,
            record: props.data,
            index: props.rowIndex,
            column: props.column,
          }).then((data) => {
            asyncDataValue.value = data;
          });
          return asyncDataValue.value;
        }
        if (dataIndex && props.data[dataIndex]) {
          return props.data[dataIndex];
        }
        return "--";
      }
    };

    const colWidth = computed(() => {
      let width = "";
      if (props.column && props.column.width) {
        wkUtils.isString(props.column.width) && (width = props.column.width);
        wkUtils.isNumber(props.column.width) && (width = `${props.column.width}px`);
      }
      return width;
    });

    const colLeft = computed(() => {
      let left = "0px";
      if (props.column && props.column.left) {
        return `${props.column.left}px`;
      }
      return left;
    });

    const slots = inject<any>("slots");
    const hasSlots = computed(() => {
      if (
        slots &&
        slots.bodyCell &&
        !props.column?.customRender &&
        !props.column?.customRenderAsync
      ) {
        const childrens = slots.bodyCell({
          text: getDataValue(),
          record: props.data,
          column: props.column,
          index: props.rowIndex,
          colIndex: props.colIndex,
        });
        return (
          !!(
            childrens.length &&
            Array.isArray(childrens[0].children) &&
            childrens[0].children.length
          ) && true
        );
      }
      return false;
    });

    return () => {
      return h(
        "div",
        {
          class: "table-col flex flex-left pd_1 of_h",
          style: {
            width: colWidth.value,
            left: colLeft.value,
          },
        },
        [
          !hasSlots.value &&
            h(
              "span",
              {
                class: "ellipsis",
              },
              getDataValue()
            ),
          hasSlots.value &&
            slots &&
            slots.bodyCell &&
            slots.bodyCell({
              text: getDataValue(),
              record: props.data,
              column: props.column,
              index: props.rowIndex,
              colIndex: props.colIndex,
            }),
        ]
      );
    };
  },
});
</script>

<style lang="less" scoped>
.table-col {
  vertical-align: top;
  position: absolute;
  height: 60px;
  top: 0;
  left: 0;
}
</style>
